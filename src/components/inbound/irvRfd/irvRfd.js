import React from 'react';
import {Paper,Grid, Button,Box} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Table,TableToolbar,Loader} from '../../elements';
import {retrieve,retriveDetails,exportToASN,exportToExcel} from '../saga';
import ViewItems from '../viewItems';

export default function IRVRFD() {
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
            Header:'TRNHO No.',
            accessor:'trnho_no',
            Cell:props => {
                const handleOpen = () =>{
                    setLoading(true)
                    retriveDetails({
                        route:'trnho',
                        refNo:props.row.original.trnho_no,
                        type:props.row.original.trnho_type
                    })
                    .then(result => {
                        if(result.status === 200){
                            setSelected({
                                ...selected,
                                items:result.data,
                                refNo:props.row.original.trnho_no
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
                return <Button onClick={handleOpen} size='small'>{props.row.original.trnho_no}</Button>
            }
        },
        {
            Header:'Transfer Type',
            accessor:'trnho_type'
        },
        {
            Header:'Transfer Date',
            accessor: 'trnho_date'
        },
        {
            Header:'Issuing Location',
            accessor:'issuing_loc'
        },
        {
            Header:'Receiving Location',
            accessor:'receiving_loc'
        },
        {
            Header:'Remarks',
            accessor:'remarks'
        },
        {
            Header:'Details Count',
            accessor:'tot_linctr'
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
                        route:'trnho',
                        refNo:props.row.original.trnho_no,
                        type:props.row.original.trnho_type,
                        fileName:props.row.original.trnho_no
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
            route:'trnho',
            type:select,
            fromDate,
            toDate
        })
        .then(result => {
            if(result.status === 200){
                setData(result.data)
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
            route:'trnho',
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
                    <TableToolbar handleFetch={handleFetch} handleExport={handleExport} showDateRange isExportVisible transferType='Type'/>
                    <Table 
                        columns={columns}
                        data={data}
                        size={20}
                    />
                </Grid>
            </Paper>
            <ViewItems type='trnho' open={open} toggle={toggleDetails} {...selected} />

        </div>
    )
}
