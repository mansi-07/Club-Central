import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../../css/addpostform.css"

class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            SigName: this.props.theSig.SigName,
            SigDesc: this.props.theSig.SigDesc,
            //imageLink: this.props.thePost.imageLink
        }
    }

    onSigNameChange(event) { this.setState({ SigName: event.target.value }); }
    onSigDescChange(event) { this.setState({ SigDesc: event.target.value }); }




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

                <div style={{ width: "fit-content" }}
                    ref={Modal => {
                        this.Modal = Modal;
                    }}
                    id="modal1"
                    className="modal">

                    <div className="modal-content">
                        <div className="card input-filed">
                            <form >
                                <input
                                    type="text"
                                    placeholder="SigName"
                                    value={this.state.SigName}
                                    onChange={this.onSigNameChange.bind(this)}
                                />
                                <input
                                    type="text"
                                    value={this.state.SigDesc}
                                    onChange={this.onSigDescChange.bind(this)}
                                />
                                {/* <div >
                                    <span>Upload</span>
                                    <input type="file" />
                                </div> */}

                                <a className="modal-close waves-effect waves-red btn-flat">
                                    Cancel
                                </a>
                                <a className="modal-close waves-effect waves-green btn-flat">
                                    Update
                                </a>


                            </form>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export default Modal;