import React, { useState, useEffect, useReducer } from "react";
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import '../../css/addpostform.css'


const AddPost = ({ user }) => {
    const t = user['token']
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState([]);
    const [imageLink, setImageLink] = useState("");
    const history = useHistory()

    const onFileChange = (e) => {
        setSelectedFile(e.target.files)
        //encodeFileBase64(selectedFile[0])
    }

    const encodeFileBase64 = (file) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var Base64 = reader.result;
                console.log(Base64);
                setImageLink(Base64);
            };

            reader.onerror = (error) => {
                console.log(error);   
            };
        }

    }

    const postSubmit= (event) => {
        event.preventDefault();
        encodeFileBase64(selectedFile[0]);
        console.log({ title, description, imageLink })
        axios.post("/api/post/createpost", { title, description, imageLink }, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${t}` } })
            .then((res) => {
                if (res.status === 201) {
                    alert("Posted Successfully!")
                   history.push("/clubadmin")
                }
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data.msg)
            })


    }

    return (
        <div className="card input-filed">
            <form onSubmit={postSubmit}>
                <input
                    type="text"
                    placeholder="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div >
                    <span>Upload</span>
                    <input type="file" onChange={onFileChange } />
                </div>
                <button type="submit" className="btn">
                    Add Post
                </button>
            </form>
        </div>
    )
}

export default AddPost;