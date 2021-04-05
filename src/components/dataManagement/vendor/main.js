import React from 'react';
import {Table,TableToolbar,Loader} from '../../elements';
import {Paper,Grid} from '@material-ui/core';
import {retrieve,exportToExcel} from '../saga';
import {useSelector} from 'react-redux';

export default function Vendor() {
    const [state,setState] = React.useState([]);
    const [isLoading,setLoading] = React.useState(false);
    const {date} = useSelector(state => state.filters);

    const columns = React.useMemo(() => [
        {
            Header:'Vendor Code',
            accessor:'vendor_code'
        },
        {
            Header:'Vendor Name',
            accessor:'vendor_name'
        },
        {
            Header:'Vendor Address',
            accessor:'vendor_address'
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
            route:'vendor',
            date
        }).then(result => {
            console.log(result)
            setState(result)
            setLoading(false)
        });
    }


    const handleExport = async() => {
        setLoading(true)
        exportToExcel({
            route:'vendor',
            fileName:'Vendor',
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
