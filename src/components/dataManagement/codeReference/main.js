import React from 'react'
import {Table,TableToolbar,Loader} from '../../elements';
import {Paper,Grid} from '@material-ui/core';
import {retrieve,exportToExcel} from '../saga';
import {useSelector} from 'react-redux';

export default function CodeReference() {
    const [state,setState] = React.useState([]);
    const [isLoading,setLoading] = React.useState(false);
    const {date} = useSelector(state => state.filters);

    const columns = React.useMemo(() => [
        {
            Header:'Code',
            accessor:'codemne'
        },
        {
            Header:'Code Val',
            accessor:'codeval'
        },
        {
            Header:'Code Description',
            accessor:'codedesc'
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
        retrieve({route:'codereference',date}).then(result => {
            setState(result)
            setLoading(false)
        });
    }

    const handleExport = async() => {
        setLoading(true)
        exportToExcel({
            route:'codereference',
            fileName:'Code_Ref',
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
                    <TableToolbar handleFetch={handleFetch} handleExport={handleExport} isExportVisible showDateFilter/>
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
