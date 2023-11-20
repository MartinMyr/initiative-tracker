import { useState } from 'react';
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Grid } from '@mui/material';

export default function Player (props) {
  const [name, setName] = useState('');
  const [initiative, setInitiative] = useState('');

  const handleUpdatePlayer = () => {
    const updatedPlayer = {
      name,
      initiative,
    };
    
    props.updatePlayerList(props.index, updatedPlayer);
  };


  return (
    <FormControl fullWidth>
      <Grid container>
        <Grid item xs={6}>
          <FormLabel>Enter Name</FormLabel>
          <TextField 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <FormLabel sx={{ mt: 4 }}>Initiative</FormLabel>
          <TextField 
            type="number" 
            value={initiative} 
            onChange={(e) => setInitiative(e.target.value)}
          />
        </Grid>

        <Button onClick={handleUpdatePlayer}>Submit</Button>
        <Button onClick={() => {props.removePlayer(props.index)}}>Remove</Button>

      </Grid>
        
    </FormControl>
  )
    
}

Player.propTypes = {
  removePlayer: PropTypes.func,
  index: PropTypes.number,
  updatePlayerList: PropTypes.func,
}