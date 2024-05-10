import { Box, Grid, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MuiHomeGrid: React.FC = () => {

    const userTypeMapping: { [key: number]: string } = {
        0: "Student",
        1: "Faculty",
        2: "Officer In Charge",
        3: "Director",
    };

    interface User {
        email: string;
        displayname: string;
        profilepic: string;
        usertype: string; // Changed this to string
    }

    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("https://icspaces-backend.onrender.com/get-profile", {
                    withCredentials: true,
                });

                if (response.data.success) {
                    const user = response.data.data;
                    // Map the usertype number to its corresponding string
                    user.usertype = userTypeMapping[user.usertype];
                    setUser(user);
                } else {
                    throw new Error(response.data.errmsg);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);


    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Update every second
        return () => clearInterval(interval);
    }, []);

    const formattedDate = currentDate.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const StyledBox = (props:any) => (
        <Box sx={{
            background: 'linear-gradient(to bottom, #FFFFFF, #c5d2d9)',
            color: '#183048',
            borderRadius: '15px',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 70,
            fontSize: {
                xs: 14,
                sm: 18,
                lg: 18,
            },
            padding: 1,
            boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.2)',
            '&:hover': {
                color: '#FFFFFF',
                background: '#183048'
            },
            "&:hover .AnyIcon": {
                color: '#FFFFFF'
            },
            "&:hover .TextIcon": {
                color: '#FFFFFF'
            }
        }}>
            {props.children}
        </Box>
    );

    const NotifBox = (props:any) => (
        <Box sx={{
            backgroundColor: '#183048',
            color: '#FFFFFF',
            borderRadius: '15px',
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            height: 163,
            fontSize: {
                xs: 14,
                sm: 18,
                lg: 24,
            },
            padding: 1,
            boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.2)',
        }}>
            {props.children}
        </Box>
    );

    return (
        <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={12}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "left",
                    textAlign:'left',  
                    backgroundColor: '#183048',
                    color: '#FFFFFF',
                    borderRadius:'15px',
                    padding:'3.5%',
                    paddingLeft:'5%',
                    fontFamily: 'Calibri, sans-serif',
                    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.2)',
                }}>
                    <Stack direction='column' spacing={1}>
                        <Typography variant='h3' sx={{ fontSize: { xs: 30, sm: 40 }, color: "#FFB532" }}>Hello, {user?.displayname}!</Typography>
                        <Stack>
                        <Typography variant="body1">Today is {formattedDate}</Typography>
                        {/* <Typography variant="body1">You have 3 upcoming events.</Typography> */}
                        </Stack>
                    </Stack>
                </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "left",
                    padding:0,
                    marginTop:2,
                }}>
                    <Typography variant='h5' sx={{ color: "#183048" }}>Quick Links</Typography>
                </Box>
            </Grid>
            {/* End of Quick Links */}

            <Grid container item xs={12} spacing={1}>
                <Grid item xs={7}>
                    <NotifBox>
                        Notification box
                    </NotifBox>
                </Grid>

                <Grid item xs={5}>
                    <Grid container justifyContent="flex-end" spacing={1}>
                        <Grid item xs={6}>
                            <Link to='/accountpage' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <StyledBox>
                                    <Stack direction="column" alignItems="center">
                                        <SearchIcon sx={{ fontSize: 40, color: '#183048' }} className='AnyIcon' />
                                        <div>Accounts</div>
                                    </Stack>
                                </StyledBox>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to='/viewroomspage' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <StyledBox>
                                    <Stack direction="column" alignItems="center">
                                        <CalendarTodayIcon sx={{ fontSize: 40, color: '#183048' }} className='AnyIcon' />
                                        <div>Make Reservation</div>
                                    </Stack>
                                </StyledBox>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to='/reservationspage' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <StyledBox>
                                    <Stack direction="column" alignItems="center">
                                        <BookmarksOutlinedIcon sx={{ fontSize: 40, color: '#183048' }} className='AnyIcon' />
                                        <div>Reservation Status</div>
                                    </Stack>
                                </StyledBox>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to='/FAQ' className='TextIcon' style={{ textDecoration: 'none', color: 'inherit' }} >
                                <StyledBox>
                                    <Stack direction="column" alignItems="center">
                                        <HelpOutlineIcon sx={{ fontSize: 40, color: '#183048' }} className='AnyIcon' />
                                        <div>FAQs</div>
                                    </Stack>
                                </StyledBox>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MuiHomeGrid;