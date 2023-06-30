import React from "react";
import logo from "../assets/images/University_logo.png";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { tooglelogin } from "../redux/loginslice";


const Header = () => {
  const islogined = useSelector((state) => state.Lslice.islogined)
  console.log(islogined)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const loginbuttonstyle = {
    fontSize: 20,
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "5px",
    paddingBottom: "5px",
    marginRight: "10px",
    borderWidth: "0px",
    marginTop:'20px',
    backgroundColor:'#FFC107',
    fontWeight:'100'
  };

  const Regbuttonstyle = {
    fontSize: 20,
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "5px",
    paddingBottom: "5px",
    marginRight: "10px",
    borderWidth: "0px",
    color: "white",
    marginTop:'20px',
    backgroundColor:'#44B25C',
    fontWeight:'100'

  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingInline:'30px'
      }}
    >
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <button style={loginbuttonstyle} onClick={()=>{navigate('/login');
        dispatch(tooglelogin())
      }}>{islogined?<div>Logout</div>:<div>Login</div>}</button>
      </div>
    </div>
  );
};

export default Header;
