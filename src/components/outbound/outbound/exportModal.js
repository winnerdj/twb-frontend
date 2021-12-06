import React from 'react';
import {Button,
    Dialog,
    DialogTitle,
    DialogContent,
    // TextField,
    Grid,
    // Typography,
    makeStyles,
    DialogActions
} from '@material-ui/core';
import {SelectSTC,Loaders,useLoading} from '../../elements'

const useStyles = makeStyles((theme) => ({
    dialogPaper:{
        minHeight: '80vh',
        maxHeight: '80vh',
    }
})) 

function ExportModal({
    isOpen,
    toggle,
    handleExport
}) {

    const classes = useStyles();
    const [isLoading,setLoading] = useLoading();

    return (
        <Dialog classes={{paper:classes.dialogPaper}}open={isOpen} fullWidth maxWidth='md'>
            <Loaders isLoading={isLoading}/>
            <DialogTitle>Export to ODO Ramco Template</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <SelectSTC
                            type='region'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <SelectSTC
                            type='via'
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectSTC
                            type='location'
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant='contained' color='primary' onClick={() => handleExport(setLoading)}>Export ODO</Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={toggle}>Close</Button>
          </DialogActions>
        </Dialog>
    );
}

export default ExportModal;