import React from 'react'
import {makeStyles,Grid,Typography} from '@material-ui/core';
import {Switch,Route,useParams,useLocation} from 'react-router-dom';
import {routes} from '../../../helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin:10,
    },
    paper: {
        padding: theme.spacing(2),
        background:'#FFFFFF'
    },
    textIndent:{
        paddingLeft:theme.spacing(2)
    }
}));

const ShowComponent = () => {
    let {link} = useParams();
    let location = useLocation();
    const classes = useStyles();
    const [state,setState] = React.useState({
        header:'',
        subHeader:''
    })

    const renderComponent = () => {
        return routes.filter(item => item.route === `/${link}`)
        .map((item,index) => {
            return item.component(index)
        })
    }

    React.useEffect(()=>{
        if(typeof location.state !== 'undefined'){
            setState({
                header:location.state.header,
                subHeader:location.state.subHeader
            })
        }
    },[location])

    return <div>
        <Grid item xs={12} className={classes.textIndent}>
            <Typography variant='h5' >
                {state.header}
            </Typography>
            <Typography variant='body1' gutterBottom >
                {state.subHeader}
            </Typography>
        </Grid>
        {/* <Divider variant='middle'/> */}
        <Grid item xs={12} className={classes.textIndent}>
           {renderComponent()}
        </Grid>
    </div>
}

export default function Content() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Switch>
                       <Route exact path="/">
                            Default
                       </Route>
                       <Route path='/:link'>
                            <ShowComponent/>
                       </Route>
                    </Switch>
                </Grid>
            </Grid>
        </div>
    )
}