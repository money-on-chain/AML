pragma solidity ^0.7.0;

contract MockETHAtomicOracle is IETHAtomicOracle {
    mapping(address => uint256) public _fees;
    uint256 public _defaultFee;
    bytes32 public _status;

    constructor(uint256 defaultFee_) {
        _defaultFee = defaultFee_;
    }


    function setFee(address addr, uint256 fee) external {
        _fees[addr] = fee;
    }


    function setDefaultFee(uint256 defaultFee_) external {
        _defaultFee = defaultFee_;
    }

    function withdrawFees() external {
        msg.sender.transfer(address(this).balance);
    }

    function setMockStatus(bytes32 status) external {
        _status = status;
    }

    function getStatusForETH(string calldata target) external payable returns (bytes32 status) {
        require(bytes(target).length > 0, "Empty target");
        return _status;
    }

    function getFee(address addr) external view returns (uint256 fee) {
        fee = fees[addr];
        if(fee == 0) {
            fee = _defaultFee;
        }
        return fee;
    }
}