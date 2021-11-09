import {React,useState, useEffect} from 'react'
import axios from 'axios';
import Navbar from '../partials/Navbar';

const Register = ({user}) => {
    const [list, setList] = useState([])
    // function mapFunc(s){
    //     return {
    //         name: s.SigName,
    //         dsc: s.SigDesc
    //     };
    // }
    console.log(list);
    useEffect(() => {
        axios.post(`/api/recs/getsigs`, {instituteID: user.instituteName})
            .then(response => {
                // const sigList = response.data.map(mapFunc)
                setList(...list, response.data)
            });
    }, []);
    const [sigID, setSigID] = useState();
    const [clubID, setclubID] = useState();
    const handleSubmit = () => {
        axios.post(`/api/recs/apply`, {userID: user.user_id, sigID: sigID, clubID: clubID})
            .then(response => {
                console.log(response.data.msg)
                alert(response.data.msg)
            })
            .catch(err => {
                console.log(err.response.data.msg)
                alert(err.response.data.msg)
            });
    }
    return (
        <>
        <Navbar user={user}/>
        {
            list && list.map(l => {
                return (
                    <div class="row">
                        <div class="col s12">
                        <div class="card">
                            <div class="card-content">
                            <span class="card-title">{l.SigName}</span>
                            <p>{l.SigDesc}</p>
                            </div>
                            <div class="card-action">
                                <button class="btn waves-effect waves-light light-blue accent-3" type="submit" onClick={() => {setSigID(l._id);setclubID(l.ClubName); handleSubmit();}}>Register
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                );
            }) 
        }
        </>
    )
}
export default Register;