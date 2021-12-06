import React from 'react';
import {makeStyles} from '@material-ui/core'
import {useSelector,useDispatch} from 'react-redux';
import Select from 'react-select'

const useStyles = makeStyles(theme => ({
    root:{
        padding:theme.spacing(1)
    }
}));

function SelectWhse() {
    const {selectWhse} = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const classes = useStyles();
    
    React.useEffect(()=>{
        return () => {
            dispatch({
                type:'SET_FILTER_FIELD',
                payload:'',
                name:'selectWhse'
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleChange = (e) => {
        dispatch({
            type:'SET_FILTER_FIELD',
            payload:e,
            name:'selectWhse'
        })
    }
    
    const options = [
        {
            label:'ARE-TWB',
            value:'CDO'
        },
        {
            label:'HER-TWB',
            value:'DVO'
        },
        {
            label:'POS-TWB',
            value:'CEB'
        },
        {
            label:'ZEU-TWB',
            value:'MNL'
        },
    ]

    return (
        <div className={classes.root}>
            <Select
                isClearable
                placeholder='Warehouse Code'
                name='selectWhse'
                options={options}
                value={selectWhse}
                onChange={handleChange}
            />
        </div>
    )
}

export default SelectWhse