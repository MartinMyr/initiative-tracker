import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Checkbox, FormControl, FormLabel, Grid } from '@mui/material';
import './playerComponent.scss';

export default function Player (props) {
  const [name, setName] = useState('');
  const [id, setId] = useState(null);
  const [initiative, setInitiative] = useState('');
  const [useEffects, setUseEffects] = useState(false);
  const [shield, setShield] = useState('');
  const [retaliate, setRetaliate] = useState('');

  useEffect(() => {
    setId(props.player?._id || '');
    setName(props.player?.name || '');
    setInitiative(props.player?.initiative || '');
    setShield(props.player?.shield || '');
    setRetaliate(props.player?.retaliate || '');
  }, [props.player]);

  const createOrUpdatePlayer = async () => {
    let data = {
      ...(id && {_id: id}),
      name: name,
      initiative: initiative,
      shield: shield,
      retaliate: retaliate,
    } 

    await axios.post(`http://localhost:3000/initiative`, data)
    .then((res) => {
      res.data;

      setId(res.data._id);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <FormControl 
      fullWidth
      sx={{paddingTop: '40px', borderBottom: '1px solid black', background: '#ffff'}}
    
    >
      <Grid container justifyContent={'center'}>
        <Grid  
          container
          direction="row"
          justifyContent="center" 
          item xs={6}
        >
          <TextField 
          label="Enter Name"
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid 
          container
          direction="row"
          justifyContent="center" 
          item xs={4}
        >
          <TextField 
            label="Initiative"
            type="number" 
            value={initiative} 
            onChange={(e) => setInitiative(e.target.value)}
          />
        </Grid>
        <Grid 
          container
          direction="row"
          justifyContent="center" 
          item xs={2}
        >
          <Checkbox 
            label="Effects?"
            value={useEffects} 
            onChange={(e) => setUseEffects(useEffects => !useEffects)}
          />
        </Grid>

        {useEffects ?
          <Grid 
            container 
            justifyContent={'center'}
          >
            <Grid 
              container
              direction="row"
              justifyContent="center" 
              item xs={3}
              marginTop={2}
            >
              <TextField 
                label="Shield"
                type="number" 
                value={shield} 
                onChange={(e) => setShield(e.target.value)}
              />
            </Grid>
            <Grid 
              container
              direction="row"
              justifyContent="center" 
              item xs={3}
              marginTop={2}
            >
              <TextField 
                label="Retaliate"
                type="number" 
                value={retaliate} 
                onChange={(e) => setRetaliate(e.target.value)}
              />
            </Grid>
          </Grid>
          : ''
        }

        <Grid 
          container
          direction="row"
          justifyContent="center"
        >
          <Button onClick={createOrUpdatePlayer}>Submit</Button>
          <Button onClick={() => {props.removePlayer(props.index)}}>Remove</Button>
        </Grid>
       

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