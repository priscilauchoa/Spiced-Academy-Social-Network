import { Component } from "react";
export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextArea: false,
        };
        this.handleBioChange = this.handleBioChange.bind(this);
        this.submitBio = this.submitBio.bind(this);
        this.handleBioClick = this.handleBioClick.bind(this);
    }

    handleBioChange(e) {
        this.setState({ draftBio: e.target.value });
    }
    handleBioClick() {
        this.setState({ showTextArea: true, draftBio: this.props.bio });
    }

    submitBio(e) {
        e.preventDefault();
        console.log("this.state.draftBio***", this.state);
        // this.setState({ draftBio: e.target.value });
        this.props.setBio(this.state.draftBio);

        fetch("/bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then(({ rows }) => {
                console.log("draft Bio Here****", rows[0].draftbio);
                this.setState({
                    bio: rows[0].draftbio,
                    showTextArea: false,
                });
            })
            .catch((err) => {
                console.log(err);
                // this.setState(this.state.error);
                this.setState({ error: true });
            });
    }

    render() {
        // console.log("this.state-->", this.state);
        return (
            <div>
                {!this.state.showTextArea && (
                    <div>
                        <p> {this.props.bio} </p>
                        {this.props.bio && (
                            <button
                                id="edit"
                                className="edit"
                                onClick={this.handleBioClick}
                            >
                                Edit 🖋
                            </button>
                        )}
                        {!this.props.bio && (
                            <button
                                id="add"
                                className="edit"
                                onClick={this.handleBioClick}
                            >
                                Add
                            </button>
                        )}
                    </div>
                )}
                {this.state.showTextArea && (
                    <div className="text-area">
                        <textarea
                            defaultValue={this.props.bio}
                            onChange={this.handleBioChange}
                        ></textarea>
                        <button onClick={this.submitBio}>Save</button>
                    </div>
                )}
            </div>
        );
    }
}
