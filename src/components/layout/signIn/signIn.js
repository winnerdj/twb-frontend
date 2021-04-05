import React from 'react';
import {makeStyles,Box,TextField, Grid, Button, Typography} from '@material-ui/core'; 
import {blueGrey} from '@material-ui/core/colors'; 
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'; 
import API from '../../../helpers/api';

const useStyle = makeStyles(theme => ({
    root:{
        height:'100vh',
        backgroundColor:blueGrey['900']
    },
    inputContainer:{
        width:'35%',
        height:'50%',
        padding:theme.spacing(2)
    },
    cssLabel: {
        color : blueGrey['100']
      },
    
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `${blueGrey['100']} !important`,
        }
    },
    cssFocused: {},
    
    notchedOutline: {
        borderWidth: '1px',
        borderColor: `${blueGrey['100']} !important`
    },
    button:{
        background: blueGrey['400'],
        '&:hover':{
            background: blueGrey['200']
        }
    },
    textButton:{
        color: blueGrey['400'],
        '&:hover':{
            color: blueGrey['200']
        }
    }
}))

export default function SignIn() {
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const [state,setState] = React.useState({
        email:'',
        password:''
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const handleSignIn =() =>{
        API({
            responseType:'json',
            contentType:'application/json'
        }).post('/auth/login',{
            email:state.email,
            password:state.password
        })
        .then(result => {
            dispatch({
                type:'SET_SIGNIN_USER',
                payload:{
                    id:result.data.id,
                    user_email:result.data.user_email,
                    username:result.data.username,
                    token:result.data.token
                }
            })

            history.replace('/')
        })
        .catch(e => {
            console.log(e)
        })
    }

    return (
        <div className={classes.root} >
            <div style={{ width: '100%' }}>
                <Box display='flex' justifyContent='center' alignItems='center' css={{ height: '100vh' }}>
                    <Box className={classes.inputContainer}>
                         <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Box display='flex' justifyContent='center'>
                                    <Typography
                                        variant='h4'
                                        color='primary'
                                    >
                                        Sign In
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                color='primary'
                                name='email'
                                value={state.email}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{
                                    classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                    },
                                    inputMode: "numeric",
                                    className:classes.cssLabel
                                }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                color='primary'
                                type='password'
                                name='password'
                                value={state.password}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{
                                    classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                    },
                                    inputMode: "numeric",
                                    className:classes.cssLabel
                                }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                               <Button 
                                    className={classes.button} 
                                    fullWidth size='large' 
                                    variant='contained' 
                                    onClick={handleSignIn}
                                    disableElevation>
                                   Sign In
                               </Button>
                            </Grid>
                            <Grid item xs={12}>
                               <Button variant='text' className={classes.textButton}> 
                                  Forgot Password
                               </Button>
                            </Grid>
                         </Grid>
                    </Box>
                </Box>
            </div>
        </div>
    )
}
