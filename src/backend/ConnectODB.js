import OracleDB from 'oracledb'
import express from 'express'
import cors from 'cors'

const app= express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5100;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const user={
    user:'c##gurinderdb',
    password:'gurinder',
    connectString:'localhost:1521/XE',
}

 const ConnecttoODB= async ()=>{

    try{
        const connection = await OracleDB.getConnection(user)
        console.log('successful')
        return connection;
    }catch (error) {
        console.error('Error connecting to Oracle database:', error);
        return null;
      }

}

app.post('/api/addalumni', async (req, res) => {
  console.log('dbhii1')
  try {
    const { regid,
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
  } = req.body;

    const conn = await ConnecttoODB();
    const result = await conn.execute("INSERT ALL INTO alumni VALUES (:regid,:name,to_date(:DOB,'yyyy-mm-dd'),:emailid,:contactno,:cur_city,:zipcode,:state) INTO course values(:course,:batch,:cgpa,:regid) INTO job_detail values(:regid,:organization,:job_post,:salary,to_date(:dateofjoin,'yyyy-mm-dd')) select 1 from dual ",
    { regid,
        name,
        DOB,
        emailid,
        contactno,
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
     }
    );
    console.log(result.rowsAffected)
    await conn.commit();
    res.json({ message: 'Alumni added successfully' });
  } catch (error) {
    console.error('Login error:', error);
    // res.status(500).json({ error: 'Internal server error' });
    res.json({ message: 'Alumni added successfuly' });
  }
  
});


// login

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const conn = await ConnecttoODB();

    const result = await conn.execute(
      'SELECT role FROM Authorised_users WHERE username = :username AND password = :password',
      { username, password }
    );
    if (result.rows.length === 1) {
      console.log('login_succesful1')
      res.json({ message: 'Login successful', role:result.rows },);
    } else {
      console.log('login_unsuccesful')
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// bca

app.get('/api/bca', async (req, res) => {
  try {
    const conn = await ConnecttoODB();

    const result = await conn.execute(
    "Select count(*) from course where course_name='BCA'"  
    );
    console.log(result)
    res.json({count:result.rows})
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/mca', async (req, res) => {
  try {
    const conn = await ConnecttoODB();

    const result = await conn.execute(
    "Select count(*) from course where course_name='MCA'"  
    );
    console.log(result)
    res.json({count:result.rows})
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/bcamca', async (req, res) => {
  try {
    const conn = await ConnecttoODB();

    const result = await conn.execute(
    "Select count(*) from course where course_name='BCA_MCA'"  
    );
    console.log(result)
    res.json({count:result.rows})
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/phd', async (req, res) => {
  try {
    const conn = await ConnecttoODB();

    const result = await conn.execute(
    "Select count(*) from course where course_name='Phd'"  
    );
    console.log(result)
    res.json({count:result.rows})
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/bcarecord', async (req,res)=>{
  try{
    const conn= await ConnecttoODB()
    const result= await conn.execute(
      "select * from alumni join course on alumni.reg_id = course.reg_id join job_detail on course.reg_id = job_detail.reg_id where course.course_name='BCA'"
    )
    console.log(result)
    res.json(result.rows)
  }catch(error){
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



app.post('/api/deletebcarecord', async(req,res)=>{
  // console.log('delete record')
  try{
    const regid = req.body.regid;
    // const regid='14687'
    const conn= await ConnecttoODB()
    const result3 = await conn.execute("DELETE FROM job_detail WHERE reg_id = :regid ",{regid})
    const result2 = await conn.execute("DELETE FROM course WHERE reg_id = :regid ",{regid})
    const result1 = await conn.execute("DELETE FROM alumni WHERE reg_id = :regid ",{regid})

    await conn.commit();
    // console.log(result1)
    // console.log(result2)
    console.log(result3)
  }catch(err){
    console.log(err)

  }
})



app.get('/api/mcarecord', async (req,res)=>{
  try{
    const conn= await ConnecttoODB()
    const result= await conn.execute(
      "select * from alumni join course on alumni.reg_id = course.reg_id join job_detail on course.reg_id = job_detail.reg_id where course.course_name='MCA'"
    )
    console.log(result)
    res.json(result.rows)
  }catch(error){
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.post('/api/deletemcarecord', async(req,res)=>{
  // console.log('delete record')
  try{
    const regid = req.body.regid;
    // const regid='14687'
    const conn= await ConnecttoODB()
    const result3 = await conn.execute("DELETE FROM job_detail WHERE reg_id = :regid ",{regid})
    const result2 = await conn.execute("DELETE FROM course WHERE reg_id = :regid ",{regid})
    const result1 = await conn.execute("DELETE FROM alumni WHERE reg_id = :regid ",{regid})

    await conn.commit();
    // console.log(result1)
    // console.log(result2)
    console.log(result3)
  }catch(err){
    console.log(err)

  }
})
app.get('/api/bcamcarecord', async (req,res)=>{
  try{
    const conn= await ConnecttoODB()
    const result= await conn.execute(
      "select * from alumni join course on alumni.reg_id = course.reg_id join job_detail on course.reg_id = job_detail.reg_id where course.course_name='BCA_MCA'"
    )
    console.log(result)
    res.json(result.rows)
  }catch(error){
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



app.post('/api/deletebcamcarecord', async(req,res)=>{
  // console.log('delete record')
  try{
    const regid = req.body.regid;
    // const regid='14687'
    const conn= await ConnecttoODB()
    const result3 = await conn.execute("DELETE FROM job_detail WHERE reg_id = :regid ",{regid})
    const result2 = await conn.execute("DELETE FROM course WHERE reg_id = :regid ",{regid})
    const result1 = await conn.execute("DELETE FROM alumni WHERE reg_id = :regid ",{regid})

    await conn.commit();
    // console.log(result1)
    // console.log(result2)
    console.log(result3)
  }catch(err){
    console.log(err)

  }
})

app.get('/api/phdrecord', async (req,res)=>{
  try{
    const conn= await ConnecttoODB()
    const result= await conn.execute(
      "select * from alumni join course on alumni.reg_id = course.reg_id join job_detail on course.reg_id = job_detail.reg_id where course.course_name='Phd'"
    )
    console.log(result)
    res.json(result.rows)
  }catch(error){
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.post('/api/deletephdrecord', async(req,res)=>{
  // console.log('delete record')
  try{
    const regid = req.body.regid;
    // const regid='14687'
    const conn= await ConnecttoODB()
    const result3 = await conn.execute("DELETE FROM job_detail WHERE reg_id = :regid ",{regid})
    const result2 = await conn.execute("DELETE FROM course WHERE reg_id = :regid ",{regid})
    const result1 = await conn.execute("DELETE FROM alumni WHERE reg_id = :regid ",{regid})

    await conn.commit();
    console.log('bss ja reha')
    // res.send(result1.rowsAffected)
    console.log('bhejta')
  }catch(err){
    console.log(err)

  }
})

app.get('/api/allrecord', async (req,res)=>{
  try{
    const conn= await ConnecttoODB()
    const result= await conn.execute(
      "select * from alumni join course on alumni.reg_id = course.reg_id join job_detail on course.reg_id = job_detail.reg_id"
    )
    console.log(result)
    res.json(result.rows)
  }catch(error){
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.post('/api/updaterecord', async(req,res)=>{
  try{
  const { regid,
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
    dateofjoin}= req.body;

    const conn = await ConnecttoODB();
    console.log(DOB)

    const result=await conn.execute(
      "UPDATE alumni a SET a.name = :name, a.email_id = :emailid, a.DOB =to_date(:DOB,'yyyy-mm-dd'), a.contact_no=:contactno, a.cur_city=:cur_city, a.zip_code=:zipcode, a.state=:state WHERE a.reg_id = :regid",{
        regid,
        name,
        emailid,
        contactno,
        DOB,
        cur_city,
        zipcode,
        state
      }
    )


    const result1=await conn.execute(
      "UPDATE course c SET c.batch=:batch, c.course_name=:course, c.cgpa=:cgpa WHERE c.reg_id = :regid",{
        regid,
        course,
        batch,
        cgpa, 
      }
    )

    const result2=await conn.execute(
      "UPDATE job_detail j SET j.organization=:organization, j.job_position=:job_post, j.salary=:salary, j.date_of_join=to_date(:dateofjoin,'yyyy-mm-dd') WHERE j.reg_id = :regid",{
        regid,
        organization,
        job_post,
        salary,
        dateofjoin 
      }
    )

    console.log('executed')
    console.log(result)
    await conn.commit();
    res.send(result)
  }catch(err){
    console.log(err)

  }
})

app.get('/api/selectedrecord', async (req,res)=>{
  const regid = req.query.regid
  console.log(regid)
  try{
    const conn= await ConnecttoODB()
    const result= await conn.execute(
      "select * from alumni join course on alumni.reg_id = course.reg_id join job_detail on course.reg_id = job_detail.reg_id where alumni.reg_id=:regid",{regid}
    )
    console.log(result)
    res.json(result.rows)
  }catch(error){
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})
ConnecttoODB();
export default ConnecttoODB;

