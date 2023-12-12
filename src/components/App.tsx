import { Box } from "grommet";
import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";
import ManageEmailAddresses from "./email-addresses/ManageEmailAddresses";

const App = () => (
  <Box align="center" gap="8px" pad="24px 12px">
    <TimescaleLogo />
    <ManageEmailAddresses />
  </Box>
);

export default App;
