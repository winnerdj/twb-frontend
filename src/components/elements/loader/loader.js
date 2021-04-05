import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader() {
    // const classes = useStyles();
    return (
        <div className='loader-container'>
            <div>       
                <CircularProgress 
                    className='loader-spinner'
                    size={68}/>
            </div>
        </div>
    )
}
