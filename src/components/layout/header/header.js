import React from 'react';
import {AppBar,makeStyles, Box, Button,IconButton,Toolbar, Menu, MenuItem } from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import logistikus from '../../../assets/logistikus.png';
import Sidebar from '../sidebar';
import UpdateUserModal from '../../administration/userManagement/updateUser';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    iconSize:{
      height:40
    }
}));

export default function Header() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const {user_email,id} = useSelector(state => state.user) 
    const [isOpen,setDrawer] = React.useState(false);
    const [openModal,setModal] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const toggleDrawer = () => {
      setDrawer(!isOpen);
    }

    const toggle=()=>{
      setModal(!openModal)
    }

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSignout = () => {
      dispatch({
        type:'SET_SIGNIN_USER',
        payload:{
            id:null,
            user_email:null,
            username:null,
            token:null
        }
      })
      history.push('/login')
    }

    const renderMenu = (
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{
          toggle()
          handleClose()
        }}>Update Account</MenuItem>
        <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
      </Menu> 
    )


    return (
        <div className={classes.root}>
            <AppBar position="fixed" color='primary'>
              <Toolbar>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon/>
                    </IconButton>
                    <img className={classes.iconSize} src={logistikus} alt={logistikus}/>
                 
                  <div style={{width:'100%'}}>
                      <Box display='flex' justifyContent='flex-end'>
                        <Button onClick={handleMenu}>
                          {user_email}
                        </Button>
                      </Box>
                  </div>
                </Toolbar>
        </AppBar>
        {renderMenu}
        <UpdateUserModal open={openModal} 
            toggle={toggle} 
            email={user_email} 
            id={id}
            viewUpdatePassword
          />
        <Toolbar/>
        <Sidebar isOpen={isOpen} toggle={toggleDrawer}/>
    </div>

    )
}
