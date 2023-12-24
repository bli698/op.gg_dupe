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

function PlayerHeader({playerObj}) {
   
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
      </div>
   )

}

function PlayerRank({playerObj}){
   const [rankData, setRankData] = useState();

   const rankIMGTable = {
      "IRON": "/RankedEmblemsLatest/Rank=Iron.png",
      "BRONZE": "/RankedEmblemsLatest/Rank=Bronze.png",
      "SILVER": "/RankedEmblemsLatest/Rank=Silver.png",
      "GOLD": "/RankedEmblemsLatest/Rank=Gold.png",
      "PLATINUM": "/images/RankedEmblemsLatest/Rank=Platinum.png",
      "EMERALD": "/RankedEmblemsLatest/RankEmerald.png",
      "DIAMOND": "/RankedEmblemsLatest/Rank=Diamond.png",
      "MASTER": "/RankedEmblemsLatest/Rank=Master.png",
      "GRANDMASTER": "/RankedEmblemsLatest/Rank=Grandmaster.png",
      "CHALLENGER": "/RankedEmblemsLatest/Rank=Challenger.png"
   }

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
            <Row xs={3} sm={6}>
               <Col> <img id = "rankImg" src={rankIMGTable[rankData[0]["tier"]]}/></Col>
               <Col>
                     <Row>
                        <Col> {fixCasing(rankData[0]["tier"])} {rankData[0]["rank"]}</Col>
                        <Col> {rankData[0]["wins"]}W {rankData[0]["losses"]}L</Col>
                     </Row>
                     <Row>
                        <Col>{rankData[0]["leaguePoints"]} LP</Col>
                        <Col>{(rankData[0]["wins"]/(rankData[0]["wins"] + rankData[0]["losses"]) * 100).toFixed(0)} %</Col>
                     </Row>
               </Col>
            </Row>
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
         <PlayerHeader playerObj={playerObj} />
         <PlayerRank playerObj = {playerObj}/>
      </>
   )
}

export default Summoner;