import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Route,BrowserRouter as Router,Switch} from 'react-router-dom'

import Home from '../src/container/home/home'
import Movie from '../src/container/movie/movie'
import Book_Ticket from '../src/container/ticket/book_ticket'

function App() {
  return (
    <div className="App">
     
     <Router>
    {/* <Header /> */}
      <Switch>    
      <Route exact   path="/" component={()=><Home />} />   
        
         <Route exact  path="/movie" component={()=><Movie />} />   
         <Route exact  path="/book" component={()=><Book_Ticket />} />   

         </Switch>
         </Router>
    
    </div>
  );
}

export default App;
