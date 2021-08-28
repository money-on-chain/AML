// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "../IMoC.sol";

contract MockMoC is IMoC {
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

    function balanceOf(address account) external view virtual override returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        uint256 senderBalance = _balances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        {
            _balances[sender] = senderBalance - amount;
        }
        _balances[recipient] += amount;
    }
}
