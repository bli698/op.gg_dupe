import './App.css';
import GameNav from './components/GameNav';
import LeagueNav from './components/lol/LeagueNav';
import { LeagueTabContextProvider } from './components/lol/LeagueTabContext';
import { RegionContextProvider } from './components/RegionContext';
import {Route, Routes} from 'react-router-dom';
import Home from './components/lol/pages/Home';
import Summoner from './components/lol/pages/Summoner';
import { QueryClient, QueryClientProvider } from "react-query";


function App() {
  
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <LeagueTabContextProvider>
        <RegionContextProvider>
          <Routes>
            <Route path='' Component={Home} />
            <Route path='/home' Component={Home} />
            <Route path='/champions' Component={Home} />
            <Route path='/summoners/:name/:playerTab?' Component={Summoner} />
          </Routes>
        </RegionContextProvider>
      </LeagueTabContextProvider>
    </QueryClientProvider>
  );
}

export default App;
