// SPDX-License-Identifier: MIT

pragma solidity ^0.6.9;
import "./donProxy.sol";
import "./Controller.sol";
pragma experimental ABIEncoderV2;

contract Strategy is Controller{
    address[] tos;
    bytes[] datas;
    string name;
    address payable donProxyaddress = 0x139f3766B572f907A400806944c84F66155e5673;
    donProxy donProxyInstance;
    address WBNBaddress=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    address poolAddress;
    IBEP20 WBNB = IBEP20(WBNBaddress);
    bool locked;
        constructor(string memory _name) public {
      name=_name;
      donProxyInstance=donProxy(donProxyaddress);
      locked = false;
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
            donProxyInstance.batchSimple(tos,datas);

        }
        
          function approveToken(address tokenAddress) public payable {
            IBEP20 token = IBEP20(tokenAddress);
            token.approve(donProxyaddress,token.balanceOf(address(this)));

        }

        function transferPool(address payable tokenAddress) public {
            IBEP20 token = IBEP20(tokenAddress);
            token.transferFrom(address(this),poolAddress,token.balanceOf(address(this)));

        }
        function getToken(address payable tokenAddress) public view returns(uint256){
            IBEP20 token = IBEP20(tokenAddress);
            return token.balanceOf(address(this));

        }
        function setProxy(address payable newProxy) public payable {
             donProxyInstance=donProxy(newProxy);
        }
                 
    
        }