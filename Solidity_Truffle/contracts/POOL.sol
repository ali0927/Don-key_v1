//SPDX-License-Identifier: MIT
pragma solidity ^0.6.9;

import "./Controller.sol";
import "./SafeMathUpgradeable.sol";
import "./IBEP20.sol";
import "./Strategy.sol";


contract POOL is Controller{

    using SafeMathUpgradeable for uint256;
    address WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    IBEP20 private WBNBtoken = IBEP20(WBNB);
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
function setInvestor(address investor) public {
    investors[investor]=true;
}

function removeInvestor(address investor) public {
    require(investors[investor]==true,"the user is not invested in the pool");
    investors[investor]=false;
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



function depositLiquidity(uint WBNBtokens) public payable returns (uint256) {
  added = added.add(WBNBtokens);
  liquidity[msg.sender] = liquidity[msg.sender].add(WBNBtokens);
  require(WBNBtoken.transferFrom(msg.sender, address(this), WBNBtokens));
  return liquidity[msg.sender];
}

function withdrawLiquidity() public {
require(invested==false,"pool is invested at the moment");
uint256 WBNBshare = WBNBtoken.balanceOf(address(this)).mul(getRatio(msg.sender));
added=added.sub(liquidity[msg.sender]);
liquidity[msg.sender] = 0;
require(WBNBtoken.transferFrom( address(this),msg.sender, WBNBshare));
}

function getRatio(address user) public view returns (uint){
  uint256 ratio = liquidity[user].div(added);
  return ratio;
}

function Invest() public{
//require(totalLiquidity!=0,"POOL:no liquidity in pool");
//require(msg.sender==strategy||admins[msg.sender]==true,"POOL: only strategy or admin can invest");
WBNBtoken.transferFrom(address(this),address(strategyInstance),WBNBtoken.balanceOf(address(this)));
WBNBtoken.approve(address(strategyInstance),WBNBtoken.balanceOf(address(this)));
strategyInstance.runStrategy();
}

}
