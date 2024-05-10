import { Box, Typography, Stack, Button, useMediaQuery, useTheme, Switch, Divider, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import {Link } from "react-router-dom";

interface HourButtonsProps {
    availableTimes?: any;
  }
const HourButtons : React.FC<HourButtonsProps> = ({
    availableTimes,
  }) => {
    const { room_id } = useParams<{ room_id: string }>();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [selectedTime, setSelectedTime] = useState(['']);
    const [activeButton, setActiveButton] = useState(null);
    const [activeButton2, setActiveButton2] = useState(null);
    const [data1, setData1] = useState('');
    const [data2, setData2] = useState('');   
    const valuesToSend = {
        start_dateTime: data1,
        end_dateTime: data2,
        room_id: room_id,
        date: "Thurs Dec 03 2020"
    }

    const handleClicked = (text:string) => {
        const newSelectedTime = [...selectedTime];
        if (newSelectedTime.includes(text)) {
            const removeIndex = newSelectedTime.indexOf(text);
            newSelectedTime.splice(removeIndex, 1);
        } else{
            newSelectedTime.push(text);
        }
        newSelectedTime.sort();
        setSelectedTime(newSelectedTime);
        setData1(newSelectedTime[1]);
        const timeParts = newSelectedTime[newSelectedTime.length -1].split(':');
        let hours = parseInt(timeParts[0], 10);
        hours = (hours + 1)
        const newTimeString = `${hours.toString().padStart(2, '0')}:00:00`;
        setData2(newTimeString);
    }

    const handleClick = (index:any) => {
        setActiveButton(index);
      };
      const handleClick2 = (index:any) => {
        setActiveButton2(index);
      };


    const handleSwitchChange = () => {
        setIsSwitchOn(!isSwitchOn);
    };
    const buttonStyle = {
        textTransform: "none",
        backgroundColor: '#white',
        height: isSmallScreen ? "0.875rem" : "23px",
        width: '100%',
        color: '#828282', 
        borderRadius: '20px',
        fontSize: isSmallScreen ? "8px" : "13px",
        '&:hover': {
            backgroundColor: 'lightgrey',
          },
    };

    const buttonStyle2 = {
        textTransform: "none",
        // backgroundColor: isClicked ? '#183048' : '#white',
        backgroundColor: 'white',
        height: isSmallScreen ? "0.5rem" : "23px",
        width: isSmallScreen ? "0.5rem" :'100%',
        color: '#828282', 
        borderRadius: '10px',
        fontSize: isSmallScreen ? "3px" : "10px",   
        padding: '0',
        '&:hover': {
            backgroundColor: 'lightgrey',
          },
    };

    const buttonStyle3 = {
        textTransform: "none",
        backgroundColor: '#183048',
        height: isSmallScreen ? "0.875rem" : "23px",
        width: '100%',
        color: '#828282', 
        borderRadius: '20px',
        fontSize: isSmallScreen ? "8px" : "13px",
        '&:hover': {
            backgroundColor: 'lightgrey',
          },
    };
    const buttonStyle4 = {
        textTransform: "none",
        // backgroundColor: isClicked ? '#183048' : '#white',
        backgroundColor: '#183048',
        height: isSmallScreen ? "0.5rem" : "23px",
        width: isSmallScreen ? "0.5rem" :'100%',
        color: '#828282', 
        borderRadius: '10px',
        fontSize: isSmallScreen ? "3px" : "10px",   
        padding: '0',
        '&:hover': {
            backgroundColor: 'lightgrey',
          },
    };

    const boxStyle = {
        backgroundColor: '#F2F2F2',
        display: 'fixed',
        height: '50%',
        width: '35%',
        borderRadius: '16px',
        overflow: "auto",
      };

    
    const textStyle ={
        textAlign: "start",
        color: '#2D5378',
        fontSize: isSmallScreen ? "6px" : "14px",
    }
    
      
    const amButtons = availableTimes?.slice(7,12)
    const pmButtons = availableTimes?.slice(12,21)
    const selectedButtons1 = ["7-8 AM", "8-9 AM", "9-10 AM", "10-11 AM", "11-12 PM", "12-1 PM"]
    const selectedButtons2 = ["1-2 PM", "2-3 PM", "3-4 PM", "4-5 PM", "5-6 PM", "6-7 PM", "7-8 PM", "8-9 PM", "9-10 PM", ]
        
    const renderButtons = () => {
        if (isSwitchOn) {
          // Render set of buttons when the switch is on
          return (
            <>
             {pmButtons?.map((PMbuttonText:string, index:number) => (
                <Button key={index} variant="outlined" onClick={() => {
                    handleClicked(PMbuttonText)
                    handleClick2(index)
                }} sx={buttonStyle}>
                    {PMbuttonText}
                </Button>
             ))}
            </>
          );
        } else {
          // Render set of buttons when the switch is off
          return (
            <>
            {amButtons?.map((AMbuttonText:string, index:number) => (
                <Button key={index} variant="outlined" onClick={() => {
                    handleClicked(AMbuttonText) 
                    handleClick(index)
                }} 
                sx={activeButton === index ? buttonStyle3 : buttonStyle}>

                    {AMbuttonText}
                </Button>
             ))}
            </>
          );
        }
      };

    return (
        <Stack direction='column' padding={2} useFlexGap flexWrap="wrap" justifyContent='center' sx={boxStyle} >
            {/*Selected Time Section*/}
            <Stack direction="column" alignItems='stretch' justifyContent='flex-end'width='100%' spacing={1}>
                <Stack direction='row' spacing={1} sx={{overflow: "hidden"}}>
                <Typography sx={{
                    textAlign: 'end',
                    color: '#2D5378',
                    width: '10%',
                    fontSize: isSmallScreen ? "6px" : "11px", 
                    whiteSpace: 'pre-wrap',
                    margin: '2px'
                    }}>
                   <b>Selected Time</b>    
                </Typography>
                <ButtonGroup disableElevation variant="outlined" size="medium" fullWidth> 
                    {selectedButtons1.map((buttonText, index) => (
                        <Button key={index} variant="outlined" sx={activeButton === index ? buttonStyle4 : buttonStyle2}>
                        {buttonText}
                        </Button>
                    ))}
                </ButtonGroup>
                </Stack>
                <ButtonGroup disableElevation variant="outlined" size="large" > 
                   {selectedButtons2.map((buttonText, index) => (
                        <Button key={index} variant="outlined" sx={activeButton2 === index ? buttonStyle4 : buttonStyle2}>
                        {buttonText}
                        </Button>
                    ))}
                </ButtonGroup>
                <Divider variant="middle"/>
            </Stack>

            <Stack direction="row" height='60%' justifyContent="space-between">
                {/*What time works best section */}
                <Stack direction='column' padding={3} width='40%' justifyContent='space-around' spacing={1}>
                    <Typography color='#2D5378' sx={{textAlign: "start", fontSize: isSmallScreen ? "12px" : "25px"}}>
                       <b> What time works best? </b> 
                    </Typography>
                    <Typography sx={textStyle}>
                        For durations longer than an hour, you can select multiple time options!
                    </Typography>
                    <Typography sx={textStyle}>
                        Egress should end strictly within your booked schedule. Otherwise, overtime charges will be incurred.
                    </Typography>
                </Stack>
                
                {/*Hour Buttons section */}
                <Stack direction='column' padding={3} alignItems='flex-end'  justifyContent='center' >
                    <Typography sx={{fontSize: isSmallScreen ? "6px" : "12px", color: '#2D5378',}}>
                        <span style={{color: '#787BEC'}}> Philippine Standard Time</span> <br /> <b> am/pm</b><Switch checked={isSwitchOn} onChange={handleSwitchChange} size="small"/>24h 
                    </Typography>
                    <Stack direction='column' padding={2} spacing={2} width='110%' sx={{overflow: 'auto'}}>
                        {renderButtons()}
                        
                    </Stack>
                </Stack>
            </Stack>
            <Link to="/roomreservation" state={valuesToSend}>
                <Button variant="contained" 
                sx={{
                    textTransform: "none",
                    backgroundColor: '#FFB532',
                    height: isSmallScreen ? "0.875rem" : "23px",
                    width: '130%',
                    color: 'black', 
                    borderRadius: '20px',
                    fontSize: isSmallScreen ? "8px" : "13px",
                    
                    '&:hover': {
                        backgroundColor: '#FFC532',
                    }
                }}> <b> Reserve </b> </Button>
            </Link>
            
        </Stack>
    );
}


export default HourButtons;
