import { Box } from "grommet";
import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";
import EmailAddresses from "./EmailAddresses";

const App = () => (
  <Box align="center" gap="8px" pad="24px 12px">
    <TimescaleLogo />
    <EmailAddresses />
  </Box>
);

export default App;
