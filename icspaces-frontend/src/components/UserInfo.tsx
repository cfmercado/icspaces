import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import tempAvatar from "../assets/ICS_Logo.png";

const UserInfo = () => {
  const user = {
    name: "John Doe",
    userType: "Student",
    email: "johndoe@example.com",
    avatar: tempAvatar,
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
        src={user.avatar}
        alt={user.name}
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
          {user.name}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: { xs: "center", sm: "center", md: "center" },
            color: "grey",
          }}
        >
          {user.userType}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: { xs: "center", sm: "center", md: "center" },
            color: "grey",
          }}
        >
          {user.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
