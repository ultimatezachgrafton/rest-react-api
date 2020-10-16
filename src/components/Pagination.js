import React, { Component } from 'react'

export class Pagination extends Component {
    render() {
        const buttons = [];
        for (let i = 1; i < 10; i++) {
            buttons.push(i);
        }

        const paginate = buttons.map(btn => (
            <button
                key={btn}
                className="btn btn-outline-dark ml-2"
                onClick={() => this.props.loadCharacters(btn)}
            >
                {btn}
            </button>
        ));

        return <div>{paginate}</div>;
    }
}

export default Pagination