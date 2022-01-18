import { Footer } from "components/Footer";
import { NavBar } from "components/Navbar";
import { StaticImage } from "gatsby-plugin-image";
import React, { ReactDOM, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { theme } from "theme";
import './auction.css';

// Images
import PancakeIcon from '../pancake_icon.png';
import { propTypes } from "react-bootstrap/esm/Image";




class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: 0,
      min: 0,
      sec: 0,
    }
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;

    return (
      <div className="countdowner">
                <div className="hours"><div className="data">{this.addLeadingZeros(countDown.hours)}</div><div className="title">hours</div></div>
                <span className="dots">.</span>
                <div className="minutes"><div className="data">{this.addLeadingZeros(countDown.min)}</div><div className="title">minutes</div></div>
                <span className="dots">.</span>
                <div className="seconds"><div className="data">{this.addLeadingZeros(countDown.sec)}</div><div className="title">seconds</div></div>
              </div>
      
    );
  }
}


function Popup(props) {
    
  return (props.trigger) ? (
      <div className="popup_overlay">
          <div className="popup_box">
              <div className="close" onClick={() => props.setTrigger(false)}>X</div>
              {props.children}
          </div>
      </div>
  ) : "";
}


const Dropdown = (props) => {
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

const MyRow = styled.div`
width: 100%;
`;



export default function Auction() {

  return (
    <>
      <NavBar />
      <MyRow className="strip autcion_head">
        <div className="boxed">
            <div className="width-50 details_column">
              <h5>catch your luck by the tail</h5>
              <h3>next auction finishes in</h3>
              <p>Be part of Don-key's auction to win loan and some more 2-3 sentences explanation text to describe purpose of the page.</p>
              <Countdown date={`2022-01-20T07:00:00`}/>
            </div>
            <div className="width-50 bid_column">
              <div className="make_a_bid">
                <div className="head" style={{marginBottom: '22px'}}>
                  <h4>Make a Bid</h4>
                  <div className="tooltip_con">
                    <div className="tooltip_trigger info_icon">i</div>
                    <div className="tooltip_content">
                      <p>This is some demo text. please replace with what ever.</p>
                    </div>
                    </div>
                </div>
                <div className="lp_staking" style={{marginBottom: '43px'}}>
                  <div className="head"><h5>LP for staking</h5><span className="data">≈ $1,000</span></div>
                  <div className="dropdown_container">
                  <Dropdown>
                    <div className="option">
                      <div className="left">
                      <div className="icon" style={{backgroundImage: 'url(\'https://don-strapi.fra1.digitaloceanspaces.com/Steiner_ed01f4e7bf.jpg\')'}}></div>
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
                      <div className="icon" style={{backgroundImage: 'url(\'https://don-strapi.fra1.digitaloceanspaces.com/Rectangle_1037_e13d219b65.png\')'}}></div>
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
                      <div className="icon" style={{backgroundImage: 'url(\'https://don-strapi.fra1.digitaloceanspaces.com/Steiner_ed01f4e7bf.jpg\')'}}></div>
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
                  <div className="head"><h5>How much to use for collateral</h5><span className="data">≈ $500</span></div>
                  <div className="field">
                    <div className="option">
                      <div className="left">
                      <div className="icon pancake"></div>
                      <input type="number" size="3" value="50" />
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
                  <div className="head"><h5>Borrow</h5>
                  <div className="tooltip_con">
                    <div className="tooltip_trigger info_icon">i</div>
                    <div className="tooltip_content">
                      <p>The Tier 5 will get 70%, Tier 4 will get 50%, and all the  rest will get 0%.</p>
                      <a href="#">MORE INFO</a>
                    </div>
                    </div>
                    </div>
                  <h5>175 BUSD</h5>
                  <p>Collateral 250 BUSD * 70% = 175 BUSD
Tier 4 Dept ratio is 70%</p>

                </div>
                
                <div className="bid">
                  <div className="head"><h5>Bid (how much commision)</h5></div>
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
                <button className="submit_and_stake" style={{marginTop: '41px'}}>Submit & Stake</button>
                <div className="info">
                  <span>Floor commision 10%</span>
                  <span>Repay loan date: 06/12/2021</span>
                </div>
                </div>
              </div>
            </div>
        </div>
        </MyRow>
        <MyRow className="strip table_strip your_bids" style={{paddingTop: '165px'}}>
        <div className="boxed">
          <h3>Your Bids</h3>
          <table>
            <thead>
              <tr>
              <th>#</th>
              <th>status</th>
              <th>wallet</th>
              <th>strategy lp</th>
              <th>value</th>
              <th>borrow</th>
              <th>comission</th>
              <th>action</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td className="status success">successful</td>
              <td>0404sjww1920223.....</td>
              <td>DON - Curve DAL * *</td>
              <td>$2,280,00</td>
              <td>$2,280,00</td>
              <td>8%</td>
              <td><button>claim</button></td>
            </tr>
            <tr>
              <td>2</td>
              <td className="status pending">pending</td>
              <td>qqw04sjww1920223.....</td>
              <td>DON - Curve DAL * *</td>
              <td>$2,280,00</td>
              <td>$2,280,00</td>
              <td>12%</td>
              <td><button className="white">See Details</button></td>
            </tr>
            <tr>
              <td>3</td>
              <td className="status rejected">rejected</td>
              <td>0608sjhw1320223.....</td>
              <td>DON - Curve DAL * *</td>
              <td>$2,280,00</td>
              <td>$2,280,00</td>
              <td>10%</td>
              <td><button className="gray">Unstake LP</button></td>
            </tr>
            </tbody>
          </table>
          </div>
        </MyRow>
        <MyRow className="strip table_strip your_loans" style={{paddingTop: '54px'}}>
        <div className="boxed">
          <h3>Your Loans</h3>
          <table>
            <thead>
              <tr>
              <th>#</th>
              <th>last day to pay</th>
              <th>value</th>
              <th>Loan</th>
              <th>commision</th>
              <th>total</th>
              <th>action</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td className="timer"><Countdown date={`2022-03-20T00:00:00`}/></td>
              <td>$2,280,00</td>
              <td>$2,280,00</td>
              <td>0.003</td>
              <td className="total">195</td>
              <td><button className="claim">pay</button></td>
            </tr>
            <tr>
              <td>2</td>
              <td className="timer"><Countdown date={`2022-03-20T00:00:20`}/></td>
              <td>$1,180,00</td>
              <td>$1,180,00</td>
              <td>0.001</td>
              <td className="total">164</td>
              <td><button className="claim">pay</button></td>
            </tr>
            <tr className="closed">
              <td>3</td>
              <td className="timer"><Countdown date={`2001-02-10T00:00:00`}/></td>
              <td>$3,530,00</td>
              <td>$3,530,00</td>
              <td>0.004</td>
              <td className="total">195</td>
              <td><span className="closed">closed</span></td>
            </tr>
            
            </tbody>
          </table>
          </div>
        </MyRow>
      <Footer />
    </>
  );
}
