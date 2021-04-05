import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {Reducers} from './utils';
import {Provider} from 'react-redux';
import {createStore} from 'redux'; 

const saveToLocalStorage = (state) => {
  try{
      const serializedState = JSON.stringify(state)
      localStorage.setItem('state',serializedState)
  }
  catch(e){
      console.log(e)
  }
}

const loadFromLocalStorage = () => {
  try{
      const serializedState = localStorage.getItem('state')
      if(serializedState === null) return undefined
      return JSON.parse(serializedState)
  }   
  catch(e){
      console.log(e)
      return undefined
  }
}

const persistedState = loadFromLocalStorage()
let store = createStore(
  Reducers, 
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
