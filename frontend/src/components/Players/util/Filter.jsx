import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import './Filter.css'




export default function Filter(props) {
    const [place, setPlace] = React.useState(null);

    const placeHandler = (event) => {
        setPlace(event.target.value);
    };

    const submitHandler = (event) => {
        const datas = {
            place: place,
            payment:true
            
        }
        console.log(datas);
        props.filter(datas)
    }



    return (
    
       <Box className='flex ' sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: '50%',
            margin: "1rem",
            mr: 5,
            "@media (min-width: 992px)": {
                flexDirection: "row",
            },
            "@media (min-width: 768px)": {
                flexDirection: "row",
                mt: 5
            },
        }}>
       

            <FormControl fullWidth sx={{ mr: 3, minWidth: 115 }}>
                <InputLabel id="demo-simple-select-label">Place</InputLabel>
                <Select required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={place}
                    label="Place"
                    onChange={placeHandler}
                >
                    <MenuItem value={"Trivandrum"}>Trivandrum</MenuItem>
                    <MenuItem value={"Kollam"}>Kollam</MenuItem>
                    <MenuItem value={"Eranakulam"}>Eranakulam</MenuItem>
                </Select>
            </FormControl>

            <FormControl required sx={{ minWidth: 115 }}>
                <Button className='h-14' onClick={submitHandler} variant="contained" >Search</Button>
            </FormControl>
        </Box >





    );
}
