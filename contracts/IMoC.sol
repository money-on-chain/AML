// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

/// COINFIRM ATOMIC ORACLE

interface IMoC {
    /**
    @dev Mints BPRO and pays the comissions of the operation.
    @param btcToMint Amount un BTC to mint
   */
    function mintDoc(uint256 btcToMint)
        external
        payable;

    /**
     * @dev Redeems the requested amount for the msg.sender, or the max amount of free docs possible.
     * @param docAmount Amount of Docs to redeem.
     */
    function redeemFreeDoc(uint256 docAmount) external payable;
}
