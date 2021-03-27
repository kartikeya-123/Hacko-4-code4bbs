import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";

const TopBar = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}></Toolbar>
  </AppBar>
);

export default TopBar;
