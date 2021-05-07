import React from 'react';
import {Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    DialogActions} from '@material-ui/core';
import {Table,TableToolbar} from '../../elements';

export default function ViewItems({
    open,
    toggle,
    refNo,
    items
}) {

    let columns = React.useMemo(() => [
            {
                Header:'#',
                accessor:'line_no',
                width:10
            },
            {
                Header:'Item Code',
                accessor:'itemcode'
            },
            {
                Header:'Allocated Quantity',
                accessor:'alloc_qty',
                width:90
            },
            {
                Header:'Reference No',
                accessor:'sa_no'
            },
            {
                Header:'Type',
                accessor:'sa_type',
                width:95
            }
    ],[])
     
    return (
       <Dialog open={open}>
            <DialogTitle>View Details</DialogTitle>
            <DialogContent dividers>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='body2'>Reference Number: <strong>{refNo}</strong></Typography>
                            {/* <Typography variant='body1'>{refNo}</Typography> */}
                        </Grid>
                        <Grid item xs={12}>
                            <Table
                                columns={columns}
                                data={items}
                                size={5}
                            />
                        </Grid>     
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='secondary' onClick={toggle}>Close</Button>
            </DialogActions>
       </Dialog>
    )
}

ViewItems.defaultProps = {
    items:[],
    refNo:'',
}


