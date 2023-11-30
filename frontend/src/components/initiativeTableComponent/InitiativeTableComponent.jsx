import PropTypes from 'prop-types'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './initiativeTableComponent.scss';

export default function InitiativeTableComponent(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="50%" sx={{fontSize: '32px', textAlign: 'center'}}>Name:</TableCell>
            <TableCell width="50%" sx={{fontSize: '32px', textAlign: 'center'}}>Initiative:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='table-body'>
          {
            props.players.map((player, index) => {
              if(player.name){
                return ( 
                  <TableRow key={index}>
                    <TableCell width="50%" sx={{fontSize: '22px', textAlign: 'center'}}>{player.name}</TableCell>
                    <TableCell width="50%" sx={{fontSize: '22px', textAlign: 'center'}}>{player.initiative}</TableCell>
                  </TableRow>
                )
              }
            })
          }
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}

InitiativeTableComponent.propTypes = {
  players: PropTypes.array,
}