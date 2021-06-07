import React from 'react';
import PropTypes  from 'prop-types';
import {Select,FormControl, InputLabel, MenuItem, makeStyles} from '@material-ui/core'
import {useSelector,useDispatch} from 'react-redux';

const useStyles = makeStyles(theme => ({
    root:{
        minWidth: 120,
    }
}));

function SelectTypes({type}) {
    const [state,setState] = React.useState([]);
    const {select} = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const classes = useStyles();
    
    React.useEffect(()=>{
        if(type==='PO'){
            setState([
                'OI',
                'OM',
                'OO',
                'OP'
            ])
        }
        else if(type==='Type'){
            setState([
                'RFD',
                'IRV',
                'JO',
                'CYC',
                'GRNSA',
                'PO'
            ])
        }
        else if(type === 'SA'){
            setState([
                'MFGSA',
                'PWS',
                'SA',
                'JO',
                'RTS',
                'CYC',
                'DES'
            ])
        }
        else if(type === 'DOC'){
            setState([
                'STKBALDMS',
                'STKBALWMS',
                'STKVARIANCE',
                'W2W'
            ])
        }

        return () => {
            dispatch({
                type:'SET_FILTER_FIELD',
                payload:'',
                name:'select'
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleChange = (e) => {
        dispatch({
            type:'SET_FILTER_FIELD',
            payload:e.target.value,
            name:'select'
        })
    }       

    return (
        <div>
            <FormControl variant='outlined' size='small' className={classes.root}>
                <InputLabel id='select-label'>{type}</InputLabel>
                <Select
                    labelId='select-label'
                    name='select'
                    label='Type'
                    value={select}
                    onChange={handleChange}
                    autoWidth
                    >
                    <MenuItem value="">None</MenuItem>
                    {state.map(types => (
                        <MenuItem key={types} value={types}>{types}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}


SelectTypes.defaultProps = {
    type:''
}   

SelectTypes.propTypes ={
    type: PropTypes.oneOf(['','PO','Type','SA','DOC'])
}

export default SelectTypes