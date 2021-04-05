import React from 'react';
import {Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead ,
    TablePagination ,
    TableRow,
    TableSortLabel,
    makeStyles,
} from '@material-ui/core';
import {
    useTable,
    useSortBy,
    useResizeColumns,
    useBlockLayout,
    usePagination,
    useGlobalFilter,
    useAsyncDebounce
} from 'react-table';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    resizer:{
        display:'inline-block',
        background: theme.palette.divider,
        width: '3px',
        height: '80%',
        position: 'absolute',
        right: 0,
        top: 0,
        transform: 'translateX(50%)',
        zIndex: 1
    },
    root:{
        width: '100%'
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
      }
}))

export default function MaTable({
    columns,
    data,
    size
}) {    
    const classes = useStyles();
    const {search} = useSelector(state => state.filters)
    const defaultColumn = React.useMemo(
        () => ({
          minWidth: 30,
          width: 150,
          maxWidth: 400,
        }),
        []
      )

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
        // preGlobalFilteredRows,
        setGlobalFilter
    } = useTable({
            columns,
            data,
            defaultColumn,
            initialState:{
                pageSize:size,
                pageIndex:0
            },
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

    React.useEffect(()=>{
        // const count = preGlobalFilteredRows.length;
        onChange(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[search])

    return (
        <div className={classes.root}>
            <TableContainer className={classes.container}>
                <Table {...getTableProps()} size='small' stickyHeader>
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
                    20,
                    50,
                    { label: 'All', value: data.length },
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
    )
}
