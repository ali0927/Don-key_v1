import React, { useEffect, useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import { ClickAwayListener } from "@material-ui/core";
import clsx from "clsx";
import { AiFillCaretDown } from "react-icons/ai";
import { SuggestList } from "./SuggestList";
import { SuggestRequestForm } from "./SuggestRequestForm";
import { theme } from "theme";
import { StaticImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";
import { DonCommonmodal } from "components/DonModal";
import { useSuggestionApi, useSignin } from "hooks";
import { gql, useQuery } from "@apollo/client";

export const useRiskAndNetworkList = () => {
  const riskAndNetworks = useStaticQuery(
    graphql`
      query StrapiRisksAndNetworks {
        allStrapiRisks {
          nodes {
            Title
            image {
              url
            }
            strapiId
          }
        }
        allStrapiNetworks {
          nodes {
            chainId
            name
            strapiId
          }
        }
      }
    `
  );
  return {
    risks: riskAndNetworks.allStrapiRisks.nodes,
    networks: riskAndNetworks.allStrapiNetworks.nodes,
  };
};

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
      src="../../images/don-tier.svg"
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
const MoreButton = styled.button`
  padding: 16px;
  font-weight: 500;
  font-size: 1rem;
  border: 1px solid black;
  color: #000;
  border-radius: 10px;
  background: transparent;
  display: block;
  width: 100%;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const SuggestStatus = {
  all: "all",
  new: "new",
  old: "old",
  approved: "approved"  
};

const ConfirmButton = styled.button`
  padding: 10px;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
  border-radius: 10px;
  background: linear-gradient(146.14deg, #353a4b 0%, #0b0e12 100%);
  border: 0;
  display: block;
  width: 100%;
  margin-top: 20px;
`;

export const ErrorModal: React.FC<{
  error: {
    status: boolean;
    type: string;
    msg: string;
  };
  closeModal: any;
}> = (props) => {
  const [openModal, setOpenModal] = useState(true);
  const { signin } = useSignin();
  const handleSignin = async () => {
    const _res = await signin();
    setOpenModal(false);
    props.closeModal();
  };

  useEffect(() => {
    setOpenModal(true);
  }, [props]);

  return (
    <DonCommonmodal
      isOpen={openModal}
      onClose={props.closeModal}
      title="Error"
      variant="common"
      size="sm"
    >
      <p>{props.error.msg}</p>
      {props.error.type === "token" && (
        <ConfirmButton onClick={() => handleSignin()}>Sign in</ConfirmButton>
      )}
    </DonCommonmodal>
  );
};

const ALL_SUGGESTION_QUERY = gql`
  query allSuggestionsQuery {
    suggestions {
      apy
      description
      id
      status
      title
      created_at
      network {
        name
      }
      risk {
        Title
        image {
          url
        }
        id
      }
      nickName
      customer {
        address
      }
      comments {
        content
        customer {
          address
        }
        likes {
          address
        }
        replies {
          content
          customer {
            address
          }
        }
      }
      votes {
        address
      }
    }
  }
`;

export const Suggest = () => {
  const { fetchList } = useSuggestionApi();
  const [show, setShow] = useState(false);
  const [strategyFilter, setSuggestFilter] = useState(SuggestStatus.all);
  const [viewMore, setViewMore] = useState(false);
  const { data: suggestionsData } = useQuery(ALL_SUGGESTION_QUERY);

  const handleNameChange = (value: string) => {
    setSuggestFilter(value);
    setShow(false);
  };

  const filterList = useMemo(() => {
    if (suggestionsData) {
      let _list = suggestionsData.suggestions;
      if (strategyFilter != SuggestStatus.all) {
        _list = suggestionsData.suggestions.filter(
          (item: any) => item.status === strategyFilter
        );
      }
      _list = viewMore ? _list : _list.slice(0, 3);
      return _list;
    }
    return [];
  }, [suggestionsData, viewMore, strategyFilter]);

  const DropDownMenu = () => {
    return (
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <Overlay
          onClick={() => {
            setShow(false);
          }}
        >
          <DropDown>
            <div id="collapseExample" className="collapse">
              <DropDownItem
                className={clsx(
                  "d-flex justify-content-between align-items-center",
                  { selected: strategyFilter === SuggestStatus.all }
                )}
                onClick={() => handleNameChange(SuggestStatus.all)}
              >
                <div>All</div>
              </DropDownItem>
              <DropDownItem
                className={clsx(
                  "d-flex justify-content-between align-items-center",
                  { selected: strategyFilter === SuggestStatus.new }
                )}
                onClick={() => handleNameChange(SuggestStatus.new)}
              >
                <div>New</div>
              </DropDownItem>
              <DropDownItem
                className={clsx(
                  "d-flex justify-content-between align-items-center",
                  { selected: strategyFilter === SuggestStatus.old }
                )}
                onClick={() => handleNameChange(SuggestStatus.old)}
              >
                <div>Old</div>
              </DropDownItem>
              <DropDownItem
                className={clsx(
                  "d-flex justify-content-between align-items-center",
                  { selected: strategyFilter === SuggestStatus.approved }
                )}
                onClick={() => handleNameChange(SuggestStatus.approved)}
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
          <DropdownBtn
            active={show}
            onClick={() => setShow(true)}
            aria-controls="collapseExample"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
          >
            {strategyFilter}
            <AiFillCaretDown className="icon" />
          </DropdownBtn>
          {show && <DropDownMenu />}
        </div>
      </div>

      {filterList.length > 0 && (
        <>
          <div className="row py-4">
            <SuggestList suggestList={filterList} />
          </div>
        </>
      )}
      {filterList.length > 0 &&
        suggestionsData.suggestions.length > filterList.length && (
          <div className="row justify-content-center mb-4">
            <div className="col-sm-12 col-md-4">
              <MoreButton onClick={() => setViewMore(true)}>
                View More
              </MoreButton>
            </div>
          </div>
        )}

      <div className="row mb-5 pt-5">
        <div className="col-lg-6 d-flex flex-column mt-5 pt-md-5">
          <h2>Add your Strategy</h2>
          <SubHeading>
            So you think you are a novel farmer? suggest your newest and best
            strategy, and put it up to vote with the Don-key community. We will
            be watching and deploying based on voting and comments. Before
            deploying the pool Don-key will contact you VIA telegram to help
            set-up your Don-key profile and finalize details.
          </SubHeading>
          <DonkeyScope />
        </div>
        <div className="col-lg-6">
          <SuggestRequestForm />
        </div>
      </div>
    </div>
  );
};
