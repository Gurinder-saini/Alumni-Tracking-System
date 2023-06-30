import axios from "axios";
import React, { useState , useEffect} from "react";
import moment from 'moment'
import Alert from 'react-bootstrap/Alert';

const Updatealumni = ({closemodal, passrecord}) => {
    const[res,setres]=useState([])
    const[regid,setregid]=useState('')
    const[name,setname]=useState('')
    const[emailid,setemailid]=useState('')
    const[contactno,setcontactno]=useState('')
    const[DOB,setDOB]=useState('')
    const[cur_city,setcur_city]=useState('')
    const[zipcode,setzipcode]=useState()
    const[state,setstate]=useState('')
    const[course,setcourse]=useState('')
    const[batch,setbatch]=useState('')
    const[cgpa,setcgpa]=useState('')
    const[organization,setorganization]=useState('')
    const[job_post,setjob_post]=useState('')
    const[salary,setsalary]=useState()
    const[dateofjoin,setdateofjoin]=useState('')

    const [formatedjoindate, setformatedjoindate]= useState('')
    const [formateddob, setformateddob]= useState('')

    const [showalert, setshowalert] = useState(false)

    
    
    
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
    

    useEffect(() => {
        const filldata=async()=>{
        const url = "http://localhost:5100/api/selectedrecord"
        const response = await axios(url,{params: { regid : passrecord }})
        setres(response.data[0])
      }
      filldata()
    }, [])
   

      useEffect(() => {
        const dateformatter = async() => {
            // setdateofjoin(res[16])
            console.log(res)
            const formattedjoinDate = moment.utc(res[16]).format('YYYY-MM-DD');
            setformatedjoindate(formattedjoinDate)
            const formatteddob = moment.utc(res[2]).format('YYYY-MM-DD');
            setformateddob(formatteddob)
        }
        dateformatter();
      }, [res])

      useEffect(()=>{
        setregid(res[0])
        setname(res[1])
        setemailid(res[3])
        setcontactno(res[4])
        setDOB(formateddob)
        setcur_city(res[5])
        setzipcode(res[6])
        setstate(res[7])
        setcourse(res[8])
        setbatch(res[9])
        setcgpa(res[10])
        setorganization(res[13])
        setjob_post(res[14])
        setsalary(res[15])
        setdateofjoin(formatedjoindate)
      },[res])

      const updaterecord=async()=>{
        console.log(DOB)
        console.log('hii')
        const url= "http://localhost:5100/api/updaterecord"
       const response= await axios.post(url,{
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
        })
        console.log(response.data.rowsAffected)
        if(response.data.rowsAffected==1){
          setshowalert(!showalert)
          setTimeout(() => {
            console.log('alert dismiss')
            setshowalert(!showalert)
            console.log(showalert)
            window.location.reload();
          }, 1000);
        }
      }

  return (
    <div
      style={{
        marginTop:'50px',
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
        update Alumni Successfully
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
      <form>
        <h2>Personal Details</h2>
        <label style={lablestyle}>Reg. ID:</label>
        <input type="text" maxLength={10} minLength={10} inputMode="text" defaultValue={res[0]} ov style={inputstyle} onChange={(e) => setregid(e.target.value)}></input>
        <label style={lablestyle}>Name:</label>
        <input type="text" maxLength={30} minLength={4} style={inputstyle} defaultValue={res[1]} onChange={(e) => setname(e.target.value)} ></input>
        {/* <br /> */}
        <label style={lablestyle}>Email-ID:</label>
        <input type="email" inputMode="email"  style={inputstyle} defaultValue={res[3]} onChange={(e) => setemailid(e.target.value)}></input>
        {/* <br /> */}
        <br />
        <label style={lablestyle}>Contact No.:</label>
        <input inputMode="numeric"  style={inputstyle} defaultValue={res[4]} onChange={(e) => setcontactno(e.target.value)}></input>
        <label style={lablestyle}>Date of Birth:</label>
        <input type="date" defaultValue={formateddob} style={inputstyle} onChange={(e) => setDOB(e.target.value)}></input>
        {/* <br /> */}
        <h2>Address</h2>
        <label style={lablestyle}>Zipcode:</label>
        <input type="text" maxLength={6} defaultValue={res[6]} style={inputstyle}onChange={(e) => setzipcode(e.target.value)}></input>
        <label style={lablestyle}>State:</label>
        <input type="text" style={inputstyle} defaultValue={res[7]} onChange={(e) => setstate(e.target.value)}></input>
        <label style={lablestyle}>Current city</label>
        <input type="text" defaultValue={res[5]} style={inputstyle} onChange={(e) => setcur_city(e.target.value)}></input>
        <br/>
        <h2>Qualification</h2>
        <label style={lablestyle}>Course:</label>
        <select defaultValue={res[8]} onChange={(e) => setcourse(e.target.value)} >  
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
        <input type="text" defaultValue={res[9]} style={inputstyle}onChange={(e) => setbatch(e.target.value)}></input>
        <label style={lablestyle}>CGPA:</label>
        <input type="text" defaultValue={res[10]} style={inputstyle}onChange={(e) => setcgpa(e.target.value)}></input>
        <h2>Job Details</h2>
        <label style={lablestyle}>Organization</label>
        <input type="text" defaultValue={res[13]} style={inputstyle}onChange={(e) => setorganization(e.target.value)}></input>
        <label style={lablestyle}>Job Position</label>
        <input type="text" defaultValue={res[14]} style={inputstyle}onChange={(e) => setjob_post(e.target.value)}></input>
        <label style={lablestyle}>Salary</label>
        <input type="text" defaultValue={res[15]} style={inputstyle}onChange={(e) => setsalary(e.target.value)}></input>
        <br/>
        <label style={lablestyle}>Date of Join:</label>
        <input type='date' defaultValue={formatedjoindate} style={inputstyle}onChange={(e) => setdateofjoin(e.target.value)}></input>
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
          onClick={updaterecord}
          
        >
          update Alumni
        </button>
      </div>
    </div>
  );
};


export default Updatealumni;
