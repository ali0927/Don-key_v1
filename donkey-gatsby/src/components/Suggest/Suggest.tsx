import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ClickAwayListener } from "@material-ui/core";
import clsx from "clsx";
import { AiOutlineInfoCircle, AiFillCaretDown } from "react-icons/ai";
import { SuggestList } from "./SuggestList";
import { SuggestRequestForm } from "./SuggestRequestForm";
import { theme } from "theme";
import { StaticImage } from "gatsby-plugin-image";

const DropdownBtn = styled.div`
  border: 2px solid #222222;
  padding: 10px 15px;
  border-radius: 10px;
  min-width: 140px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #000;
  text-transform: capitalize;
  ${(props: { active?: boolean }) =>
    props.active &&
    `
      background: #000;
      color:#fff;
    `}
  .icon {
    font-size: 20px;
    margin-left: 10px;
  }
`;

const DropDown = styled.ul`
  position: absolute;
  top: 60px;
  left: 15px;
  background: #000000;
  padding: 24px 0px;
  list-style: none;
  display: flex;
  flex-direction: column;
  z-index: 50;
  color: white;
  border-radius: 24px;
  h4 {
    padding-bottom: 15px;
    border-bottom: 1px solid #e5e5e5;
  }
  .selected {
    background: #201f1f;
  }
  @media (max-width: 568px) {
    position: fixed;
    z-index: 1;
    top: auto;
    left: 0;
    right: 0;
    bottom: -16px;
    min-height: 34vh;
    border-radius: 24px 24px 0 0;
    overflow-x: hidden;
    transition: 0.5s;
  }
`;
const Overlay = styled.div`
  @media (max-width: 568px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 40;
  }
`;
const DropDownItem = styled.li`
  padding: 10px 32px;
  padding-right: 54px;
  cursor: pointer;
  display: flex;
  text-transform: capitalize;
  .tick-icon {
    display: none;
  }
  &:hover {
    background: #201f1f;
  }

  @media (max-width: 568px) {
    &:hover {
      .tick-icon {
        display: block;
      }
    }
  }
`;

const Comp = (props: { className?: string }) => {
  return (
    <StaticImage
      className={props.className}
      src="../../images/carrier-donkey.png"
      alt="Bug Reporter Donkey"
      layout="fullWidth"
    />
  );
};

const SubHeading = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: #222222;
  ${theme.mediaQueries.lg.up} {
    font-size: 16px;
    margin-right: 40px;
  }
`;

const DonkeyScope = styled(Comp)`
  width: 200px;
  margin: 20px auto;
  ${theme.mediaQueries.sm.up} {
    width: 320px;
    margin: 40px 0;
  }
`;

const SuggestStatus = { 
  all: 'all', 
  new: 'new', 
  old: 'old', 
  approved: 'approved'
}

export const dummyFiltered = [
  {
    idx: 0,
    title: 'Keyboard shortcut to add a new post',
    apy: 12.123,
    votes: 550,
    name: 'Albert',
    address: '123qwe123qwewrwer',
    description: 'Have you considered adding the markdown support when adding a new post? Have you considered adding the markdown support when adding a new post? Have you considered adding the markdown support when adding a new post? Have you considered adding the markdown support when adding a new post? Have you considered adding the markdown support when adding a new post? ',
    risk: 2,
    comments: 4,
    status: 'new',
    date: '15 Jan 2022 15:30',
    category: 'Payments'
  },
  {
    idx: 1,
    title: 'Shortcut keyboard to add a new post',
    apy: 23.123,
    votes: 250,
    name: 'Daniel',
    address: 'wewrwer123qwe123qwewrwer',
    description: 'Have you considered adding the markdown support when adding a new post? Have you considered adding the markdown support when adding a new post?',
    risk: 1,
    comments: 4,
    status: 'approved',
    date: '15 Jan 2022 15:30',
    category: 'Payments'
  }
]

export const Suggest: React.FC = () => {
  const [show, setShow] = useState(false);
  const [strategyFilter, setSuggestFilter] = useState(SuggestStatus.all)

  const handleNameChange = (value: string) => {
    setSuggestFilter(value);
    setShow(false);
  };

  const filterList = useMemo(() => {
    if(strategyFilter === SuggestStatus.all) return dummyFiltered
    return dummyFiltered.filter(item => item.status === strategyFilter)
  }, [dummyFiltered, strategyFilter])

  const DropDownMenu = () => {
    return (
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <Overlay
          onClick={() => {
            setShow(false);
          }}
        >
          <DropDown>
            <div id="collapseExample" className="collapse" >
              <DropDownItem
                className={clsx(
                  "d-flex justify-content-between align-items-center",
                  { selected: strategyFilter === SuggestStatus.all }
                )}
                onClick={() => handleNameChange(SuggestStatus.all) }
              >
                <div>All</div>
              </DropDownItem>
              <DropDownItem
                className={clsx(
                  "d-flex justify-content-between align-items-center",
                  { selected: strategyFilter === SuggestStatus.new }
                )}
                onClick={() => handleNameChange(SuggestStatus.new) }
              >
                <div>New</div>
              </DropDownItem>
              <DropDownItem
                className={clsx(
                  "d-flex justify-content-between align-items-center",
                  { selected: strategyFilter === SuggestStatus.old }
                )}
                onClick={() => handleNameChange(SuggestStatus.old) }
              >
                <div>Old</div>
              </DropDownItem>
              <DropDownItem
                className={clsx(
                  "d-flex justify-content-between align-items-center",
                  { selected: strategyFilter === SuggestStatus.approved }
                )}
                onClick={() => handleNameChange(SuggestStatus.approved) }
              >
                <div>Approved</div>
              </DropDownItem>
            </div>
          </DropDown>
        </Overlay>
      </ClickAwayListener>
    );
  };


  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-start mt-2 mt-lg-0 positioin-static position-sm-relative">
          <DropdownBtn active={show} onClick={() => setShow(!show)} aria-controls="collapseExample" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false">
            {strategyFilter}
            <AiFillCaretDown className="icon" />
          </DropdownBtn>
          {show && <DropDownMenu />}
        </div>
      </div>

      {filterList.length > 0 &&
        <>
          <div className="row py-4 mb-2">
            <SuggestList suggestList={filterList} />
          </div>
        </>
      }

      <div className="row mb-5 pt-5">
        <div className="col-lg-6 d-flex flex-column mt-5 pt-md-5">
          <h2>Add your suggestion</h2>
          <SubHeading>
            Molestie morbi nec, amet sem sed. Potenti mauris at donec
            curabitur. Aenean lorem vel gravida donec nunc, tortor arcu
            mattis. Dictumst maecenas augue arcu dignissim. Tortor lorem.
          </SubHeading>
          <DonkeyScope />
        </div>
        <div className="col-lg-6">
          <SuggestRequestForm />
        </div>
      </div>

    </div>
  )
}