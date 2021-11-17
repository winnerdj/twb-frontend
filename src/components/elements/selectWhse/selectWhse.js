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
    const [state,setState] = React.useState([]);
    const {whse} = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const classes = useStyles();
    
    React.useEffect(()=>{
        setState([
            '',
            'ARE-TWB',
            'HER-TWB',
            'POS-TWB',
            'ZEU-TWB'
        ])
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
            value:'ARE-TWB'
        },
        {
            label:'HER-TWB',
            value:'HER-TWB'
        },
        {
            label:'POS-TWB',
            value:'POS-TWB'
        },
        {
            label:'ZEU-TWB',
            value:'ZEU-TWB'
        },
    ]

    return (
        <div className={classes.root}>
            <Select
                isClearable
                placeholder='Warehouse Code'
                options={options}
                value={whse}
                onChange={handleChange}
            />
        </div>
    )
}

export default SelectWhse