import { useState, useEffect } from 'react';
import InitiativeTableComponent from '../../components/initiativeTableComponent/InitiativeTableComponent';
import PlayerComponent from '../../components/playerComponent/PlayerComponent';
import Button from '@mui/material/Button';
import axios from 'axios';
import './home.scss';

export default function Home () {
  const [playerList, setPlayerList] = useState([]);
  const [localPlayerList, setLocalPlayerList] = useState([]);
  const [deletedIndex, setDeletedIndex] = useState([]);

  useEffect(() => {
    setInterval(() => {
      fetchInitiatives()
    }, 5000)
  }, []);

  const fetchInitiatives = async () => {
    await axios.get('http://127.0.0.1:8000/initiatives')
      .then((res) => {
        setPlayerList(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const addPlayer = () => {
    setLocalPlayerList(
      [...localPlayerList, []]
    ); 
  };

  const removePlayer = (index) => {
   setDeletedIndex([...deletedIndex, index]);
  }

  return (
    <div className="home">
      <InitiativeTableComponent players={playerList} />
      
      {
        localPlayerList.map((item ,i) => {
          if(deletedIndex.includes(i)){
            return null;
          }else{
            return <PlayerComponent 
              removePlayer={removePlayer} 
              key={i} 
              index={i}
            />
          } 
        })
      }
      
      <div className="add-player">
        <Button variant="contained" size="large" onClick={addPlayer}>Add player</Button>
      </div>
    </div>
  );
}