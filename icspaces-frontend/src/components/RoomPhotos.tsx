import { Divider, Grid, Stack, Typography, Button } from "@mui/material";
import roomImage from "../assets/room_images/ICS_2.jpg";
import roomImage2 from "../assets/room_images/ICS_3.jpg";
import React, { useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const RoomPhotos = () => {
    return(
        <Stack direction='column' spacing={1} sx={{overflow:'auto'}}>
            <Divider />
            <Typography
                variant='h4'
                fontWeight='bold'
                sx={{textAlign:'start'}}
            > Current Photos</Typography>

            <Grid container spacing={1}>
                <Grid item xs={3} >
                    <img src={roomImage} style={{borderRadius: '16px'}} width='100%' alt="temporary picture" />
                </Grid>
                <Grid item xs={3}>
                    <img src={roomImage2} style={{borderRadius: '16px'}} width='100%'  alt="temporary picture" />
                </Grid>
                <Grid item xs={3}>
                    <img src={roomImage2} style={{borderRadius: '16px'}} width='100%'  alt="temporary picture" />
                </Grid>
                <Grid item xs={3}>
                    <img src={roomImage2} style={{borderRadius: '16px'}} width='100%'  alt="temporary picture" />
                </Grid>
                <Grid item xs={3}>
                    <img src={roomImage2} style={{borderRadius: '16px'}} width='100%'  alt="temporary picture" />
                </Grid>
                <Grid item xs={3}>
                    <Button
                        fullWidth
                        variant="contained"
                        component='label'
                        startIcon={<AddCircleOutlineIcon fontSize="large" />}
                        sx={{height:'100%', backgroundColor:'#CCCCCC', borderRadius: '16px','&:hover': {
                            backgroundColor: 'lightgrey',
                          }}}
                        >
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default RoomPhotos;