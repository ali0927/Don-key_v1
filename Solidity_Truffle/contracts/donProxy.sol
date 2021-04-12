// SPDX-License-Identifier: MIT

pragma solidity ^0.6.9;
import "./Controller.sol";
pragma experimental ABIEncoderV2;


contract donProxy is Controller {
      mapping (address => bool) public allowed;
        constructor() public {
            admins[msg.sender]=true;
    }
    
    function addAllowerd(address toAdd) public onlyAdmin{
        allowed[toAdd]=true;
    }
    
    function removeAllowerd(address toSub) public onlyAdmin{
        allowed[toSub]=false;
    }
   
   function Simple(address _target, bytes memory _data) public payable{
        require(_target != address(0), "target-invalid");
        require(allowed[_target]== true, "target contract not allowed");
        
        assembly {
            let succeeded := delegatecall(gas(), _target, add(_data, 0x20), mload(_data), 0, 0)

            switch iszero(succeeded)
                case 1 {
                    // throw if delegatecall failed
                    let size := returndatasize()
                    returndatacopy(0x00, 0x00, size)
                    revert(0x00, size)
                }
        }
    }
     function batchSimple(address[] memory _targets, bytes[] memory _datas) public {
       require(
            _targets.length == _datas.length,
            "Tos and datas length inconsistent"
        );
        for (uint256 i = 0; i < _targets.length; i++) {
            Simple(_targets[i], _datas[i]);

        }
        }

}
