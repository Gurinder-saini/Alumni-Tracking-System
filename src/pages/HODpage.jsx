import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const HODhead = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios("http://localhost:5100/api/allrecord");
      setdata(response.data);
    };
    fetchdata();
  }, []);
  return (
    <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
        
        <h1 >Alumni Record</h1>
        
    <table style={{fontSize:'20px',border: '1px solid black'}}>
      <thead>
        <tr style={{backgroundColor:'yellow', padding:'40px'}}>
          <th>Reg_ID</th>
          <th>Name</th>
          <th>Email_ID</th>
          <th>Contact no.</th>
          <th>City</th>
          <th>Zipcode</th>
          <th>State</th>
          <th>Batch</th>
          <th>Organization</th>
          <th>Job_position</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td style={{backgroundColor:'lightgreen', padding:'10px', margin:'10px'}}>{item[0]}</td>
            <td style={{ padding:'10px', margin:'10px',border:'1px solid black'}}>{item[1]}</td>
            <td style={{ padding:'10px', margin:'10px',border:'1px solid black'}}>{item[3]}</td>
            <td style={{ padding:'10px', margin:'10px',border:'1px solid black'}}>{item[4]}</td>
            <td style={{ padding:'10px', margin:'10px',border:'1px solid black'}}>{item[5]}</td>
            <td style={{ padding:'10px', margin:'10px',border:'1px solid black'}}>{item[6]}</td>
            <td style={{ padding:'10px', margin:'10px',border:'1px solid black'}}>{item[7]}</td>
            <td style={{ padding:'10px', margin:'10px',border:'1px solid black'}}>{item[9]}</td>
            <td style={{ padding:'10px', margin:'10px',border:'1px solid black'}}>{item[13]}</td>
            <td style={{ padding:'10px', margin:'10px',border:'1px solid black'}}>{item[14]}</td>
            <td style={{ padding:'10px', margin:'10px',border:'1px solid black'}}>{item[15]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default HODhead;
