import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Modal, Box } from '@mui/material';
import './playerComponent.scss';

export default function Player(props) {
    const [name, setName] = useState('');
    const [id, setId] = useState(null);
    const [initiative, setInitiative] = useState('');
    const [shield, setShield] = useState('');
    const [retaliate, setRetaliate] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (props.player) {
            setId(props.player._id || '');
            setName(props.player.name || '');
            setInitiative(props.player.initiative || '');
            setShield(props.player.shield || '');
            setRetaliate(props.player.retaliate || '');
            setOpen(true);
        }
    }, [props.player]);

    const createOrUpdatePlayer = async () => {
        let data = {
            ...(id && { _id: id }),
            name: name,
            initiative: initiative,
            shield: shield,
            retaliate: retaliate,
        };

        await axios.post(`https://gloom-back.myrmarker.com/initiative`, data)
            .then((res) => {
                res.data;
                setId(res.data._id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deletePlayer = async () => {
        await axios.delete(`https://gloom-back.myrmarker.com/initiative/${id}`)
            .then(() => {
                props.removePlayer(props.index);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSave = () => {
        createOrUpdatePlayer();
        handleClose();
    };

    const handleRemove = () => {
        deletePlayer();
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: 300, sm: 400, md: 500 },
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <TextField
                            label="Enter Name"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Initiative"
                            type="number"
                            fullWidth
                            value={initiative}
                            onChange={(e) => setInitiative(e.target.value)}
                            sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Shield"
                            type="number"
                            fullWidth
                            value={shield}
                            onChange={(e) => setShield(e.target.value)}
                            sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Retaliate"
                            type="number"
                            fullWidth
                            value={retaliate}
                            onChange={(e) => setRetaliate(e.target.value)}
                            sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}
                        />
                    </Grid>
                    <Grid item xs={12} container justifyContent="center" spacing={2}>
                        <Grid item>
                            <Button
                                onClick={handleSave}
                                sx={{
                                    fontSize: { xs: '14px', sm: '16px', md: '18px' },
                                    padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' },
                                    bgcolor: '#4b8df8',
                                    color: 'white',
                                    '&:hover': { bgcolor: '#3c7bd9' },
                                }}
                            >
                                Save
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                disabled={!id}
                                onClick={handleRemove}
                                sx={{
                                    fontSize: { xs: '14px', sm: '16px', md: '18px' },
                                    padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' },
                                    bgcolor: '#e50000',
                                    color: 'white',
                                    '&:hover': { bgcolor: '#cc0000' },
                                }}
                            >
                                Remove
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

Player.propTypes = {
    removePlayer: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    updatePlayerList: PropTypes.func,
    createOrUpdatePlayer: PropTypes.func,
    player: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};
