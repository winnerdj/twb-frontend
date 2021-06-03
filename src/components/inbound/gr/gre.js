import React from 'react';
import {Paper,Grid, Button,Box} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Table,TableToolbar,useLoading,Loaders} from '../../elements';
import {retrieve,createGRE} from '../saga';
import {toast} from 'react-toastify';

function GRE(props) {
    const {select,fromDate,toDate} = useSelector(state => state.filters)
    const [data,setData] = React.useState([]);
    const [tempData,setTempData] = React.useState([]);
    const [skipPageReset,setPageReset] = React.useState(false);
    const [isLoading,setLoading] = useLoading();
    const {id} = useSelector(state => state.user);
    const columns = React.useMemo(()=>[
        {
            Header:'GRN No.',
            accessor:'grn_no',
            width:200
        },
        {
            Header:'Action',
            width:200,
            Cell:props => {
                const handleEdit = () => {
                    let tdata = [...data]
                    tdata[props.row.index]['isEdit'] = true;
                    setData(tdata);
                }

                const handleCancel = () => {
                    let newData = [...data]
                    const temp = tempData.filter(item => item.grn_no === props.row.original.grn_no)
                    newData[props.row.index]['doc_no'] =  temp[0].doc_no
                    newData[props.row.index]['isEdit'] = false;
                    setData(newData);
                }

                const handleSave = () => {
                    // console.log(props.row.original.grn_no)
                    setLoading(true)
                    createGRE({
                        route:'gre',
                        grnNo:props.row.original.grn_no,
                        drNo:props.row.original.doc_no,
                        user:id
                    })
                    .then(result => {
                        setLoading(false)
                        console.log(data[props.row.index]['doc_no'])
                    })
                    .catch(e => {
                        setLoading(false);
                        if(e.response && e.response.data){
                            toast.error(`${e.response.data.message}`)
                        }
                    })
                 
                }

                if(props.row.original.isEdit){
                    return (
                        <Box display='flex'>
                            <Box paddingRight={1}>
                                <Button size='small' variant='contained' onClick={handleSave}>Save</Button>
                            </Box>
                            <Box>
                                <Button size='small' variant='contained' color='secondary' onClick={handleCancel}>Cancel</Button>
                            </Box>
                        </Box>
                    )
                }
                else{
                    return (
                        <div>
                            <Button variant='contained' size='small' onClick={handleEdit} >Edit</Button>
                        </div>

                    )
                }
                
            }
           
        },
        {
            Header:'DR No.',
            accessor:'doc_no',
        },
        {
            Header:'GRN Type',
            accessor:'grn_type'
        },
        {
            Header:'GRN Date',
            accessor: 'grn_date'
        },
        {
            Header:'TBPI Reference No.',
            accessor:'ref_no'
        },
        {
            Header:'DR Date',
            accessor:'doc_date'
        },
        {
            Header:'Receiving Location',
            accessor: 'receiving_loc'
        },
        {
            Header:'Remarks',
            accessor:'remarks'
        },
        {
            Header:'Details Count',
            accessor:'tot_linctr'
        }
    ],[data, tempData])

    const updateCell = (rowIndex, columnId, value) => {
        setPageReset(true)
        setData(old => old.map((row,index) => {
            if(index === rowIndex ){
                return {
                    ...old[rowIndex],
                    [columnId]:value
                }
            }
            return row
        }))
    }

    const handleFetch = () => {
        setLoading(true)
        retrieve({
            route:'gre',
            type:select,
            fromDate,
            toDate
        })
        .then(result => {
            if(result.status === 200){
                const resResult = result.data.map(item => {
                    return {
                        ...item,
                        isEdit:false
                    }})
                // console.log(resResult)
                setTempData(resResult.map(item => {
                    return {
                        ...item,
                        temp:true
                    }
                }))
                setData(resResult)
            }
            setLoading(false)
        })
        .catch(e => {
            if(e.response && e.response.data){
                toast.error(`${e.response.data.message}`)
            }
            setLoading(false)
        })
    }

    React.useEffect(() => {
        setPageReset(false)
    },[data])

    return (
        <div>
            <Loaders isLoading={isLoading}/>
            <Paper elevation={0} component={Box} p={1}>
                <Grid container spacing={2}>
                    <TableToolbar handleFetch={handleFetch} showDateRange transferType='Type'/>
                    <Table 
                        columns={columns}
                        data={data}
                        size={20}
                        updateMyData={updateCell}
                        skipPageReset={skipPageReset}
                    />
                </Grid>
            </Paper>
        </div>
    );
}

export default GRE;