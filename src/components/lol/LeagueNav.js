
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useLeagueTabContext, useUpdateLeagueTabContext } from './LeagueTabContext';

function LeagueNav() {
  const currTab = useLeagueTabContext();
  const updateCurrTab = useUpdateLeagueTabContext();
    return (
      <>
        <Navbar 
          id='leagueNavBar'
          style={{backgroundColor:'#5383E8'}} 
          onSelect={(eventKey) => {updateCurrTab(eventKey);}
        }>
          <Container>
            <Nav id='leagueNav' className='justify-content-center' variant='underline' activeKey={currTab}>
              <Nav.Link className="leagueNavLink" eventKey='home' as={Link} to='/home'>Home</Nav.Link>
              <Nav.Link className="leagueNavLink" eventKey='champions' as={Link} to='/champions'>Champions</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        
      </>
    );
}


  
export default LeagueNav;