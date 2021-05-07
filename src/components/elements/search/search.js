import React from 'react';
import { useHistory} from "react-router-dom";
import {makeStyles,InputBase} from '@material-ui/core';
import {Search} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#e0e0e0',
        '&:hover': {
          backgroundColor: '#eeeeee',
        },
        marginLeft: 0,
        marginTop:theme.spacing(1),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
}))
function InputSearch(props) {
    const history = useHistory();
    const classes = useStyles();
    const [query, setQuery] = React.useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    React.useEffect(() => {
        const params = new URLSearchParams();
        params.append(props.searchType,query);
        // if(query){
        //     params.append('search',query);
        // }   
        // else{
        //     params.delete('name');
        // }

        history.push({search:params.toString()})

    },[query,history,props.searchType])

    React.useEffect(()=>{
     
    },[])
    
    return (
        <div className={classes.search}>
          <div className={classes.searchIcon}>
              <Search />
          </div>
          <InputBase
            placeholder="Search…"
            onChange={handleChange}
            name='search'
            value={query}
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
    );
}

export default InputSearch;