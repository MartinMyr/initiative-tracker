import { useState, useEffect } from 'react';
import InitiativeTableComponent from '../../components/initiativeTableComponent/InitiativeTableComponent';
import PlayerComponent from '../../components/playerComponent/PlayerComponent';
import ConfirmationDialog from '../../components/confirmationDialog/ConfirmationDialog';
import Button from '@mui/material/Button';
import axios from 'axios';
import Pusher from 'pusher-js';
import './home.scss';

export default function Home() {
    const [playerList, setPlayerList] = useState([]);
    const [localPlayerList, setLocalPlayerList] = useState([]);
    const [deletedIndex, setDeletedIndex] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const clearInitiativesText = "Are you sure you want to delete all initiatives?";

    useEffect(() => {
        fetchInitiatives();

        var pusher = new Pusher('7bc92185bcb752acf0f4', {
            cluster: 'eu',
        });

        var channel = pusher.subscribe('tracker-channel');
        channel.bind('update-initiative', function () {
            fetchInitiatives();
        });
    }, []);

    const fetchInitiatives = async () => {
        await axios
            .get(`https://gloom-back.myrmarker.com/api/User`)
            .then((res) => {
                setPlayerList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addPlayer = () => {
        setLocalPlayerList([...localPlayerList, { name: '', initiative: '', shield: '', retaliate: '' }]);
    };

    const clearInitiatives = async () => {
        await axios
            .delete(`https://gloom-back.myrmarker.com/api/User`)
            .then(() => {
                setPlayerList([]);
                setLocalPlayerList([]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const removePlayer = (index) => {
        setDeletedIndex([...deletedIndex, index]);
        fetchInitiatives();
    };

    const editPlayer = (player) => {
        if (!localPlayerList.find((item) => item.id === player.id)) {
            setLocalPlayerList([...localPlayerList, player]);
        }
        setSelectedPlayer(player);
    };

    const handleClose = () => {
        setSelectedPlayer(null);
    };

    return (
        <div className="home">
            <InitiativeTableComponent editPlayer={editPlayer} players={playerList} removePlayer={removePlayer} />

            {localPlayerList.map((item, i) => {
                if (deletedIndex.includes(i)) {
                    return null;
                } else {
                    return (
                        <PlayerComponent
                            player={item}
                            removePlayer={removePlayer}
                            key={i}
                            index={i}
                            onClose={handleClose}
                        />
                    );
                }
            })}

            {selectedPlayer && (
                <PlayerComponent
                    player={selectedPlayer}
                    removePlayer={removePlayer}
                    index={localPlayerList.indexOf(selectedPlayer)}
                    onClose={handleClose}
                />
            )}

            <div className="add-player">
                <Button variant="contained" size="large" onClick={addPlayer}>
                    Add player
                </Button>
            </div>
            <div className="clear-initiatives">
                <ConfirmationDialog 
                    continueAction={clearInitiatives}
                    text={clearInitiativesText}
                >
                    
                        <Button variant="contained" color="error" size="large">
                            Clear initiatives
                        </Button>
                </ConfirmationDialog>
            </div>
        </div>
    );
}
