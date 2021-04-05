import React from 'react';
import {Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Grid,
    Typography,
    Switch,
    DialogActions} from '@material-ui/core';
import {updateUser} from '../saga';
import {toast} from 'react-toastify';

export default function UpdateUser({
    open,
    toggle,
    viewResetPassword,
    viewUpdatePassword,
    viewStatusSwitch,
    email,
    status, 
}) {
    const [state,setState] = React.useState({
        status:false,
        password:'',
        oldPassword:'',
        confirmPassword:'',
        passwordError:false
    })



    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const handleConfirm = () => {
        if(state.password !== state.confirmPassword){
            return toast.error(`Please validate your password`)
        }

        let body={};
        // if(viewResetPassword){
        //     console.log('test')
        //     body = Object.assign(body,{
        //         password:state.password
        //     })
        // }

        if(viewUpdatePassword){
            body = Object.assign(body,{
                oldPassword:state.oldPassword,
                password:state.password
            })
        }
        if(viewStatusSwitch){
            body = Object.assign(body,{
                status:state.status
            })
        }   
        updateUser({
            email,
            ...body
        })
        .then(result => {
            if(result.status === 200){
                toast.success('Success!')
            }
        })
        .catch(e => {
            if(e.response !== 'undfined'){
                toast.error(`${e.response.data.message}`)
            }
        })
    }

    React.useEffect(()=>{
        setState({
            ...state,
            status:status === 'Active' ? true:false
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[open])

    return (
        <Dialog open={open}>
            <DialogTitle>Update User</DialogTitle>
            <DialogContent dividers>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='subtitle1'>Email</Typography>
                            <Typography variant='h6'>{email}</Typography>
                        </Grid>
                        {viewUpdatePassword ? 
                        <Grid item container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                fullWidth
                                label='Old Password'
                                name='oldPassword'
                                variant='outlined'
                                type='password'
                                value={state.oldPassword}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='New Password'
                                name='password'
                                variant='outlined'
                                type='password'
                                value={state.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Confirm Password'
                                name='confirmPassword'
                                variant='outlined'
                                type='password'
                                value={state.confirmPassword}
                                onChange={handleChange}
                            />
                        </Grid>
                        </Grid> : null
                        }
                        {viewStatusSwitch ? 
                            <Grid item xs={12}>
                                <Typography variant='subtitle1'>Status</Typography>
                                <Switch
                                    checked={state.status}
                                    color='primary'
                                    onChange={()=>setState({...state,status:!state.status})}
                                />
                            </Grid>: null
                        }
                        {viewResetPassword ? 
                        
                        <Grid item xs={12}>
                            <Button variant='contained' color='secondary'>Reset Password</Button>
                        </Grid> : null
                        }
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='secondary' onClick={toggle}>Cancel</Button>
                <Button variant='contained' onClick={handleConfirm}>Confrim</Button>
            </DialogActions>
        </Dialog>
    )
}

UpdateUser.defaultProps = {
    handleUpdate:()=>{},
    viewResetPassword:false,
    viewUpdatePassword:false,
    viewStatusSwitch:false,
    status:false
}
