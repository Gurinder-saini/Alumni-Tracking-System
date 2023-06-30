import axios from "axios";
import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';

const Addalumni = ({closemodal}) => {
    const[regid,setregid]=useState('')
    const[name,setname]=useState('')
    const[emailid,setemailid]=useState('')
    const[contactno,setcontactno]=useState('')
    const[DOB,setDOB]=useState('')
    const[cur_city,setcur_city]=useState('')
    const[zipcode,setzipcode]=useState()
    const[state,setstate]=useState('')
    const[course,setcourse]=useState('BCA')
    const[batch,setbatch]=useState()
    const[cgpa,setcgpa]=useState('')
    const[organization,setorganization]=useState('')
    const[job_post,setjob_post]=useState('')
    const[salary,setsalary]=useState()
    const[dateofjoin,setdateofjoin]=useState('')

    const [showalert, setshowalert] = useState(false)
    const [invalidalert, setinvalidalert] = useState(false)

  const lablestyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginRight: "10px",
    marginLeft: "20px",
  };
  const inputstyle = {
    paddingBlock: "5px",
    fontSize: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    borderColor: "black",
    marginRight: "10px",
    borderWidth:'1px',
    paddingInline:'10px'
  };

  const setalumnidata =async()=>{
    const response =await axios.post('http://localhost:5100/api/addalumni',{
        regid,
        name,
        emailid,
        contactno,
        DOB,
        cur_city,
        zipcode,
        state,
        course,
        batch,
        cgpa,
        organization,
        job_post,
        salary,
        dateofjoin

    });
    console.log('hii2') 
    console.log(response.data.message)
    if(response.data.message=='Alumni added successfully'){
      
      setregid('')
        setname('')
        setemailid('')
        setcontactno('')
        setDOB('')
        setcur_city('')
        setzipcode()
        setstate('')
        setcourse('')
        setbatch()
        setcgpa('')
        setorganization('')
        setjob_post('')
        setsalary()
        setdateofjoin('')
        alertoff();
    }
    else{
      console.log('invaildalter')
      setinvalidalert(!showalert)
    setTimeout(() => {
      console.log('alert dismiss')
      setinvalidalert(!invalidalert)
      console.log(showalert)
      // window.location.reload();
    }, 1000);
    }

  }

  const alertoff=()=>{
    console.log('alert show')
    setinvalidalert(false)
    setshowalert(!showalert)
    setTimeout(() => {
      console.log('alert dismiss')
      setshowalert(!showalert)
      console.log(showalert)
      window.location.reload();
    }, 1000);
  }

  return (
    <div
      style={{
        marginTop:'-70px',
        backgroundColor:"#e7e9eb",
        padding: "20px",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      {
        showalert?<Alert variant='success' style={{zIndex:10603}} >
        Add Alumni Successfully
      </Alert>:null
      }
      {
        invalidalert?<Alert variant='danger' style={{zIndex:10603}} >
        Invaild Detail!
      </Alert>:null
      }
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <button
          style={{
            marginTop: "-40px",
            fontSize: "30px",
            borderRadius: "40px",
            backgroundColor: "red",
            color: "white",
            borderWidth: "0px",
            paddingInline: "10px",
            marginLeft:'99%'
          }}
          onClick={()=>closemodal(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={setalumnidata}>
        <h2>Personal Details</h2>
        <label style={lablestyle}>Reg. ID:</label>
        <input type="text" maxLength={10} minLength={10} inputMode="text" style={inputstyle} value={regid} onChange={(e) => setregid(e.target.value)}></input>
        <label style={lablestyle}>Name:</label>
        <input type="text" maxLength={30} minLength={4} style={inputstyle} value={name} onChange={(e) => setname(e.target.value)}></input>
        {/* <br /> */}
        <label style={lablestyle}>Email-ID:</label>
        <input type="email" inputMode="email" value={emailid} style={inputstyle} onChange={(e) => setemailid(e.target.value)}></input>
        {/* <br /> */}
        <br />
        <label style={lablestyle}>Contact No.:</label>
        <input inputMode="numeric" value={contactno} style={inputstyle}onChange={(e) => setcontactno(e.target.value)}></input>
        <label style={lablestyle}>Date of Birth:</label>
        <input type="date" value={DOB} style={inputstyle}onChange={(e) => setDOB(e.target.value)}></input>
        {/* <br /> */}
        <h2>Address</h2>
        <label style={lablestyle}>Zipcode:</label>
        <input type="text" maxLength={6} value={zipcode} style={inputstyle}onChange={(e) => setzipcode(e.target.value)}></input>
        <label style={lablestyle}>State:</label>
        <input type="text" value={state} style={inputstyle} onChange={(e) => setstate(e.target.value)}></input>
        <label style={lablestyle}>Current city</label>
        <input type="text" value={cur_city} style={inputstyle} onChange={(e) => setcur_city(e.target.value)}></input>
        <br/>
        <h2>Qualification</h2>
        <label style={lablestyle}>Course:</label>
        <select value={course} onChange={(e) => setcourse(e.target.value)} >  
          <option value = "BCA"> BCA   
          </option>  
          <option value = "MCA"> MCA   
          </option>  
          <option value = "BCA_MCA"> BCA_MCA 
          </option>  
          <option value = "Phd"> phd 
          </option>  
        </select>  
        {/* <input type="text" value={course} style={inputstyle}onChange={(e) => setcourse(e.target.value)}></input> */}
        <label style={lablestyle}>Batch:</label>
        <input type="text" value={batch} style={inputstyle}onChange={(e) => setbatch(e.target.value)}></input>
        <label style={lablestyle}>CGPA:</label>
        <input type="text" value={cgpa} style={inputstyle}onChange={(e) => setcgpa(e.target.value)}></input>
        <h2>Job Details</h2>
        <label style={lablestyle}>Organization</label>
        <input type="text" value={organization} style={inputstyle}onChange={(e) => setorganization(e.target.value)}></input>
        <label style={lablestyle}>Job Position</label>
        <input type="text" value={job_post} style={inputstyle}onChange={(e) => setjob_post(e.target.value)}></input>
        <label style={lablestyle}>Salary</label>
        <input type="text" value={salary} style={inputstyle}onChange={(e) => setsalary(e.target.value)}></input>
        <br/>
        <label style={lablestyle}>Date of Join:</label>
        <input type='date' value={dateofjoin} style={inputstyle}onChange={(e) => setdateofjoin(e.target.value)}></input>
      </form>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          style={{
            fontSize: "30px",
            fontWeight: "bolder",
            padding: "10px",
            borderRadius: "10px",
            borderWidth: "0px",
            color: "white",
            backgroundColor: "#46C263",
          }}
          onClick={setalumnidata}
        >
          Add Alumni
        </button>
        
      </div>
    </div>
  );
};


export default Addalumni;
