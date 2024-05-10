import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Avatar, CardContent, Typography, Button } from "@mui/material";
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
  usertype: string; // Changed this to string
}

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
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
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);
  if (!user) {
    return null; // or return a loading spinner, or some placeholder content
  }

  // console.log(user); // Add this line

  const handleLogout = async () => {
    try {
      const response = await fetch("https://api.icspaces.online//logout", {
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
          mb: { xs: 2, sm: 2, md: 2 },
          width: { xs: "40%", sm: "40%", md: "200px" },
          height: { xs: "auto", sm: "auto", md: "200px" },
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
          sx={{ textAlign: { xs: "center", sm: "center", md: "center" } }}
        >
          {user.email}
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export default UserInfo;
