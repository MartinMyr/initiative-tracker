import { useState, useEffect } from 'react';
import InitiativeTableComponent from '../components/InitiativeTableComponent';
import PlayerComponent from '../components/PlayerComponent';
import Button from '@mui/material/Button';
import axios from 'axios';

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
      
      <Button onClick={addPlayer}>Add player</Button>
    </div>
  );
}