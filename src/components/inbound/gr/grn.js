import React from 'react';
import {Paper,Grid, Button,Box} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Table,TableToolbar,useLoading,Loaders} from '../../elements';
import {retrieve,exportToExcel, updateStatus} from '../saga';
import {toast} from 'react-toastify';

function GRN() {
    const {select,fromDate,toDate} = useSelector(state => state.filters)
    const [data,setData] = React.useState([]);
    const [isLoading,setLoading] = useLoading();

    const columns = React.useMemo(()=>[
        {
            Header:'GRN No.',
            accessor:'grn_no',
            width:200
        },
        {
            Header:'Action',
            Cell:props => {
                return <div>
                    <Button onClick={() => handleUpdate(props)} size='small' variant='contained' color='secondary'>Cancel</Button>
                </div>
            }
        },
        {
            Header:'GRN Status',
            Cell:props => {
                return <div>{
                    props.row.original.grn_status === null ? null :
                    props.row.original.grn_status.toUpperCase().includes('C') ? 'Cancelled' :
                    props.row.original.grn_status.toUpperCase().includes('R') ? 'Reversed' :
                    props.row.original.grn_status.toUpperCase().includes('X') ? 'Invalid' : props.row.original.grn_status
                }</div>
            }
        },
        {
            Header:'GRN Type',
            accessor:'grn_type'
        },
        {
            Header:'GRN Date',
            accessor: 'grn_date'
        },
        {
            Header:'TBPI Reference No.',
            accessor:'ref_no'
        },
        {
            Header:'DR No.',
            accessor:'doc_no'
        },
        {
            Header:'DR Date',
            accessor:'doc_date'
        },
        {
            Header:'Receiving Location',
            accessor: 'receiving_loc'
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
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[data])

    // const toggleDetails = () =>  {
    //     setOpen(!open)
    // }

    const handleUpdate = (props) => {
        setLoading(true)
        updateStatus({
            route:'grn',
            no:props.row.original.grn_no
        })
        .then(result => {
            if(result.status === 200){
                //update row data
                let updateData = data.map(item => {
                    if(item.grn_no === props.row.original.grn_no){
                        item.grn_status = 'CND'
                    }
                    return item
                });
                
                setData(updateData)
                setLoading(false)
           }
        })
        .catch(e => {   
            console.log(e.response.data.message)
            toast.error(`${e.response.data.message}`)            
            setLoading(false)
        })
    }
    
    const handleFetch = () => {
        setLoading(true)
        retrieve({
            route:'grn',
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
            if(e.response && e.response.data){
                toast.error(`${e.response.data.message}`)
            }
            setLoading(false)
        })
    }

    const handleExport = () => {
        setLoading(true)
        exportToExcel({
            route:'grn',
            fromDate,
            toDate
        })
        .then(result => {
            setLoading(false)
        })
        .catch(e => {
            if(e.response && e.response.data){
                toast.error(`${e.response.data.message}`)
            }
            setLoading(false)
        })
    }

    return (
        <div>
            <Loaders isLoading={isLoading}/>
            <Paper elevation={0} component={Box} p={1}>
                <Grid container spacing={2}>
                    <TableToolbar handleFetch={handleFetch} handleExport={handleExport} showDateRange transferType='Type' isExportVisible/>
                    <Table 
                        columns={columns}
                        data={data}
                        size={20}
                    />
                </Grid>
            </Paper>
        </div>
    );
}

export default GRN;