import React from "react";
import InitiativeTableComponent from '../components/InitiativeTableComponent';
import PlayerComponent from '../components/PlayerComponent';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

export default function Home () {
  const playerObj = {
    'name': '',
    'initiative': '',
  };



  const [playerList, setPlayerList] = useState([playerObj]);
  const [deletedIndex, setDeletedIndex] = useState([]);

  const setName = (index, value) => {

    let newPlayerList = [...playerList];
    newPlayerList[index].name = value;
     

  };

  const setInitiative = (index, value) => {

  };

  const addPlayer = () => {
    setPlayerList(
      [...playerList, playerObj]
     
    ); 
  };

  const removePlayer = (index) => {
    setDeletedIndex([...deletedIndex, index]);
  }
  

  return (
    <div className="home">
      <InitiativeTableComponent />
      
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
              setName={setName}
              setInitiative={setInitiative}
              />
          }
           
        })
      }
      
      <Button onClick={addPlayer}>Add player</Button>
    </div>
  );
}