//SPDX-License-Identifier: MIT
pragma solidity ^0.6.9;

import "./Cube.sol";
import "../contracts/interfaces/SafeMathUpgradeable.sol";
import "../contracts/interfaces/BEP20/IBEP20.sol";
import "./Strategy.sol";
import "./byProxy.sol";
contract POOL is Cube{

    using SafeMathUpgradeable for uint256;
        address WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    IBEP20 private WBNBtoken = IBEP20(WBNB);
    IBEP20 token;
    uint256 public totalLiquidity;
    mapping (address => uint256) public liquidity;
    address private LP_Cakeaddress = 0xc5b0d73A7c0E4eaF66baBf7eE16A2096447f7aD6;
    Strategy strategyInstance=Strategy(0x661DAa5ad07207Ba0dBfCeBBfC8C67A2e390090F);
    bool invested;
    address payable strategy;
    address payable proxy;
    constructor () public payable{
        token=IBEP20(LP_Cakeaddress);
        admins[msg.sender]=true;
        invested=false;
    }

    function init(uint256 tokens, uint256 WBNBtokens) public payable returns (uint256) {
  require(totalLiquidity==0,"POOL:init - already has liquidity");
  require(token.transferFrom(msg.sender, address(this), tokens));
  require(WBNBtoken.transferFrom(msg.sender, address(this), WBNBtokens));
    totalLiquidity = WBNBtoken.balanceOf(address(this));
    liquidity[msg.sender] = totalLiquidity;

  return totalLiquidity;

}

    function initTest() public payable onlyAdmin returns (uint256) {
    totalLiquidity = WBNBtoken.balanceOf(address(this));
    liquidity[msg.sender] = totalLiquidity;

  return totalLiquidity;

}
function price(uint256 input_amount, uint256 input_reserve, uint256 output_reserve) public view returns (uint256) {
  uint256 input_amount_with_fee = input_amount.mul(997);
  uint256 numerator = input_amount_with_fee.mul(output_reserve);
  uint256 denominator = input_reserve.mul(1000).add(input_amount_with_fee);
  return numerator / denominator;
}
function WBNBToToken(uint256 WBNBtokens) public payable returns (uint256) {
require(invested==false,"POOL:tokens are invested at the moment");
require(WBNBtoken.transferFrom(msg.sender, address(this), WBNBtokens));
  uint256 token_reserve = token.balanceOf(address(this));
  uint256 tokens_bought = price(WBNBtokens, WBNBtoken.balanceOf(address(this)).sub(WBNBtokens), token_reserve);
  require(token.transfer(msg.sender, tokens_bought));
  return tokens_bought;
}
function tokenToWBNB(uint256 tokens) public returns (uint256) {
require(invested==false,"POOL:WBNB is invested at the moment");
  uint256 token_reserve = token.balanceOf(address(this));
  uint256 WBNB_bought = price(tokens, token_reserve, WBNBtoken.balanceOf(address(this)));
  WBNBtoken.transferFrom(address(this),msg.sender, WBNB_bought);
  require(token.transferFrom(msg.sender, address(this), tokens));
  return WBNB_bought;

}
function WBNBToTokenTest(uint256 WBNBtokens) public onlyAdmin payable returns (uint256) {
    require(invested==false,"POOL:tokens are invested at the moment");
  uint256 token_reserve = token.balanceOf(address(this));
  uint256 tokens_bought = price(WBNBtokens, WBNBtoken.balanceOf(address(this)).sub(WBNBtokens), token_reserve);
  require(token.transfer(msg.sender, tokens_bought));
  return tokens_bought;
}
function tokenToWBNBTest(uint256 tokens) public onlyAdmin returns (uint256) {
require(invested==false,"POOL:WBNB is invested at the moment");
  uint256 token_reserve = token.balanceOf(address(this));
  uint256 WBNB_bought = price(tokens, token_reserve, WBNBtoken.balanceOf(address(this)));
  WBNBtoken.transferFrom(address(this),msg.sender, WBNB_bought);
  return WBNB_bought;

}
function getWBNB() public view returns (uint256) {
  return WBNBtoken.balanceOf(address(this));

}
function getToken() public view returns (uint256) {
    return token.balanceOf(address(this));

}

function getliquiduty(address user) public view returns (uint256) {
    return liquidity[user];

}
function setInvested(bool investmentStatus) public returns (bool){
    require((admins[msg.sender]==true)||(msg.sender==strategy),"POOL: only an appropriate sender can do this");
    invested = investmentStatus;
    return invested;
}

function setStrategy(address payable newStrategy) public returns (address){
    strategyInstance=Strategy(newStrategy);
    return newStrategy;
}
function setProxy(address payable newProxy) public returns (address){
    proxy=newProxy;
    return proxy;
}

function getProxyy() public view returns (address){
     return proxy;
}
function getStrategy() public view returns (address){
     return strategy;
}

function gettInvested() public view returns (bool){
    return invested;
}

function depositLiquidity(uint WBNBtokens) public payable returns (uint256) {
  uint256 WBNB_reserve = WBNBtoken.balanceOf(address(this)).sub(WBNBtokens);
  uint256 token_reserve = token.balanceOf(address(this));
  uint256 token_amount = (WBNBtokens.mul(token_reserve) / WBNB_reserve).add(1);
  uint256 liquidity_minted = WBNBtokens.mul(totalLiquidity) / WBNB_reserve;
  liquidity[msg.sender] = liquidity[msg.sender].add(liquidity_minted);
  totalLiquidity = totalLiquidity.add(liquidity_minted);
  require(token.transferFrom(msg.sender, address(this), token_amount));
    require(WBNBtoken.transferFrom(msg.sender, address(this), WBNBtokens));
  return liquidity_minted;
  
}
function withdrawLiquidity(uint256 amount) public returns (uint256, uint256) {
require(liquidity[msg.sender]>=amount,"POOL:The user did not provide that amount of liquidity");
liquidity[msg.sender] = liquidity[msg.sender].sub(amount);
  uint256 token_reserve = token.balanceOf(address(this));
  uint256 WBNB_amount = amount.mul(WBNBtoken.balanceOf(address(this)) / totalLiquidity);
  uint256 token_amount = amount.mul(token_reserve) / totalLiquidity;
  totalLiquidity = totalLiquidity.sub(WBNB_amount);
require(WBNBtoken.transferFrom( address(this),msg.sender, WBNB_amount));
  require(token.transfer(msg.sender, token_amount));
  return (WBNB_amount, token_amount);
}

function Invest(address lastToken) public{
//require(totalLiquidity!=0,"POOL:no liquidity in pool");
//require(msg.sender==strategy||admins[msg.sender]==true,"POOL: only strategy or admin can invest");
WBNBtoken.approve(proxy,WBNBtoken.balanceOf(address(this)));
WBNBtoken.approve(address(strategyInstance),WBNBtoken.balanceOf(address(this)));
strategyInstance.runStrategyLast(lastToken);
}

function InvestTransfer() public{
//require(totalLiquidity!=0,"POOL:no liquidity in pool");
//require(msg.sender==strategy||admins[msg.sender]==true,"POOL: only strategy or admin can invest");
WBNBtoken.transferFrom(address(this),address(strategyInstance),WBNBtoken.balanceOf(address(this)));
WBNBtoken.approve(proxy,WBNBtoken.balanceOf(address(this)));
WBNBtoken.approve(address(strategyInstance),WBNBtoken.balanceOf(address(this)));
strategyInstance.runStrategy();
}


}