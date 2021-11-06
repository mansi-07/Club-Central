import {React,useState, useEffect} from 'react'
import Navbar from '../partials/Navbar'
import axios from 'axios'

const EditProfile = ({user}) => {
    const initialState = {
        name: '',
        rollno: null,
        passingyear: null,
        branch: ''
    }
    const [userData, setUserData] = useState(initialState) 

    useEffect(() => {
        axios.get(`/api/user/userdata/${user.user_id}`)
            .then(response => {
                console.log(response.data)
                if(response.status === 201)
                    setUserData({ name: response.data.name,rollno: response.data.rollNo, passingyear:response.data.passingYear, branch: response.data.branch})
                console.log({userData})
            });
    }, []);
    const dataSubmit = (event) => {
        console.log({userData})
        event.preventDefault()
        axios.post(`/api/user/userdata/${user.user_id}`, {name:userData.name , rollno: userData.rollno,branch: userData.branch, passingyear: userData.passingyear , id: user.user_id} )
        .then((res) => {
            if (res.status === 201) {
                alert("Successful!")
          }
        })
        .catch(err => {
            console.log(err.response.data.msg)
            alert(err.response.data.msg)
        })
    }
    return (
        <>
        <Navbar user={user}/>
        <div className="container">
        <div className="card-body">
            <form onSubmit={dataSubmit}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name" value={userData.name} onChange={(event)=>setUserData({...userData, name: event.target.value})}/>
                </div>
                <div className="mb-3">
                    <label for="rollno" className="form-label">Roll Number</label>
                    <input type="text" className="form-control" id="rollno" placeholder="Enter your roll number" value={userData.rollno} onChange={(event)=>setUserData({...userData, rollno: event.target.value})}/>
                </div>
                <div className="mb-3">
                    <label for="passingyear" className="form-label">Passing Year</label>
                    <input type="number" className="form-control" id="passingyear" placeholder="Enter your Passing Year" value={userData.passingyear} onChange={(event)=>setUserData({...userData, passingyear: event.target.value})}/>
                </div>
                <div className="mb-3">
                    <label for="branch" className="form-label">Branch</label>
                    <input type="text" className="form-control" id="branch" placeholder="Enter your branch" value={userData.branch} onChange={(event)=>setUserData({...userData, branch: event.target.value})}/>
                </div>
                <button type="submit" className="btn btn-primary" >
                    <span className="icon bi bi-arrow-right-circle" aria-hidden="true"></span>Submit
                </button>
            </form>
        </div>
        </div>
        </>
    )
}
export default EditProfile;