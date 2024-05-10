import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography } from "@mui/material";
import StudentFAQ_Accordion from "../components/FAQ_accordions/StudentFAQ_Accordion";
import FacultyFAQ_Accordion from "../components/FAQ_accordions/FacultyFAQ_Accordion";
import AdminFAQ_Accordion from "../components/FAQ_accordions/AdminFAQ_Accordion";
import GuestFAQ_Accordion from "../components/FAQ_accordions/GuestFAQ_Accordion";
import BackButton from "../components/BackButton";

interface User {
  email: string;
  displayname: string;
  firstName: string;
  lastName: string;
  profilepic: string;
  usertype: number;
}

const FAQs: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://icspaces-backend.onrender.com/get-profile", {
          withCredentials: true,
        });

        if (response.data.success) {
          const user = response.data.data;
          setUser(user);
        } else {
          throw new Error(response.data.msg);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Container maxWidth="lg">
        <Grid container direction="column" spacing={2} mt={10}>
          <Grid item sx={{ alignSelf: "flex-start" }}>
            <BackButton />
          </Grid>
          <Grid item>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Frequently Asked Questions
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {user && user.usertype === 0 && <StudentFAQ_Accordion />}
            {user && user.usertype === 1 && <FacultyFAQ_Accordion />}
            {user && (user.usertype === 2 || user.usertype === 3) && (
              <AdminFAQ_Accordion />
            )}
            {user === null && <GuestFAQ_Accordion />}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQs;
