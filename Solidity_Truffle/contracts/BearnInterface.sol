//SPDX-License-Identifier: MIT
pragma solidity ^0.6.9;

import "./Cube.sol";
import "../contracts/interfaces/Bearn.fi/BearnBar.sol";
contract BearnInterface is Cube {
  address internal constant BearnBar_Address = 0xaaaf5d9923Be358Ea0b6205Ef2A3B929D460Ac7A ;
  BearnBar public BearnBarInstance;
  address private BFI = 0x81859801b01764D4f0Fa5E64729f5a6C3b91435b;
   address private sBFI = 0xaaaf5d9923Be358Ea0b6205Ef2A3B929D460Ac7A;
  IBEP20 private sBFIttoken = IBEP20(sBFI);
  IBEP20 private BFItoken = IBEP20(BFI);

  constructor() public{
    BearnBarInstance = BearnBar(BearnBar_Address);
    admins[msg.sender]=true;

  }

function depositTobar(uint amount) public onlyAdmin{
    require(admins[msg.sender]==true,"only admin can do that");

    require(amount<=BFItoken.balanceOf(address(this)),"not enough BFI to deposit");
    BFItoken.approve(BearnBar_Address,amount);
    BearnBarInstance.enter(amount);

}
function updateBearnBar(address Bar) public onlyAdmin {
  BearnBarInstance = BearnBar(Bar);

  }
  

 

  
}
