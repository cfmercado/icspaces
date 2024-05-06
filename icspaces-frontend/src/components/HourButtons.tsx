import { Box, Typography, Stack, Button, useMediaQuery, useTheme, Switch, Divider, ButtonGroup } from "@mui/material";
import { useState } from "react";

import {Link } from "react-router-dom";

const HourButtons = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [isSwitchOn, setIsSwitchOn] = useState(false);

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
          }
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
          }
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
    const renderButtons = () => {
        if (isSwitchOn) {
          // Render set of buttons when the switch is on
          return (
            <>
            <Button variant="outlined" sx={buttonStyle}>
                12:00 PM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                1:00 PM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                2:00 PM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                3:00 PM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                4:00 PM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                5:00 PM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                6:00 PM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                7:00 PM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                8:00 PM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                9:00 PM
            </Button>
            </>
          );
        } else {
          // Render set of buttons when the switch is off
          return (
            <>
            <Button variant="outlined" sx={buttonStyle}>
            7:00 AM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                8:00 AM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                9:00 AM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                10:00 AM
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                11:00 AM
            </Button>
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
                    
                    <Button sx={buttonStyle2}>7-8 AM</Button>
                    <Button sx={buttonStyle2}>8-9 AM</Button>
                    <Button sx={buttonStyle2}>9-10 AM</Button>
                    <Button sx={buttonStyle2}>10-11 AM</Button>
                    <Button sx={buttonStyle2}>11-12 PM</Button>
                    <Button sx={buttonStyle2}>12-1 PM</Button>
                    <Button sx={buttonStyle2}>1-2 PM</Button>
                </ButtonGroup>
                </Stack>
                <ButtonGroup disableElevation variant="outlined" size="large" > 
                    <Button sx={buttonStyle2}>2-3 PM</Button>
                    <Button sx={buttonStyle2}>3-4 PM</Button>
                    <Button sx={buttonStyle2}>4-5 PM</Button>
                    <Button sx={buttonStyle2}>5-6 PM</Button>
                    <Button sx={buttonStyle2}>6-7 PM</Button>
                    <Button sx={buttonStyle2}>7-8 PM</Button>
                    <Button sx={buttonStyle2}>8-9 PM</Button>
                    <Button sx={buttonStyle2}>9-10 PM</Button>
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
            <Link to="/reservationspage">
                <Button variant="contained" sx={{
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
