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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';   
import ggBtn from '../../../images/searchbutton-gg.svg';
import Copyright from '../../Copyright';
import GameNav from "../../GameNav";
import LeagueNav from "../LeagueNav";
import logoLight from "../../../images/logoLight.png";
import { SummonerInfo, RankInfo, MatchIDs, Matches } from "../ProxyCalls";
import { useRegionContext, useUpdateRegionContext } from "../../RegionContext";
import { useLeagueTabContext, useUpdateLeagueTabContext } from "../LeagueTabContext";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useData, setData } from "../../../utilities/database";
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

function PlayerHeader({playerObj, name, update}) {
   
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
            <div><Button onClick = {update}>Update</Button></div>
         </div>
      </div>
   )

}

function QueuedPlayers() {
}

function PlayerRank({playerObj}){
   const [rankData, error ] = useData(`/${playerObj.puuid}/rankInfo`);

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

   function fixCasing(tierName){
      const allLower = tierName.toLowerCase();
      return allLower.charAt(0).toUpperCase() + allLower.slice(1);
   }

   return(
      rankData ?
            <Container>
               {
               ["solo", "flex"].map(mode =>
                  <Row xs={3} sm={6} style = {{paddingBottom: "10px"}}>
                     <Card>
                        <Card.Title>{fixCasing(mode)}</Card.Title>
                        <hr style={{margin: "0px"}}/>
                        <Row>
                           <Col sm={3} md = {3}> <img id = "rankImg" src={rankIMGTable[rankData[mode]["tier"]]}/></Col>
                           <Col sm={9} md = {9}>
                                 <Row>
                                    <Col> {fixCasing(rankData[mode]["tier"])} {rankData[mode]["rank"]}</Col>
                                    <Col> {rankData[mode]["wins"]}W {rankData[mode]["losses"]}L</Col>
                                 </Row>
                                 <Row>
                                    <Col>{rankData[mode]["leaguePoints"]} LP</Col>
                                    <Col>{(rankData[mode]["wins"]/(rankData[mode]["wins"] + rankData[mode]["losses"]) * 100).toFixed(0)} %</Col>
                                 </Row>
                           </Col>
                        </Row>
                     </Card>
                  </Row>
               )}
            </Container>
         :<></>
      )
   }

function PlayerMatchSummary({playerObj}){

   //queueid table
   const Solo = 420;
   const Flex = 440;

   const [queueId, setQueueId] = useState(Solo);

   const [matches, error] = useData(`/${playerObj.puuid}/matches`);

   console.log(matches);

   if(matches){

      // filter by Q type
      const qFilteredMatches = queueId === 420 || queueId === 420? matches.filter(match => match.info.queueId === queueId): matches;


      const playerIndices =  qFilteredMatches.map(match => { 
            if (!match.status){
               return match.metadata.participants.findIndex((participant) => participant === playerObj.puuid);
            } 
      });

      console.log(playerIndices)

      const teamIndices = playerIndices.map(playerIndex => playerIndex <= 4? 0 : 1);

      console.log(teamIndices)

      // champion names with win/loss, possibly with dups
      let allChampionStats =  qFilteredMatches.map((match,idx) =>{      
         const playerRef = match.info.participants[playerIndices[idx]]; 
         return( [
                  playerRef.championId,
                  playerRef.championName, 
                  match.info.teams[teamIndices[idx]].win === true? 1 : 0,
                  playerRef.kills,
                  playerRef.deaths,
                  playerRef.assists,
                  playerRef.totalMinionsKilled,
                  playerRef.timePlayed
               ]);
      })


      // Champstats table
      const championId = 0;
      const name = 1;
      const wins = 2;
      const kills = 3;
      const deaths = 4;
      const assists = 5;
      const cs = 6;
      const timePlayed = 7;

      // remove duplicates
      let allChamps = allChampionStats.map(champWin => champWin[name]);
      let allUniqueChampionNames = allChamps.filter((championName, idx) => allChamps.findIndex((champName) => championName === champName) === idx);


      //all unique champs with name, wins, games, kda, avg kills, avg deaths, avg assists, avg cs, cs per min
      const uniqueChampStats = allUniqueChampionNames.map(champ => {
            

            const filterByChampName = allChampionStats.filter(champStats => champStats[name] === champ);
            const filterByChampNameNWin = allChampionStats.filter(champStats => champStats[name] === champ && champStats[wins]=== 1); 

            const sumKills = filterByChampName.reduce((cum, cur) => cum + cur[kills] , 0);
            const sumDeaths = filterByChampName.reduce((cum, cur) => cum + cur[deaths] , 0);
            const sumAssists = filterByChampName.reduce((cum, cur) => cum + cur[assists] , 0);
            const sumCS = filterByChampName.reduce((cum, cur) => cum + cur[cs], 0);
            const sumTime = filterByChampName.reduce((cum, cur) => cum + cur[timePlayed], 0);

            const avgKills = sumKills/filterByChampName.length;
            const avgDeaths = sumDeaths/filterByChampName.length;
            const avgAssists = sumAssists/filterByChampName.length;
            const avgCS =  sumCS/filterByChampName.length;
            const csPerMin = sumCS/sumTime*60;

            return([champ, 
               filterByChampNameNWin.length,
               filterByChampName.length,
               avgDeaths !== 0 ? (avgKills + avgAssists) / avgDeaths: avgKills + avgDeaths ,
               avgKills,
               avgDeaths,
               avgAssists,
               avgCS,
               csPerMin
            ])
         }
      )
      console.log(uniqueChampStats)

      const tabClickHandler = (k) =>{
         console.log(k);
         setQueueId(parseInt(k));
      }

      return(
         <Table striped style = {{width:"375px", fontSize: "12px"}}>
               <Tabs
                  defaultActiveKey="profile"
                  id="fill-tab-example"
                  activeKey={queueId}
                  onSelect={(k) => tabClickHandler(k)}
                  fill
               >
                  <Tab eventKey= "Season S2" title="Season S2" >
                  </Tab>
                  <Tab eventKey="420" title="Ranked Solo">
                  </Tab>
                  <Tab eventKey="440" title="Ranked Flex">
                  </Tab>
            </Tabs>
            <tbody>
               {uniqueChampStats.sort((a,b) => b[2] - a[2]).map(champStats =>
                  <tr>
                     <Row>
                        <Col xs = {5}>
                           <Row style={{ alignItems: 'center' }}>
                              <Col>
                                 <img style = {{height: "32px", width: "32px", borderRadius: "50%"}} src = {`/tiles/${champStats[0]}_0.jpg`}></img>
                              </Col>
                              <Col style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                 <Row> <b>{champStats[0]}</b></Row>
                                 <Row>{champStats[7].toFixed(1)}({champStats[8].toFixed(1)})</Row>
                              </Col>
                           </Row>
                        </Col>
                        <Col xs = {3} style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                           <Row style = {{color: champStats[3] < 3? "gray": 
                                          champStats[3] < 4? "#00BBA3":
                                          champStats[3] < 5? "#0093FF":
                                          champStats[3] < 6? "#F06F00":
                                          "#E84057",
                                          }}>
                                 <b>{champStats[3].toFixed(2)}:1 KDA </b>
                           </Row>
                           <Row>
                              {champStats[4].toFixed(1)} / {champStats[5].toFixed(1)} / {champStats[6].toFixed(1)}
                           </Row>
                        </Col>
                        <Col xs = {4} style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                           <Row style = {{color: champStats[1]/champStats[2] >= .60?  "#D31A45": "black"}}>{(champStats[1]/champStats[2] * 100).toFixed(0)}%</Row>
                           <Row>{champStats[2]} played</Row>
                        </Col>
                     </Row>
                  </tr>
               )}
            </tbody>
         </Table>
      )
   }

}

function Summoner() {
   const updateCurrTab = useUpdateLeagueTabContext();
   updateCurrTab(null);

   const [playerObj, setPlayerObj] = useState({});
   const params = useParams();
   console.log(params);

   // get user info: ids etc
   useEffect(() => {
      async function getSummInfo() {
         const res = await SummonerInfo(params.name);
         setPlayerObj(res);

         console.log(res);
      };

      getSummInfo();
   }, []);


   const update = async() =>{

      //START UPDATING RANK INFO ****************
      const data = await RankInfo(playerObj.id);

      console.log(data);
      let solo = data[1];      
      let flex = data[0];

      const rankInfo = {
         "solo": {
            "wins": solo.wins,
            "losses": solo.losses,
            "games": solo.wins + solo.losses,
            "tier": solo.tier,
            "rank": solo.rank,
            "LP": solo.leaguePoints
         },
         "flex":{
            "wins": flex.wins,
            "losses": flex.losses,
            "games": flex.wins + flex.losses,
            "tier": flex.tier,
            "rank": flex.rank,
            "LP": flex.leaguePoints
         }
      }

      // set solo q info
      setData(`${playerObj.puuid}/rankInfo`,rankInfo);

      // END UPDATING RANK INFO ****************


      // START UPDATING MATCH HISTORY *************************
      const matchIDs = await MatchIDs(playerObj.puuid);
      console.log(matchIDs)

      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

      const matches = [];
      for (const matchID of matchIDs) {
          await delay(50); // introduce a 60 ms delay
          const result = await Matches(matchID);
          matches.push(result);
      }
      
      setData(`${playerObj.puuid}/matches`, matches);

      // END UPDATING MATCH HISTORY ***************************

   }


   return (


      <>
         <GameNav />
         <div className="searchRow">
            <img src={logoLight} width='158px' height='46px'/>
            <MiniSearchBar />
         </div>
         <LeagueNav />
         <PlayerHeader playerObj={playerObj} name={params.name || 'summary'} update = {update}/>
         <PlayerRank playerObj = {playerObj}/>
         <PlayerMatchSummary playerObj={playerObj}></PlayerMatchSummary>
         
      </>
   )
}

export default Summoner;