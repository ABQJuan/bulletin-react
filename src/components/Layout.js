import React, { Component } from 'react'
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from 'material-ui/styles'
import classNames from 'classnames'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import { ListItem, ListItemText } from 'material-ui/List'
import { Link } from 'react-router-dom'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import PrintIcon from 'material-ui-icons/Print'
import ViewQuiltIcon from 'material-ui-icons/ViewQuilt'
import SearchIcon from 'material-ui-icons/Search'
import Menu, { MenuItem } from 'material-ui/Menu'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#21412a',
      contrastDefaultColor: 'light'
    }
  }
})

const drawerWidth = 250

const styles = theme => ({
  logo: {
    width: '236px',
    margin: '8px auto'
  },
  link: {
    textDecoration: 'none'
  },
  root: {
    width: '100%',
    height: 430,
    zIndex: 1
  },
  flex: {
    flex: 1
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    background: '#fff',
    borderBottom: 'solid 3px #998643',

    position: 'fixed',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    left: 0,
    position: 'fixed',
    height: '100%',
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    width: '100%',
    marginLeft: 0,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64
      }
    }
  },
  contentShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
})

class Layout extends Component {
  state = {
    open: true,
    anchorEl: null
  }
  constructor () {
    super()
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
  }
  handleDrawerOpen () {
    this.setState({ open: true })
  }

  handleDrawerClose () {
    this.setState({ open: false })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render () {
    const classes = this.props.classes
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar
              className={classNames(
                classes.appBar,
                this.state.open && classes.appBarShift
              )}
            >
              <Toolbar disableGutters={!this.state.open}>
                <IconButton
                  color='primary'
                  aria-label='open drawer'
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    this.state.open && classes.hide
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  className={classes.flex}
                  type='title'
                  color='primary'
                  noWrap
                >
                  FUS Bulletin
                </Typography>
                <IconButton color='primary'>
                  <SearchIcon />
                </IconButton>
                <IconButton color='primary'>
                  <ViewQuiltIcon />
                </IconButton>
                <IconButton color='primary'>
                  <PrintIcon />
                </IconButton>
                <IconButton color='primary' onClick={this.handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id='simple-menu'
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
              </Toolbar>
            </AppBar>
            <Drawer
              type='persistent'
              classes={{
                paper: classes.drawerPaper
              }}
              open={this.state.open}
            >
              <div className={classes.drawerInner}>
                <div className={classes.drawerHeader}>
                  <img
                    className={classes.logo}
                    src='https://rc.franciscan.university/static/media/fus-logo.5e5882da.svg'
                    alt=''
                  />
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <Link to='/' className={classes.link}>
                  <ListItem button>
                    <ListItemText primary='Home' />
                  </ListItem>
                </Link>
                <Divider />
                <Link to='/categories' className={classes.link}>
                  <ListItem button>
                    <ListItemText primary='Categories' />
                  </ListItem>
                </Link>
                <Divider />
              </div>
            </Drawer>
            <main
              className={classNames(
                classes.content,
                this.state.open && classes.contentShift
              )}
            >
              {this.props.children}
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(Layout)
