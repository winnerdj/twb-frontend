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
import CreateModal from '../createModal';

function Inventory(props) {
    const {select,fromDate,toDate} = useSelector(state => state.filters)
    const [data,setData] = React.useState([]);
    const [isLoading,setLoading] = useLoading();
    const [modal,setModal] = React.useState(false);

    const columns = React.useMemo(()=>[
        {
            Header:'Filename',
            accessor:'Filename',
            width:250
        },
        {
            Header:'Type',
            accessor:'doc_type'
        },
        {
            Header:'Snapshot Date',
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
            accessor:'created_date'
        },
        {
            Header:'Modified Date',
            accessor:'updated_date'
        }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    const handleFetch = () => {
        setLoading(true)
        retrieve({
            route:'stockbalance',
            type:select,
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

    const toggle = () => {
        setModal(!modal);       
        if(modal){
            handleFetch();
        }
    }

    return (
        <div>
            <Loaders isLoading={isLoading}/>
            <Paper elevation={0} component={Box} p={1}>
                <Grid container spacing={2}>
                    <TableToolbar handleFetch={handleFetch} handleCreate={toggle} showCreate showDateRange transferType='DOC'/>
                    <Table 
                        columns={columns}
                        data={data}
                        size={20}
                    />
                </Grid>
            </Paper>
            <CreateModal open={modal} toggle={toggle}/>
        </div>
    );
}

export default Inventory;