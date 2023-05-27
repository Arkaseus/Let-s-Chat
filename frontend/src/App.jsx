import { useState } from 'react'
import {Link,Route,Routes} from 'react-router-dom';

import Chatpage from "./pages/chatpage";
import Home from './pages/Homepage';

import './App.css'
import { Button } from '@chakra-ui/react';

function App() {

  return (
  
    <div className='App'>
          <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/chat' element={<Chatpage/>} exact  />
          </Routes>
    </div>
  
    
    )
}

export default App
