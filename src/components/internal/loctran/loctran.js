import React from 'react';
import {
    Paper,
    Grid, 
    Box,
    Button
} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Table,TableToolbar,useLoading,Loaders} from '../../elements';
import {retrieveMidbound} from '../saga';

function Loctran(props) {
    const {fromDate,toDate} = useSelector(state => state.filters)
    const [data,setData] = React.useState([]);
    const [isLoading,setLoading] = useLoading();
    
    const columns = React.useMemo(() => [
        {
            Header:'Loctran Ref. No.',
            accessor:'loctran_no'
        },
        {
            Header:'Loctran Date',
            accessor:'loctran_date'
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
    ],[])

    
    const handleFetch = () => {
        setLoading(true);
        retrieveMidbound({
            route:'loctran',
            from:fromDate,
            to:toDate
        })
        .then(result => {
            setData(result.data)
            setLoading(false)
        })
        .catch(e => {
            setLoading(false)
        })
    }

    return (
        <div>
            <Loaders isLoading={isLoading}/>
            <Paper elevation={0} component={Box} p={1}>
                <Grid container spacing={2}>
                    <TableToolbar handleFetch={handleFetch} showDateRange/>
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

export default Loctran;