import { TableRow, TableCell, Button,Grid,Box, Avatar, Stack,Typography, Divider} from "@mui/material";
import { Users } from "./types";
import HomeBG from "../assets/room_images/HomeBG.png";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { useState } from "react";

interface AccountCardProps {
  users: Users;
  onClick: () => void;
}

const userRole: Record<number, string> = { 
  0: 'Student',
  1: 'Faculty',
  2: 'Admin',
  3: 'Director',

  // add other status codes as needed
};



const AccountCard: React.FC<AccountCardProps> = ({
  users,
  onClick,
}) => {
  
  const BlueTypography = (
    props: any //Bottom three cells
  ) => (
    <Typography sx={{color:'#183048'}}>
      {props.children}
    </Typography>
  ); 
  const GrayTypography = (
    props: any //Bottom three cells
  ) => (
    <Typography variant='subtitle2' color='#8A8A8A' align='left' >
      {props.children}
    </Typography>
  ); 


  return (
    <Grid
    container
    width='100%'
    borderRadius='15px'
    sx={{border:'solid',borderWidth:'0.5px', borderColor:"#B9B9B9"}}
  >
    <Grid item xs={1}>{/* Image */}
      <Grid container style={{ height: "100%"}} justifyContent='space-evenly' >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar  sx={{ width: 75, height: 75 }}>{users.lname[0]}{users.fname[0]}</Avatar>
        </Box>
        <Divider orientation="vertical"   sx={{height:'100%'}}  />
      </Grid>
      
    </Grid>
      <Grid item xs={11}  > {/* User Details */}
        <Grid container  >
          <Grid item xs={12}>{/* 1st Row */}
            <Stack direction="row"  justifyContent='space-evenly' padding={1}>
              <Box marginRight='auto' minWidth='25%'maxWidth='25%' sx={{ textOverflow:'ellipsis'}}> 
                <Typography align='left' variant='h6' color='#183048'> {users.lname},&nbsp;{users.fname}</Typography>
                <GrayTypography>Last name, First name</GrayTypography>
              </Box>
              <Box marginRight='auto'>
     
                <Typography sx={{ display: "flex", alignItems: "center", justifyContent:"space-evenly", color: "#183048"}}>
                   <LocalPostOfficeIcon  sx={{ fontSize: 16, color: "#183048" }}/>
                    &nbsp; {users.email}
                </Typography>
                
                <GrayTypography>Email</GrayTypography>
              </Box>
              <Box marginRight='auto' maxWidth='25%'>
                <BlueTypography>32</BlueTypography>
                <GrayTypography>Total Room Reservations</GrayTypography>
              </Box>
              <Box marginRight={4}>
                <BlueTypography>January 3, 2024</BlueTypography>
                <GrayTypography>Last log-in</GrayTypography>
              </Box>
            </Stack>
            <Divider orientation="horizontal"   flexItem sx={{width:"100%"}}  />
          </Grid>
          
          <Grid item xs={12}  padding={1}> {/* Role and Button */}
            
            <Grid container alignItems='center' justifyContent='space-between' >

                <Stack direction='row'>
                  <BlueTypography>Role: &nbsp;</BlueTypography>
                  <Typography sx={{fontWeight:500, color: "#183048" }}>{userRole[users.usertype]}</Typography>
                </Stack>
                
                <Button sx={{borderRadius:'15px',backgroundColor:"#FFB532", width:"12%", minHeight: 0, minWidth: 0, padding: 0.3, textTransform: 'capitalize'}} onClick={onClick} >Edit Role</Button>
            </Grid>

          </Grid>

        </Grid>
      </Grid>

  </Grid>

 
  );
};

export default AccountCard;
