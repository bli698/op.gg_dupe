import './App.css';
import GameNav from './components/GameNav';
import LeagueNav from './components/lol/LeagueNav';
import { LeagueTabContextProvider } from './components/LeagueTabContext';
import { RegionContextProvider } from './components/RegionContext';
import {Route, Routes} from 'react-router-dom';
import Home from './components/lol/Home';

function App() {
  return (
    <LeagueTabContextProvider>
      <RegionContextProvider>
        <Routes>
          <Route path='' Component={Home} />
          <Route path='/home' Component={Home} />
          <Route path='/champions' Component={Home} />
        </Routes>
      </RegionContextProvider>
    </LeagueTabContextProvider>
  );
}

export default App;
