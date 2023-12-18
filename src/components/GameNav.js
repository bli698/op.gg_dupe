import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ReactComponent as LolLogo } from '../images/lol_logo.svg';

function GameNav() {
    return (
      <Navbar style={{display:'flex', flexDirection:'row', backgroundColor:'#5383E8', paddingTop: 0, paddingBottom: 0}} sticky="top" variant='dark' >
        <Navbar.Brand href="/home" style={{fontSize:19 ,fontFamily:'Noto Sans JP, Roboto, sans-serif' , marginLeft:20}}>not OP.GG</Navbar.Brand>
        <LolLogo style={{maxHeight:24, maxWidth:24}}/>
        <Navbar.Text style={{fontSize:12, paddingRight:'10px'}}>League of Legends</Navbar.Text>
        <div style={{overflow:'hidden', flex: 1, minHeight:'100%', height:'38.5px', backgroundColor:'#28344E'}}/>
      </Navbar>

    );
  }
  
export default GameNav;