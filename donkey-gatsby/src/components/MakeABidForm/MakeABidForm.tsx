import { useState } from "react";

const Dropdown: React.FC = (props) => {
  const [condition, setCondition] = useState(false);
  return (
    <div
      onClick={() => setCondition(!condition)}
      className={condition ? "field dropdown active" : "field dropdown"}
    >
      {props.children}
    </div>
  );
};

export const MakeABidForm = () => {
  return (
    <div className="make_a_bid">
      <div className="head" style={{ marginBottom: "22px" }}>
        <h4>Make a Bid</h4>
        <div className="tooltip_con">
          <div className="tooltip_trigger info_icon">i</div>
          <div className="tooltip_content">
            <p>This is some demo text. please replace with what ever.</p>
          </div>
        </div>
      </div>
      <div className="lp_staking" style={{ marginBottom: "43px" }}>
        <div className="head">
          <h5>LP for staking</h5>
          <span className="data">≈ $1,000</span>
        </div>
        <div className="dropdown_container">
          <Dropdown>
            <div className="option">
              <div className="left">
                <div
                  className="icon"
                  style={{
                    backgroundImage:
                      "url('https://don-strapi.fra1.digitaloceanspaces.com/Steiner_ed01f4e7bf.jpg')",
                  }}
                ></div>
                <div className="title">The chief Strategy</div>
              </div>
              <div className="right">
                <div className="amount">
                  <div className="icon busd"></div>
                  <div className="amount">500 BUSD</div>
                </div>
              </div>
            </div>
            <div className="option">
              <div className="left">
                <div
                  className="icon"
                  style={{
                    backgroundImage:
                      "url('https://don-strapi.fra1.digitaloceanspaces.com/Rectangle_1037_e13d219b65.png')",
                  }}
                ></div>
                <div className="title">Hungry for Cake</div>
              </div>
              <div className="right">
                <div className="amount">
                  <div className="icon pancake"></div>
                  <div className="amount">500 BUSD</div>
                </div>
              </div>
            </div>
            <div className="option">
              <div className="left">
                <div
                  className="icon"
                  style={{
                    backgroundImage:
                      "url('https://don-strapi.fra1.digitaloceanspaces.com/Steiner_ed01f4e7bf.jpg')",
                  }}
                ></div>
                <div className="title">The chief Strategy</div>
              </div>
              <div className="right">
                <div className="amount">
                  <div className="icon busd"></div>
                  <div className="amount">500 BUSD</div>
                </div>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="collateral">
        <div className="head">
          <h5>How much to use for collateral</h5>
          <span className="data">≈ $500</span>
        </div>
        <div className="field">
          <div className="option">
            <div className="left">
              <div className="icon pancake"></div>
              <input type="number" size={3} value="50" />
              <div className="title x_amount">* 500 BUSD</div>
            </div>
            <div className="right">
              <div className="amount">
                <div className="icon"></div>
                <div className="amount">= 250 BUSD</div>
              </div>
            </div>
          </div>
        </div>
        <div className="percent_select">
          <div>25%</div>
          <div className="selected">50%</div>
          <div>70%</div>
          <div>100%</div>
        </div>
      </div>
      <div className="borrow">
        <div className="reflection"></div>
        <div className="head">
          <h5>Borrow</h5>
          <div className="tooltip_con">
            <div className="tooltip_trigger info_icon">i</div>
            <div className="tooltip_content">
              <p>
                The Tier 5 will get 70%, Tier 4 will get 50%, and all the rest
                will get 0%.
              </p>
              <a href="#">MORE INFO</a>
            </div>
          </div>
        </div>
        <h5>175 BUSD</h5>
        <p>Collateral 250 BUSD * 70% = 175 BUSD Tier 4 Dept ratio is 70%</p>
      </div>

      <div className="bid">
        <div className="head">
          <h5>Bid (how much commision)</h5>
        </div>
        <div className="field">
          <div className="option">
            <div className="left">
              <div className="title">20 BUSD</div>
            </div>
            <div className="right">
              <div className="amount">
                <div className="icon"></div>
                <div className="amount">11.42%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="submit_btn_con">
        <button className="submit_and_stake" style={{ marginTop: "41px" }}>
          Submit & Stake
        </button>
        <div className="info">
          <span>Floor commision 10%</span>
          <span>Repay loan date: 06/12/2021</span>
        </div>
      </div>
    </div>
  );
};
