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
import {SelectSTC} from '../../elements'

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

    return (
        <Dialog classes={{paper:classes.dialogPaper}}open={isOpen} fullWidth maxWidth='md'>
            <DialogTitle>Export to ODO Ramco Template</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <SelectSTC
                            type='region'
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectSTC
                            type='location'
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant='contained' color='primary' onClick={handleExport}>Export</Button>
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