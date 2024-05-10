import { Box, Stack, Grid,Typography,Button,TextField, Card, FormControlLabel, Checkbox, FormGroup, FormControl, Dialog} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeBG from "../assets/room_images/HomeBG.png";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import axios from "axios";
const RoomReservationForm = () => {


    const location=useLocation();

    useEffect(() => {
        const costCalculator = async () => {
            let start=startTime.slice(0,2);
            let end=endTime.slice(0,2);
            console.log("Cost")
            console.log(start)
            console.log(end)
            let cost1 =  (Number(end)-Number(start)) * Number( hourlyFee);
            console.log(cost1);
            setsumCost(cost1);
        }
        const fetchRoomInfo = async () => {
            fetch('https://api.icspaces.online/get-room-info', {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({room_id}), // Uncomment this line if you need to send data in the request body
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        setRoomName(data.room.room_name);
        sethourlyFee(data.room.fee);

    });    
        };

    fetchRoomInfo();
    costCalculator()
    },);


    useEffect(() => {
    const receivedValues=location.state;
    console.log("Received this")
    console.log(receivedValues);
    setroom_id(receivedValues.room_id);
    setDate(receivedValues.date);
    setstartTime(receivedValues.start_dateTime)
    setendTime(receivedValues.end_dateTime)

    const fetchUser = async () => {
        try {
            const response = await axios.get("https://api.icspaces.online/get-profile", {
                withCredentials: true,
            });

            if (response.data.success) {
                const user = response.data.data;
                setEmail(user.email);
                setName(user.displayname)
                setloggedIn(true);
            } else {
                throw new Error(response.data.errmsg);
                setloggedIn(false);
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setloggedIn(false);
        }
    };

    fetchUser();  
    // app.post('/get-room-info', getRoomInfo)

        if(receivedValues.start_dateTime===undefined ||receivedValues.start_dateTime===""  ){
            alert("Select Time First");
            window.location.href = "https://app.icspaces.online/roompage/"+room_id
        }


    }, []);

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

    };        

  
      
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [contact,setContact]=useState('');
    const [roomName,setRoomName]=useState('');
    const [eventName,seteventName]=useState('');
    const [date,setDate]=useState('');
    const [startTime,setstartTime]=useState('');
    const [endTime,setendTime]=useState('');
    const [hourlyFee,sethourlyFee]=useState('');
    const [sumCost,setsumCost]=useState(0);
    const [eventDetails,seteventDetails]=useState('');
    const [submitFail,setsubmitFail]=useState(false);
    const zero=0;
    const [letterUploaded,setletterUploaded]=useState();
    const [permitUploaded,setpermitUploaded]=useState();
    const [room_id,setroom_id]=useState(1);
    const [loggedIn,setloggedIn]=useState(false);
    const [open, setOpen] = useState(false);

    
    const HandleSubmit = (e:any) => {
        e.preventDefault();
        console.log("Submitting")
        console.log({name,email,contact,eventName,eventDetails})
        fetch('https://api.icspaces.online/add-reservation', {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                activity_name:eventName,
                room_id: room_id,user_id:email,discount:zero,additional_fee:zero,total_amount_due:sumCost,status_code:zero}), // Uncomment this line if you need to send data in the request body
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.href = "https://app.icspaces.online/homepage"
        })
        .catch(err => {
            console.log(err)
            setsubmitFail(true);
        }
    )

        // app.post('/add-reservation', addReservation)
    }
    return (
        <>
            <form  className="loginform"  onSubmit={HandleSubmit}>
            <FormGroup>
            
            <Grid container height='40%' mt={5} alignSelf={'center'}  overflow='auto' mb={'4em'}   sx={{ direction: { xs: 'row', sm: 'column' }   }}>

                {/* Back Button */}
                <Grid item xs={12} justifyContent='flex-end'  > 
                    <Stack direction='row' spacing={3} alignItems="center" >
                        <Link to={'/roompage/'+room_id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button variant='contained' size='small' sx={{backgroundColor:'#D9D9D9', color:'#183048',textTransform: 'none'}}>
                            <ArrowBackIosNewIcon  sx={{ fontSize: {xs:20}, color: '#183048' }}/>
                            <Typography variant='h5' sx={{fontSize: {xs:20}}}>Back</Typography>
                        </Button>
                        </Link>
                        <Typography variant='h4'  sx={{  fontSize: {xs:20},color:'#183048'}}>Room Reservation Form</Typography>
                    </Stack>
                </Grid>
                
               
                <Grid container mt={2} sx={{borderRadius:'15px'}}  style={{overflowY:'hidden'}}>
              
               {/* User details*/}
               
               <Grid item xs={12} md={4} bgcolor='#EEEEEE' padding={2} >
                    <Stack spacing={2} textAlign='left' >
                        <Typography  >Name*</Typography>
                        <TextField size='small' value={name} variant="outlined" required type='text' onChange={(e) => setName(e.target.value)}/>
                        <Typography >Email*</Typography>
                        <TextField size='small' value={email} variant="outlined" required type='text' onChange={(e) => setEmail(e.target.value)}/>
                        <Typography >Contact*</Typography>
                        <TextField size='small' variant="outlined" required type='text' onChange={(e) => setContact(e.target.value)}/>

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
                                           
                                                <FormControlLabel control={<Checkbox defaultChecked />} label="Check if N/A" />
                                                
                                          
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
                                <Typography variant='h4'>{roomName}</Typography>
                                <Box 
                                sx={{
                                    minHeight:'30vh',
                                    backgroundColor: 'white', backgroundImage: `url(${HomeBG})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: 'cover',
                                    borderRadius:'15px'
                                }}/>
                                <Stack direction='row' spacing={2}>
                                
                                    <Typography variant='subtitle2'>Date: &nbsp; </Typography>
                                    <Typography>{date}</Typography>
                                    
                                    
                                </Stack>
                                <Typography >Timeslot/s Reserved</Typography>
                                <Stack direction='row' spacing={1} justifyContent='flex-start'>
                    
                                        
                                   
                                                <Typography sx={{backgroundColor:'#CBCBCB', borderRadius:'15px'}} padding={1}>{startTime}</Typography> 
                                         
                                       
                                                <Typography  padding={1}>to </Typography> 
                                          
                                       
                                                <Typography sx={{backgroundColor:'#CBCBCB',borderRadius:'15px'}} padding={1}>{endTime}</Typography> 
                                    
                                </Stack>
                                <Typography variant='subtitle1'>Overall Cost:  {sumCost}</Typography>
                        </Stack>           
                  </Grid>
                  <Grid item xs={12} md={4} padding={2} sx={{backgroundColor:'#E9E9E9'}} >
                    <Stack spacing={2}  >
                        <Typography align='left' >Event Name</Typography>
                        <TextField size='small' variant="outlined" required type='text' onChange={(e) => seteventName(e.target.value)} />
                        <Typography align='left'>Event Details</Typography>
                        <TextField
                            label='Enter text here...'
                            InputProps={{
                                rows: 4,
                                multiline: true,
                                inputComponent: 'textarea',         
                            }}        
                            onChange={(e) => seteventDetails(e.target.value)} 
                            required
                        />    
                        <Box justifyContent={'center'} >
                            <Button type='submit'  sx={{backgroundColor:'#FFB532', maxWidth:'100%' }} size='large' >Submit</Button>   
                        </Box>   
                                                 
                    </Stack>
                  </Grid>
                   {/* Event information and Submit */}
            
     
                </Grid>
                
                          
          </Grid>
          </FormGroup>
          </form>
        </>

        
    )
}

export default RoomReservationForm;