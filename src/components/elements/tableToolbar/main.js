import React from 'react';
import PropTypes  from 'prop-types';
import {makeStyles,Box,Grid,Button,TextField} from '@material-ui/core';
import {GetApp} from '@material-ui/icons';
import {useSelector,useDispatch} from 'react-redux';
import {SelectType,SelectSTC} from '../../elements';
// import SelectType from '../select';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#e0e0e0',
      '&:hover': {
        backgroundColor: '#eeeeee',
      },
      marginLeft: 0,
      marginTop:theme.spacing(1),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    }
  }));

export default function TableToolbar({
  handleFetch,
  handleCreate,
  handleExport,
  isExportVisible,
  showDateFilter,
  transferType,
  showDateRange,
  showCreate,
  showSTC
}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {date,fromDate,toDate} = useSelector(state => state.filters);

    const handleChange = (e) => {
      dispatch({
        type:'SET_FILTER_FIELD',
        payload:e.target.value,
        name:e.target.name
      })
    }

    React.useEffect(() => {
      return () => {
        dispatch({
          type:'SET_FILTER_FIELD',
          payload:'',
          name:'search'
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Grid container className={classes.root}>
            <Grid item container xs={12}>
                {
                  showDateRange ?
                  <Grid component={Box} display='flex' item>
                     <Box p={1}>
                            <TextField
                                type='date'
                                name='fromDate'
                                label='From'
                                variant='outlined'
                                size='small'
                                value={fromDate}
                                onChange={handleChange}
                                InputLabelProps={{
                                  shrink:true
                                }}
                              />
                      </Box>
                      <Box p={1}>
                          <TextField
                              type='date'
                              name='toDate'
                              label='To'
                              variant='outlined'
                              size='small'
                              value={toDate}
                              onChange={handleChange}
                              InputLabelProps={{
                                shrink:true
                              }}
                            />
                        </Box>  
                  </Grid> : null
                }
                {
                  transferType !== '' ? <Grid item>
                    <Box p={1}>
                      <SelectType type={transferType}/>
                    </Box>
                  </Grid>:null
                }
                {
                  showSTC ? <Grid item xs={2}>
                    <Box p={1}>
                      <SelectSTC/>
                    </Box>
                  </Grid> : null
                }
                {
                  showDateFilter ? 
                  <Grid item>
                    <Box p={1}>
                      <TextField
                        type='date'
                        name='date'
                        label='Date'
                        variant='outlined'
                        size='small'
                        value={date}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink:true
                        }}
                      />
                    </Box>
                  </Grid>:null
                }
                { 
                  isExportVisible?
                  <Grid item>
                    <Box p={1}>
                        <Button variant='contained' onClick={handleExport}>
                          <GetApp/> EXPORT
                        </Button> 
                    </Box>  
                  </Grid> : null
                }
                {
                  showCreate ? 
                  <Grid item>
                    <Box p={1}>
                        <Button  variant='contained' color='primary' onClick={handleCreate}>
                          Create
                        </Button>
                    </Box>
                  </Grid> : null
                } 
                <Grid item>
                    <Box p={1}>
                      <Button variant='contained' onClick={handleFetch}>Search</Button>
                    </Box>
                </Grid>
            </Grid>
            {/* <Grid item container xs={12}>
                <Grid item>
                    <Box p={1}>
                        <Button  variant='contained'>Create</Button>
                    </Box>
                </Grid>
            </Grid> */}
        </Grid>
    )
}

TableToolbar.defaultProps = {
  handleExport: ()=>{},
  handleCreate: ()=>{},
  isExportVisible:false,
  showDateFilter:false,
  showDateRange:false,
  transferType:'',
  search:'',
  date:'',
  showSTC:false,
  showCreate:false
}

TableToolbar.propTypes ={
  transferType: PropTypes.oneOf(['','PO','Type','SA','DOC'])
}
