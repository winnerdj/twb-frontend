import React from 'react';
import {
    Paper,
    Grid, 
    Box,
    Button
} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Table,TableToolbar,useLoading,Loaders} from '../../elements';
import {
    retrieve
} from '../saga';
import {saveAs} from 'file-saver';

function TransactionReport(props) {
    const {fromDate,toDate} = useSelector(state => state.filters)
    const [data,setData] = React.useState([]);
    const [isLoading,setLoading] = useLoading();

    const columns = React.useMemo(()=>[
        {
            Header:'Filename',
            accessor:'Filename',
            width:250
        },
        {
            Header:'Generated Date',
            accessor:'Date'
         },
        {
            Header:'Zip File',
            accessor:'File_Content',
            Cell:props => {
                const download = () => {
                    try{
                        const buffer = Buffer.from(props.row.original.File_Content.data)
                        const blob = new Blob([buffer]);
                        saveAs(blob,props.row.original.Filename)
                    }
                    catch(e){
                        setLoading(false)  
                    }
                }
                return <Button variant='contained' color='primary' onClick={download}>Download</Button>
            }
        },
        {
            Header:'Created Date',
            accessor:'cdi_created_date'
        }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    const handleFetch = () => {
        setLoading(true)
        retrieve({
            route:'report',
            from:fromDate,
            to:toDate
        })
        .then(result => {
            if(result.status === 200){
                setData(result.data)
               //console.log(result.data)
            }
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
                    <TableToolbar handleFetch={handleFetch} showDateRange transferType='DOC'/>
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

export default TransactionReport;