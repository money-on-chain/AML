// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "../IMoC.sol";


contract MockMoC is IMoC{
    mapping(address => uint256) internal _balances;
    using SafeMath for uint256; // Applicable only for uint256

    /**
    @dev Mints BPRO and pays the comissions of the operation.
    @param btcToMint Amount un BTC to mint
   */
    function mintDoc(uint256 btcToMint) external payable override {
        _balances[msg.sender] = _balances[msg.sender].add(btcToMint);
    }

    /**
     * @dev Redeems the requested amount for the msg.sender, or the max amount of free docs possible.
     * @param docAmount Amount of Docs to redeem.
     */
    function redeemFreeDoc(uint256 docAmount) external payable override {
        _balances[msg.sender] = _balances[msg.sender].sub(docAmount);
    }
}
