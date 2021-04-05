import React from 'react';
import {Grid,Button,Paper,Box} from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import CreateUserModal from './createUser';
import UpdateModal from './updateUser';
import {Table,TableToolbar,Loader} from '../../elements';
import {retrieveUsers} from '../saga';


export default function UserManagement() {
    const [open,setOpen] = React.useState(false);
    const [updateModal,setUpdateModal] = React.useState(false);
    const [isLoading,setLoading] = React.useState(false);
    const [selected,setSelected] = React.useState({
        email:'',
        id:'',
        status:''
    })
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.userManagement)
    const columns = React.useMemo(()=>[
        {
            Header:'Account Name',
            accessor:'username'
        },
        {
            Header:'Email',
            accessor:'user_email'
        },
        {
            Header:'Status',
            accessor:'is_active'
        },
        {
            Header:'Date Created',
            accessor:'date_created'
        },
        {
            Header:'Date Modified',
            accessor:'date_modified'
        },
        {
            Header:'Action',
            Cell:props => {
                const handleOpen = () => {
                    setSelected({
                        email:props.row.original.user_email,
                        id:props.row.original.id,
                        status:props.row.original.is_active
                    })
                    
                    setUpdateModal(true)

                }
                return <Button size='small' variant='contained' color='primary' onClick={handleOpen}>Update</Button>
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])

    const handleOpenUpdateModal = () => {
        setUpdateModal(!updateModal)
    }

    const toggle = ()=>{
        setOpen(!open)
    }

    const handleRetrieve = () => {
        setLoading(true);
        retrieveUsers().then(result => {
            dispatch({
                type:'SET_USER_FIELDS',
                name:'users',
                payload:result.users
            })
            setLoading(false)
        })
        .catch(e => {
            setLoading(false)
        })
    }

    return (
        <div>
            {isLoading ? <Loader/>:null}
            <Paper elevation={0}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box p={1}>
                            <Button variant='contained' color='primary' onClick={toggle}>Create</Button>
                        </Box>
                        <TableToolbar handleFetch={handleRetrieve}/>
                        <Table
                            columns={columns}
                            data={users}
                            size={20}
                        />
                    </Grid>
                </Grid>
            </Paper>  
            <CreateUserModal isOpen={open} toggle={toggle}/> 
            <UpdateModal 
                {...selected}
                open={updateModal} 
                toggle={handleOpenUpdateModal} 
                viewStatusSwitch
                viewResetPassword
            />
        </div>
    )
}
