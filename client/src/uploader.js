import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log("this prpos", this.props);
        e.preventDefault();
        const file = this.state.file;
        // console.log("******", this.state.file);
        let fd = new FormData();
        fd.append("file", file);
        fetch("/upload", {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then(({ url }) => {
                console.log("url", url);
                this.props.onProfilePictureChange(url);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }

    // closeModal() {
    //     this.props.isModalOpened = false;
    // }

    render() {
        return (
            <>
                <section className="modal">
                    <section className="modal-content">
                        <section className="form">
                            <button
                                className="close-button"
                                onClick={this.props.onCloseModal}
                            >
                                X
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    console.log("changed", e.target.files[0]);
                                    this.setState({ file: e.target.files[0] });
                                }}
                            ></input>
                            <button onClick={this.handleClick}> Submit</button>
                        </section>
                    </section>
                </section>
            </>
        );
    }
}

{
    /* <input
                                type="file"
                                name="file"
                                id="file"
                                className="inputfile"
                                accept="image/*"
                            ></input>
                            <label>Choose a File</label>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="inputfile"
                            ></input> */
}
{
    /* <button clickHandler={this.clickHandler()}>Save</button> */
}
