import { React, useState, useEffect } from 'react'
import '../../css/landingPage.css'
import { Link} from 'react-router-dom';
import axios from 'axios';


const AddSig = ({user}) => {
    const t = user['token']
    
    const [SigName, setSigName] = useState("");
    const [SigDesc, setSigDesc] = useState("");

    const sigSubmit = async (event) => {
        event.preventDefault()
        console.log({ SigName, SigDesc})
        console.log(`Bearer ${t}`)
        axios.post("/addsig", { SigName, SigDesc}, { headers :{ "Content-Type": "application/json", "Authorization": `Bearer ${t}` }})
            .then((res) => {
                if (res.status === 201) {
                    alert("Added Successfully!")
                    //history.push("/clubposts")

                }
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data.msg)
            })


    }












    

    // useEffect(() => {
    //     axios.post('/api/auth/addsig', {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + token
    //         },
    //         body: JSON.stringify({
    //             SigName,
    //             SigDesc
    //         })
    //     })
    //         .then(response => {
    //             console.log(response.data)
    //             console.log(token)
    //         });
    // }, []);

    // const AddSigSubmit = (event) => {
    //     //event.preventDefault()
    //     console.log({ SigName, SigDesc })
    //     axios.post("/api/auth/addsig", { SigName, SigDesc })
    //     .then((res) => {
    //         if (res.status === 201) {
    //             alert("Sig Added Successfully!")
    //             //history.push("/clubadmin")

    //       }
    //     })
    //     .catch(err => {
    //         console.log(err.response.data.msg)
    //         alert(err.response.data.msg)
    //     })
    // }

    return (
        <>
        <div className="card input-filed">
            <form onSubmit={sigSubmit}>
            <input 
            type="text" 
            placeholder="title" 
            onChange={(event)=> setSigName(event.target.value)}
            />
            <input 
            type="text" 
            placeholder="description" 
            onChange={(event)=> setSigDesc(event.target.value)}
            />
            <button type="submit" className="btn">
                Add Sig
            </button>
            </form>
        </div>
        </>
    )
}

export default AddSig;
