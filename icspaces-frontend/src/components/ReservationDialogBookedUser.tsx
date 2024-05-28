import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid, Paper, Divider,
  IconButton, Box,
  TextField
} from "@mui/material";
import { Reservation, ReservationDataForModal } from "./types";
import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Circle from './Circle';
import './ReservationDialogConfig.css';
import ReservationDialogPopupCancel from "./ReservationDialogPopupCancel";

// Constant values for theme
const SCHEME_FONT_DEFAULT_COLOR = '#204365';
const SCHEME_FONT_GRAY_COLOR = '#acb4bc';
const SCHEME_FONT_DARKER_GRAY_COLOR = '#748391';
const SCHEME_FONT_DARK_BLUE_COLOR = '#183048';
const BUTTON_COLOR_GRAY = '#eceef0';
const SCHEME_FONT_ONLINE_FONT = '#6995ad';
const BOOKED_BG_COLOR = '#d6f4eb';
const BOOKED_FONT_COLOR = '#15bd8d';

interface ReservationDialogProps {
  open: boolean;
  onClose: () => void;
  reservation: ReservationDataForModal | null;
}

const ReservationDialogBookedUser: React.FC<ReservationDialogProps> = ({
  open,
  onClose,
  reservation,
}) => {

  const [actionTaken, setActionTaken] = useState<string | null>(null); // State variable for tracking action (approve/disapprove)
  const [cancelledDialogOpen, setCancelledDialogOpen] = useState(false);
  const [note, setNote] = useState<string>(''); // State to store the value of the TextField

  // Function to handle changes in the TextField value
  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value); // Update the state with the new value
    console.log(`note is now '${note}'`);
  };

  // Handler for the "Cancel" button click
  const handleCancel = () => {
    setActionTaken("cancel"); // Update the state to indicate approval
    setCancelledDialogOpen(true); // Open the booked dialog
  };
  
  // Handler for the "Approve" button click
  const handleCalendarButton = () => {
    window.location.href = "https://app.icspaces.online/schedulepage";
  };

  // Handler for the "Approve" button click
  const handlePermitButton = () => {

    // Fetch value from database
    fetch("https://api.icspaces.online/get-reservation-document", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reservation_id: reservation?.reservation_id }), // Uncomment this line if you need to send data in the request body
    })
      .then((response) => response.json())
      .then((data1) => {
        if (data1.permit == "" || data1.permit == null) {
          alert("There is no permit uploaded at this time!");
        } else {
          window.location.href = data1.permit;
        }
      }
    )
  };

  // Handler for the "Approve" button click
  const handleLetterButton = () => {

    // Fetch value from database
    fetch("https://api.icspaces.online/get-reservation-document", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reservation_id: reservation?.reservation_id }), // Uncomment this line if you need to send data in the request body
    })
      .then((response) => response.json())
      .then((data1) => {
        if (data1.letter == "" || data1.letter == null) {
          alert("There is no letter uploaded at this time!");
        } else {
          window.location.href = data1.permit;
        }
      }
    )
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: 'dialog-paper' }} sx={{'& .dialog-paper': {borderRadius: '25px', padding: '20px', overflow: 'auto', transform: 'scale(0.8)'}}}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      <DialogContent sx={{ overflow: 'hidden'}}>
        {reservation && (

          // for parent cotainer
          <>

            {/* <Typography className="unselectable" variant="body1">
              Transaction ID: {reservation.transactionDetails.transactionId}
            </Typography>

            <Typography className="unselectable" variant="body1">
              Date: {reservation.transactionDetails.date}
            </Typography>
            <Typography className="unselectable" variant="body1">
              Status: {reservation.transactionDetails.status}
            </Typography>
            <Typography className="unselectable" variant="body1">
              Comment: {reservation.transactionDetails.comment}
            </Typography> */}

            <Grid container spacing={0}  columns={40} padding={2}>      

            {/* Events details */}
            <Grid item xs= {30} sx={{ paddingBottom: '0px' }}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: 0 , padding: 0}}>

                {/* This is for the reservation details */}
                <Typography className="unselectable" sx={{padding:'0px', display: 'block', fontSize: '0.65vw', color:SCHEME_FONT_GRAY_COLOR}}>
                Reservation created on {reservation.reservation_date}</Typography>

                {/* This is for the location title*/}
                <Typography className="unselectable" sx={{fontWeight: 'bold', fontSize: '2.3vw', padding:'0px', paddingTop:'8px', lineHeight: '1.0', display: 'block', color:SCHEME_FONT_DARK_BLUE_COLOR}}>
                {reservation.room_name}</Typography>

                {/* This is for the event title */}
                <Typography className="unselectable" sx={{fontSize: '1vw', padding:'0px', lineHeight: '2', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR}}>
                {reservation.event_name}</Typography>
                  
                {/* Restrict area for where event description text is displayed */}
                <Box border={1} padding={0} style={{ width: '80%', border:'none'}}>
                  <Typography className="unselectable" sx={{fontSize: '0.8vw', padding:'0px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR}}>
                  {reservation.event_description}</Typography>
                </Box>
              </Paper>
            </Grid>

              {/* Modular space for the date and time */}
            <Grid item xs= {10} sx={{ height: '100%', paddingBottom:'0px'}}>
              <Paper elevation={4} sx={{ height: '100%', borderRadius: 4, padding: 1.5,
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.6)',
                  backgroundColor: '#d3dfe5',
                }}>

                    {/* This is for the day of the week */}
                    <Typography className="unselectable" sx={{fontSize: '0.7vw', textAlign: 'center', padding:'0px', color: SCHEME_FONT_DEFAULT_COLOR, lineHeight: '1.8', display: 'block'}}>
                      {reservation.reserve_day_day_string}</Typography>
                    
                    {/* This is for the day number */}
                    <Typography className="unselectable" sx={{fontWeight: 'bold', fontSize: '3.5vw', justifyContent: 'center', textAlign: 'center', padding:'0px', lineHeight: '1.06', display: 'block', color: SCHEME_FONT_DEFAULT_COLOR}}>
                    {reservation.reserve_day_number}</Typography>

                    {/* This is for the month*/}
                    <Typography className="unselectable" sx={{fontWeight: 'bold', fontSize: '1vw',  justifyContent: 'center', textAlign: 'center', padding:'0px', paddingBottom:'20px', color: SCHEME_FONT_DEFAULT_COLOR, display: 'block', lineHeight: '0.4'}}>
                    {reservation.reserve_month} </Typography>
                    
                    {/* This is for the line*/}
                    <Divider  sx={{borderTopWidth: '2px', borderTopColor: SCHEME_FONT_DARK_BLUE_COLOR}}/> 

                    <Typography className="unselectable" sx={{fontWeight: 'bold', fontSize: '70%', textAlign: 'center', padding: '0px', paddingTop: '10px', 
                        paddingBottom: '0px', color: SCHEME_FONT_DEFAULT_COLOR, lineHeight: '1.2', display: 'block', width: 'fit-content', margin: '0 auto', whiteSpace: 'nowrap'}}
                    >
                      {reservation.reserve_timeslot}
                    </Typography>
              </Paper>
            </Grid>


            {/* Row for username, email, and view calendar */}
            <Grid item xs={40} sx={{ padding: '0px' }}>
              <Grid container spacing={0} columns={80} padding={0} sx={{ paddingTop: '15px !important' }}>

                {/* Circle */}
                <Grid item xs={5} sx={{ paddingTop: '10px !important' }}>
                  <Circle color="#3572ae" size={21} />
                </Grid>

                {/* Username and Email */}
                <Grid item xs={55}>
                  <Typography className="unselectable" sx={{color: SCHEME_FONT_ONLINE_FONT, fontSize:'0.8vw'}}>
                    {reservation.user_name}
                  </Typography>
                  <Typography className="unselectable" sx={{color: SCHEME_FONT_ONLINE_FONT, fontSize:'0.65vw'}}>
                    {reservation.user_id}
                  </Typography>
                </Grid>

                {/* View Calendar Button */}
                <Grid item xs={20}>
                  <Button variant="contained" style={{ backgroundColor: BUTTON_COLOR_GRAY, color: SCHEME_FONT_DARKER_GRAY_COLOR, borderRadius: '7px', width: '100%',
                    fontSize:'0.65vw', textTransform: 'none', height:'36px', boxShadow: 'none', paddingTop: '5px'}}
                    onClick={handleCalendarButton}>
                      View Calendar
                  </Button>
                </Grid>
              </Grid>
            </Grid>


            {/* Spacer line */}
            <Grid item xs={40} sx={{paddingTop:'0px'}}>
              <Divider  sx={{ py: '10px' }}/>    
            </Grid>


            {/* Payment Details Label*/} 
            <Grid item xs= {10} sx={{ paddingTop: '25px' }}>
              <Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 0 , padding: 0, width:'100%'}}>
                <Typography className="unselectable" sx={{fontSize: '0.9vw', padding:'1px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR}}>
                  Duration:
                </Typography>
                <Typography className="unselectable" sx={{fontSize: '0.9vw', padding:'1px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR, whiteSpace: 'nowrap'}}>
                  Hourly Fee:
                </Typography>
                <Typography className="unselectable" sx={{fontSize: '0.9vw', padding:'1px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR, whiteSpace: 'nowrap'}}>
                  Overall Fee:
                </Typography>
              </Paper>
            </Grid>


            {/* Payment Details*/}
            <Grid item xs= {20} sx={{ paddingTop: '25px' }}>
              <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 0 , padding: 0}}>
                <Typography className="unselectable" sx={{fontSize: '0.9vw', padding:'1px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DEFAULT_COLOR}}>
                {reservation.duration} {reservation.duration == "1" ? "hour" : "hours"}
                </Typography>
                <Typography className="unselectable" sx={{fontSize: '0.9vw', padding:'1px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DEFAULT_COLOR}}>
                  ₱ {reservation.hourly_fee}
                </Typography>
                <Typography className="unselectable" sx={{fontSize: '0.9vw', padding:'1px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DEFAULT_COLOR}}>
                  ₱ {reservation.overall_fee}
                </Typography>
              </Paper>
            </Grid>



            {/* View Letter and View Permit area */}
            <Grid item xs= {10} sx={{ paddingTop:'25px'}}>

              {/* View Letter Button*/}
              <Button variant="contained" style={{ backgroundColor: BUTTON_COLOR_GRAY, color: SCHEME_FONT_DARKER_GRAY_COLOR, borderRadius: '7px', width: '100%', 
                fontSize:'0.65vw', textTransform: 'none', height:'32px', boxShadow: 'none', paddingTop: '5px'}}
                onClick={handleLetterButton}>
                  View Letter
              </Button>

              {/* A simple spacer */}
              <Typography className="unselectable" sx={{lineHeight:'10px'}}>{'\u00A0'}</Typography>

              {/* View permit */}
              <Button variant="contained" style={{ backgroundColor: BUTTON_COLOR_GRAY, color: SCHEME_FONT_DARKER_GRAY_COLOR, borderRadius: '7px', width: '100%', 
                    fontSize:'0.65vw', textTransform: 'none', height:'32px', boxShadow: 'none', paddingTop: '5px'}}
                    onClick={handlePermitButton}>
                      View Permit
                  </Button>
            </Grid>   


            {/* Note from staff */}
            <Box border={1} paddingTop={3} style={{ width: '100%', border:'none'}}>
              <Typography className="unselectable" sx={{textAlign: 'center', fontSize: '0.8vw', padding:'0px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR}}>
              {reservation.note_from_admin}</Typography>
            </Box>

            {/* Spacer line */}
            <Grid item xs={40} sx={{paddingBottom:'12px'}}>
              <Divider  sx={{ py: '10px' }}/>
            </Grid>     

            {/* Modular space for the date and time */}
            <Grid item xs= {20} sx={{ height: '100%', paddingBottom:'0px'}}>
              <Paper elevation={0} sx={{ height: '100%', borderRadius: 2, padding: 1, backgroundColor: BOOKED_BG_COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography className="unselectable" sx={{fontWeight: 'bold', fontSize: '1.3vw', color: BOOKED_FONT_COLOR }}>
                  Booked
                </Typography>
              </Paper>
              <Typography className="unselectable" sx={{textAlign: 'center', fontSize: '0.6vw', padding:'0px', paddingTop:'2px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR}}>
                Requested on {reservation.reservation_date}
              </Typography>
              <Typography className="unselectable" sx={{textAlign: 'center', fontSize: '0.6vw', padding:'0px', paddingTop:'2px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR}}>
                Approved on {reservation.approved_date}
              </Typography>
              <Typography className="unselectable" sx={{textAlign: 'center', fontSize: '0.6vw', padding:'0px', paddingTop:'2px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR}}>
                Paid on {reservation.payment_date}
              </Typography>
            </Grid>

            {/* Restrict area for where event description text is displayed */}
            <Box border={1} paddingTop={3} style={{ width: '100%', border:'none'}}>
              <Typography className="unselectable" sx={{textAlign: 'left', fontSize: '0.8vw', padding:'0px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DEFAULT_COLOR}}>
                The reservation holder has successfully made the payment.
              </Typography>
              <Typography className="unselectable" sx={{textAlign: 'left', fontSize: '0.8vw', padding:'0px', paddingTop:'5px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DEFAULT_COLOR}}>
                The event has been successfully booked.
              </Typography>
            </Box>
                
            {/* Reservation Paid button*/}
            <Button variant="contained" style={{ backgroundColor: '#d9d9d9', color: '#33485d', borderRadius: '25px', width: '100%', 
              fontSize:'0.83vw', height:'46px', boxShadow: 'none', paddingTop: '5px'}} onClick={handleCancel}>
                Cancel reservation
            </Button>
            </Grid>
            
            {/* Render appropriate modal based on the action taken */}
            {actionTaken === "cancel" && (
              <ReservationDialogPopupCancel open={cancelledDialogOpen} onClose={() => setCancelledDialogOpen(false)} reservation={
                {
                  reservation_id:           reservation.reservation_id,
                  status:                   reservation.status,
                  reservation_date:         reservation.reservation_date,
                  room_name:                reservation.room_name,
                  event_name:               reservation.event_name,
                  event_description:        reservation.event_description,
                  user_name:                reservation.user_name,
                  user_id:                  reservation.user_id,
                  reserve_day_day_string:   reservation.reserve_day_day_string,
                  reserve_day_number:       reservation.reserve_day_number,
                  reserve_month:            reservation.reserve_month,
                  reserve_year:             reservation.reserve_year,
                  reserve_timeslot:         reservation.reserve_timeslot,
                  duration:                 reservation.duration,
                  hourly_fee:               reservation.hourly_fee,
                  overall_fee:              reservation.overall_fee,
                  verified_date:            reservation.verified_date,
                  payment_date:             reservation.payment_date,
                  verification_date:        reservation.verification_date,
                  disapproved_date:         reservation.disapproved_date,
                  approved_date:            reservation.approved_date,
                  cancellation_date:        reservation.cancellation_date,
                  note_from_admin:          "User has cancelled their slot.",
              }} />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};





export default ReservationDialogBookedUser;