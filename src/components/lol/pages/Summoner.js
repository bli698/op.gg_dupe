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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ggBtn from '../../../images/searchbutton-gg.svg';
import Copyright from '../../Copyright';
import GameNav from "../../GameNav";
import LeagueNav from "../LeagueNav";
import logoLight from "../../../images/logoLight.png";
import { SummonerInfo } from "../ProxyCalls";
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

function PlayerHeader() {
   const [playerObj, setPlayerObj] = useState({});
   const params = useParams();
   useEffect(() => {
      /* gets level (summonerLevel), previous name (name), profile icon (profileIconId),

      */ 
      async function getSummInfo() {
         const res = await SummonerInfo(params.name);
         setPlayerObj(res);
         console.log(res);
      };

      getSummInfo();
   }, []);
   
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

function Summoner() {
   const currTab = useLeagueTabContext();
   const updateCurrTab = useUpdateLeagueTabContext();
   updateCurrTab(null);
   const params = useParams();
   return (
      <>
         <GameNav />
         <div className="searchRow">
            <img src={logoLight} width='158px' height='46px'/>
            <MiniSearchBar />
         </div>
         <LeagueNav />
         <PlayerHeader />
      </>
   )
}

export default Summoner;