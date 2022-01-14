import React, { Component } from 'react';

export class SituatieVanzari extends Component {
    static displayName = SituatieVanzari.name;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            modalTitle: "",
            situatieVanzari: [],
        }
    }

    componentDidMount() {
        this.getSituatieVanzariData();
    }

    render() {
        return (
            <div>
                <h4 id="tabelLabel" >Situatie vanzari</h4>
                {this.state.loading
                    ? <p><em>Loading...</em></p>
                    : <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                {Object.keys(this.state.situatieVanzari[0]).map((key) => { return <th key={key}>{key.toUpperCase()}</th> })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.situatieVanzari.map(sv => {
                                return (
                                    <tr>
                                        {Object.keys(this.state.situatieVanzari[0]).map((key) => { return <td key={key}>{sv[key]}</td> })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}
            </div>
        );
    }

    async getSituatieVanzariData() {
        const response = await fetch('situatievanzari');
        const data = await response.json();
        this.setState({ situatieVanzari: data, loading: false });
    }
}
