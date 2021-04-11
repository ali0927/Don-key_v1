//SPDX-License-Identifier: MIT
pragma solidity ^0.6.9;
import "./IBEP20.sol";
abstract contract Controller {
  mapping (address => bool) public admins;

  constructor() public{
    admins[msg.sender]=true;

  }
modifier onlyAdmin {    
        require(admins[msg.sender]==true, "Only admin can do that");
        _;
    }


  function getTOKEN(address token) public view returns (uint){

    IBEP20 TOKENt = IBEP20(token);
    return TOKENt.balanceOf(address(this));

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
