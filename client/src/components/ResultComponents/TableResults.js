import React, { Component, useEffect, useState } from "react";
import M from "materialize-css";
//import "materialize-css/dist/css/materialize.min.css";
import "../../css/addpostform.css"
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom'


const TableResults = ({ user }) => {

    //const t = user['token']

    const [sigslist, setSigsList] = useState([])
    const [userslist, setUsersList] = useState([])
    const [sigid, setSigID] = useState("")
    const { id } = useParams()
    const [checked,setChecked]=useState([])
    const [unchecked,setUnchecked]=useState([])

    useEffect(() => {

        axios.get('/api/result/sigs')
            .then((res) => {
                //console.log(res.data.sigs)
                setSigsList(res.data.sigs)
                //console.log(sigslist)
            })
            .catch(err => {
                console.log(err)
            })

    })


    const selectedSig = (e) => {
        setSigID(e.target.value)
        console.log(sigid)
    }

    const getUsers = (e) => {
        console.log(sigid)
        axios.get(`/api/result/users/${sigid}`)
            .then((res) => {
                console.log(res.data)
                setUsersList(res.data)
                //console.log(userslist)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleCheck =(e,id)=>{
        if(e.target.checked)
        {
            setChecked(...checked,[id])
        }
        console.log(checked)
    }

    return (
        <>
            <div class="row">
                <div class="col s12 m10">
                    <div class="card darken-1">
                        <div class="card-content">
                            <span class="card-title">Choose SIG:</span>
                            <p>
                                {
                                    sigslist.map(item => {
                                        return (
                                            <div onChange={(e) => selectedSig(e)}>

                                                <label>
                                                    <input class="with-gap" value={item._id} name="group1" type="radio" />

                                                    <span>{item.SigName}</span>
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                            </p>
                        </div>
                        <div class="card-action">
                            <button style={{ float: "right" }} class="waves-effect waves-light btn" onClick={(e) => getUsers(e)}>Done</button>
                        </div>
                    </div>
                </div>
            </div>




            <div class="row">
                <div class="col s12 m10">
                    <div class="card darken-1">             
                            <div class="card-content">
                                <span class="card-title">Check the users who are selected: </span>
                                <p>
                                    {
                                        userslist.map(item => {
                                            return (
                                                <p>
                                                    <label >
                                                        <input type="checkbox" id="isRecruiting" onClick={(e)=>handleCheck(e,item._id)}/>
                                                        <span>{item.username.username}</span>
                                                    </label>
                                                </p>

                                            )
                                        })
                                    }
                                </p>
                            </div>
                            <div class="card-action">
                                <button style={{ float: "right" }} class="waves-effect waves-light btn" onClick={(e) => getUsers(e)}>Update</button>
                            </div>
                    </div>
                </div>
            </div>


        </>
    );

}


export default TableResults


