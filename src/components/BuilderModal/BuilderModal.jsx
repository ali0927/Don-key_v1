import clsx from "clsx";
import React from "react";

export const BuilderModal = ({ isModalOpen, toggleModal, insertAction }) => {
  return (
    <div className={clsx("b-modal-wrapper", { open: isModalOpen })}>
      <div className="b-modal">
        <div className="head">
          Deposit DAI
          <button
            className="b-btn-close trigger"
            onClick={(e) => {
              e.preventDefault();
              toggleModal();
            }}
          ></button>
        </div>
        <div className="b-content">
          <table>
            <tr>
              <td>Amount:</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>Colleteralization %:</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleModal();
                    insertAction();
                  }}
                  className="trigger"
                  id="createAction"
                >
                  Create action
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};
