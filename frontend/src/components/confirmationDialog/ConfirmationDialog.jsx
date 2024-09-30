import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import './confirmationDialog.scss';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ConfirmationdDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => { 
    setOpen(false);
  };

  const handleConfirm = () => { 
    props.continueAction();
    setOpen(false);
  };

  return (
    <React.Fragment>
      {React.cloneElement(props.children, { onClick: handleClickOpen })}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Confirmation
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            {props.text}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={{color: "red"}} autoFocus onClick={handleConfirm}>
            Yes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

ConfirmationdDialogs.protoType = {
    continueAction: PropTypes.func,
    text: PropTypes.string,

}