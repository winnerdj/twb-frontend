import React from 'react'
import {Table,TableToolbar,Loader} from '../../elements';
import {Paper,Grid} from '@material-ui/core';
import {retrieve,exportToExcel} from '../saga';
import {useSelector} from 'react-redux';

export default function ForwardShipment() {
    const [state,setState] = React.useState([]);
    const [isLoading,setLoading] = React.useState(false);
    const {date} = useSelector(state => state.filters);

    const columns = React.useMemo(() => [
        {
            Header:'Forwarder Code',
            accessor:'forwarder_code'
        },
        {
            Header:'Origin',
            accessor:'origin'
        },
        {
            Header:'Location Code',
            accessor:'location_code'
        },
        {
            Header:'Ship To Address',
            accessor:'shiptoaddress'
        },
        {
            Header:'Via',
            accessor:'via'
        },
        {
            Header:'Effectivity Start Date',
            accessor:'effectivity_startdate'
        },
        {
            Header:'Effectivity End Date',
            accessor:'effectivity_enddate'
        },
        {
            Header:'Is Active',
            accessor:'isactive'
        },
        {
            Header:'Default Forwarder',
            accessor:'default_fwdr'
        },
        {
            Header:'Created Date',
            accessor:'created_date'
        },
        {
            Header:'Modified Date',
            accessor:'updated_date'
        },
    ],[])

    const handleFetch = () => {
        setLoading(true)
        retrieve({
            route:'forwardershipmentmode',
            date:date
        }).then(result => {
            setState(result)
            setLoading(false)
        });
    }

    const handleExport = async() => {
        setLoading(true)
        exportToExcel({
            route:'forwardershipmentmode',
            fileName:'Forwarder_Ship',
            date
        }).then(() => {
            setLoading(false)
        })
        .catch(e => {
            setLoading(false)
        });
    }

    return (
        <Grid container>
            {isLoading ? <Loader/> : null}
            <Grid item xs={12}>
                <Paper elevation={0}> 
                    <TableToolbar handleFetch={handleFetch} handleExport={handleExport} showDateFilter isExportVisible/>
                    <Table
                        columns={columns}
                        data={state}
                        size={20}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
    

}
