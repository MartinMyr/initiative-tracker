import PropTypes from 'prop-types'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function InitiativeTableComponent(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="50%">Name</TableCell>
            <TableCell width="50%">Initiative</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.players.map((player, index) => {
              if(player.name){
                return ( 
                  <TableRow key={index}>
                    <TableCell width="50%">{player.name}</TableCell>
                    <TableCell width="50%">{player.initiative}</TableCell>
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