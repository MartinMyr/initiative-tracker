import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Grid } from '@mui/material';

export default function Player (props) {
  const [name, setName] = useState('');
  const [id, setId] = useState(null);

  const [initiative, setInitiative] = useState('');


  const createOrUpdatePlayer = async () => {
    let data = {
      ...(id && {_id: id}),
      name: name,
      initiative: initiative,
     
    } 
    console.log(data);
    await axios.post('http://127.0.0.1:8000/initiative', data)
    .then((res) => {
      res.data;

      setId(res.data._id);
    })
    .catch((error) => {
      console.log(error);
    })
  }

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

        <Button onClick={createOrUpdatePlayer}>Submit</Button>
        <Button onClick={() => {props.removePlayer(props.index)}}>Remove</Button>

      </Grid>
        
    </FormControl>
  )
    
}

Player.propTypes = {
  removePlayer: PropTypes.func,
  index: PropTypes.number,
  updatePlayerList: PropTypes.func,
  createOrUpdatePlayer: PropTypes.func,
}