import React, { Component } from 'react';
import Toast from 'react-bootstrap/Toast';

export class Vanzari extends Component {
    static displayName = Vanzari.name;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            modalTitle: "",
            showToast: false,
            serverMsg: "",
            vanzari: [],
            produse: [],
            persoane: [],
            persoanaId: 0,
            persoana: "",
            produsId: 0,
            produs: "",
            vanzareId: 0,
            an: 0,
            luna: 0,
            nrProduse: 0
        }
    }

    setShowToast(show) {
        this.setState({ showToast: show });
    }

    componentDidMount() {
        this.getVanzariData();
    }

    changePers = (e) => {
        this.setState({ persoanaId: parseInt(e.target.value) });
    }

    changeProd = (e) => {
        this.setState({ produsId: parseInt(e.target.value) });
    }

    changeAn = (e) => {
        this.setState({ an: parseInt(e.target.value) });
    }

    changeLuna = (e) => {
        this.setState({ luna: parseInt(e.target.value) });
    }

    changeNrProduse = (e) => {
        this.setState({ nrProduse: parseInt(e.target.value) });
    }

    render() {
        return (
            <div>
                <Toast bg="secondary" onClose={() => this.setShowToast(false)} show={this.state.showToast} position="top-center" delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Notificare</strong>
                    </Toast.Header>
                    <Toast.Body>{this.state.serverMsg}</Toast.Body>
                </Toast>
                <h4 id="tabelLabel" >Vanzari</h4>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.addClick()}>
                    Adauga
                </button>
                {this.state.loading
                    ? <p><em>Loading...</em></p>
                    : <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Vanzator</th>
                                <th>Produs</th>
                                <th>An</th>
                                <th>Luna</th>
                                <th>Numar produse</th>
                                <th className="text-center col-2">Optiuni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.vanzari.map(vanzare =>
                                <tr key={vanzare.vanzareId}>
                                    <td>{vanzare.numePersoana}</td>
                                    <td>{vanzare.numeProdus}</td>
                                    <td>{vanzare.an}</td>
                                    <td>{vanzare.luna}</td>
                                    <td>{vanzare.nrProduse}</td>
                                    <td className="text-center col-2">
                                        <button type="button"
                                            className="btn btn-secondary btn-sm mr-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => this.editClick(vanzare)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>

                                        <button type="button"
                                            className="btn btn-danger btn-sm mr-1"
                                            onClick={() => this.deleteClick(vanzare.vanzareId)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.state.modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text col-3">Persoana</span>
                                    <select className="form-select"
                                        onChange={this.changePers}
                                        value={this.state.persoanaId}>
                                        <option value="0">Select</option>
                                        {this.state.persoane.map(pers => <option key={pers.persoanaId} value={pers.persoanaId}>
                                            { pers.numePersoana }
                                        </option>)}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text col-3">Produs</span>
                                    <select className="form-select"
                                        onChange={this.changeProd}
                                        value={this.state.produsId}>
                                        <option value="0">Select</option>
                                        {this.state.produse.map(prod => <option key={prod.produsId} value={prod.produsId}>
                                            {prod.numeProdus}
                                        </option>)}
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text col-3">An</span>
                                    <input type="number" className="form-control"
                                        value={this.state.an}
                                        onChange={this.changeAn}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text col-3">Luna</span>
                                    <input type="number" className="form-control"
                                        value={this.state.luna}
                                        onChange={this.changeLuna}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text col-3">Numar produse</span>
                                    <input type="number" className="form-control"
                                        value={this.state.nrProduse}
                                        onChange={this.changeNrProduse}
                                    />
                                </div>

                                {this.state.vanzareId === 0 ?
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-primary float-start"
                                        onClick={() => this.saveClick()}
                                    >Salveaza</button>
                                    : null}

                                {this.state.vanzareId !== 0 ?
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-primary float-start"
                                    onClick={() => this.updateClick()}
                                    >Salveaza</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    async getVanzariData() {
        const response = await fetch('vanzari');
        const data = await response.json();
        this.setState({ vanzari: data, loading: false });

        await fetch('produse')
            .then(response => response.json())
            .then(data => {
                this.setState({ produse: data });
            });

        await fetch('persoane')
            .then(response => response.json())
            .then(data => {
                this.setState({ persoane: data });
            });
    }

    addClick() {
        this.setState({
            modalTitle: "Adauga vanzare",
            vanzareId: 0,
            persoanaId: 0,
            produsId: 0,
            an: "",
            luna: "",
            nrProduse: ""
        });
    }

    editClick(vanz) {
        this.setState({
            modalTitle: "Modifica produs",
            vanzareId: vanz.vanzareId,
            persoanaId: vanz.persoanaId,
            produsId: vanz.produsId,
            an: vanz.an,
            luna: vanz.luna,
            nrProduse: vanz.nrProduse
        });
    }

    saveClick() {

        fetch('vanzari', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                persoanaId: this.state.persoanaId,
                produsId: this.state.produsId,
                an: this.state.an,
                luna: this.state.luna,
                nrProduse: this.state.nrProduse
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({ showToast: true, serverMsg: result });
                this.componentDidMount();
            }, (error) => {
                this.setState({ showToast: true, serverMsg: error});
            })
    }

    updateClick() {
        fetch('vanzari', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vanzareId: this.state.vanzareId,
                persoanaId: this.state.persoanaId,
                produsId: this.state.produsId,
                an: this.state.an,
                luna: this.state.luna,
                nrProduse: this.state.nrProduse
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({ showToast: true, serverMsg: result });
                this.componentDidMount();
            }, (error) => {
                this.setState({ showToast: true, serverMsg: error});
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch('vanzari/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    this.setState({ showToast: true, serverMsg: result });
                    this.componentDidMount();
                }, (error) => {
                    this.setState({ showToast: true, serverMsg: error});
                })
        }
    }
}
