import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { navigate } from "gatsby"
import { logout, isLoggedIn } from "../../services/auth"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { ThemeProvider } from "@material-ui/core/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import { miscutils } from "../../utils/miscutils"
const { API } = process.env

const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}))
const Theme = createMuiTheme({
  palette: {
    // primary: grey[900],
    // secondary: green,
  },
  status: {
    // danger: 'orange',
  },
})

function LayoutNavbar(props) {
  const { container, children } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    logout(() => navigate(`/app/loginAdmin`))
  }
  const handlePanelDetailItemClick = tab => {
    navigate(`/app/admin/${tab.path}`, {
      state: { tab },
    })
  }
  const drawer = (
    <div>
      <div
        className={classes.toolbar}
        style={{
          display: "flex",
          padding: "0px 24px 0px",
          cursor: "pointer",
          alignItems: "center",
          fontSize: 22,
          fontWeight: "lighter",
        }}
        onClick={() => {
          navigate(`/app/admin`)
        }}
      >
        Dashboard
      </div>
      <Divider />
      {[
        {
          summary: "Users",
          Details: [{ label: "User Management", path: "users" }],
        },
        {
          summary: "Vehicle Management",
          Details: [
            { label: "Rental Vehicles", path: "rentalCars" },
            { label: "Own Vehicles", path: "ownCars" },
          ],
        },
        {
          summary: "Reservations",
          Details: [{ label: "Reservations Management", path: "reservations" }],
        },
        {
          summary: "Sales",
          Details: [{ label: "Sales Management", path: "sales" }],
        },
        {
          summary: "Rate Management",
          Details: [{ label: "Rate Management", path: "rates" }],
        },
        {
          summary: "Payments",
          Details: [{ label: "Payments Management", path: "payments" }],
        },
      ].map((text, index) => (
        <ExpansionPanel
          key={index}
          className="expansionpanel"
          style={{ margin: 0 }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="expansionpanelInner"
          >
            <Typography className={classes.heading}>{text.summary}</Typography>
          </ExpansionPanelSummary>
          {text.Details.map((innerTabs, index) => (
            <ExpansionPanelDetails
              key={index}
              className="expansionpanelDetails"
              style={{ padding: "0px 32px 24px", cursor: "pointer" }}
              onClick={() => {
                handlePanelDetailItemClick(innerTabs)
              }}
            >
              <Typography>{innerTabs.label}</Typography>
            </ExpansionPanelDetails>
          ))}
        </ExpansionPanel>
      ))}
    </div>
  )

  return (
    <ThemeProvider theme={Theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} noWrap>
              Car RTO
            </Typography>
            {isLoggedIn() ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}

LayoutNavbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
}

export default LayoutNavbar
