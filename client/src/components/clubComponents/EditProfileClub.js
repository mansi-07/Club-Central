import {React,useState, useEffect} from 'react'
import Navbar from '../partials/Navbar'
import axios from 'axios'

const EditProfileClub = ({user}) => {
    const initialState = {
        name: '',
        isExclusive: null,
        isRecruiting: null
    }
    const [clubData, setClubData] = useState(initialState) 

    useEffect(() => {
        axios.post(`/api/club/clubdata`, {id: user.user_id})
            .then(response => {
                console.log(response.data)
                console.log(response.status)
                if(response.status === 201){
                    setClubData({ name: response.data.name, isExclusive: response.data.isExclusive, isRecruiting:response.data.isRecruiting})
                }
            });
    }, []);

    const dataSubmit = (event) => {
        event.preventDefault()
        axios.post(`/api/club/editclubdata`, {name:clubData.name , isExclusive: clubData.isExclusive, isRecruiting: clubData.isRecruiting, id: user.user_id} )
        .then((res) => {
            if (res.status === 201) {
                alert("Successful!")
          }
        })
        .catch(err => {
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
                    <input type="text" className="form-control" id="name" placeholder="Enter Club name" value={clubData.name} onChange={(event)=>setClubData({...clubData, name: event.target.value})}/>
                </div>
                <p>
                <label>
                    <input type="checkbox" id="isRecruiting" checked={clubData.isRecruiting?"checked":null} onClick={(e)=>setClubData({...clubData, isRecruiting: e.target.checked})} />
                    <span>isRecruiting</span>
                </label>
                </p>
                <p>
                <label>
                    <input type="checkbox" id="isExclusive" checked={clubData.isExclusive?"checked":null} onClick={(e)=>setClubData({...clubData, isExclusive: e.target.checked})}/>
                    <span>isExclusive</span>
                </label>
                </p>
                <button type="submit" className="btn btn-primary" >
                    <span className="icon bi bi-arrow-right-circle" aria-hidden="true"></span>Submit
                </button>
            </form>
        </div>
        </div>
        </>
    )
}
export default EditProfileClub;