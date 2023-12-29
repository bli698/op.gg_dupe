/* requires:
 [] solo rank
 [] flex rank 
 [] <header>
    [x] icon
    [x] level
    [] previous ranks
    [x] name and tag
    [x] previous name
    [] ladder rank
 [] ranked last 7 days <CurrWeekRankedStats>
    [] champs played
       [] win rate
       [] games played
 [] current season stats <CurrentSeasonStats>
    [] champs played
       [] champ icon
       [] champ name
       [] average CS per game
       [] CS per minute
       [] average K/D/A (6.5/2.0/11.2)
       [] calculated KDA ratio (2.62:1 KDA)
       [] games played 
       [] win rate (%)
 [] last 20 games <GameStatInfographic>
    [] W/L 
    [] average k/d/a
    [] KD
    [] kill participation
    [] preferred role in ranked
    [] top 3 played champs
       [] W/L and win rate (%) in recent games
       [] calculated KDA (kill participation)
 [] players queued with <QueuedPlayers>
    [] icon
    [] name + tag
    [] games played
    [] win-lose (12-3)
    [] win rate
 [] <MatchHistory>
    [] Queue Type
    [] When the game was played
    [] Victory/defeat
    [] Game duration
    [] Champion icon
    [] Reached level
    [] Summoner spell icons
    [] Items
    [] Keystone icon & secondary tree icon
    [] K/D/A
    [] Calculated KDA
    [] Kill participation
    [] Control wards placed
    [] CS & CS/min
    [] Average game rank
    [] Players

    
 */

import { useParams } from "react-router-dom";
import Form  from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ggBtn from '../../../images/searchbutton-gg.svg';
import Copyright from '../../Copyright';
import GameNav from "../../GameNav";
import LeagueNav from "../LeagueNav";
import logoLight from "../../../images/logoLight.png";
import { SummonerInfo, RankInfo } from "../ProxyCalls";
import { useRegionContext, useUpdateRegionContext } from "../../RegionContext";
import { useLeagueTabContext, useUpdateLeagueTabContext } from "../LeagueTabContext";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import "./Summoner.css"

function MiniSearchBar() {
   const selectedRegion = useRegionContext();
   const updateSelectedRegion = useUpdateRegionContext();
   const [riotID, setRiotID] = useState('');
   const navigate = useNavigate();
   return (
         <Form id="miniSearch">

                  <Form.Select 
                     onChange={(event) => {updateSelectedRegion(event.target.value)}}
                  >
                     <option value="NA1" label="NA">North America</option>
                     <option value="EUW" label="EUW">Europe West</option>
                     <option value="EUNE" label="EUNE">Europe Nordic & East</option>
                  </Form.Select>
                  <Form.Control className="summonerInput" placeholder={`Game Name + #${selectedRegion}`} 
                     onChange={(event) => {setRiotID(event.target.value)}}
                     onSubmit={(event) => {navigate(`/summoners/${riotID}`)}}
                  />
                  <Button className="minisearch-gg-btn" type='submit' onClick={() => {navigate(`/summoners/${riotID.replace('#','-')}`)}}>
                     <img src={ggBtn}/>
                  </Button>
             
               
         </Form>
   )
}

function PlayerHeader({playerObj, name}) {
   
   return (
      <div className="playerHeader">
         <div className='playerIcon'>
            <img src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${playerObj.profileIconId}.png`} 
               width='100%' height='100px'
               style={{borderRadius:'15px'}}
            />
            <div className="level">
               <span className="level">{playerObj.summonerLevel}</span>
            </div>
         </div>
         <div className='nameAndStuff'>
            <span>
               <span style={{fontSize:'24px', color:'#202D37', fontFamily:'Roboto, sans-serif', fontWeight:'bold'}}>{name.split('-')[0]}</span>
               <span style={{fontSize:'24px', color:'#758592', fontFamily:'Roboto, sans-serif'}}>#{name.split('-')[1].toUpperCase()}</span>
            </span>
            <div style={{color:'#9aa4af', fontSize:'12px', fontFamily:'Roboto, sans-serif'}}>Prev. {playerObj.name}</div>
         </div>
      </div>
   )

}

function QueuedPlayers() {
}

function PlayerRank({playerObj}){
   const [rankData, setRankData] = useState();

   const rankIMGTable = {
      "IRON": "/RankedEmblemsLatest/Rank=Iron.png",
      "BRONZE": "/RankedEmblemsLatest/Rank=Bronze.png",
      "SILVER": "/RankedEmblemsLatest/Rank=Silver.png",
      "GOLD": "/RankedEmblemsLatest/Rank=Gold.png",
      "PLATINUM": "/RankedEmblemsLatest/Rank=Platinum.png",
      "EMERALD": "/RankedEmblemsLatest/Rank=Emerald.png",
      "DIAMOND": "/RankedEmblemsLatest/Rank=Diamond.png",
      "MASTER": "/RankedEmblemsLatest/Rank=Master.png",
      "GRANDMASTER": "/RankedEmblemsLatest/Rank=Grandmaster.png",
      "CHALLENGER": "/RankedEmblemsLatest/Rank=Challenger.png"
   }

   const rankedModes = ["Ranked Solo", "Ranked Flex"]

   function fixCasing(tierName){
      const allLower = tierName.toLowerCase();
      return allLower.charAt(0).toUpperCase() + allLower.slice(1);
   }

   useEffect(()=>{

         async function getRankInfo(){
            const data = await RankInfo(playerObj.id);
            setRankData(data);
            console.log(data)
         }
         getRankInfo();
      }, 
   [playerObj])


   return(
      rankData ?
         rankData[0]?
            <Container>
               {
               [0, 1].map(i =>
                  <Row xs={3} sm={6} style = {{paddingBottom: "10px"}}>
                     <Card>
                        <Card.Title>{rankedModes[i]}</Card.Title>
                        <hr style={{margin: "0px"}}/>
                        <Row>
                           <Col sm={3} md = {3}> <img id = "rankImg" src={rankIMGTable[rankData[i]["tier"]]}/></Col>
                           <Col sm={9} md = {9}>
                                 <Row>
                                    <Col> {fixCasing(rankData[i]["tier"])} {rankData[i]["rank"]}</Col>
                                    <Col> {rankData[i]["wins"]}W {rankData[i]["losses"]}L</Col>
                                 </Row>
                                 <Row>
                                    <Col>{rankData[i]["leaguePoints"]} LP</Col>
                                    <Col>{(rankData[i]["wins"]/(rankData[i]["wins"] + rankData[i]["losses"]) * 100).toFixed(0)} %</Col>
                                 </Row>
                           </Col>
                        </Row>
                     </Card>
                  </Row>
               )}
            </Container>
         :<></>
      :<></>
      )
   }


function Summoner() {
   const currTab = useLeagueTabContext();
   const updateCurrTab = useUpdateLeagueTabContext();
   updateCurrTab(null);

   const [playerObj, setPlayerObj] = useState({});
   const params = useParams();
   console.log(params);

   useEffect(() => {
      async function getSummInfo() {
         const res = await SummonerInfo(params.name);
         setPlayerObj(res);

         console.log(res);
      };

      getSummInfo();
   }, []);

   return (
      <>
         <GameNav />
         <div className="searchRow">
            <img src={logoLight} width='158px' height='46px'/>
            <MiniSearchBar />
         </div>
         <LeagueNav />
         <PlayerHeader playerObj={playerObj} name={params.name || 'summary'}/>
         <PlayerRank playerObj = {playerObj}/>
      </>
   )
}

export default Summoner;