import React from 'react';
import {Table,TableToolbar,Loaders,useLoading} from '../../elements';
import {Paper,Grid} from '@material-ui/core';
import {retrieve,exportToExcel} from '../saga';
import {useSelector} from 'react-redux';


function ItemConversion() {
    const [state,setState] = React.useState([]);
    const [isLoading,setLoading] = useLoading();
    const {date} = useSelector(state => state.filters);

    const columns = React.useMemo(() => [
        {
            Header:'Item Code',
            accessor:'itemcode'
        },
        {
            Header:'UOM From',
            accessor:'uom_from'
        },
        {
            Header:'UOM To',
            accessor:'uom_to'
        },
        {
            Header:'Conversion Value',
            accessor:'conv_value'
        },
        {
            Header:'Converrsion Code',
            accessor:'conv_code'
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
        setLoading(true)
        retrieve({
            route:'itemconversion',
            date:date
        }).then(result => {
            setState(result)
            setLoading(false)
        })
        .catch(e => {
            setLoading(false)
        });
    }

    const handleExport = async() => {
        setLoading(true)
        exportToExcel({
            route:'itemconversion',
            fileName:'Item-Conversion',
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
            <Loaders isLoading={isLoading}/>
            <Grid item xs={12}>
                <Paper elevation={0}> 
                    <TableToolbar 
                        handleFetch={handleFetch} 
                        handleExport={handleExport} 
                        showDateFilter 
                        isExportVisible/>
                    <Table
                        columns={columns}
                        data={state}
                        size={20}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ItemConversion;