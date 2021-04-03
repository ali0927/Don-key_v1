// SPDX-License-Identifier: MIT

pragma solidity ^0.6.9;
import "./byProxy.sol";
import "./Cube.sol";
pragma experimental ABIEncoderV2;

contract Strategy{
    address[] tos;
    bytes[] datas;
    string name;
    address payable byProxyaddress = 0x66b36107347ec36bbB9B622A9934A5cAb60fef3a;
    byProxy byProxyInstance;
    address WBNBaddress=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    address PancakeRouteraddress=0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F;
    address poolAddress;
    IBEP20 WBNB = IBEP20(WBNBaddress);
    bool locked;
        constructor(string memory _name) public {
      name=_name;
      byProxyInstance=byProxy(byProxyaddress);
      locked = false;
    }
    function addCube(address to,bytes memory data) public {
        require(locked==false,"Strategy is locked and cannot be changes");
        tos.push(to);
        datas.push(data);
    }
        function removeCube(address to,bytes memory data) public {
        require(locked==false,"Strategy is locked and cannot be changes");
        tos.pop();
        datas.pop();
    }
    function addCubes(address[] memory newTos,bytes[] memory newDatas) public {
                require(locked==false,"Strategy is locked and cannot be changes");

                require( newTos.length == newDatas.length,"Tos and datas length inconsistent");
                for (uint256 i = 0; i < newTos.length; i++) {
                tos.push(newTos[i]);
                datas.push(newDatas[i]);
                    
                }

                 }
        function removeCubes(uint cubeNumber) public {
            require(locked==false,"Strategy is locked and cannot be changes");

                for (uint256 i = 0; i < cubeNumber; i++) {
                tos.pop();
                datas.pop();
                    
                }

                 }
        function clearStrategy() public {
                require(locked==false,"Strategy is locked and cannot be changes");

                for (uint256 i = 0; i < tos.length; i++) {
                tos.push();
                datas.push();
                    
                }

                 }
        function getTos() public view returns(address[] memory){
            return tos;
        }
        
         function getDatas() public view returns(bytes[] memory){
            return datas;
        }
        
        function getTo(uint cubeNumber)public view returns(address){
            return tos[cubeNumber];
        }
        
        function getData(uint cubeNumber)public view returns(bytes memory){
            return datas[cubeNumber];
        }
        
        
        function getName()public view returns(string memory){
            return name;
        }
        
        
        function lockStrategy() public {
        require(locked==false,"Strategy is locked and cannot be changes");

            locked=true;
            
        }
        
        function getLocked() public view returns (bool){
            return locked;
        }
        
        function getLength() public view returns (uint) {
            return tos.length;
            
        }
        function getPool() public view returns (address) {
            return poolAddress;
            
        }
        
        function setPool(address newPool) public {
            poolAddress=newPool;
        }
        function runStrategy() public payable {
             WBNB.approve(byProxyaddress,WBNB.balanceOf(address(this)));
            byProxyInstance.batchSimple(tos,datas);
            WBNB.transferFrom(address(this),poolAddress,WBNB.balanceOf(address(this)));

            
        }
        
        function testStrategy() public payable {
             WBNB.approve(byProxyaddress,WBNB.balanceOf(address(this)));
            byProxyInstance.batchSimple(tos,datas);

            
        }
        
        function setProxy(address payable newProxy) public payable {
             byProxyInstance=byProxy(newProxy);
        }
                 
    
        }