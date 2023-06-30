import React from 'react'

const Topbar = () => {
  return (
    <div style={{
        backgroundColor:'#0a1a32',
        display:'flex',
        height:'45px',
        justifyContent:'space-between',
        paddingInline:'40px',
        alignItems:'center'
        }}>
        <h2 style={{color:'white', fontWeight:'lighter'}}>+9123234724274</h2>
        <h1 style={{color:'white',fontWeight:'lighter', fontSize:'25px'}}>Alumni Tracking System (punjabi University, Patiala)</h1>
        <h2 style={{color:'white',fontWeight:'lighter'}}>@gmail</h2>
    </div>
  )
}

export default Topbar