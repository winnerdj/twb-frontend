import React from 'react';
import {
    Paper,
    Grid, 
    Box,
    Button} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Table,TableToolbar,useLoading,Loaders} from '../../elements';
import {
    retrieve,
    exportToExcel,
    exportToAsnSTO
} from '../saga';
import {toast} from 'react-toastify';

function ConfirmedShipment() {
    const {select,fromDate,toDate,selectWhse} = useSelector(state => state.filters)
    const [data,setData] = React.useState([]);
    const [isLoading,setLoading] = useLoading();
    // const [open,setOpen] = React.useState(false);
    // const [selected,setSelected] = React.useState({
    //     items:[],
    //     refNo:''
    // })

    const columns = React.useMemo(()=>[
        {
            Header:'WMS Ref No.',
            accessor:'ship_no',
            // Cell:props => {
            //     const handleOpen = () =>{
            //         setLoading(true)
            //         retriveDetails({
            //             route:'shpcnf',
            //             refNo:props.row.original.ship_no,
            //             type:props.row.original.ship_type
            //         })
            //         .then(result => {
            //             if(result.status === 200){
            //                 setSelected({
            //                     ...selected,
            //                     items:result.data,
            //                     refNo:props.row.original.ship_no
            //                 })
            //                 toggleDetails()
            //                 setLoading(false)
            //             }
            //         })
            //         .catch(e => {
            //             console.log(e)
            //             setLoading(false)
            //         })

                  
            //     }
            //     return <Button onClick={handleOpen} size='small'>{props.row.original.ship_no}</Button>
            // }
        },
        {
            Header:'Type',
            accessor:'ship_type'
        },
        {
            Header:'TBPI Ref No',
            accessor:'ref_no'
        },
        {
            Header:'Ship Date',
            accessor:'ship_date'
        },
        {
            Header:'Issuing Location',
            accessor:'issuing_loc'
        },
        {
            Header:'Vendor Code',
            accessor:'vendor_code'
        },
        {
            Header:'SA Status',
            accessor:'ship_status'
        },
        {
            Header:'Details Count',
            accessor:'tot_linctr'
        },
        {
            Header:'Remarks',
            accessor:'ship_remarks'
        },
        {
            Header:'Created Date',
            accessor:'created_date'
        },
        {
            Header:'Modified Date',
            accessor:'updated_date'
        }
        ,{
            Header:'Action',
            
            Cell:props => { 
                const handlePrint = () => {
                    setLoading(true);
                    exportToAsnSTO({
                        route:'stogr',
                        refNo:props.row.original.ref_no,
                        type:props.row.original.ship_type,
                        fileName:props.row.original.ship_no
                    })
                    .then(() => {
                        setLoading(false)
                    })
                    .catch(e => {
                        setLoading(false)
                    })

                }
                if(props.row.original.ship_type === 'STO') {
                    return <Button onClick={handlePrint} size='small' variant='contained'>Convert to ASN</Button>
                }
                return <Button disabled={true} />
            }
        }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    // const toggleDetails = () =>  {
    //     setOpen(!open)
    // }

    const handleFetch = () => {
        setLoading(true)
        retrieve({
            route:'shpcnf',
            type:select,
            fromDate,
            toDate,
            whse:selectWhse?.value
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
        setLoading(true)
        exportToExcel({
            route:'shpcnf',
            fromDate,
            toDate,
            whse:selectWhse?.value
        })
        .then(result => {
            setLoading(false)
        })
        .catch(e => {
            console.log(e.response.data.message)
            toast.error(`${e.response.data.message}`)
            setLoading(false)
        })
    }

    return (
        <div>
            <Loaders isLoading={isLoading}/>
            <Paper elevation={0} component={Box} p={1}>
                <Grid container spacing={2}>
                    <TableToolbar handleFetch={handleFetch} handleExport={handleExport} showDateRange showWhse transferType='SA' isExportVisible/>
                    <Table 
                        columns={columns}
                        data={data}
                        size={20}
                    />
                </Grid>
            </Paper>
            {/* <ViewItems type='gr' open={open} toggle={toggleDetails} {...selected} />  */}
        </div>
    );
}

export default ConfirmedShipment;