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
const BOOKED_BG_COLOR = '#d6f4eb';
const BOOKED_FONT_COLOR = '#15bd8d';

interface ReservationDialogProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation | null;
}

const ReservationDialogPopupPayment: React.FC<ReservationDialogProps> = ({
  open,
  onClose,
  reservation,
}) => {

  // Handles approved accept operation
  const handleCancel = () => {
    onClose();
  }

  // Handles approved accept operation
  const handlePayment = () => {

    // perform action here
    window.location.reload(); 
  }
  

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

            <Grid container spacing={2}  columns={40} padding={2}>      

              {/* Events details */}
              <Grid item xs= {40} sx={{ paddingBottom: '0px' }}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 0 , padding: 0}}>

                  {/* Notification Title*/}
                  <Typography className="unselectable" sx={{fontWeight: 'bold', fontSize: '1.8vw', padding:'0px', paddingTop:'8px', lineHeight: '1.0', display: 'block', color:SCHEME_FONT_DARK_BLUE_COLOR, textAlign:'center'}}>
                  Set reservation as paid?</Typography>

                  {/* Notification Title*/}
                  <Typography className="unselectable" sx={{fontSize: '1.1vw', padding:'0px', paddingTop:'25px', lineHeight: '1.5', display: 'block', color:SCHEME_FONT_GRAY_COLOR, textAlign:'center'}}>
                  The reservation status will be set to 'booked', thus finalizing the reservation. This action can't be undone.</Typography>
                </Paper>
              </Grid>


              {/* Spacer only */}
              <Grid item xs={40}>
                <Typography className="unselectable"> </Typography>
              </Grid>
              <Grid item xs={40}>
                <Typography className="unselectable"> </Typography>
              </Grid>
                        
              {/* Reservation Paid button */}
              <Grid item xs= {20} sx={{ paddingTop: '20px' }}>  
                <Button variant="contained" style={{ backgroundColor: BUTTON_COLOR_GRAY, color: SCHEME_FONT_GRAY_COLOR, borderRadius: '25px', width: '100%', 
                  fontSize:'0.83vw', height:'46px', boxShadow: 'none', paddingTop: '5px'}} onClick={handleCancel}>
                    Cancel
                </Button>
              </Grid>
              
              {/* Reservation Paid button */}
              <Grid item xs= {20} sx={{ paddingBottom: '0px' }}>  
                <Button variant="contained" style={{ backgroundColor: '#ffb532', color: '#183048', borderRadius: '25px', width: '100%', 
                  fontSize:'0.83vw', height:'46px', boxShadow: 'none', paddingTop: '5px'}} onClick={handlePayment}>
                    Paid
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};




export default ReservationDialogPopupPayment;
