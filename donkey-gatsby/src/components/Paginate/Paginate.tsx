import { PaginateLeftArrow, PaginateRightArrow } from "icons";
import React, { useState } from "react";
import { IPaginateProps } from "./interfaces";
import styled from "styled-components";
import { usePagination } from "@material-ui/lab";
import clsx from "clsx";
import { breakPoints } from "breakponts";

const UL = styled.ul`
  .listSelected {
    background: #fff037;
    color: #000000;
  }
  .paginate-list {
    margin-right: 6px;
  }
  li {
    :nth-last-child(2) {
      margin-right: 0px;
    }
  }
`;

const LI = styled.li`
  font-family: "Poppins";
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  border-radius: 6px;
  background: transparent;
  color: #666666;
  padding: 1px 8px 1px 8px;
  cursor: pointer;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 20px;
    padding: 1px 13px 1px 13px;
  }
`;

const PaginationEllipics = () => {
  return <LI className="paginate-list">...</LI>;
};

export const Paginate: React.FC<IPaginateProps> = (props) => {
  const { totalItems, onChange } = props;
  const { items } = usePagination({
    count: totalItems,
    defaultPage: 1,
    onChange: (e, pageNumber) => onChange(pageNumber),
  });

  return (
    <>
      <nav className="mb-4">
        <UL className="pagination justify-content-center justify-content-lg-end">
          {items.map((item) => {
            console.log(item);

            if (
              item.type === "start-ellipsis" ||
              item.type === "end-ellipsis"
            ) {
              return <PaginationEllipics />;
            } else if (item.type === "page") {
              return (
                <LI
                  className={clsx("paginate-list", {
                    listSelected: item.selected,
                  })}
                  onClick={item.onClick}
                >
                  {item.page}
                </LI>
              );
            } else {
              return (
                <li
                  className={clsx(
                    " d-flex align-items-center ml-4 cursor-pointer",
                    {
                      "mr-4": item.type === "previous",
                      "ml-4": item.type !== "previous",
                    }
                  )}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    if (!item.disabled) {
                      item.onClick(e);
                    }
                  }}
                >
                  {item.type === "previous" && <PaginateLeftArrow />}
                  {item.type !== "previous" && <PaginateRightArrow />}
                </li>
              );
            }
          })}
        </UL>
      </nav>
    </>
  );
};
