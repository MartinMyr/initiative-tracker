import React from "react";
import InitiativeTableComponent from '../components/InitiativeTableComponent';
import PlayerComponent from '../components/PlayerComponent';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Home () {
  const [timesRenderPlayer, setTimesRenderPlayer] = useState(Array());

  const addPlayer = () => {
    setTimesRenderPlayer([...timesRenderPlayer, 0]);
  };

  const removePlayer = (index) => {
    setTimesRenderPlayer([...timesRenderPlayer.splice(index, 1)]);
  }

  return (
    <div className="home">
      <InitiativeTableComponent />
      { 
        timesRenderPlayer.map((_, index) => <PlayerComponent removePlayer={removePlayer} key={index} componentIndex={index}/>) 
      }
      
      <Button onClick={addPlayer}>Add player</Button>
    </div>
  );
}