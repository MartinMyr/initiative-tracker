import React from 'react';
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Grid } from '@mui/material';

export default function Player (props) {

  return (
    <FormControl fullWidth>
      <Grid container>
        <Grid item xs={6}>
          <FormLabel>Enter Name</FormLabel>
          <TextField 
            value={props.player.name} 
            onChange={(e) => props.setName(props.index, e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <FormLabel sx={{ mt: 4 }}>Initiative</FormLabel>
          <TextField 
            type="number" 
            value={props.player.initiative} 
            onChange={(e) => props.setInitiative(props.index, e.target.value)}
          />
        </Grid>

        <Button>Submit</Button>
        <Button onClick={() => {props.removePlayer(props.index)}}>Remove</Button>

      </Grid>
        
    </FormControl>
  )
    
}

Player.propTypes = {
  removePlayer: PropTypes.func,
  setInitiative: PropTypes.func,
  setName: PropTypes.func,
  index: PropTypes.number,
  player: PropTypes.object,
}