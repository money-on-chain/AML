// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./IETHAtomicOracle.sol";
import "./IMoC.sol";
import "./AddressLibrary.sol";
import "./StatusLibrary.sol";

contract AmlVault {
    using AddressLibrary for address;
    using StatusLibrary for bytes32;
    /**
     * @dev Interface of the oracle
     */
    IETHAtomicOracle public oracle;
    /**
     * @dev Interface of MoC
     */
    IMoC public moc;
    /**
     * @dev address of DoC
     */
    address public docAddress;
    /**
     * @dev Interface of ERC20
     */
    IERC20 public ierc20;
    /**
     * @dev default value mask of oracle
     */
    bytes32 defaultOracleMask;
    /**
     * @dev default clean value mask of oracle
     */
    bytes32 clearFlagOracleMask;
    /**
     * @dev Address of the guardian
     */
    address public guardian;
    /**
     * @dev Address of the pending guardian
     */
    address public pendingGuardian;
    /**
     * @dev Emitted when pendingGuardian is changed
     */
    event NewPendingGuardian(address oldPendingGuardian, address newPendingGuardian);
    /**
     * @dev Emitted when moc is changed
     */
    event NewMoC(address oldMoC, address newMoC);
    /**
     * @dev Emitted when moc is changed
     */
    event NewDoC(address oldDoc, address newDoc);
    /**
     * @dev Emitted when oracle is changed
     */
    event NewOracle(address oldOracle, address newOracle);
    /**
     * @dev Emitted when pendingGuardian is accepted, which means gaurdian is updated
     */
    event NewGuardian(address oldGuardian, address newGuardian);
    /**
     * @dev Emitted user's address is denied
     */
    event AddressDenied(address user, uint8 flag);

    constructor(
        address oracle_,
        address moc_,
        address doc_,
        bytes32 defaultOracleMask_,
        bytes32 clearFlagOracleMask_
    ) {
        oracle = IETHAtomicOracle(oracle_);
        moc = IMoC(moc_);
        docAddress = doc_;
        guardian = msg.sender;
        defaultOracleMask = defaultOracleMask_;
        clearFlagOracleMask = clearFlagOracleMask_;
    }

    /**
     * @dev Begins transfer of gaurdian rights. The newPendingGaurdian must call `_acceptAdmin` to finalize the transfer.
     * @param newPendingGuardian New pending gaurdian.
     */
    function _setPendingAdmin(address newPendingGuardian) public {
        // Check caller = gaurdian
        require(msg.sender == guardian, "AML: only guardian may set the address");
        require(newPendingGuardian != address(0), "AML: address admin can not be 0");
        // Save current value, if any, for inclusion in log
        address oldPendingGuardian = guardian;
        // Store pendingGaurdian with value newPendingGaurdian
        pendingGuardian = newPendingGuardian;
        emit NewPendingGuardian(oldPendingGuardian, newPendingGuardian);
    }

    /**
     * @dev  Accepts transfer of gaurdian rights. msg.sender must be pendingGaurdian
     */
    function _acceptAdmin() public {
        // Check caller is pendingGaurdian and pendingGaurdian ≠ address(0)
        require(msg.sender == pendingGuardian, "AML: only guardian may set the address");
        require(msg.sender != address(0), "AML: sender can not be 0");

        // Save current values for inclusion in log
        address oldGuardian = guardian;
        address oldPendingGaurdian = pendingGuardian;

        // Store gaurdian with value pendingGaurdian
        guardian = pendingGuardian;

        // Clear the pending value
        pendingGuardian = address(0);

        emit NewGuardian(oldGuardian, guardian);
        emit NewPendingGuardian(oldPendingGaurdian, pendingGuardian);
    }

    /**
     * @dev Set a new address of IMoC
     * @param newMoC New address of MoC.
     */
    function setMoC(address newMoC) public {
        // Check caller = gaurdian
        require(msg.sender == guardian, "AML: only guardian may set the MoC");
        require(newMoC != address(0), "AML: address MoC can not be 0");
        // Save current value, if any, for inclusion in log
        address oldMoC = address(moc);
        moc = IMoC(newMoC);
        emit NewMoC(oldMoC, address(moc));
    }
    /**
     * @dev Set a new address of docAddress
     * @param newDocAddress New address of docAddress.
     */
    function setDoc(address newDocAddress) public {
        // Check caller = gaurdian
        require(msg.sender == guardian, "AML: only guardian may set the Doc");
        require(newDocAddress != address(0), "AML: address Doc can not be 0");
        // Save current value, if any, for inclusion in log
        address oldDocAddress = docAddress;
        docAddress = newDocAddress;
        emit NewDoC(oldDocAddress, docAddress);
    }

    /**
     * @dev Set a new address of oracle
     * @param newOracle New address of MoC.
     */
    function setOracle(address newOracle) public {
        // Check caller = gaurdian
        require(msg.sender == guardian, "AML: only guardian may set the oracle");
        require(newOracle != address(0), "AML: address oreacle can not be 0");
        // Save current value, if any, for inclusion in log
        address oldOracle = address(oracle);
        oracle = IETHAtomicOracle(newOracle);
        emit NewOracle(oldOracle, address(oracle));
    }

    /**
     * @dev Get a fee address to the oracle
     * @param user address of user.
     */
    function getFeeStatus(address user) external returns (uint256) {
        return _getOracleFee(user);
    }

    /**
     * remove it, only for POC
     */
    function validateUser(address user) external payable returns(bytes32) {
        return _verifyUser(user);
    }

    function mintDoc(uint256 btcToMint) external payable {
        // _verifyUser(msg.sender);
        uint256 valueToMoC = msg.value;//- _getOracleFee(address(this));
        moc.mintDoc{value: valueToMoC}(btcToMint);
        // uint256 balance = IERC20(docAddress).balanceOf(address(this));
        // IERC20(docAddress).transfer(msg.sender, balance);
    }

    // function redeemFreeDoc(uint256 docAmount) external payable {
    //     _verifyUser(msg.sender);
    //     // uint256 toTransfer = moc.redeemFreeDoc(docAmount);
    //     moc.redeemFreeDoc(docAmount);
    //     uint256 contractBalance = address(this).balance;
    //     msg.sender.transfer(contractBalance);
    //     //transfer
    // }

    function _getOracleFee(address user) internal returns (uint256) {
        string memory target = user.toString();
        return oracle.getFee(address(this));
    }

    function _verifyUser(address user) internal returns(bytes32) {
        string memory target = user.toString();
        uint256 fee = _getOracleFee(address(this));
        bytes32 result = oracle.getStatusForETH{value: fee}(target);
        require(((result == defaultOracleMask) || (result == clearFlagOracleMask)), "AmlVault: User is sanctioned");
        return result;
    }

    receive() external payable {}
}
