import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import Updatealumni from './Updatealumni';
import { Alert } from 'react-bootstrap';


const Tablerender = ({catagory}) => {
    const [data, setdata] = useState([]);
    const [passrecord, setpassrecord]= useState('')
    const [showmodal, setshowmodal] = useState(false);
    const[alrtshow, setaltrshow] = useState(false)
  useEffect(() => {
    const fetchdata = async () => {
        const url = "http://localhost:5100/api/" + catagory;
        console.log(url)
      const response = await axios(url);
      setdata(response.data);
      console.log(data)
    };
    fetchdata();
  }, []);

  const deleterecord = async(reg_id)=>{
    setaltrshow(!alrtshow)
    setTimeout(() => {
      window.location.reload(); 
    }, 1000);
    const url =  "http://localhost:5100/api/delete" + catagory;
    await axios.post(url,{regid:reg_id})
    setaltrshow(false)
  }

  // console.log(passrecord)

  const closemodal = (e) => {
    setshowmodal(e);
  };

  return (
    <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
       {
        alrtshow?<Alert variant='success' style={{zIndex:10603}} >
        Record deleted Successfully
      </Alert>:null
      }
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
          <th>Actions</th>
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
            <td style={{paddingLeft:'10px'}}><button style={{padding:'7px', borderRadius:'10px', borderWidth:'1px'}} onClick={()=>deleterecord(item[0])}>X</button></td>
            <td style={{paddingRight:'10px'}}><button style={{padding:'7px',borderRadius:'10px', borderWidth:'1px'}} onClick={() => {
              setshowmodal(true)
              setpassrecord(item[0])
            }
            }>+</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    {showmodal ? (
        <div style={{ zIndex: 999, marginTop:'-245px' }}>
          {/* <Addalumni/> */}
          <Updatealumni closemodal={closemodal} passrecord={passrecord}/>
        </div>
      ) : null}
    </div>
    
  )
}

export default Tablerender