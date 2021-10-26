import React,{useState,useEffect, useReducer} from "react";
import {useHistory} from 'react-router-dom'
import FileBase64 from 'react-file-base64'
import '../../css/addpostform.css'







const AddPost = (token) => {
    const [title,setTitle] =useState("");
    const [description,setDescription] =useState("");
    const [imageLink,setImageLink] =useState("");
    const [url,setUrl] = useState("")
    const history = useHistory()

    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ token
            },
            body:JSON.stringify({
                title,
                description,
                imageLink:url
            })
        })
        .then(data=>{
    
           if(data.error){
             console.log(data.error)
           }
           else{
               history.push('/clubadmin');
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
    const postDetails = () => {

        const data = new FormData()
       data.append("file",imageLink)
       data.append("upload_preset","club-central")
       data.append("cloud_name","dwijabagwe")
       fetch("https://api.cloudinary.com/v1_1/dwijabagwe/image/upload",{
           method:"post",
           body:data
       })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
         })
        .catch(err=>{
            console.log(err)
        })
    }
    
    return (
        <div className="card input-filed">
            <input 
            type="text" 
            placeholder="title" 
            onChange={(e)=> setTitle(e.target.value)}
            />
            <input 
            type="text" 
            placeholder="description" 
            onChange={(e)=> setDescription(e.target.value)}
            />
            <div >
                <span>Upload</span>
                <input type="file" onChange={(e)=>setImageLink(e.target.files[0])} />
            </div>
            <button className="btn" onClick={()=>postDetails()}>
                Add Post
            </button>
        </div>
    )
}

export default AddPost;