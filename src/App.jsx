import { useState } from 'react'
import './App.css'
import { Container, Row, Col, Table } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk, faMessage, faPhone, faUser, faVoicemail } from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-regular-svg-icons'

function App() {



  let [formData, setformData] = useState({
    uname: '',
    uemail: '',
    uphone: '',
    umessage: '',
    index: ''
  })

  let getvalue = (event) => {
    let oldData = { ...formData }
    let inputName = event.target.name;
    let inputValue = event.target.value;
    console.log(inputName);
    console.log(inputValue);
    oldData[inputName] = inputValue;
    setformData(oldData);
  }

  let [userData, setuserData] = useState([])

  let HandleSubmit = (event) => {

    let currntUserdata = {
      uname: formData.uname,
      uemail: formData.uemail,
      uphone: formData.uphone,
      umessage: formData.umessage,
    }

    if (formData.index === '') {

      let fillteruserData = userData.filter((v) => v.uemail === formData.uemail || v.uphone === formData.uphone)

      if (fillteruserData.length == 1) {
        toast.error("Email Or Phone Number Already Exists...")

      }
      else {


        if (currntUserdata.uname == '') {
          toast.error("Name required")
        }
        else {
          let oldUserdata = [...userData, currntUserdata]
          console.log(oldUserdata);
          toast.success("Information Inserted ")

          setuserData(oldUserdata);
          setformData({
            uname: '',
            uemail: '',
            uphone: '',
            umessage: '',
            index: ''
          });
        }
      }
    }
    else {
      let editindex = formData.index
      let oldData = userData

      let fillteruserData = userData.filter((v, i) => (v.uemail === formData.uemail || v.uphone === formData.uphone) && i != editindex)

      if (fillteruserData.length == 0) {
        oldData[editindex]['uname'] = formData.uname
        oldData[editindex]['uemail'] = formData.uemail
        oldData[editindex]['uphone'] = formData.uphone
        oldData[editindex]['umessage'] = formData.umessage
        toast.success("updated successfully")
        setuserData(oldData)
        setformData({
          uname: '',
          uemail: '',
          uphone: '',
          umessage: '',
          index: ''
        })
      }
      else {
        toast.error("Email Or Phone Number Already Exists...")
      }
    }
    event.preventDefault();
  }

  let Delete = ((indexNumber) => {
    let remaininguserData = userData.filter((v, i) => i != indexNumber)
    console.log(remaininguserData)
    toast.success("Deleted successfully")
    setuserData(remaininguserData)
  })

  let Editrow = ((indexNumber) => {
    let editData = userData.filter((v, i) => i == indexNumber)[0]
    console.log(editData)
    editData['index'] = indexNumber;
    console.log(editData)
    setformData(editData)
  })


  return (

    <div className='App' >

      <Container>
        

        <ToastContainer autoClose={1000} hideProgressBar={true}/>
        <Row className='h1row'>
         <h1> Enquiry form</h1>
        </Row>
        <Row>
          <Col lg={6} className='formcol'>
            <form onSubmit={HandleSubmit}>
              {/* {userData.length} */}
              <div className='pb-3'>
              <FontAwesomeIcon icon={faUser} className='fa'/>
                <label className='form-label' > 
                 Name</label>
                <input type='text' onChange={getvalue} name='uname' value={formData.uname} className='form-control' />
              </div>
              <div className='pb-3'>
              <FontAwesomeIcon icon={faMailBulk} className='fa'/>
                <label className='form-label'>Email</label>
                <input type='text' onChange={getvalue} name='uemail' value={formData.uemail} className='form-control' />
              </div>
              <div className='pb-3'>
              <FontAwesomeIcon icon={faPhone} className='fa'/>
                <label className='form-label'>Phone no.</label>
                <input type='number' onChange={getvalue} name='uphone' value={formData.uphone} className='form-control' />
              </div>
              <div className='pb-3'>
              <FontAwesomeIcon icon={faMessage} className='fa'/>
                <label className='form-label'>Message</label>
                <textarea name='umessage' value={formData.umessage} onChange={getvalue} className='form-control' row='3'></textarea>
              </div>
              <button className='btn btn-lg btn-outline-secondary '>
                {formData.index !== '' ? 'Update' : 'Save'}
              </button>

            </form>
          </Col>
          <Col lg={6} className='datacol mt-lg-2 mt-5'  >
          
            <Table striped bordered hover>
              <thead id='thead'>
                <tr className='headrow'>
                  <th colSpan={12} >User Data</th>
                </tr>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>


                {userData.length >= 1 ?
                  userData.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{v.uname}</td>
                        <td>{v.uemail}</td>
                        <td>{v.uphone}</td>
                        <td>{v.umessage}</td>
                        <td>
                          <button onClick={() => { Delete(i) }}>Delete</button>
                          <button onClick={() => { Editrow(i) }}>Edit</button>
                        </td>
                      </tr>)
                  })
                  :
                  <tr>
                    <td colSpan={7} className='text-center'>
                      no data found
                    </td>
                  </tr>

                }



              </tbody>

            </Table>
          </Col>

        </Row>
      </Container>


    </div>

  );
}

export default App
