import React from 'react';
import PropTypes  from 'prop-types';
import {Toolbar,makeStyles,InputBase,Box,Grid,Button,TextField} from '@material-ui/core';
import {Search,GetApp} from '@material-ui/icons';
import {useSelector,useDispatch} from 'react-redux';
import SelectType from '../select';

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
    },
  }));

export default function TableToolbar({
  handleFetch,
  handleExport,
  isExportVisible,
  showDateFilter,
  transferType,
  showDateRange
}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {search,date,fromDate,toDate} = useSelector(state => state.filters);

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
        <div classes={classes.root}>
        <Toolbar disableGutters={true} variant="dense">
            <Grid container >
                <Grid item>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search />
                        </div>
                        <InputBase
                          placeholder="Search…"
                          onChange={handleChange}
                          name='search'
                          value={search}
                          classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                          }}
                          inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Grid>
                <Grid item>
                  <div style={{ width: '100%'}}>
                  <Box display='flex'>
                      <Box p={1}>
                        <Button variant='contained' onClick={handleFetch}>Search</Button>
                      </Box>
                     { isExportVisible ?  <Box p={1}>
                        <Button variant='contained' onClick={handleExport}>
                            <GetApp/> EXPORT
                          </Button> 
                      </Box>  : null}
                      { showDateFilter ?  <Box p={1}>
                          <TextField
                            type='date'
                            name='date'
                            label='Created Date'
                            variant='outlined'
                            size='small'
                            value={date}
                            onChange={handleChange}
                            //onChange={handleChange.bind()}
                            InputLabelProps={{
                              shrink:true
                            }}
                          />
                      </Box> : null}
                      {
                        showDateRange ? 
                        <Box display='flex'>
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
                        </Box>:null
                      }
                      {
                        transferType !== '' ? <Box p={1}>
                            <SelectType type={transferType}/>
                        </Box>:null
                      }
                    </Box>
                  </div>
                </Grid>
            </Grid>
        </Toolbar>
        </div>
    )
}

TableToolbar.defaultProps = {
  handleExport: ()=>{},
  isExportVisible:false,
  showDateFilter:false,
  showDateRange:false,
  transferType:'',
  search:'',
  date:'',
}

TableToolbar.propTypes ={
  type: PropTypes.oneOf(['PO','Type','SA'])
}
