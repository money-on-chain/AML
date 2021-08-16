// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

/// COINFIRM ATOMIC ORACLE

interface IETHAtomicOracle {

    /**
    * @dev Setting a fee for a specific Client Smart Contract.
    *
    * @param addr Address of the Client Smart Contract
    * @param fee Fee for this specific smart contract, use 0 to use the
    * default fee
    */
    function setFee(address addr, uint256 fee) external;


    /**
    * @dev Setting the default fee for queries.
    *
    * @param defaultFee_ New default fee for Client Smart Contracts without
    * their own personal fee in wei
    */
    function setDefaultFee(uint256 defaultFee_) external;

    /**
    * @dev Withdraw fees from this contract to the calling account
    *
    * Withdraw all the paid fees.
    */
    function withdrawFees() external;

    /**
    * @dev Status getter, see {BaseAtomicOracle-_getStatus}. Accepts
    ether.
    */
    function getStatusForETH(string calldata target) external payable
    returns (bytes32 status);

    /**
    * @dev Get the current fee for a specific Client Smart Contract.
    *
    * Use this to determine what your contract would pay.
    *
    * @param addr The Client Smart Contract whose fee would like to have
    * @return fee Current fee at the moment for `addr` in wei
    */
    function getFee(address addr) external view returns (uint256 fee);

    /**
    * @dev Emitted when a new fee for an address is set.
    *
    * @param addr Ethereum account address whose fee was set
    * @param fee The current fee in wei
    */
    event FeeSet(address addr, uint256 fee);

    /**
    * @dev Emitted when an authorized user withdraws paid fees from this
    * contract.
    *
    * @param destination Ethereum account address where the fees were
    * withdrawn to
    * @param amount Amount of fees withdrawn in wei
    */
    event FeesWithdrawn(address destination, uint256 amount);

    /**
    * @dev Emitted when default fee for account without a personal fee is set
    *
    * @param fee Current fee in wei for accounts without a personal fee
    */
    event DefaultFeeSet(uint256 fee);

}
