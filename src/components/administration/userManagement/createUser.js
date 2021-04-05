import React from 'react';
import {Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Grid,
    Typography,
    makeStyles,
    DialogActions} from '@material-ui/core';
import {createUser} from '../saga';
import {toast} from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    content:{
       width:'300px'
    }
}))

export default function CreateUser({
    isOpen,
    toggle
}) {
    const classes = useStyles();
    const [state,setState] = React.useState({
        email:'',
        emailIsError:false,
        name:'',
        nameIsError:false,

    })

    const handleCreate = () => {
        let isEmail = false;
        let isName = false
        if(state.email===''){
            isEmail = true;
        }
        if(state.name===''){
           isName = true
        }

        setState({
            ...state,
            emailIsError:isEmail,
            nameIsError:isName
        })

        if(!isEmail && !isName){
            createUser({
                userName:state.name,
                email:state.email
            })
            .then(res => {
                toast.success(`User Created!`)
                toggle();
            })
            .catch(e => {
                toast.error(`Usert not created`)
                // toggle();
            })
        }   
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    React.useEffect(()=>{
        if(state.email!==''){
            setState({
                ...state,
                emailIsError:false,
            }) 
        }
        if(state.name !== ''){
            setState({
                ...state,
                nameIsError:false,
            }) 
        }
        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.name,state.email])

    return (
        <Dialog open={isOpen}>
           <DialogTitle>Create User</DialogTitle>
            <DialogContent  dividers>
                <div className={classes.content}>
                    <Grid container spacing={2}>
                        <Grid item container>
                            <TextField  
                                required
                                fullWidth
                                name='email'
                                error={state.emailIsError}
                                variant='outlined'
                                label='Email'
                                value={state.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item container>
                            <TextField  
                                required
                                fullWidth
                                name='name'
                                error={state.nameIsError}
                                variant='outlined'
                                label='Name'
                                value={state.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid>
                            <Typography variant='caption'>*Password will be sent to the provided email</Typography>
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={toggle}>Cancel</Button>
                <Button variant='contained' onClick={handleCreate}>Confrim</Button>
            </DialogActions>
        </Dialog>
    )
}
