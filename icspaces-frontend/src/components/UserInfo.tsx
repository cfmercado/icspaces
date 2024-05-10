import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Avatar,
  CardContent,
  Typography,
  Button,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  DialogTitle,
  DialogContentText,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  usertype: string;
  student_number?: string;
  course?: string;
  org?: string;
  department?: string;
  college?: string;
}

interface UserDetails {
  student_number: string;
  course: string;
  org: string;
  department: string;
  college: string;
}

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const [open, setOpen] = useState(false);
  const [studentNumber, setStudentNumber] = useState("");
  const [course, setCourse] = useState("");
  const [org, setOrg] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://api.icspaces.online/get-profile", {
          withCredentials: true,
        });

        if (response.data.success) {
          let user = response.data.data;
          user.usertype = userTypeMapping[user.usertype];

          let detailsResponse;
          if (user.usertype === "Student") {
            detailsResponse = await axios.post(
              "https://api.icspaces.online/get-student-details",
              { email: user.email },
              { withCredentials: true }
            );
          } else if (user.usertype === "Faculty") {
            detailsResponse = await axios.post(
              "https://api.icspaces.online/get-faculty-details",
              { email: user.email },
              { withCredentials: true }
            );
          }

          setUserDetails(detailsResponse?.data);
          setUser(user);
        } else {
          throw new Error(response.data.errmsg);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        navigate("/login");
      }
    };

    // Call fetchUser immediately
    fetchUser();
    // Then call fetchUser every 5 seconds
    const intervalId = setInterval(fetchUser, 5000);

    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  if (!user) {
    return null; // or return a loading spinner, or some placeholder content
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    try {
      let response;
      if (user && user.usertype === "Student") {
        response = await axios.post(
          "https://api.icspaces.online/update-student-details",
          {
            email: user.email,
            student_number: studentNumber,
            course: course,
            org: org,
          },
          {
            withCredentials: true,
          }
        );
      } else if (user && user.usertype === "Faculty") {
        response = await axios.post(
          "https://api.icspaces.online/update-faculty-details",
          {
            email: user.email,
            college,
            department,
          },
          {
            withCredentials: true,
          }
        );
      }

      if (response && response.data.success) {
        // Update was successful, update the user state with the new details
        setUser((prevState) => {
          if (prevState) {
            return {
              ...prevState,
              ...(prevState.usertype === "Student"
                ? { student_number: studentNumber, course, org }
                : { college, department }),
            };
          }
          return prevState;
        });
      } else {
        if (response && response.data) {
          throw new Error(response.data.errmsg);
        } else {
          throw new Error("Unknown error occurred");
        }
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }

    handleClose();
  };

  console.log("THIS IS USER", user); // Add this line
  if (!user) {
    return null; // or return a loading spinner, or some placeholder content
  }

  console.log("CONTENT", user); // Add this line

  const handleLogout = async () => {
    try {
      const response = await fetch("https://api.icspaces.online/logout", {
        credentials: "include",
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }
      // If the response is ok, assume the logout was successful
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  console.log("userDetails", userDetails);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "column" },
        alignItems: { xs: "center", sm: "center", md: "center" },
        justifyContent: { xs: "center", sm: "center", md: "center" },
        p: 2,
        width: "80%",
        overflow: "auto",
      }}
    >
      <Avatar
        src={user.profilepic}
        alt={user.displayname}
        sx={{
          mr: { xs: 0, sm: 0, md: 0 },
          mb: { xs: 1, sm: 1, md: 1 },
          width: { xs: "35%", sm: "35%", md: "160px" },
          height: { xs: "auto", sm: "auto", md: "160px" },
        }}
      />
      <CardContent>
        <Typography
          variant="h4"
          sx={{ textAlign: { xs: "center", sm: "center", md: "center" } }}
        >
          {user.displayname}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: { xs: "center", sm: "center", md: "center" } }}
        >
          {user.usertype}
        </Typography>
        <Typography
          variant="subtitle1"
          mb={2}
          sx={{ textAlign: { xs: "center", sm: "center", md: "center" } }}
        >
          {user.email}
        </Typography>

        {user.usertype === "Student" && (
          <>
            <Typography variant="body2">
              Student Number: {userDetails?.student_number}
            </Typography>
            <Typography variant="body2">
              Course: {userDetails?.course}
            </Typography>
            <Typography variant="body2">
              Organization: {userDetails?.org}
            </Typography>
          </>
        )}
        {user.usertype === "Faculty" && (
          <>
            <Typography variant="body2">
              Department: {userDetails?.department}
            </Typography>
            <Typography variant="body2">
              College: {userDetails?.college}
            </Typography>
          </>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the new details for the user.
            </DialogContentText>
            {user.usertype === "Student" && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  id="studentNumber"
                  label="Student Number"
                  type="text"
                  fullWidth
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="course"
                  label="Course"
                  type="text"
                  fullWidth
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="org"
                  label="Organization"
                  type="text"
                  fullWidth
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                />
              </>
            )}
            {user.usertype === "Faculty" && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  id="college"
                  label="College"
                  type="text"
                  fullWidth
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="department"
                  label="Department"
                  type="text"
                  fullWidth
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogActions>
        </Dialog>
        <Stack mt={1}>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Update
          </Button>
          <Button
            variant="contained"
            onClick={handleLogout}
            style={{
              backgroundColor: "#e42c2c",
              color: "white",
              marginTop: "30px",
            }}
          >
            Logout
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
function fetchUser() {
  throw new Error("Function not implemented.");
}
