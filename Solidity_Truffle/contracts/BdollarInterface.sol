//SPDX-License-Identifier: MIT
pragma solidity ^0.6.9;

import "./Cube.sol";
import "../contracts/interfaces/Bdollar.fi/ShareRewardPool.sol";
contract BdollarInterface is Cube{
  address internal constant ShareRewardPool_Address = 0x948dB1713D4392EC04C86189070557C5A8566766 ;
  ShareRewardPool public ShareRewardPoolInstance;
  address private LP_Cake = 0xc5b0d73A7c0E4eaF66baBf7eE16A2096447f7aD6;
  address private sBDO =0x0d9319565be7f53CeFE84Ad201Be3f40feAE2740;
  IBEP20 private LP_Caketoken = IBEP20(LP_Cake);
IBEP20 private sBDOtoken = IBEP20(sBDO);
  constructor() public payable{
    ShareRewardPoolInstance = ShareRewardPool(ShareRewardPool_Address);
    admins[msg.sender]=true;
  }

function depositToPoolPROXY(uint amount,address payable proxy) public {
    
    require(amount<=LP_Caketoken.balanceOf(address(this)),"not enough LP_Cake to deposit");
    LP_Caketoken.approve(ShareRewardPool_Address,amount);
    ShareRewardPoolInstance.deposit(0, amount);
    sBDOtoken.approve(address(this),sBDOtoken.balanceOf(address(this)));
    sBDOtoken.transferFrom(address(this),proxy,sBDOtoken.balanceOf(address(this)));
    

}

function depositToPool(uint amount) public {
    
    require(amount<=LP_Caketoken.balanceOf(address(this)),"not enough LP_Cake to deposit");
    LP_Caketoken.approve(ShareRewardPool_Address,amount);
    ShareRewardPoolInstance.deposit(0, amount);

    

}
function withdrawToPoolPROXY(address payable proxy) public {
    uint getAmount=ShareRewardPoolInstance.pendingShare(0,address(this));
    ShareRewardPoolInstance.withdraw(0, getAmount);
    sBDOtoken.approve(address(this),sBDOtoken.balanceOf(address(this)));
    sBDOtoken.transferFrom(address(this),proxy,sBDOtoken.balanceOf(address(this)));
    LP_Caketoken.approve(address(this),LP_Caketoken.balanceOf(address(this)));
    LP_Caketoken.transferFrom(address(this),proxy,LP_Caketoken.balanceOf(address(this)));


}

  

   function updateShareRewardPool(address ShareRewardPooladdress) public onlyAdmin {
  ShareRewardPoolInstance = ShareRewardPool(ShareRewardPooladdress);

  }
}
