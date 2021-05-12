import React from 'react';
import {Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    DialogActions,
    DialogContentText
} from '@material-ui/core';
import {useLoading,Loaders} from '../elements';
import {create} from './saga';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';


function CreateModal({
    open,
    toggle
}) {
    const [isLoading,setLoading] = useLoading();
    const {id} = useSelector(state => state.user);

    const handleImportDocument = (type) => {
        setLoading(true);
        create({
            route:'stockbalance',
            type:type,
            user:id
        })
        .then(result => {
            if(result.status === 200){
                toast.success(`Success`)
                setLoading(false);
            }
        })
        .catch(e => {
            console.log(e)
            toast.error(`${e.response.data.message}`)
            setLoading(false);
        })
    }

    return (
        <Dialog fullWidth maxWidth='sm' open={open}>
            <DialogTitle>Import to DMS</DialogTitle>
            <DialogContent dividers>    
            <Loaders isLoading={isLoading}/>                
            <DialogContentText>Select Document Type</DialogContentText>
            <Grid direction="row" justify="space-between" alignItems="center" container spacing={1}>
                <Grid item xs={6}>
                    <Button variant='contained' color='secondary' onClick={()=>{handleImportDocument('STKBALWMS')}}>Import Stock Balance</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant='contained' color='primary' onClick={()=>{handleImportDocument('W2W')}}>Import Wall To Wall</Button>
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='secondary' onClick={toggle}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateModal;