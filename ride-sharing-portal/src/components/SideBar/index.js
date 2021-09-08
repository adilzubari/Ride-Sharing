import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
// Icons
import {
  DashboardTwoTone,
  SupervisedUserCircleTwoTone,
  LibraryBooksTwoTone,
  MonetizationOnTwoTone,
  SettingsInputComponentTwoTone,
  VpnKeyTwoTone,
  LocalOfferTwoTone,
  NaturePeopleTwoTone,
  SupervisorAccountTwoTone,
} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 1,
    border: 0,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function SideBar() {
  const classes = useStyles();

  const MenuList = [
    {
      Title: "Dashboard",
      Icon: <DashboardTwoTone />,
      url: "/",
    },
    {
      Title: "Users",
      Icon: <NaturePeopleTwoTone />,
      url: "/users",
    },
    {
      Title: "Drivers",
      Icon: <SupervisedUserCircleTwoTone />,
      url: "/drivers",
    },
    {
      Title: "Drivers Requests",
      Icon: <SupervisorAccountTwoTone />,
      url: "/drivers_requests",
    },
    {
      Title: "Bookings",
      Icon: <LibraryBooksTwoTone />,
      url: "/bookings",
    },
    {
      Title: "Earning",
      Icon: <MonetizationOnTwoTone />,
      url: "/earnings",
    },
    {
      Title: "Promos",
      Icon: <LocalOfferTwoTone />,
      url: "/promos",
    },
    {
      Title: "Settings",
      Icon: <SettingsInputComponentTwoTone />,
      url: "/settings",
    },
    {
      Title: "Log Out",
      Icon: <VpnKeyTwoTone />,
      url: "/logout",
    },
  ];

  return (
    <Paper
      style={{
        height: window.innerHeight,
      }}
      elevation={4}
    >
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {MenuList.map((Item) => (
              <Link
                to={Item.url}
                style={{ color: "rgb(100,100,100)", textDecoration: "none" }}
              >
                <ListItem
                  button
                  key={Item.index}
                  selected={window.location.pathname == Item.url ? true : false}
                >
                  <ListItemIcon>{Item.Icon}</ListItemIcon>
                  <ListItemText primary={Item.Title} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
    </Paper>
  );
}
