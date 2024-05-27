import { Box, Grid, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://api.icspaces.online/get-profile", {
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
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "https://api.icspaces.online/get-notifications-for-user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({user_id: 0}),    // replace target_user_id variable with the variable
          }                                                     // na nag hohold ng id ng user
        );
        const data = await response.json();

        // variable "data" now contains yung rows ng notifs for that user
        // return data;
        // setNotifications(data);
        console.log(data);

      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    };

    fetchNotifications();
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const NotifBoxTwo = (props: any) => (
    <Box
      sx={{
        background: "#FFFFFF", // Set background to white
        color: "#183048",
        borderRadius: "15px",
        display: "Center",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Calibri, sans-serif",
        height: 110,
        overflow: "auto",
        fontSize: {
          xs: 14,
          sm: 18,
          lg: 18,
        },
        padding: 1,
        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
        marginTop: 1, // Add marginTop to create space between text and StyledBox
      }}
    >
      {props.children}
    </Box>
  );

  const StyledBox = (props: any) => (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #FFFFFF, #c5d2d9)",
        color: "#183048",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Calibri, sans-serif",
        height: 70,
        fontSize: {
          xs: 14,
          sm: 18,
          lg: 18,
        },
        padding: 1,
        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          color: "#FFFFFF",
          background: "#183048",
        },
        "&:hover .AnyIcon": {
          color: "#FFFFFF",
        },
        "&:hover .TextIcon": {
          color: "#FFFFFF",
        },
      }}
    >
      {props.children}
    </Box>
  );

  const NotifBox = (props: any) => (
    <Box
      sx={{
        backgroundColor: "#183048",
        color: "#FFFFFF",
        borderRadius: "15px",
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
        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      {props.children}
    </Box>
  );

  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
            textAlign: "left",
            backgroundColor: "#183048",
            color: "#FFFFFF",
            borderRadius: "15px",
            padding: "3.5%",
            paddingLeft: "5%",
            fontFamily: "Calibri, sans-serif",
            boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Stack direction="column" spacing={1}>
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: 30, sm: 40 }, color: "#FFB532" }}
            >
              Hello, {user?.displayname}!
            </Typography>
            <Stack>
              <Typography variant="body1">Today is {formattedDate}</Typography>
              {/* <Typography variant="body1">You have 3 upcoming events.</Typography> */}
            </Stack>
          </Stack>
        </Box>
      </Grid>

      {/* Quick Links */}
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
            padding: 0,
            marginTop: 2,
          }}
        >
          <Typography variant="h5" sx={{ color: "#183048" }}>
            Quick Links
          </Typography>
        </Box>
      </Grid>
      {/* End of Quick Links */}

      <Grid container item xs={12} spacing={1}>
        <Grid item xs={7}>
        <NotifBox>
            {/* <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Notification 
            </Typography> */}
            <Grid container item xs={12}  direction={"column"}>
              <Grid item xs={5}>
                <Typography>Notification Box</Typography>
              </Grid>
              <Grid item xs={12}>
                <NotifBoxTwo>
                      {/* <div>{notification.notification_action}</div>
                      <div>{notification.notification_body}</div> */}
                      <div>{notifications}</div>
                </NotifBoxTwo>
              </Grid>
            </Grid>
          </NotifBox>
        </Grid>

        <Grid item xs={5}>
          <Grid container justifyContent="flex-end" spacing={1}>
            <Grid item xs={6}>
              <Link
                to="/accountpage"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <StyledBox>
                  <Stack direction="column" alignItems="center">
                    <SearchIcon
                      sx={{ fontSize: 40, color: "#183048" }}
                      className="AnyIcon"
                    />
                    <div>Accounts</div>
                  </Stack>
                </StyledBox>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link
                to="/viewroomspage"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <StyledBox>
                  <Stack direction="column" alignItems="center">
                    <CalendarTodayIcon
                      sx={{ fontSize: 40, color: "#183048" }}
                      className="AnyIcon"
                    />
                    <div>Make Reservation</div>
                  </Stack>
                </StyledBox>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link
                to="/reservationspage"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <StyledBox>
                  <Stack direction="column" alignItems="center">
                    <BookmarksOutlinedIcon
                      sx={{ fontSize: 40, color: "#183048" }}
                      className="AnyIcon"
                    />
                    <div>Reservation Status</div>
                  </Stack>
                </StyledBox>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link
                to="/faqspage"
                className="TextIcon"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <StyledBox>
                  <Stack direction="column" alignItems="center">
                    <HelpOutlineIcon
                      sx={{ fontSize: 40, color: "#183048" }}
                      className="AnyIcon"
                    />
                    <div>FAQs</div>
                  </Stack>
                </StyledBox>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MuiHomeGrid;