import React from 'react'
import {Drawer,
    List,
    ListItem,
    makeStyles,
    ListItemText,
    Collapse ,
    Typography
} from '@material-ui/core';
import {ExpandLess,ExpandMore} from '@material-ui/icons';
import {NavLink,useLocation} from 'react-router-dom';

import {modules as moduleList} from '../../../helpers';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 290,
     
    },
    iconColor:{
        color:'#eceff1'
    },
    fullList: {
      width: 'auto',
    },
    subitem:{
        paddingLeft: theme.spacing(4)
    }
  }));
  

export default function Sidebar({isOpen,toggle}) {
    const classes = useStyles();
    const [modules,setModules] = React.useState([]);
    const location = useLocation();

    React.useEffect(()=>{
        // console.log(location)
        setModules(moduleList.map(item => {
            return {
                isCollapse:false,
                ...item
            }
        }))
    },[]) 

    const toggleSubmodule = (index) => {
        let temp = [...modules];
        let selected = {...temp[index]}
        selected.isCollapse = !selected.isCollapse
        temp[index] = selected
        setModules(temp);
    }

    return (
        <div>
            <Drawer anchor='left' open={isOpen} onClose={toggle}>
                <div className={classes.root}>
                    <List>
                        {
                            modules.map((item,index) => {
                                return <div key={index}>
                                    {
                                        item.subModules.length > 0 ? 
                                        <ListItem button onClick={() => toggleSubmodule(index)}>
                                            <ListItemText 
                                                disableTypography
                                                primary={<Typography type="body2" color='primary'>{item.label}</Typography>}
                                            />
                                            <div>
                                                {item.isCollapse ? <ExpandLess/> :<ExpandMore/>}
                                            </div>
                                        </ListItem> : 
                                        <ListItem button 
                                            onClick={toggle}
                                            component={NavLink}
                                            selected = {location.pathname === item.route}
                                            to={{
                                                pathname:item.route,
                                                    state:{
                                                        header:item.label,
                                                        subHeader:''
                                                    }
                                                }}
                                            >
                                            <ListItemText 
                                                disableTypography
                                                primary={<Typography type="body2" color='primary'>{item.label}</Typography>}
                                            />
                                        </ListItem>
                                    }
                                   
                                    <Collapse in={item.isCollapse} timeout="auto" unmountOnExit>
                                        {
                                            item.subModules.map((sub,i) => {
                                                return <ListItem button 
                                                    onClick={toggle}
                                                    component={NavLink}
                                                    selected = {location.pathname === sub.link}
                                                    to={{
                                                        pathname:sub.link,
                                                        state:{
                                                            header:item.label,
                                                            subHeader:sub.label
                                                        }
                                                    }}
                                                    key={i} 
                                                    className={classes.subitem}>
                                                    <ListItemText 
                                                        disableTypography
                                                        primary={<Typography type="body2" color='primary'>{sub.label}</Typography>}
                                                    />
                                                </ListItem>
                                            })
                                        }
                                    </Collapse>
                                </div>
                            })
                        }
                    </List>
                </div>
            </Drawer>
        </div>
    )
}
