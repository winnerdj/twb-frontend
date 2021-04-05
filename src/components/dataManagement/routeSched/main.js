import React from 'react'
import {Table,TableToolbar,Loader} from '../../elements';
import {Paper,Grid} from '@material-ui/core';
import {retrieve,exportToExcel} from '../saga';
import {useSelector} from 'react-redux';

export default function RouteSched() {
    const [state,setState] = React.useState([]);
    const [isLoading,setLoading] = React.useState(false);
    const {date} = useSelector(state => state.filters);

    const columns = React.useMemo(() => [
        {
            Header:'Location Code',
            accessor:'location_code'
        },
        {
            Header:'Region Code',
            accessor:'region_code'
        },
        {
            Header:'Monday',
            accessor:'ship_mon'
        },
        {
            Header:'Tuesday',
            accessor:'ship_tue'
        },
        {
            Header:'Wednesday',
            accessor:'ship_wed'
        },
        {
            Header:'Thursday',
            accessor:'ship_thu'
        },
        {
            Header:'Friday',
            accessor:'ship_fri'
        },
        {
            Header:'Saturday',
            accessor:'ship_sat'
        },
        {
            Header:'Sunday',
            accessor:'ship_sun'
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
            route:'routeschedule',
            date
        }).then(result => {
            setState(result)
            setLoading(false)
        });
    }

    const handleExport = async() => {
        setLoading(true)
        exportToExcel({
            route:'routeschedule',
            fileName:'Route_Sched',
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
