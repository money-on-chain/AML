// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4; // See "Solidity version" of README.md

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts//math/SafeMath.sol";

import "./IETHAtomicOracle.sol";
import "./AddressLibrary.sol";
import "./StatusLibrary.sol";

/**
* @title An Example Client Smart Contract: a simple vault
* @author Ville Sundell <development@solarius.fi>
* @dev This is an example implementation of a client smart contract.
*
* This is just to demonstrate Oracle <-> Client communication.
* The business logic presented here is not viable.
*
* THIS IS SIMPLIFIED INTENTIONALLY, AND NOT USABLE IN PRODUCTION AS-IS!
*/
contract AmlVault {
    using Address for address payable;
    using SafeMath for uint256; // Applicable only for uint256
    // These are Atomic Oracle specific, copy these to your implementation:
    using AddressLibrary for address;
    using StatusLibrary for bytes32;

    IETHAtomicOracle private _oracle;
    mapping(address => uint256) private _balances;

    constructor(IETHAtomicOracle oracle_) {
        _oracle = oracle_;
    }

    receive() external payable {
        _balances[msg.sender] = _balances[msg.sender].add(msg.value);
        _verifyUser(msg.sender);
    }

    function withdraw() external {
        uint256 balance = _balances[msg.sender];
        _balances[msg.sender] = 0;
        _verifyUser(msg.sender);
        msg.sender.sendValue(balance);
    }

    function _verifyUser(address user) internal {
        string memory target = user.toString();
        uint256 fee = _oracle.getFee(address(this));
        bytes32 result = _oracle.getStatusForETH{value: fee}(target);
        require(!result.isFlag(StatusLibrary.sanctioned_country), "ExampleVault: User is flagged as sanctioned");
    }
}