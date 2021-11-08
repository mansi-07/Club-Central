import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../../css/addpostform.css"
import axios from "axios";
import { useHistory } from 'react-router-dom'


class Modal extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            postId:this.props.idpost,
            title: this.props.thePost.title,
            description: this.props.thePost.description,
            imageLink: this.props.thePost.imageLink,

        }
    }


    onTitleChange(event) { this.setState({ title: event.target.value }); }
    onDescriptionChange(event) { this.setState({ description: event.target.value }); }
    onFileChange(event) {
        this.setState({imageLink:this.encodeFileBase64(event.target.files[0])})
        //encodeFileBase64(selectedFile[0])
    }

    editPost(event) {
        event.preventDefault();
        console.log("jhdfhjds")
    }


    encodeFileBase64(file){
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var Base64 = reader.result;
                console.log(Base64);
                //setImageLink(Base64);
            };

            reader.onerror = (error) => {
                console.log(error);   
            };
        }

    }


    componentDidMount() {
        const options = {
            onOpenStart: () => {
                console.log("Open Start");
            },
            onOpenEnd: () => {
                console.log("Open End");
            },
            onCloseStart: () => {
                console.log("Close Start");
            },
            onCloseEnd: () => {
                console.log("Close End");
                const editedpost= {
                    title:this.state.title,
                    description:this.state.description,
                    imageLink:this.state.imageLink
                }
                console.log(editedpost)
                //console.log(this.state.t)
                axios.put(`/api/post/editpost/${this.state.postId}`, editedpost, { headers: { "Content-Type": "application/json" } })
                    .then((res) => {
                        if (res.status === 201) {
                            alert("Edited  Successfully!")
                            const history = useHistory()
                            history.push("/clubadmin")
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        //alert(err)
                    })
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);
    }

    render() {
        return (
            <>
                <i style={{ float: "right", cursor: "pointer" }} data-target="modal1" class="modal-trigger material-icons ed-icons">edit</i>

                {/* <a
                    className="waves-effect waves-light btn modal-trigger"
                    data-target="modal1">
                    Modal
                </a> */}

                <div style={{ padding: "30px", width: "fit-content", height: "fit-content" }}
                    ref={Modal => {
                        this.Modal = Modal;
                    }}
                    id="modal1"
                    className="modal">

                    <div className="modal-content">
                        <form>
                            <input
                                type="text"
                                placeholder="title"
                                value={this.state.title}
                                onChange={this.onTitleChange.bind(this)}
                            />
                            <input
                                type="text"
                                value={this.state.description}
                                onChange={this.onDescriptionChange.bind(this)}
                            />
                            <div >
                                <span>Upload</span>
                                <input type="file" onChange={this.onFileChange.bind(this) }/>
                            </div>

                            <a href="/" className="modal-close waves-effect waves-red btn-flat">
                                Cancel
                            </a>
                            <button onClick={this.editPost.bind(this)} className="modal-close waves-effect waves-green btn-flat">
                                Update
                            </button>


                        </form>

                    </div>

                </div>
            </>
        );
    }
}

export default Modal;
