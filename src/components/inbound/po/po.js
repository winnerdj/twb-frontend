import React from 'react';
import {Paper,Grid, Button,Box} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Table,TableToolbar,Loader} from '../../elements';
import {retrieve,retriveDetails,exportToASN,exportToExcel} from '../saga';
import ViewItems from '../viewItems';


export default function PurchaseOrder() {
    const {select,fromDate,toDate} = useSelector(state => state.filters)
    const [data,setData] = React.useState([]);
    const [isLoading,setLoading] = React.useState(false);
    const [open,setOpen] = React.useState(false);
    const [selected,setSelected] = React.useState({
        items:[],
        refNo:''
    })
    const columns = React.useMemo(()=>[
        {
            Header:'PO No.',
            accessor:'po_no',
            Cell:props => {
                const handleOpen = () =>{
                    setLoading(true)
                    retriveDetails({
                        route:'po',
                        refNo:props.row.original.po_no,
                        type:props.row.original.po_type
                    })
                    .then(result => {
                        if(result.status === 200){
                            setSelected({
                                ...selected,
                                items:result.data,
                                refNo:props.row.original.po_no
                            })
                            toggleDetails()
                            setLoading(false)
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        setLoading(false)
                    })

                  
                }
                return <Button onClick={handleOpen} size='small'>{props.row.original.po_no}</Button>
            }
        },
        {
            Header:'PO Type',
            accessor:'po_type'
        },
        {
            Header:'PO Date',
            accessor: 'po_date'
        },
        {
            Header:'PO Expiry',
            accessor:'po_expiry'
        },
        {
            Header:'PO Delivery',
            accessor:'po_delivery'
        },
        {
            Header:'Vendor Code',
            accessor:'vendor_code'
        },
        {
            Header:'Remarks',
            accessor:'po_remarks'
        },
        {
            Header:'Details Count',
            accessor:'tot_linectr'
        },
        {
            Header:'Created Date',
            accessor:'created_date'
        },
        {
            Header:'Modified Date',
            accessor:'updated_date'
        },
        {
            Header:'Action',
            Cell:props =>{ 
                const handlePrint = () => {
                    setLoading(true);
                    exportToASN({
                        route:'po',
                        refNo:props.row.original.po_no,
                        type:props.row.original.po_type,
                        fileName:props.row.original.po_no
                    })
                    .then(() => {
                        setLoading(false)
                    })
                    .catch(e => {
                        setLoading(false)
                    })

                }
                return <Button onClick={handlePrint} size='small' variant='contained'>Convert to ASN</Button>
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])

    const toggleDetails = () =>  {
        setOpen(!open)
    }

    const handleFetch = () => {
        setLoading(true)
        retrieve({
            route:'po',
            type:select,
            fromDate,
            toDate
        })
        .then(result => {
            if(result.status === 200){
                setData(result.data)
               //console.log(result.data)
            }
            setLoading(false)
        })
        .catch(e => {
            setLoading(false)
        })
    }

    const handleExport = () => {
        setLoading(true);
        exportToExcel({
            route:'po',
            fromDate,
            toDate
        })
        .then(() => {
            setLoading(false)
        })
        .catch(e => {
            setLoading(false)
        })
    }   

    return (
        <div>
            {isLoading ? <Loader/>: null}
            <Paper elevation={0} component={Box} p={1}>
                <Grid container spacing={2}>
                    <TableToolbar transferType='PO' handleFetch={handleFetch} handleExport={handleExport} showDateRange isExportVisible/>
                    <Table 
                        columns={columns}
                        data={data}
                        size={20}
                    />
                </Grid>
            </Paper>
            <ViewItems type='po' open={open} toggle={toggleDetails} {...selected}/>
        </div>
    )
}
