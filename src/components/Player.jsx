import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

export default function Player () {
    return (
        <FormControl fullWidth>
            <FormLabel>Enter Name</FormLabel>
            <TextField></TextField>

            <FormLabel sx={{ mt: 4 }}>Initiative</FormLabel>
            <TextField></TextField>
            
            <Button>Submit</Button>
        </FormControl>
    )
    
}