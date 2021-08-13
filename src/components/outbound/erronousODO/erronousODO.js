import React from 'react';
import {Paper,Grid,Box} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Table,TableToolbar,Loaders,useLoading} from '../../elements';
import {retrieve,exportToExcel} from '../saga';
import {toast} from 'react-toastify';


function ErronousODO(props) {
    const {fromDate,toDate} = useSelector(state => state.filters)
    const [data,setData] = React.useState([]);
    const [isLoading,setLoading] = useLoading(false);

    const col = React.useMemo(()=>[
        {
            Header:'DR No',
            accessor:'dr_no',
            width:200
        },
        {
            Header:'Dispatch No',
            accessor:'dispatch_no',
            width:200
        },
        {
            Header:'ODO No',
            accessor:'odo_no',
            width:200
        },
        {
            Header:'Nth Load Exec',
            accessor:'nth_load_exec'
        },
        {
            Header:'ODO Pri. Ref. Doc',
            accessor:'odo_pri_ref_doc_no'
        },
        {
            Header:'ODO Status',
            accessor:'odo_status'
        },
        {
            Header:'SA Type',
            accessor:'sa_type'
        },
        {
            Header:'TBPI Ref. No',
            accessor:'tbpi_ref_no'
        },
        {
            Header:'Issuing Location',
            accessor:'issuing_loc'
        },
        {
            Header:'Via',
            accessor:'via'
        },
        {
            Header:'Qty',
            accessor:'qty'
        },
        {
            Header:'ODO Modified Date',
            accessor:'odo_modif_date'
        },
        {
            Header:'Load Exec. Date',
            accessor:'load_exec_date'
        },
        {
            Header:'Load Created Date',
            accessor:'load_created_date'
        }
    ],[])

    const handleFetch = () => {
        setLoading(true)
        retrieve({
            route:'erronous-odo',
            // type:select,
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
        setLoading(true)
        exportToExcel({
            route:'erronous-odo',
            fromDate,
            toDate
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
                <TableToolbar 
                    handleFetch={handleFetch} 
                    handleExport={handleExport} 
                    showDateRange 
                    isExportVisible
                    />
                    <Table
                        columns={col}
                        data={data}
                        size={10}
                    />
                </Grid>
            </Paper>
        </div>
    );
}

export default ErronousODO;