import React from 'react';
import {Paper,Grid,Box} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Table,TableToolbar,Loader} from '../../elements';
import {retrieve,exportToExcel} from '../saga';
// import {toast} from 'react-toastify';
// import ViewItems from '../viewItems';

function DR() {
    const {select,fromDate,toDate} = useSelector(state => state.filters)
    const [data,setData] = React.useState([]);
    const [isLoading,setLoading] = React.useState(false);
    // const [open,setOpen] = React.useState(false);
    // const [selected,setSelected] = React.useState({
    //     items:[],
    //     refNo:''
    // });

    const columns = React.useMemo(()=>[
        {
            Header:'Reference No.',
            accessor:'dr_no',
            width:200
        },
        {
            Header:'Type',
            accessor:'type'
        },
        {
            Header:'DR Date',
            accessor:'dr_date'
        },
        {
            Header:'Source Location',
            accessor:'source_loc'
        },
        {
            Header:'Destination Location',
            accessor:'destination'
        },
        {
            Header:'No. of Cartons',
            accessor:'cartons'
        },
        {
            Header:'Estimated Value',
            accessor:'est_value'
        },
        {
            Header:'CBM',
            accessor:'cbm'
        },
        {
            Header:'Actual Weight',
            accessor:'actual_weight'
        },
        {
            Header:'Volume Weigth',
            accessor:'volume_weight'
        },
        {
            Header:'Mode of Shipment',
            accessor:'via'
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
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    // const toggleDetails = () =>  {
    //     setOpen(!open)
    // }

    const handleFetch = () => {
        setLoading(true)
        retrieve({
            route:'dr',
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
            route:'dr',
            fromDate,
            toDate
        })
        .then(result => {
            setLoading(false)   
        })
        .catch(e => {
            console.log(e)
            setLoading(false) 
        })
    }

    return (
        <div>
            {isLoading ? <Loader/>: null}
        <Paper elevation={0} component={Box} p={1}>
            <Grid container spacing={2}>
                <TableToolbar handleFetch={handleFetch} handleExport={handleExport} showDateRange isExportVisible transferType='SA'/>
                <Table 
                    columns={columns}
                    data={data}
                    size={20}
                />
            </Grid>
        </Paper>
        {/* <ViewItems open={open} toggle={toggleDetails} {...selected}/> */}
        </div>
    );
}

export default DR;