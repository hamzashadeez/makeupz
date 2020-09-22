import React from 'react'
import Header from '../../Components/Header/Header'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { BrowserRouter } from "react-router-dom";

function Home() {
    return (
        <div>
          <Header /> 
          
          <BrowserRouter>
          <BottomNav />
          </BrowserRouter>

         
        </div>
    )
}

export default Home
