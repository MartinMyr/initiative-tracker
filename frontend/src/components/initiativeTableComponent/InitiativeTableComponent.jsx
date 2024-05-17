import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import Player from '../playerComponent/PlayerComponent';
import './initiativeTableComponent.scss';
import { useState } from 'react';

export default function InitiativeTableComponent(props) {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [open, setOpen] = useState(false);

    const editPlayer = (player) => {
        setSelectedPlayer(player);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPlayer(null);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width="45%" sx={{ fontSize: '32px', textAlign: 'center' }}>Name:</TableCell>
                            <TableCell width="5%" sx={{ fontSize: '22px', textAlign: 'center', position: "relative" }}>
                                <img className="icons" src="gloomhaven-shield.png" alt="" />
                            </TableCell>
                            <TableCell width="5%" sx={{ fontSize: '22px', textAlign: 'center', position: "relative" }}>
                                <img className="icons" src="retaliate-icon.png" alt="" />
                            </TableCell>
                            <TableCell width="45%" sx={{ fontSize: '32px', textAlign: 'center' }}>Initiative:</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='table-body'>
                        {
                            props.players.map((player, index) => {
                                if (player.name) {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell width="45%" sx={{ fontSize: '22px', textAlign: 'center' }}>{player.name}</TableCell>
                                            <TableCell width="5%" sx={{ fontSize: '22px', textAlign: 'center', position: "relative" }}>
                                                {player.shield}
                                            </TableCell>
                                            <TableCell width="5%" sx={{ fontSize: '22px', textAlign: 'center', position: "relative" }}>
                                                {player.retaliate}
                                            </TableCell>
                                            <TableCell width="45%" sx={{ fontSize: '22px', textAlign: 'center', position: "relative" }}>
                                                {player.initiative}
                                                <CreateIcon
                                                    onClick={() => editPlayer(player)}
                                                    sx={{
                                                        position: "absolute", right: "15px",
                                                        top: "50%", transform: "translateY(-50%)",
                                                        color: "rgb(4, 59, 91)", '&:hover': { cursor: "pointer" }
                                                    }}>
                                                </CreateIcon>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedPlayer && (
                <Player
                    player={selectedPlayer}
                    removePlayer={props.removePlayer}
                    index={props.players.indexOf(selectedPlayer)}
                    updatePlayerList={props.updatePlayerList}
                    createOrUpdatePlayer={props.createOrUpdatePlayer}
                    open={open}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}

InitiativeTableComponent.propTypes = {
    players: PropTypes.array,
    editPlayer: PropTypes.func,
    removePlayer: PropTypes.func.isRequired, // Ensure removePlayer is marked as required
    updatePlayerList: PropTypes.func,
    createOrUpdatePlayer: PropTypes.func,
};
