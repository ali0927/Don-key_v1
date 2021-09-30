/**eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Logo } from "./Logo";
import { INavBarProps } from "./interfaces/INavBarProps";
import { AuthToken } from "don-utils";
import styled, { css } from "styled-components";
import { theme } from "theme";
import { useWeb3Context } from "don-components";
import Web3 from "web3";
import { IUser } from "interfaces";
import { useReferralContext } from "contexts/ReferralContext";
import { api } from "strapi";
import { captureException } from "helpers";
import { useToggle } from "don-hooks";
import {
  BridgeIcon,
  DonBinance,
  DonEthereum,
  FAQIcon,
  FarmerIcon,
  HamburgerIcon,
  LitePaperIcon,
  MainIcon,
  ReferralsIcon,
  TeamIcon,
  TwitterIconOutlined,
} from "icons";
import { TelegramIconOutlined } from "icons/TelegramIconOutlined";
import { Wallet } from "components/Wallet/Wallet";
import { DonGatsbyLink } from "components/DonGatsbyLink";
import { NavButton } from "components/NavButton";
import { IMenuItemProps, MenuItem } from "./MenuItem";
import { DrawerItem, DrawerItemIcon } from "./DrawerItem";
import { CloseIcon } from "icons/CloseIcon";
import { InvestmentsIcon } from "icons/InvestmentsIcon";
import { StakeIcon } from "icons/StakeIcon";
import { BridgePopup } from "components/Bridgepopup/Bridgepopup";
import { ClickAwayListener } from "@material-ui/core";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const getNonce = async (publicAddress: string) => {
  const res = await api.post("/api/v2/login/nonce", {
    walletAddress: publicAddress,
  });
  const {
    data: { data },
  } = res;
  return data.nonce;
};

export const getAuthToken = async (
  publicAddress: string,
  signature: string
) => {
  const resps = await api.post("/api/v2/login", {
    signature,
    walletAddress: publicAddress,
  });
  const { token } = resps.data.data;
  const user = resps.data.user;
  return {
    token,
    user: user as IUser,
  };
};

export const getAuthTokenForPublicAddress = async (web3: Web3) => {
  const [publicAddress] = await web3.eth.getAccounts();
  const nonce = await getNonce(publicAddress);
  //@ts-ignore
  const signature = await web3.eth.personal.sign(nonce, publicAddress);

  return await getAuthToken(publicAddress, signature);
};

export const signUser = async (web3: Web3) => {
  try {
    const token = await getAuthTokenForPublicAddress(web3);
    localStorage.setItem(AuthToken, token.token);
  } catch (e) {
    captureException(e, "Sign User Error");
  }
};

const MenuWrapper = styled.header`
  background-color: ${theme.palette.background.yellow};
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
`;

const Menu = styled.div`
  display: none;
  ${theme.mediaQueries.lg.up} {
    display: flex;
  }
`;

const PancakeBuyURL =
  "https://pancakeswap.finance/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=0x86B3F23B6e90F5bbfac59b5b2661134Ef8Ffd255";
const UniSwapURL =
  "https://app.uniswap.org/#/swap?inputCurrency=0x217ddead61a42369a266f1fb754eb5d3ebadc88a&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7&use=V2";

const ConnectWalletButton = () => {
  const { connectDapp, connected } = useWeb3Context();

  const [isDisabled, setIsDisabled] = useState(false);

  const handleConnection = async () => {
    setIsDisabled(true);
    await connectDapp();
  };
  if (connected) {
    return <Wallet />;
  }
  return (
    <NavButton disabled={isDisabled} onClick={handleConnection}>
      Connect Wallet
    </NavButton>
  );
};

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${theme.mediaQueries.lg.up} {
    display: none;
  }
`;

const Drawer = styled.div`
  position: fixed;
  z-index: 1000;
  width: calc(100vw - 100px);
  background-color: #fff;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  ${(props: { isOpen?: boolean }) => {
    return (
      props.isOpen &&
      css`
        transform: none;
      `
    );
  }}
`;

const DrawerMenu = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DrawerFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: flex-end;
`;

const DrawerMiddle = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
`;

const SmallItem = styled(DonGatsbyLink)`
  flex: 1;
  flex-basis: 50%;
  padding: 1rem 0;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  color: #222;
  &:hover {
    text-decoration: none;
  }
`;

const DrawerSmallItem = ({
  children,
  icon,
  ...rest
}: IMenuItemProps & { icon?: React.ReactElement }) => {
  return (
    <SmallItem {...rest}>
      <DrawerItemIcon>{icon}</DrawerItemIcon>
      <span>{children}</span>
    </SmallItem>
  );
};

const BuyButton = styled(DonGatsbyLink)`
  border-radius: 10px;
  text-decoration: none;
  color: #222;
  padding: 6px 20px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  background-color: ${theme.palette.common.lightYellow};
  margin-bottom: 15px;
  &:hover {
    text-decoration: none;
    color: #222;
  }
  & svg {
    transform: scale(0.7);
  }
`;

const LandingDrawer = () => {
  return (
    <>
      <DrawerItem
        icon={<LitePaperIcon />}
        href="/litepaper.pdf"
        target="_blank"
      >
        Litepaper
      </DrawerItem>
      <DrawerItem icon={<FarmerIcon />} to="/farmers">
        Farmers
      </DrawerItem>
      <DrawerItem icon={<TeamIcon />} to="/team">
        Team
      </DrawerItem>
      <DrawerItem icon={<FAQIcon />} to="/faq">
        FAQ
      </DrawerItem>
    </>
  );
};

const LandingMenu = () => {
  return (
    <>
      <MenuItem href="/litepaper.pdf" target="_blank">
        Litepaper
      </MenuItem>
      <MenuItem to="/farmers">Farmers</MenuItem>
      <MenuItem to="/team">Team</MenuItem>
      <MenuItem href={PancakeBuyURL}>$DON BEP20</MenuItem>
      <MenuItem href={UniSwapURL}>$DON ERC20</MenuItem>
      <MenuItem href="/faq">FAQ</MenuItem>
    </>
  );
};

const DashboardMenu = () => {
  const [isOpen, openBridge, closeBridge] = useToggle(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    openBridge();
  };

  const { hasSignedUp: isShown } = useReferralContext();
  const { connected } = useWeb3Context();
  return (
    <>
      <MenuItem to="/dashboard">Main</MenuItem>
      {connected && <MenuItem to="/dashboard/investment">Investments</MenuItem>}
      {isShown && <MenuItem to="/dashboard/referrals">Referrals</MenuItem>}
      <MenuItem onClick={handleOpen}>Bridge</MenuItem>
      <MenuItem to="/faq">FAQ</MenuItem>
      {isOpen && <BridgePopup onClose={closeBridge} />}
    </>
  );
};

const DashboardDrawer = () => {
  const [isOpen, openBridge, closeBridge] = useToggle(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    openBridge();
  };

  const { hasSignedUp: isShown } = useReferralContext();
  const { connected } = useWeb3Context();
  return (
    <>
      <DrawerItem icon={<MainIcon />} to="/">
        Main
      </DrawerItem>
      {connected && (
        <DrawerItem icon={<InvestmentsIcon />} to="/dashboard/investment">
          Investments
        </DrawerItem>
      )}
      {isShown && (
        <DrawerItem icon={<ReferralsIcon />} to="/dashboard/referrals">
          Referrals
        </DrawerItem>
      )}
      <DrawerItem icon={<BridgeIcon />} onClick={handleOpen}>
        Bridge
      </DrawerItem>
      {isOpen && <BridgePopup onClose={closeBridge} />}
      <DrawerItem icon={<StakeIcon />} to="/stake">
        Stake LP
      </DrawerItem>
      <DrawerItem icon={<FAQIcon />} to="/faq">
        FAQ
      </DrawerItem>
    </>
  );
};

function NavBar({ variant = "landing" }: INavBarProps) {
  const [isOpen, openDrawer, closeDrawer] = useToggle();

  const closeIfOpen = () => {
    if(isOpen){
      closeDrawer()
    }
  }
  return (
    <MenuWrapper>
      <StyledNav>
        <Logo className="d-none d-lg-flex align-items-center inherit-color no-underline" />
        <IconWrapper onClick={(e) => {
          e.stopPropagation();
          openDrawer();
        }}>
          <HamburgerIcon />
        </IconWrapper>
        <ClickAwayListener onClickAway={closeIfOpen}>
          <Drawer isOpen={isOpen}>
            <div className="d-flex justify-content-between px-4 py-4">
              <Logo />
              <div style={{ cursor: "pointer" }} onClick={closeDrawer}>
                <CloseIcon />
              </div>
            </div>
            <DrawerMenu>
              {variant === "landing" && <LandingDrawer />}
              {variant === "loggedin" && <DashboardDrawer />}
            </DrawerMenu>
            <DrawerMiddle>
              <DrawerSmallItem icon={<TwitterIconOutlined />}>
                Twitter
              </DrawerSmallItem>
              <DrawerSmallItem icon={<TelegramIconOutlined />}>
                Telegram
              </DrawerSmallItem>
            </DrawerMiddle>
            <DrawerFooter>
              <div className="p-2 d-flex flex-column">
                <BuyButton>
                  <DonBinance href={PancakeBuyURL} /> Buy $DON BEP20
                </BuyButton>
                <BuyButton>
                  <DonEthereum href={UniSwapURL} /> Buy $DON ERC20
                </BuyButton>
              </div>
              {/* <DonPriceWrapper>

          </DonPriceWrapper> */}
            </DrawerFooter>
          </Drawer>
        </ClickAwayListener>
        <Menu>
          {variant === "landing" && <LandingMenu />}
          {variant === "loggedin" && <DashboardMenu />}
        </Menu>
        {variant === "landing" && <NavButton to="/dashboard">DAPP</NavButton>}
        {variant === "loggedin" && <ConnectWalletButton />}
      </StyledNav>
    </MenuWrapper>
  );
}

export { NavBar };
