import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Select from 'react-select/async';
import {saga} from '../../dataManagement';

function SelectSTC({
    type
}) {
    const {stc,region} = useSelector(state => state.filters)
    const [isLoading,setLoading] = React.useState(false);
    const [options,setOptions] = React.useState([]);
    const dispatch = useDispatch();
    const field = type === 'location' ? 'stc' : 'region'

    const handleChange = (selected) => {
        dispatch({
            type:'SET_FILTER_FIELD',
            name:field,
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
            route:type,
            date:''
        }).then(result => {
            if(type==='location'){
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
            }
            else{
                setOptions(
                    result.map(item => {
                        return {
                            label:item.region_code,
                            value:item.region_code
                        }
                    })
                )
            }
          
            setLoading(false)
        })
        .catch(e => {
            setLoading(false)
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div>
            <Select
                defaultOptions={options}
                cacheOptions
                loadOptions={promiseOptions}
                placeholder={type==='location'?'Ship Point':'Region'}
                onChange={handleChange}
                defaultValue={type==='location'?stc:region}
                isClearable
                isLoading={isLoading}
            />
        </div>
    );
}

SelectSTC.defaultProps = {
    type:'location'
}

export default SelectSTC; 