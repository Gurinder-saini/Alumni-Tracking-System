import React, { useEffect, useState } from "react";
import Addalumni from "../components/Addalumni";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OfficeDashboard = () => {
  const [showmodal, setshowmodal] = useState(false);
  const [bcaalumni, setbcaalumni] = useState(0);
  const [mcaalumni, setmcaalumni] = useState(0);
  const [bcamcaalumni, setbcamcaalumni] = useState(0);
  const [phdalumni, setphdalumni] = useState(0);
  const [record, setrecord] = useState([]);

  useEffect(() => {
    const alumnicount = async () => {
      const bcaresponse = await axios("http://localhost:5100/api/bca");
      console.log(bcaresponse.data.count[0]);
      setbcaalumni(bcaresponse.data.count[0]);
      const mcaresponse = await axios("http://localhost:5100/api/mca");
      console.log(mcaresponse.data.count[0]);
      setmcaalumni(mcaresponse.data.count[0]);
      const bcamcaresponse = await axios("http://localhost:5100/api/bcamca");
      console.log(bcamcaresponse.data.count[0]);
      setbcamcaalumni(bcamcaresponse.data.count[0]);
      const phdresponse = await axios("http://localhost:5100/api/phd");
      console.log(phdresponse.data.count[0]);
      setphdalumni(phdresponse.data.count[0]);
    };
    alumnicount();
  }, [showmodal]);

  const navigate = useNavigate();

  const closemodal = (e) => {
    setshowmodal(e);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "40px" }}>
        <button
          style={{ borderWidth: "0px", backgroundColor: "transparent" }}
          onClick={()=>navigate("/BCAhead")}
        >
          <div
            style={{
              width: "15vw",
              height: "15vw",
              backgroundColor: "lightyellow",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>BCA</h1>
            <h2>Total alumni: {bcaalumni}</h2>
          </div>
        </button>
        <button style={{ borderWidth: "0px", backgroundColor: "transparent" }}
        onClick={()=>navigate("/MCAhead")}>
          <div
            style={{
              width: "15vw",
              height: "15vw",
              backgroundColor: "lightblue",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>MCA</h1>
            <h2>Total alumni: {mcaalumni} </h2>
          </div>
        </button>
        <button style={{ borderWidth: "0px", backgroundColor: "transparent" }}
        onClick={()=>navigate("/BCAMCAhead")}>
          <div
            style={{
              width: "15vw",
              height: "15vw",
              backgroundColor: "lightgreen",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>BCA_MCA</h1>
            {/* <button></button> */}
            <h2>Total alumni: {bcamcaalumni} </h2>
          </div>
        </button>
        <button style={{ borderWidth: "0px", backgroundColor: "transparent" }}
        onClick={()=>navigate("/Phdhead")}>
          <div
            style={{
              width: "15vw",
              height: "15vw",
              backgroundColor: "lightyellow",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>Phd</h1>
            <h2>Total alumni: {phdalumni} </h2>
          </div>
        </button>
      </div>
      <button
        style={{
          padding: "30px",
          marginTop: "30px",
          borderRadius: "550px",
          fontSize: "30px",
          borderWidth: "0px",
          backgroundColor: "orange",
          color: "white",
        }}
        onClick={() => setshowmodal(true)}
      >
        + Add Alumni
      </button>
      {showmodal ? (
        <div style={{ zIndex: 999, position: "absolute" }}>
          {/* <Addalumni/> */}
          <Addalumni closemodal={closemodal} />
        </div>
      ) : null}
    </div>
  );
};

export default OfficeDashboard;
