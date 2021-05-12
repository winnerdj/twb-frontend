import React from 'react';
import {Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    DialogActions} from '@material-ui/core';
import PropTypes from 'prop-types';
import {Table} from '../../elements';

export default function ViewItems({
    open,
    toggle,
    type,
    refNo,
    items
}) {

    let columns = React.useMemo(()=>{
        if(type === 'po')
            return [
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
                    Header:'PO Qty',
                    accessor:'po_qty',
                    width:90
                },
                {
                    Header:'PO No',
                    accessor:'po_no'
                },
                {
                    Header:'PO Type',
                    accessor:'po_type',
                    width:95
                },  
            ]
        if(type==='trnho')
            return [
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
                    Header:'Quantity',
                    accessor:'trnho_qty',
                    width:90
                },
                {
                    Header:'UOM',
                    accessor:'uom'
                },
                {
                    Header:'Reference No.',
                    accessor:'trnho_no'
                },
                {
                    Header:'Transfer Type',
                    accessor:'trnho_type',
                    width:95
                }
            ]
        if(type==='gr'){
            return [
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
                    Header:'Quantity',
                    accessor:'rcv_qty'
                },
                {
                    Header:'Batch No',
                    accessor:'batch_no'
                },
                {
                    Header:'Expiry Date',
                    accessor:'expiry_date'
                },
                {
                    Header:'GRN No',
                    accessor:'grn_no'
                }
            ]
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[type])

    return (
       <Dialog open={open}>
            <DialogTitle>View Details</DialogTitle>
            <DialogContent dividers>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='body2'>{type === 'po' ? 'PO Number' : 'Reference Number' }: <strong>{refNo}</strong></Typography>
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
    type:''
}

ViewItems.propTypes = {
    type:PropTypes.oneOf(['po','trnho','gr'])
}

