import React, { useEffect, useState } from "react";
import image from "./../assets/images/loginimg.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { tooglelogin } from "../redux/loginslice";

const Loginpage = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const dispatcher = useDispatch()

  const navigate = useNavigate();

  const check_authrised_user = async () => {
    console.log("login invoke");
    const response = await axios.post("http://localhost:5100/api/login", {
      username,
      password,
    });
    if (response.data.message == "Login successful") {
      // const temp=()=>{
      //   dispatcher(tooglelogin())
      // }
      // temp();
      if(response.data.role[0]=='clerk')
      navigate("/dashboard");
      else if (response.data.role[0]=='HOD')
      navigate("/HOD");
      else if (response.data.role[0]=='BCAhead')
      navigate("/BCAhead");
      else if (response.data.role[0]=='MCAhead')
      navigate("/MCAhead");
      else if (response.data.role[0]=='BCAMCAhead')
      navigate("/BCAMCAhead");
      else if (response.data.role[0]=='Phdhead')
      navigate("/Phdhead");

    }
  };

  const inputfield = {
    fontSize: "20px",
    paddingBlock: "5px",
    paddingInline: "20px",
    borderRadius: "6px",
    marginBlock: "10px",
    marginBottom: "20px",
  };

  return (
    <div style={{ display: "flex", paddingInline: "80px" }}>
      <div style={{ flex: 2 }}>
        <img
          src={image}
          alt="Login"
          width={"70%"}
          style={{ marginLeft: "100px" }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: "40px" }}>Login</h1>
        <h2 style={{ marginBottom: "20px" }}>Please sign-in to your account</h2>
        <form>
          <label style={{ fontSize: "20px" }}>Username</label>
          <br />
          <input
            type="text"
            placeholder="xyz@pup.com"
            style={inputfield}
            onChange={(e) => setusername(e.target.value)}
          />
          <br />
          <label style={{ fontSize: "20px" }}>Password</label>
          <br />
          <input
            type="password"
            placeholder="xyz@pup.com"
            style={inputfield}
            onChange={(e) => setpassword(e.target.value)}
          />
          <br />
        </form>
        <button
          style={{
            paddingInline: "10px",
            paddingBlock: "5px",
            fontSize: "20px",
            borderRadius: "10px",
          }}
          onClick={check_authrised_user}
        >
          Sign-in
        </button>
      </div>
    </div>
  );
};

export default Loginpage;
