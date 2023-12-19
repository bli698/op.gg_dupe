import axios from "axios";

export function SummonerInfo(riotID) {
    const splitID = riotID.split('#');
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:5000/getByRiotID/${splitID[0]}/${splitID[1]}`)
        console.log(res.data);
    };
    fetchData();
    
}