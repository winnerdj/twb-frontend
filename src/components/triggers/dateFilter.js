import React from 'react';
import {Grid,Box,TextField,Button,Typography} from '@material-ui/core';
import {Loader,useLoading} from '../elements/loader-component';
import {toast} from 'react-toastify';

const DateFilter = ({
    label,
    type,
    trigger
}) => {
    const [isLoading,setLoading] = useLoading();
    const [state,setState] = React.useState({
        from:'',
        to:''
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    
    const handleConfirm = () => {
        setLoading(true)
        trigger(state.from,state.to,type)
        .then(() => {
            setLoading(false)
            toast.success('Success')
        })
        .catch(e => {
            if(e.response && e.response.data){
                toast.error(`${e.response.data.message}`)
            }
            setLoading(false)
        })
        // .then(result => {
        //     setLoading(false)
        // })
        // trigger({
        //     route:type,
        //     from:state.from,
        //     to:state.to
        // }).then(result => {
        //     setLoading(false)
        //     // if(result.status === 200){
        //     //     setLoading(false)
        //     // }
        // })
        // .catch(e => {
        //     console.log(e.response.data.message)
        //     toast.error(`${e.response.data.message}`)
        //     setLoading(false)
        // })
    }
    return (
        <Grid item container >
            <Loader isLoading={isLoading}/>
             <Grid item xs={12}>
                <Typography variant='h6'>{label}</Typography>
            </Grid> 
            <Grid item component={Box} display='flex' xs={12}>
                <Box p={1}>
                    <TextField
                        type='datetime-local'
                        name='from'
                        label='From'
                        variant='outlined'
                        size='small'
                        value={state.from}
                        onChange={handleChange}
                        InputLabelProps={{shrink:true}}
                    />
                </Box>
                <Box p={1}>
                    <TextField
                        type='datetime-local'
                        name='to'
                        label='To'
                        variant='outlined'
                        size='small'
                        value={state.to}
                        onChange={handleChange}
                        InputLabelProps={{shrink:true}}
                    />
                </Box>
                <Box p={1}>
                    <Button variant='contained' color='primary' onClick={handleConfirm}>Confirm</Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default DateFilter;