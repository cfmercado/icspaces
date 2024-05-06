import { Box, Grid, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link } from "react-router-dom";

const MuiHomeGrid = () => {

    const StyledBox = (props:any) => (
        <Box sx={{
            backgroundColor: '#DDDDDD90',
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
            '&:hover': {
                color: '#FFFFFF',
                backgroundColor: '#183048'
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
                    fontFamily: 'Calibri, sans-serif'
                }}>
                    <Stack direction='column' spacing={1}>
                        <Typography variant='h3' sx={{ fontSize: { xs: 30, sm: 40 }, color: "#FFB532" }}>Hello, Frontend!</Typography>
                        <Typography variant="body1">Today is Tuesday, March 04, 2024.</Typography>
                        <Typography variant="body1">You have 3 upcoming events.</Typography>
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
                            <Link to='/rooms' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <StyledBox>
                                    <Stack direction="column" alignItems="center">
                                        <SearchIcon sx={{ fontSize: 40, color: '#183048' }} className='AnyIcon' />
                                        <div>View ICS Rooms</div>
                                    </Stack>
                                </StyledBox>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to='/reserve' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <StyledBox>
                                    <Stack direction="column" alignItems="center">
                                        <CalendarTodayIcon sx={{ fontSize: 40, color: '#183048' }} className='AnyIcon' />
                                        <div>Make Reservation</div>
                                    </Stack>
                                </StyledBox>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to='/status' style={{ textDecoration: 'none', color: 'inherit' }}>
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