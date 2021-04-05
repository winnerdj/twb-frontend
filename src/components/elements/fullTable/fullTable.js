import React from 'react';
import Table from '../table';
import Toolbar from '../tableToolbar';
import {Grid} from '@material-ui/core';

export default function FullTable(props) {
    const [state,setState] = React.useState({
        search:''
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    return (
        <div>
            <Grid container>

            </Grid>
        </div>
    )
}
