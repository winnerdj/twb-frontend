import React from 'react';
import {Table,TableToolbar,Loader} from '../../elements';
import {Paper,Grid} from '@material-ui/core';
import {retrieve,exportToExcel} from '../saga';
import {useSelector} from 'react-redux';

export default function Location() {
    const [state,setState] = React.useState([]);
    const [isLoading,setLoading] = React.useState(false);
    const {date} = useSelector(state => state.filters);

    const columns = React.useMemo(() => [
        {
            Header:'Location Code',
            accessor:'location_code'
        },
        {
            Header:'Location Name',
            accessor:'location_name'
        },
        {
            Header:'Location Address',
            accessor:'location_address'
        },
        {
            Header:'Ship To Address',
            accessor:'shiptoaddress'
        },
        {
            Header:'Contact Person',
            accessor:'contactperson'
        },
        {
            Header:'Contact #',
            accessor:'contactnumber'
        },
        {
            Header:'Ship Mode',
            accessor:'shipmode'
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
            route:'location',
            date
        }).then(result => {
            // console.log(result)
            setState(result)
            setLoading(false)
        });
    }

    const handleExport = async() => {
        setLoading(true)
        exportToExcel({
            route:'location',
            fileName:'Location',
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
