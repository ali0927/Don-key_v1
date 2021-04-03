// SPDX-License-Identifier: MIT

pragma solidity ^0.6.9;
import "./Cube.sol";
pragma experimental ABIEncoderV2;


contract byProxy is Cube{
        address BDO = 0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454;
    address BUSD = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
    address WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
      mapping (address => bool) public allowed;
        constructor() public {
            admins[msg.sender]=true;
    }
    function _delegate(address implementation) internal virtual {
        // solhint-disable-next-line no-inline-assembly
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
    
    function addAllowerd(address toAdd) public onlyAdmin{
        allowed[toAdd]=true;
    }
    
    function removeAllowerd(address toSub) public onlyAdmin{
        allowed[toSub]=false;
    }
    /**
     * @dev This is a virtual function that should be overriden so it returns the address to which the fallback function
     * and {_fallback} should delegate.
     */

     //input to change num to 3 : 0x3fb5c1cb0000000000000000000000000000000000000000000000000000000000000003
    function delegate(address to) public {
       assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(gas(), to, 0,calldatasize(), 0, 0)

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
    
    function delegateDatas1(address to,bytes memory datas) public {
       assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, datas)

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(gas(), to, 0,datas, 0, 0)

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
    
    function delegateDatas2(address to,bytes memory datas) public {
       assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            let len :=mload(datas)
            calldatacopy(0, 0, len)

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(gas(), to, 0,len, 0, 0)

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
        
        function _exec(address _to, bytes memory _data) public
        returns (bytes memory result)
    {
        assembly {
            let succeeded := delegatecall(
                gas(),
                _to,
                add(_data, 0x20),
                mload(_data),
                0,
                0
            )
            let size := returndatasize()

            result := mload(0x40)
            mstore(
                0x40,
                add(result, and(add(add(size, 0x20), 0x1f), not(0x1f)))
            )
            mstore(result, size)
            returndatacopy(add(result, 0x20), 0, size)

            switch iszero(succeeded)
                case 1 {
                    revert(add(result, 0x20), size)
                }
        }
    }
   
   
   function spell(address _target, bytes memory _data) public payable{
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
            spell(_targets[i], _datas[i]);
            // Setup the process to be triggered in the post-process phase

        }
        }
        
        
     
        function simple2(address _target) public {
        require(_target != address(0), "target-invalid");
        (bool success,bytes memory result)=_target.delegatecall(msg.data);
        require(success," the delegate call did not succedd");
        }
        
        
         function simpleCall(address _target, bytes memory _data) public {
        require(_target != address(0), "target-invalid");
        _target.call(_data);
        }
        
        function tokenApprove(address token, address spender,uint amount) public{
            IBEP20 tokent=IBEP20(token);
            tokent.approve(spender,amount);
        }
    

    /**
     * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if no other
     * function in the contract matches the call data.
     */
    

    /**
     * @dev Hook that is called before falling back to the implementation. Can happen as part of a manual `_fallback`
     * call, or as part of the Solidity `fallback` or `receive` functions.
     *
     * If overriden should call `super._beforeFallback()`.
     */
    function _beforeFallback() internal virtual {
    }
}
