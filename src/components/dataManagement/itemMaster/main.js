import React from 'react';
import {Table,TableToolbar,Loader} from '../../elements';
import {Paper,Grid} from '@material-ui/core';
import {retrieve,exportToExcel} from '../saga';
import {useSelector} from 'react-redux';

export default function ItemMaster() {
    const [state,setState] = React.useState([]);
    const [isLoading,setLoading] = React.useState(false);
    const {date} = useSelector(state => state.filters);

    const columns = React.useMemo(() => [
        {
            Header:'Item Code',
            accessor:'itemcode'
        },
        {
            Header:'Description',
            accessor:'itm_desc1'
        },
        {
            Header:'Extra Description',
            accessor:'itm_desc2'
        },
        {
            Header:'Item Type',
            accessor:'itm_prodline'
        },
        {
            Header:'UOM',
            accessor:'uom'
        },
        {
            Header:'Item Status',
            accessor:'itm_status'
        },
        {
            Header:'Product Unit Cost',
            accessor:'unitcost'
        },
        {
            Header:'Length',
            accessor:'itm_length'
        },
        {
            Header:'Width',
            accessor:'itm_width'
        },
        {
            Header:'Height',
            accessor:'itm_height'
        },
        {
            Header:'Weigth',
            accessor:'itm_weight'
        },
        {
            Header:'Shelf Life (Months)',
            accessor:'shelflife'
        },
        {
            Header:'Critical Days',
            accessor:'criticaldays'
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
            route:'item',
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
            route:'item',
            fileName:'Item-Master',
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
    )
}
