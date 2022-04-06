import React from "react";

export class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            wasClicked: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickMinus = this.handleClickMinus.bind(this);
        // com isso nao precisa passar arrow function no onClick
    }

    componentDidMount() {
        console.log("my component was mounted");
        //quando o browser reload ou é aberto pela primeira vez o component é montato
    }

    componentDidUpdate() {
        console.log("my component changed");
    }

    handleClick() {
        this.setState({ count: this.state.count + 1 });
        // console.log("state before change", this.state);
        this.setState({ wasClicked: true });
    }

    handleClickMinus() {
        this.setState({ count: this.state.count + -1 });
        // console.log("state before change", this.state);
        this.setState({ wasClicked: true });
    }
    render() {
        // console.log("state after change", this.state);

        return (
            <section>
                <h1>Counter</h1>
                <p>Count: {this.state.count}</p>
                <button onClick={this.handleClick}>+</button>
                <button onClick={this.handleClickMinus}>-</button>
            </section>
        );
    }
}
