import { Box, Stack, Grid,Typography,Button,TextField, Card, FormControlLabel, Checkbox, FormGroup, FormControl} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeBG from "../assets/room_images/HomeBG.png";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';

const RoomReservationForm = () => {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    function OSASubmit(){
        
        var name = document.getElementById('osafile'); 
        console.log("name: "+name);
        
    };

    function LetterSubmit(){
        console.log("meow");
    };

    const timeslots = [
        '9 to 10:00'
        ,'10 to 11:00'
        ,'11:00 to 12:00'
        ,
        '11:00 to 12:00'
        ,
        '11:00 to 12:00'
      ];
      
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [contact,setContact]=useState();
    const [letterUploaded,setletterUploaded]=useState();
    const [permitUploaded,setpermitUploaded]=useState();
    console.log(window.location.pathname);
    return (
        <>

            <Grid container height='40%' mt={5} alignSelf={'center'}  overflow='auto' mb={'4em'}   sx={{ direction: { xs: 'row', sm: 'column' }   }}>

                {/* Back Button */}
                <Grid item xs={12} justifyContent='flex-end'  > 
                    <Stack direction='row' spacing={3} alignItems="center" >
                        <Link to='/roompage' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button variant='contained' size='small' sx={{backgroundColor:'#D9D9D9', color:'#183048',textTransform: 'none'}}>
                            <ArrowBackIosNewIcon  sx={{ fontSize: {xs:20}, color: '#183048' }}/>
                            <Typography variant='h5' sx={{fontSize: {xs:20}}}>Back</Typography>
                        </Button>
                        </Link>
                        <Typography variant='h4'  sx={{  fontSize: {xs:20},color:'#183048'}}>Room Reservation Form</Typography>
                    </Stack>
                </Grid>
                <FormControl>
                <Grid container mt={2} sx={{borderRadius:'15px'}}  style={{overflowY:'hidden'}}>
               {/* User details Pic and timeslots */}
              
               <Grid item xs={12} md={4} bgcolor='#EEEEEE' padding={2} >
                    <Stack spacing={2} textAlign='left' >
                        <Typography  >Name*</Typography>
                        <TextField size='small' variant="outlined" required/>
                        <Typography >Email*</Typography>
                        <TextField size='small'  variant="outlined"/>
                        <Typography >Contact*</Typography>
                        <TextField size='small' variant="outlined"/>

                        <Card sx={{ backgroundColor:'#D9D9D9', borderRadius:'15px', padding:3}} >
                                <Box >
                                    <Stack spacing={2} >
                                        <Box>
                                            <Typography variant='h6' align='left'>Letter addressed to dean</Typography>
                                            <Typography variant='subtitle2'>Must be signed by junior or senior faculty adviser</Typography>
                                        </Box>
                                    
                                        <Button component="label" onClick={LetterSubmit} sx={{backgroundColor:'#F1F1F1', minWidth:'100px',maxWidth: "100px"}} size='small' aria-required>
                                            Choose file
                                            <VisuallyHiddenInput id='letterfile' type="file" />
                                        </Button>
                                        <Typography>OSA activity permit</Typography>
                                 
                                        <Stack direction={{xs:"column", md:"row"}} justifyContent='space-between'  >
                                            <Button  component="label" onClick={OSASubmit} sx={{backgroundColor:'#F1F1F1', minWidth:'100px',maxWidth: "100px", padding:'0'}} size='small'aria-required>
                                                Choose file
                                                <VisuallyHiddenInput id='osafile' type="file" />
                                            </Button>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox defaultChecked />} label="Check if N/A" />
                                                
                                            </FormGroup>
                                        </Stack>

                                    </Stack>
                            
                                </Box>
                        </Card>

                        
                    </Stack>
                  
                    </Grid>
                {/* Event information and Submit */}
                  <Grid item xs={12} md={4} sx={{backgroundColor:'#E9E9E9',}} textAlign='left' padding={2}>
                    <Stack padding={3} spacing={1}   >
                                <Typography>You are reserving</Typography>
                                <Typography variant='h4'>PC LAB 3</Typography>
                                <Box 
                                sx={{
                                    minHeight:'30vh',
                                    backgroundColor: 'white', backgroundImage: `url(${HomeBG})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: 'cover',
                                    borderRadius:'15px'
                                }}/>
                                <Stack direction='row' spacing={2}>
                                
                                    {/* <Typography variant='subtitle2'>Date </Typography>
                                    <TextField size='small' sx={{maxWidth:'10%',}} inputProps={{ style: { padding: '1px' } }}></TextField> */}
                                    
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        sx={{maxWidth:'80%'}}
                                        label="Enter the Date"
                                        slotProps={{
                                        textField: {
                                            helperText: 'MM/DD/YYYY',
                                        },
                                        }}
                                    />
                                    </LocalizationProvider>
                                </Stack>
                                <Typography >Timeslot/s Reserved</Typography>
                                <Grid container columnSpacing={2} rowSpacing={1} sx={{Height:'auto'}}>
                    
                                        {timeslots.map((timeslots) => (
                                            <Grid item>
                                                <Button sx={{backgroundColor:'#CBCBCB',}}>{timeslots}</Button>
                                            </Grid>
                                        ))}
                                </Grid>
                        </Stack>           
                  </Grid>
                  <Grid item xs={12} md={4} padding={2} sx={{backgroundColor:'#E9E9E9'}} >
                    <Stack spacing={2}  >
                        <Typography align='left' >Event Name</Typography>
                        <TextField size='small' variant="outlined"/>
                        <Typography align='left'>Event Details</Typography>
                        <TextField
                            label='Enter text here...'
                            InputProps={{
                                rows: 4,
                                multiline: true,
                                inputComponent: 'textarea',         
                            }}         
                        />    
                        <Box justifyContent={'center'} >
                            <Button   sx={{backgroundColor:'#FFB532', maxWidth:'100%' }} size='large' >Submit</Button>   
                        </Box>                                
                    </Stack>
                  </Grid>
                   {/* Event information and Submit */}
                     
                </Grid>

                </FormControl>            
          </Grid>
          
         
        </>

        
    )
}

export default RoomReservationForm;