import React from 'react';
import { createStyles, makeStyles,CircularProgress} from '@material-ui/core';
// import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles(theme => createStyles({
    main:{
        position:'fixed',
        display:'block',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor:'rgba(255, 255, 255, 0.5)',
        zIndex:2,
        width: '100%',
        height: '100%'
    },
    spinner:{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%,-50%)'
    }
}))

export function useLoading() {
    const [isLoading,setLoading] = React.useState(false);
    return [isLoading,setLoading]
}

export function Loader({isLoading}) {
    const classes = useStyles();
    return (
        <div>
            {isLoading ? 
            <div className={classes.main}>
                <div className={classes.spinner}>
                    <CircularProgress
                        size={40}
                    />
                </div>  
            </div>:null}
        </div>
        

       
    )
}

Loader.defaultProps = {
    isLoading:false
}
