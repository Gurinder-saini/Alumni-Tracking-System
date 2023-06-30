import React from "react";
import Header from "./components/Header";
import Mainscreen from "./pages/Mainscreen";
import '../src/index.css'
import Topbar from "./components/Topbar";
import {Routes, Route} from 'react-router-dom'
import Loginpage from "./pages/Loginpage";
import OfficeDashboard from "./pages/OfficeDashboard";
import HODpage from "./pages/HODpage";
import BCAhead from "./pages/BCAHead";
import MCAhead from "./pages/MCAhead";
import BCAMCAhead from "./pages/BCAMCAhead";
import Phdhead from "./pages/Phdhead";


const App = () => {
  return (
    <div>
      <Topbar/>
      <Header />
      <Routes>
        <Route path="/" Component={Mainscreen}/>
        <Route path="/Login" Component={Loginpage}/>
        <Route path="/HOD" Component={HODpage}/>
        <Route path="/dashboard" Component={OfficeDashboard}/>
        <Route path="/BCAhead" Component={BCAhead}/>
        <Route path="/MCAhead" Component={MCAhead}/>
        <Route path="/BCAMCAhead" Component={BCAMCAhead}/>
        <Route path="/Phdhead" Component={Phdhead}/>
      </Routes>
    </div>
  );
};

export default App;
