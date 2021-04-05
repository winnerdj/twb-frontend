import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {Switch,Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Header from '../header';
import Content from '../content';
import SignIn from '../signIn';


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
