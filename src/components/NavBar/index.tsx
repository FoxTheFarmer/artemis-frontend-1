import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Toggle } from '@pancakeswap-libs/uikit'
import { usePriceCakeBusd } from 'state/hooks'
import {Link} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import UnlockButton from 'components/UnlockButton'
import {Accordion, Button, Card, useAccordionToggle} from 'react-bootstrap';
import { FaChartLine, FaTelegramPlane, FaTwitter, FaDiscord, FaFileAlt, FaGithub, FaTicketAlt, FaChartBar, FaMoneyBillAlt, FaTractor, FaHome, FaPrescriptionBottleAlt, FaTumblrSquare, FaCode, FaFlask, FaBook, FaReddit, FaRocketchat, FaRocket, FaBroadcastTower, FaLayerGroup, FaSeedling, FaExclamationTriangle, FaBootstrap, FaLandmark, FaGamepad, FaCircle, FaParachuteBox, FaVoteYea, FaProjectDiagram, FaShieldAlt, FaFire, FaCloud, FaPlayCircle, FaClipboard, FaUser, FaTwitterSquare } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import labo from 'config/constants/labo';

function getWindowDimensions() {
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
  return {
    viewportWidth,
    viewportHeight
  };
}

const {viewportWidth, viewportHeight} = getWindowDimensions()

const isOnPhone = viewportWidth < 680

const Token = styled.img`
  margin-right: 10px;
`

const Price = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  min-height: 18px;
  max-height: 30px;
  max-width: 107px;
  padding: 12px;
  `

const Logo = styled.p`
  font-size: 30px;
  color: #4c68ef !important;
  padding-bottom: 0px;
  @media screen and (max-width: 800px) {
    font-size: 21px;
  }
`

const Sub = styled.p`
  font-size: 13px;
  color: #1F2237;
`


const NavBar = (props) => {
  const { account, connect, reset } = useWallet()
  const cakePriceUsd = usePriceCakeBusd()
  const [isChecked, setIsChecked] = useState(false);

  const LightSwitch = () => {
  
    const toggle = () => setIsChecked(!isChecked);
  
    return (
      <>
        <div style={{ marginBottom: "32px" }}>
          <Toggle checked={isChecked} onChange={toggle} />
        </div>
      </>
    );
  }

  function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey);
  
    return (
        <li className="nav-tab dropdown">
        <Link to="/" className="nav-links" onClick={decoratedOnClick}>
          About
        </Link>
        </li>
    );
  }
  
  function InfoToggle() {
    return (
      <Accordion id="infoToggleMobile">
        <Card style={{"backgroundColor": "#161616", "border": "0"}}>
          <Card.Header style={{"backgroundColor": "#161616", "border": "0"}}>
            <CustomToggle eventKey="0" />
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body style={{"backgroundColor": "#161616", "border": "0"}}>
            <ul className="dropdown-items">
            <li>
               <a target="_blanK" rel="noreferrer" href="https://gov.harmony.one/#/artemis" className="nav-links">
                <FaVoteYea />  <span className="dditem">Vote</span>
               </a>
           </li>

            <li>
                                <a target="_blanK" rel="noreferrer" href="https://artemischarts.northeurope.cloudapp.azure.com/" className="nav-links">
                                <FaChartBar />  <span className="dditem">Charts</span>
                                </a>
                              </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://artemis-protocol.gitbook.io/artemis/" className="nav-links">
                    <FaBook /> <span className="dditem">Docs</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://github.com/ArtemisProtocol" className="nav-links">
                    <FaCode /> <span className="dditem">Code</span>
                  </a>
                </li>

                <li>
                  <a target="_blanK" rel="noreferrer" href="https://twitter.com/ArtemisProtoco1" className="nav-links">
                    <FaTwitter />  <span className="dditem">Twitter</span>
                  </a>
                </li>

                <li>
                  <a target="_blanK" rel="noreferrer" href="https://t.me/ProtocolArtemis" className="nav-links">
                    <FaTelegramPlane />  <span className="dditem">Telegram</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://discord.gg/zqkTCQS8" className="nav-links">
                    <FaDiscord />  <span className="dditem">Disocord</span>
                  </a>
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }


  return (
    <div>
      <header>
          <div className="nav-wrapper">
              <nav>
              <object 
              type="image/svg+xml" 
              data="/images/banner.svg" 
              width="200px" style={{'marginTop': '10px', 'marginBottom': '10px', 'marginLeft': '20px'}}>&nbsp;</object>

                <input className="hidden" type="checkbox" checked={isChecked} id="menuToggle"/>
                <button type="button" className="menu-btn" onClick={()=>{setIsChecked(!isChecked)}}>
                  <div className="menu"/>
                  <div className="menu"/>
                  <div className="menu"/>
                </button>
                

                  <div className="nav-container">
                      <ul className="nav-tabs">

                      <li className="nav-tab">
                          <Link to="/elysium" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <span className="dditem">Pools</span>
                          </Link>
                        </li>

                      <li className="nav-tab">
                          <Link to="/" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <span className="dditem">Stake</span>
                          </Link>
                        </li>

                        <li className="nav-tab">
                          <Link to="/hades" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <span className="dditem">Bond</span>
                          </Link>
                        </li>



                        <li>
                          <a target="_blanK" rel="noreferrer" href="https://discord.gg/zqkTCQS8" className="nav-links">
                            <FaGithub style={{'marginTop': '10px', 'marginLeft': '20px'}}/></a>
                        </li>

                        <li>
                          <a target="_blanK" rel="noreferrer" href="https://discord.gg/zqkTCQS8" className="nav-links">
                            <FaTelegramPlane style={{'marginTop': '10px', 'marginLeft': '20px'}}/></a>
                        </li>

                        <li>
                          <a target="_blanK" rel="noreferrer" href="https://discord.gg/zqkTCQS8" className="nav-links">
                            <FaTwitter style={{'marginTop': '10px', 'marginLeft': '20px'}}/></a>
                        </li>

                        <li className="web3li outsideMainNav">
                          <Link to="/" className="nav-links connect">
                          { account != null && account.length > 1? 
                            <Price style={{'marginTop': '-2px', 'marginLeft': '30px'}}>{account.substring(0,( isOnPhone ? 8 : 8))} <p style={{'color': 'white'}}>...</p></Price>:
                              <UnlockButton style={{
                                marginLeft: '35px',
                                marginTop: '-4px',
                                width: '73%',
                              }}>Connect</UnlockButton>}
                          </Link>
                        </li>
                 </ul>
                
                <ul className="web3buttons">
                 <li className="web3li insideMainNav">
                   <a target="_blank" rel="noreferrer" href="https://info.defikingdoms.com/token/0xd74433b187cf0ba998ad9be3486b929c76815215" className="nav-links price">
                  <Price
                    style={{ marginRight: '4px',
                            backgroundColor: 'transparent' }}
                  >
                    <Token src="images/icon.png" alt='1' width="23px" height="23px"/>
                    <p>{ ( !cakePriceUsd.isNaN() ? cakePriceUsd.toNumber().toFixed(3).concat("$") : '...loading') }</p></Price>
                  </a></li>
   
                <li className="web3li insideMainNav">
                  <Link to="/" className="nav-links connect">
                  { account != null && account.length > 1? 
                    <Price>{account.substring(0,( isOnPhone ? 8 : 8)).concat("...")} <p style={{'color': 'white'}}> ✓</p></Price>:

                  <UnlockButton style={{
                    backgroundColor: 'rgb(22, 35, 73) !important',
                    border: '1px',
                    color: '#8299dd !important',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: '200',
                    width: '80%',
                    display: 'inline-flex',
                    height: '44px',
                    letterSpacing: '0.03em',
                    padding: '15px',
                    minHeight: '21px',
                    maxHeight: '33px',
                  }}>Connect</UnlockButton>
                  }
                  </Link>
                  </li>
                 </ul>
                  </div>
              </nav>

          </div>
      </header>
  </div>
  )
}


export default NavBar
