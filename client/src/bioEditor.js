import { Component } from "react";
export default class BioEditor extends Component {
    constructor() {
        super();
        this.state = {
            showTextArea: false,
        };
    }
    handleBioChange() {}

    submitBio() {}

    render() {
        return (
            <div>
                <a>Bio</a>

                {this.state.showTextArea && (
                    <div>
                        <h1>Bio</h1>
                        <textarea>text area</textarea>
                    </div>
                )}
            </div>
        );
    }
}
