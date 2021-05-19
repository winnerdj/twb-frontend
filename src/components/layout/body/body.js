import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {Switch,Route,Redirect,useHistory,useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Header from '../header';
import Content from '../content';
import SignIn from '../signIn';
import {modules} from '../../../helpers';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
  }));
  
export default function Body() {
    const {id} = useSelector(state => state.user);
    const classes = useStyles();
    let location = useLocation();
    let history = useHistory();


    React.useEffect(()=>{
        console.log(process.env.NODE_ENV)
        if(location.pathname !== '/' && typeof location.state === 'undefined'){
            let list = []
            // eslint-disable-next-line array-callback-return
            modules.map(item => {
                list.push(
                    {
                    header:item.label,
                    subHeader:'',
                    route:item.route
                })
                // eslint-disable-next-line array-callback-return
                item.subModules.map(sub => {
                    list.push({
                        header:item.label,
                        subHeader:sub.label,
                        route:sub.link
                    })
                })
            })

            const selectedRoute = list.filter(item => item.route === location.pathname)
            if(selectedRoute.length > 0){
                history.push({
                    pathname:location.pathname,
                    // search:{search:""},
                    state:{
                        header:selectedRoute[0].header,
                        subHeader:selectedRoute[0].subHeader 
                    }
                })
                // history.push(location.pathname,{
                //     header:selectedRoute[0].header,
                //     subHeader:selectedRoute[0].subHeader 
                // })
            }
            else{
                history.push(location.pathname,{
                    header:'',
                    subHeader:'' 
                },)
            }
            // console.log(selectedRoute)
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path='/login'>
                    {
                        id === null ? <SignIn/> : <Redirect to='/'/>
                    }
                </Route>
                <Route path='/'>
                    {id === null ? <SignIn/> : <Grid container>
                        <Grid style={{padding:0}} item xs={12}>
                            <Header/>
                        </Grid>
                        <Grid item xs={12}>
                            <Content/>
                        </Grid>
                    </Grid>}
                </Route>
            </Switch>
        </div>
    )
}
