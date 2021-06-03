import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {viaList} from './via';
import Select from 'react-select/async';
import {saga} from '../../dataManagement';
import PropTypes from 'prop-types';

function SelectSTC({
    type
}) {
    const {stc,region,via} = useSelector(state => state.filters)
    const [isLoading,setLoading] = React.useState(false);
    const [options,setOptions] = React.useState([]);
    const dispatch = useDispatch();
    const field = type === 'location' ? 'stc' : type
    const placeHolder =     type === 'location' ? 'Ship Point' : 
                            type === 'region' ? 'Region': 'Via';
    
    const defaultValue =    type === 'location' ? stc : 
                            type === 'region' ? region : via

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
        if(type === 'via'){
            setOptions(viaList.map(item => {
                return {
                    label:`${item.id} : ${item.description}`,
                    value:item.id
                }
            }))
        }
        else{
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
                                label:`${item.location_code} : ${item.location_name}`,
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
        }    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div>
            <Select
                defaultOptions={options}
                cacheOptions
                loadOptions={promiseOptions}
                placeholder={placeHolder}
                onChange={handleChange}
                defaultValue={defaultValue}
                isClearable
                isLoading={isLoading}
            />
        </div>
    );
}

SelectSTC.defaultProps = {
    type:'location'
}

Select.propTypes  = {
    type:PropTypes.oneOf(['location','region','via'])
}
export default SelectSTC; 