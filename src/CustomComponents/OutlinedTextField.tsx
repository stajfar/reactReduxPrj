import React from 'react';
import { useState } from 'react';
import { TextField } from '@mui/material';

interface RatingProps {
    id?: string;
    value: number;
    updateValue: (newValue: string) => void;
}

export const OutlinedTextField: React.FC<RatingProps> = ({ id, value, updateValue }) => {
   

    return (
        <div id='#/properties/rating1' className='rating1'>

            <TextField fullWidth id="outlined-basic1" label="Some Test Lable text" variant="outlined" onChange={(e) => updateValue(e.target.value)} />
           
        </div>
    );
};