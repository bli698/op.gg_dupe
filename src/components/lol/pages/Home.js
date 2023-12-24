import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import logoLight from '../../../images/logoLight.png';
import GameNav from '../../GameNav';
import LeagueNav from '../LeagueNav';
import ggBtn from '../../../images/searchbutton-gg.svg';
import { useState } from 'react';
import Copyright from '../../Copyright';
import { useRegionContext, useUpdateRegionContext } from '../../RegionContext';
import { SummonerInfo } from '../ProxyCalls';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const selectedRegion = useRegionContext();
    const updateSelectedRegion = useUpdateRegionContext();
    const [riotID, setRiotID] = useState('');
    const navigate = useNavigate();
    return (
        <div id="homeSearch">
            <Form onSubmit={(e) => {e.preventDefault()}}>
                <Row>
                    <Col>
                        <Form.Group className="regionSelectDiv formGroup">
                            <Form.Label className="formLabel">Region</Form.Label>
                            <Form.Select 
                                className="regionDropdown"
                                onChange={(event) => {updateSelectedRegion(event.target.value)}}
                            >
                                <option value="NA1">North America</option>
                                <option value="EUW">Europe West</option>
                                <option value="EUNE">Europe Nordic & East</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col className="divider" />
                    <Col>
                        <Form.Group className="summonerName formGroup ">
                            <Form.Label className="formLabel">Search</Form.Label>
                            <Form.Control className="summonerInput" placeholder={`Game Name + #${selectedRegion}`} 
                                onChange={(event) => {setRiotID(event.target.value)}}
                            />
                        </Form.Group>
                    </Col>
                    <Col className="btn-col">
                        <Button className='gg-btn' type='submit' onClick={() => {navigate(`/summoners/${riotID.replace('#','-')}`); }}>
                            <img src={ggBtn} />
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

function Home() {
    return (
        <>
            <GameNav />
            <LeagueNav />
            <div className="body">
                <img src={logoLight} width='505px' height='148px' />
                <SearchBar />
                <Copyright />
            </div>
                        
        </>
    )
}

export default Home;