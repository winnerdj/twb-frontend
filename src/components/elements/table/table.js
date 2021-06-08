import React from 'react';
import {Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead ,
    TablePagination ,
    TableRow,
    TableSortLabel,
    InputBase,
    makeStyles,
    Typography,
} from '@material-ui/core';
import {Search} from '@material-ui/icons';
import {
    useTable,
    useSortBy,
    useResizeColumns,
    useBlockLayout,
    usePagination,
    useGlobalFilter,
    useAsyncDebounce
} from 'react-table';
// import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    resizer:{
        display:'inline-block',
        background: theme.palette.divider,
        width: '3px',
        height: '80%',
        position: 'absolute',
        right: 0,
        top: 0,
        transform: 'translateX(50%)'
    },
    root:{
        width: '100%',
        paddingLeft:'10px',
        paddingRight:'10px'
    },
    container:{
        maxHeight:400,
        width:'100%'
    },
    header:{
        position:'sticky',
        top: 0,
        zIndex:10
    },
    textContainer: {
        display: 'block',
        width: 'inherit',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
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
}))

const EditableCell = ({
    value: initialValue,
    row:{index,original},
    column:{id},
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
     // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)
    let isEdit = original.isEdit;
    const onChange = e => {
      setValue(e.target.value)
    }

    const onBlur = () => {
        updateMyData(index,id,value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    if(id === 'doc_no'){
        return (
            <div>
                {isEdit ?
                    <input style={{width:'120px'}} value={value === null ? '' : value} onChange={onChange} onBlur={onBlur}/> : 
                    initialValue
                }
            </div>
        )
    }
    else{
        return (
            <div>{initialValue}</div>
        )
    }
}

export default function MaTable({
    columns,
    data,
    size,
    updateMyData,
    skipPageReset
}) {    
    const classes = useStyles();
    const [search,setSearch] = React.useState('');
 
    const defaultColumn = {
        minWidth: 30,
        width: 150,
        maxWidth: 400,
        Cell:EditableCell
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        gotoPage,
        setPageSize,
        state:{
            pageIndex,pageSize
        },
        setGlobalFilter
    } = useTable({
            columns,
            data,
            defaultColumn,
            initialState:{
                pageSize:size,
                pageIndex:0
            },
            updateMyData,
            autoResetPage: !skipPageReset
        },
        useGlobalFilter,
        useSortBy,
        useResizeColumns,
        useBlockLayout,
        usePagination,
    )

    const handleChangePage = (event, newPage) => {
        gotoPage(newPage)
    }
    
    const handleChangeRowsPerPage = event => {
        setPageSize(Number(event.target.value))
    }

    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    },200)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    React.useEffect(()=>{
        onChange(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[search])

    return (
            <Grid container spacing={2}>    
                <Grid container 
                    item xs={12} 
                    spacing={1}
                    justify='space-between'>
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
                        <Typography variant='overline'>
                            Count: <strong>{data.length}</strong>
                        </Typography>                     
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.root}>
                        <TableContainer className={classes.container}>
                        <Table {...getTableProps()} size='small' stickyHeader style={{transformStyle: 'preserve-3d'}}>
                            <TableHead >
                                {headerGroups.map(headerGroup => (
                                    <TableRow className={classes.header} {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            headerGroup.headers.map(column => (
                                                <TableCell {...column.getHeaderProps()}>
                                                    <div {...column.getSortByToggleProps()}>   
                                                    {column.render('Header')}
                                                    <TableSortLabel
                                                        active={column.isSorted}
                                                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                                                    />
                                                    </div>
                                                    <div 
                                                        {...column.getResizerProps()}
                                                        className={classes.resizer}
                                                        >
                                                    </div>
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow> 
                                ))}
                            </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {
                                page.map((row,i) => {
                                    prepareRow(row)
                                    return(
                                        <TableRow hover {...row.getRowProps()}>
                                            {
                                                row.cells.map(cell => (
                                                    <TableCell {...cell.getCellProps()}>
                                                        <div className={classes.textContainer}>
                                                            {cell.render('Cell')}
                                                        </div>
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component='div'
                    style={{ display:"flex" }}
                    rowsPerPageOptions={[
                        {label:10, value: 10},
                        {label:20, value: 20},
                        {label:50, value: 50},
                        {label:100, value: 100}
                    ]}
                    colSpan={3}
                    count={data.length}
                    rowsPerPage={pageSize}
                    page={pageIndex}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}/>
                    </div>
                </Grid>
            </Grid>  
    )
}


MaTable.defaultProps = {
    updateMyData:()=>{},
    skipPageReset:false
}