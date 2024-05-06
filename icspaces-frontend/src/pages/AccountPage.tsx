import { Stack } from "@mui/material";
import UserInfo from "../components/UserInfo";

const AccountPage = () => {
  return (
    <Stack mt={15} sx={{ display: "flex", alignItems: "center" }}>
      <UserInfo />
    </Stack>
  );
};

export default AccountPage;
