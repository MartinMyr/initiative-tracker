import { useState, useEffect } from 'react';
import InitiativeTableComponent from '../components/InitiativeTableComponent';
import PlayerComponent from '../components/PlayerComponent';
import Button from '@mui/material/Button';

export default function Home () {
  const playerObj = {
    'name': '',
    'initiative': '',
  };

  const [playerList, setPlayerList] = useState([playerObj]);
  const [deletedIndex, setDeletedIndex] = useState([]);


  const addPlayer = () => {
    setPlayerList(
      [...playerList, playerObj]
     
    ); 
  };

  const removePlayer = (index) => {
    setDeletedIndex([...deletedIndex, index]);
  }

  const updatePlayerList = (index, updatedPlayer) => {
    const updatedList = playerList.map((player, i) => {
      if (i === index) {
        return updatedPlayer;
      }
      return player;
    });
    setPlayerList(updatedList);
  };
  

  return (
    <div className="home">
      <InitiativeTableComponent players={playerList} deletedIndex={deletedIndex} />
      
      {
        playerList.map((item ,i) => {
          if(deletedIndex.includes(i)){
            return null;
          }else{
            return <PlayerComponent 
              player={item} 
              removePlayer={removePlayer} 
              key={i} 
              index={i}
              updatePlayerList={updatePlayerList}
              />
          }
           
        })
      }
      
      <Button onClick={addPlayer}>Add player</Button>
    </div>
  );
}