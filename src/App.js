// import logo from './logo.svg';
import './App.css';
import Body from  '../src/components/layout/body';
import {ToastContainer} from 'react-toastify';
import {createMuiTheme,ThemeProvider,CssBaseline} from '@material-ui/core';
import {blueGrey} from '@material-ui/core/colors';
const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  overrides:{
    MuiAppBar:{
      colorPrimary:{
        backgroundColor:blueGrey['50'],
        color:defaultTheme.palette.text.primary
      }
    },
    MuiDrawer:{
      paper:{
        backgroundColor:blueGrey[900]
      }
    },
    MuiTypography:{
      colorPrimary:{
         color:blueGrey['50']
      }
    }
  },
  palette:{
    // primary:{
    //   main:'#FAFAFA'
    // },
    // secondary:{
    //   main:'#bbdefb'
    // }
  }
})

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Body/>
        <ToastContainer/>
      </ThemeProvider> 
    </div>
  );
}

export default App;
