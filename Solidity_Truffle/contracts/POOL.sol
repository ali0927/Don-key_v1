//SPDX-License-Identifier: MIT
pragma solidity ^0.6.9;

import "./Controller.sol";
import "./SafeMathUpgradeable.sol";
import "./IBEP20.sol";
import "./Strategy.sol";


contract POOL is Controller{

    using SafeMathUpgradeable for uint256;
    address BUSD = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
    IBEP20 private BUSDtoken = IBEP20(BUSD);
    mapping (address => uint256) public liquidity;
    uint256 added;
    Strategy strategyInstance;
    bool invested;
    address payable strategy;
    string farmerName;
    mapping (address => bool) public investors;
    address farmer;
    constructor (string memory _farmerName) public payable{
        admins[msg.sender]=true;
        invested=false;
        farmerName=_farmerName;
        farmer=msg.sender;
    }

function getFarmername() public view returns (string memory){
    return farmerName;
}
function getFarmeraddress() public view returns (address){
    return farmer;
}

function getInvestor(address investor) public view returns (bool){
    return investors[investor];
}

function setInvested(bool investmentStatus) public returns (bool){
    require((admins[msg.sender]==true)||(msg.sender==strategy),"POOL: only an appropriate sender can do this");
    invested = investmentStatus;
    return invested;
}

function gettInvested() public view returns (bool){
    return invested;
}


function setStrategy(address payable newStrategy) public returns (address){
    strategyInstance=Strategy(newStrategy);
    return newStrategy;
}

function getStrategy() public view returns (address){
     return strategy;
}



function depositLiquidity(uint BUSDtokens) public payable returns (uint256) {
investors[msg.sender]=true;
  added = added.add(BUSDtokens);
  liquidity[msg.sender] = liquidity[msg.sender].add(BUSDtokens);
  require(BUSDtoken.transferFrom(msg.sender, address(this), BUSDtokens));
  return liquidity[msg.sender];
}

function withdrawLiquidity() public {
require(invested==false,"pool is invested at the moment");
 investors[msg.sender]=false;
uint256 BUSDshare = BUSDtoken.balanceOf(address(this)).mul(getRatio(msg.sender));
added=added.sub(liquidity[msg.sender]);
liquidity[msg.sender] = 0;
require(BUSDtoken.transferFrom( address(this),msg.sender, BUSDshare));
}

function getRatio(address user) public view returns (uint){
  uint256 ratio = liquidity[user].div(added);
  return ratio;
}

function Invest() public onlyAdmin{
//require(totalLiquidity!=0,"POOL:no liquidity in pool");
//require(msg.sender==strategy||admins[msg.sender]==true,"POOL: only strategy or admin can invest");
BUSDtoken.transferFrom(address(this),address(strategyInstance),BUSDtoken.balanceOf(address(this)));
BUSDtoken.approve(address(strategyInstance),BUSDtoken.balanceOf(address(this)));
strategyInstance.runStrategy();
}

}
