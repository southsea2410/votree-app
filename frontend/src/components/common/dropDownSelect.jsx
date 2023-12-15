import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropDownSelect({
    field = 'Method',
    list = ['Cash', 'Banking', 'Momo', 'VNPay']
}) {
    const [selection, setSelection] = React.useState(list[0] || '');

    const handleChange = (event) => {
        setSelection(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{field}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selection}
                    label={field}
                    onChange={handleChange}>
                    {list.map((method, index) => (
                        <MenuItem key={index} value={method}>
                            {method}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
