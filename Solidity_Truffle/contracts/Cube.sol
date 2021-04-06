//SPDX-License-Identifier: MIT
pragma solidity ^0.6.9;
import "./IBEP20.sol";
abstract contract Cube {
  mapping (address => bool) public admins;

  constructor() public{
    admins[msg.sender]=true;

  }
modifier onlyAdmin {    
        require(admins[msg.sender]==true, "Only admin can do that");
        _;
    }

  function returnTOKEN(address token) public onlyAdmin{
    IBEP20 TOKENt = IBEP20(token);
    TOKENt.approve(address(this),TOKENt.balanceOf(address(this)));
   TOKENt.transfer(msg.sender,TOKENt.balanceOf(address(this)));

  }

  function returnBNB() public onlyAdmin{
   msg.sender.transfer(address(this).balance);

  }

 function getBNB() public view returns (uint){
      return address(this).balance;
      
  }
  function getTOKEN(address token) public view returns (uint){

    IBEP20 TOKENt = IBEP20(token);
    return TOKENt.balanceOf(address(this));

  }

   function transferNextcube(address token,address nextCube, uint amount) public onlyAdmin {
     IBEP20 tokent = IBEP20(token);
    tokent.approve(address(this),amount);
   tokent.transferFrom(address(this),nextCube,amount);

  }
  // important to receive ETH
  receive() payable external {}


function addAdmin(address admin) public onlyAdmin{
admins[admin]=true;

}

function checkadmin(address check) public view returns (bool) {
return admins[check];

}
  // important to receive ETH
}
