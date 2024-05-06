import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid, Paper, Divider,
  IconButton, Box
} from "@mui/material";
import { Reservation } from "./types";
import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Circle from './Circle';
import './ReservationDialogConfig.css';

// Constant values for theme
const SCHEME_FONT_DEFAULT_COLOR = '#204365';
const SCHEME_FONT_GRAY_COLOR = '#acb4bc';
const SCHEME_FONT_DARKER_GRAY_COLOR = '#748391';
const SCHEME_FONT_DARK_BLUE_COLOR = '#183048';
const BUTTON_COLOR_GRAY = '#eceef0';
const SCHEME_FONT_ONLINE_FONT = '#6995ad';
const DISAPPROVED_BG_COLOR = '#fedacd';
const DISAPPROVED_FONT_COLOR = '#fc8153';
const CIRCLE_COLOR = '#ffa300';


interface ReservationDialogProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation | null;
}

const ReservationDialogDisapproved: React.FC<ReservationDialogProps> = ({
  open,
  onClose,
  reservation,
}) => {
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: 'dialog-paper' }} sx={{'& .dialog-paper': {borderRadius: '25px', padding: '20px'}}}>
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

            <PopUpGrid/>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};


const PopUpGrid = () => {
  return (
    <Grid container spacing={0}  columns={40} padding={2}>      

      {/* Events details */}
      <Grid item xs= {30} sx={{ paddingBottom: '0px' }}>
        <Paper elevation={0} sx={{ p: 2, borderRadius: 0 , padding: 0}}>

          {/* This is for the reservation details */}
          <Typography className="unselectable" sx={{padding:'0px', display: 'block', fontSize: '0.65vw', color:SCHEME_FONT_GRAY_COLOR}}>
          Reservation created on April 20, 2024, Saturday, 8:42 PM</Typography>

          {/* This is for the location title*/}
          <Typography className="unselectable" sx={{fontWeight: 'bold', fontSize: '2.3vw', padding:'0px', paddingTop:'8px', lineHeight: '1.0', display: 'block', color:SCHEME_FONT_DARK_BLUE_COLOR}}>
          PC Lab Room 2</Typography>

          {/* This is for the event title */}
          <Typography className="unselectable" sx={{fontSize: '1vw', padding:'0px', lineHeight: '2', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR}}>
          ML Scream</Typography>
            
          {/* Restrict area for where event description text is displayed */}
          <Box border={1} padding={0} style={{ width: '80%', border:'none'}}>
            <Typography className="unselectable" sx={{fontSize: '0.8vw', padding:'0px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR}}>
            An event where gamers engage in thrilling 5v5 mobile MOBA combat while screaming at each other.</Typography>
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
                THURSDAY</Typography>
              
              {/* This is for the day number */}
              <Typography className="unselectable" sx={{fontWeight: 'bold', fontSize: '3.5vw', justifyContent: 'center', textAlign: 'center', padding:'0px', lineHeight: '1.06', display: 'block', color: SCHEME_FONT_DEFAULT_COLOR}}>
                04</Typography>

              {/* This is for the month*/}
              <Typography className="unselectable" sx={{fontWeight: 'bold', fontSize: '1vw',  justifyContent: 'center', textAlign: 'center', padding:'0px', paddingBottom:'20px', color: SCHEME_FONT_DEFAULT_COLOR, display: 'block', lineHeight: '0.4'}}>
                A P R I L </Typography>
              
              {/* This is for the line*/}
              <Divider  sx={{borderTopWidth: '2px', borderTopColor: SCHEME_FONT_DARK_BLUE_COLOR}}/> 

              <Typography className="unselectable" sx={{fontWeight: 'bold', fontSize: '70%', textAlign: 'center', padding: '0px', paddingTop: '10px', 
                  paddingBottom: '0px', color: SCHEME_FONT_DEFAULT_COLOR, lineHeight: '1.2', display: 'block', width: 'fit-content', margin: '0 auto', whiteSpace: 'nowrap'}}
              >
                7:00 PM - 9:00 PM
              </Typography>
        </Paper>
      </Grid>
    
      
      {/* Row for username, email, and view calendar */}
      <Grid item xs={40} sx={{ padding: '0px' }}>
        <Grid container spacing={0} columns={80} padding={0} sx={{ paddingTop: '15px !important' }}>

          {/* Circle */}
          <Grid item xs={5} sx={{ paddingTop: '10px !important' }}>
            <Circle color={CIRCLE_COLOR} size={21} />
          </Grid>

          {/* Username and Email */}
          <Grid item xs={55}>
            <Typography className="unselectable" sx={{color: SCHEME_FONT_ONLINE_FONT, fontSize:'0.8vw'}}>
              Tigershark
            </Typography>
            <Typography className="unselectable" sx={{color: SCHEME_FONT_ONLINE_FONT, fontSize:'0.65vw'}}>
              jabaltazar3@up.edu.ph
            </Typography>
          </Grid>

          {/* View Calendar Button */}
          <Grid item xs={20}>
            <Button variant="contained" style={{ backgroundColor: BUTTON_COLOR_GRAY, color: SCHEME_FONT_DARKER_GRAY_COLOR, borderRadius: '7px', width: '100%', 
              fontSize:'0.65vw', textTransform: 'none', height:'36px', boxShadow: 'none', paddingTop: '5px'}}>
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
            2 hours
          </Typography>
          <Typography className="unselectable" sx={{fontSize: '0.9vw', padding:'1px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DEFAULT_COLOR}}>
            ₱ 650.00
          </Typography>
          <Typography className="unselectable" sx={{fontSize: '0.9vw', padding:'1px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DEFAULT_COLOR}}>
            ₱ 1,300.00
          </Typography>
        </Paper>
      </Grid>



      {/* View Letter and View Permit area */}
      <Grid item xs= {10} sx={{ paddingTop:'25px'}}>

        {/* View Letter Button*/}
        <Button variant="contained" style={{ backgroundColor: BUTTON_COLOR_GRAY, color: SCHEME_FONT_DARKER_GRAY_COLOR, borderRadius: '7px', width: '100%', 
          fontSize:'0.65vw', textTransform: 'none', height:'32px', boxShadow: 'none', paddingTop: '5px'}}>
            View Letter
        </Button>

        {/* A simple spacer */}
        <Typography className="unselectable" sx={{lineHeight:'10px'}}>{'\u00A0'}</Typography>

        {/* View permit */}
        <Button variant="contained" style={{ backgroundColor: BUTTON_COLOR_GRAY, color: SCHEME_FONT_DARKER_GRAY_COLOR, borderRadius: '7px', width: '100%', 
              fontSize:'0.65vw', textTransform: 'none', height:'32px', boxShadow: 'none', paddingTop: '5px'}}>
                View Calendar
            </Button>
      </Grid>   

      
      {/* notification */}
      {/* <Box border={1} paddingTop={3} style={{ width: '100%', border:'none'}}>
        <Typography className="unselectable" sx={{textAlign: 'center', fontSize: '0.8vw', padding:'0px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR}}>
        "Make sure that everyone can hear your screaming. Sound values must always be greater than 75 decibels."</Typography>
      </Box> */}

      {/* Spacer line */}
      <Grid item xs={40} sx={{paddingBottom:'12px'}}>
        <Divider  sx={{ py: '10px' }}/>
      </Grid>     

      {/* Modular space for the date and time */}
      <Grid item xs= {20} sx={{ height: '100%', paddingBottom:'0px', paddingTop:'9px'}}>
        <Paper elevation={0} sx={{ height: '100%', borderRadius: 2, padding: 1, backgroundColor: DISAPPROVED_BG_COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography className="unselectable" sx={{fontWeight: 'bold', fontSize: '1.3vw', color: DISAPPROVED_FONT_COLOR}}>
            Disapproved
          </Typography>
        </Paper>
        <Typography className="unselectable" sx={{textAlign: 'center', fontSize: '0.5vw', padding:'0px', paddingTop:'2px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR}}>
          Disapproved on March 20, 2024, Wednesday, 10:17 AM
        </Typography>
      </Grid>

      {/* Restrict area for where event description text is displayed */}
      <Box border={1} paddingTop={3} style={{ width: '100%', border:'none'}}>
        <Typography className="unselectable" sx={{fontSize: '0.8vw', padding:'0px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DARKER_GRAY_COLOR}}>
          Reason for disapproval:</Typography> 
        <Typography className="unselectable" sx={{textAlign: 'left', fontSize: '0.8vw', padding:'0px', paddingTop:'8px', lineHeight: '1.3', display: 'block', color:SCHEME_FONT_DEFAULT_COLOR, whiteSpace: 'pre'}}>
          {'\t'}"The staff was not invited in the event."
        </Typography>
      </Box>
    </Grid>
  );
};





export default ReservationDialogDisapproved;
