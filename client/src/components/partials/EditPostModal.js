import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {
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

        // let instance = M.Modal.getInstance(this.Modal);
        // instance.open();
        // instance.close();
        // instance.destroy();
    }

    render() {
        return (
            <div>
                <a
                    className="waves-effect waves-light btn modal-trigger"
                    data-target="modal1">
                    Modal
                </a>

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
                                    placeholder="title"

                                />
                                <input
                                    type="text"
                                    placeholder="description"

                                />
                                <div >
                                    <span>Upload</span>
                                    <input type="file" />
                                </div>
                                
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
            </div>
        );
    }
}

export default Modal;
