import React from 'react';
import {Paper,Grid, Button,Box} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Table,TableToolbar,Loader} from '../../elements';
import {retrieve,retriveDetails,exportToODO} from '../saga';
import {toast} from 'react-toastify';
import ViewItems from '../viewItems';

export default function Outbound() {
    const {select,fromDate,toDate,stc} = useSelector(state => state.filters)
    const [data,setData] = React.useState([]);
    const [isLoading,setLoading] = React.useState(false);
    const [open,setOpen] = React.useState(false);
    const [selected,setSelected] = React.useState({
        items:[],
        refNo:''
    })

    const columns = React.useMemo(()=>[
        {
            Header:'Reference No.',
            accessor:'sa_no',
            Cell:props => {
                const handleOpen = () =>{
                    setLoading(true)
                    retriveDetails({
                        route:'sa',
                        refNo:props.row.original.sa_no,
                        type:props.row.original.sa_type
                    })
                    .then(result => {
                        if(result.status === 200){
                            setSelected({
                                ...selected,
                                items:result.data,
                                refNo:props.row.original.sa_no
                            })
                            toggleDetails()
                            setLoading(false)
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        setLoading(false)
                    })

                  
                }
                return <Button onClick={handleOpen} size='small'>{props.row.original.sa_no}</Button>
            }
        },
        {
            Header:'Type',
            accessor:'sa_type'
        },
        {
            Header:'isConsolidated',
            accessor:'isconsolidated'
        },
        {
            Header:'SA Date',
            accessor:'sa_date'
        },
        {
            Header:'Source Location',
            accessor:'source_loc'
        },
        {
            Header:'Destination Location',
            accessor:'destination'
        },
        {
            Header:'Mode of Shipment',
            accessor:'via'
        },
        {
            Header:'Valuation Amount',
            accessor:'valuation'
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
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    const toggleDetails = () =>  {
        setOpen(!open)
    }

    const handleFetch = () => {
        setLoading(true)
        retrieve({
            route:'sa',
            type:select,
            fromDate,
            toDate
        })
        .then(result => {
            if(result.status === 200){
                setData(result.data)
            }
            setLoading(false)
        })
        .catch(e => {
            setLoading(false)
        })
    }

    const handleExport = () => {
        if(stc == null){
            setLoading(false) 
            return toast.error('STC  are required')
        }
        setLoading(true);
        exportToODO({
            route:'sa',
            refNo:'',
            stc:stc == null ? '' : stc.value 
        })
        .then(result => {
            setLoading(false)   
        })
        .catch(e => {
            console.log(e)
            if (e.response && e.response.data) {
                const {data} = e.response;
                const file =  new FileReader();
                new Promise((res,rej) => {
                    file.onerror = () => {
                        file.abort();
                        rej(new Error('Problem parsing file'));
                    }
                    file.onload = () => {
                        res(file.result)
                    }
                    file.readAsText(data)
                }).then(data => {
                    const {message} = JSON.parse(data)
                    toast.error(message);
                })
            }
            setLoading(false) 
        })

    }

    return (
        <div>
        {isLoading ? <Loader/>: null}
        <Paper elevation={0} component={Box} p={1}>
            <Grid container spacing={2}>
                <TableToolbar 
                    handleFetch={handleFetch} 
                    handleExport={handleExport} 
                    showDateRange 
                    showSTC 
                    transferType='SA' 
                    isExportVisible/>
                <Table 
                    columns={columns}
                    data={data}
                    size={20}
                />
            </Grid>
        </Paper>
        <ViewItems open={open} toggle={toggleDetails} {...selected}/>
    </div>
    )
}
