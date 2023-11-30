import { useState, useEffect } from 'react';
import InitiativeTableComponent from '../../components/initiativeTableComponent/InitiativeTableComponent';
import PlayerComponent from '../../components/playerComponent/PlayerComponent';
import Button from '@mui/material/Button';
import axios from 'axios';
import Pusher from 'pusher-js';
import './home.scss';

export default function Home () {
  const [playerList, setPlayerList] = useState([]);
  const [localPlayerList, setLocalPlayerList] = useState([]);
  const [deletedIndex, setDeletedIndex] = useState([]);

  useEffect(() => {
    fetchInitiatives()

    var pusher = new Pusher('7bc92185bcb752acf0f4', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('tracker-channel');
    channel.bind('update-initiative', function() {
      fetchInitiatives();
    });
  }, []);

  const fetchInitiatives = async () => {
    await axios.get('http://127.0.0.1:8000/initiatives')
      .then((res) => {
        setPlayerList(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const addPlayer = () => {
    setLocalPlayerList(
      [...localPlayerList, []]
    ); 
  }

  const clearInitiatives = async () => {
    await axios.delete('http://127.0.0.1:8000/initiatives')
    .then(() => {
      setPlayerList([]);
    })
    .catch((error) => {
      console.log(error);
    })
  }

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

      <div className="clear-initiatives">
        <Button variant="contained" color="error" size="large" onClick={clearInitiatives}>Clear initiatives</Button>
      </div>
    </div>
  );
}