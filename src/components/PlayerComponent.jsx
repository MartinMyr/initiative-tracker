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
          <TextField></TextField>
        </Grid>

        <Grid item xs={6}>
          <FormLabel sx={{ mt: 4 }}>Initiative</FormLabel>
          <TextField type="number"></TextField>
        </Grid>

        <Button>Submit</Button>
        <Button onClick={() => {props.removePlayer(props.componentIndex)}}>Remove</Button>

      </Grid>
        
    </FormControl>
  )
    
}

Player.propTypes = {
  removePlayer: PropTypes.func,
  componentIndex: PropTypes.number,
}