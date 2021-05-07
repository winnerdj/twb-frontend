import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Select from 'react-select/async';
import {saga} from '../../dataManagement';

function SelectSTC() {
    const {stc} = useSelector(state => state.filters)
    const [isLoading,setLoading] = React.useState(false);
    const [options,setOptions] = React.useState([]);
    const dispatch = useDispatch();

    const handleChange = (selected) => {
        dispatch({
            type:'SET_FILTER_FIELD',
            name:'stc',
            payload:selected
        });
    }

    const filterColors = (inputValue) => {
        return options.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    }
      
    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve(filterColors(inputValue));
        }, 1000);
    });

    React.useEffect(() => {
        setLoading(true);
        saga.retrieve({
            route:'location',
            date:''
        }).then(result => {
           setOptions(
                result.filter(item => {
                    return item.location_code.substring(0,2) !== 'DG'
                })
                .map(item => {
                    return {
                        label:`${item.location_code}-${item.location_name}`,
                        value:item.location_code
                    }
                })
            )
            setLoading(false)
        })
        .catch(e => {
            setLoading(false)
        })
        
    },[])

    return (
        <div>
            <Select
                defaultOptions={options}
                cacheOptions
                loadOptions={promiseOptions}
                placeholder='Ship Point'
                onChange={handleChange}
                defaultValue={stc}
                isClearable
                isLoading={isLoading}
            />
        </div>
    );
}

export default SelectSTC; 