import React, { Component } from 'react';
import Toast from 'react-bootstrap/Toast';

export class Produse extends Component {
    static displayName = Produse.name;

    constructor(props) {
        super(props);
        this.state = {
            produse: [],
            loading: true,
            showToast: false,
            serverMsg: "",
            modalTitle: "",
            produsId: 0,
            numeProdus: "",
        }
    }

    setShowToast(show) {
        this.setState({ showToast: show });
    }

    componentDidMount() {
        this.getProdData();
    }

    changeNumeProdus = (e) => {
        this.setState({ numeProdus: e.target.value });
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
                <h4 id="tabelLabel" >Produse</h4>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.addClick()}>
                    Adauga
                </button>
                {this.state.loading
                    ? <p><em>Loading...</em></p>
                    : <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Nume produs</th>
                                <th className="text-center col-2">Optiuni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.produse.map(produs => <tr key={produs.produsId}>
                                <td>{produs.numeProdus}</td>
                                <td className="text-center col-2">
                                    <button type="button"
                                        className="btn btn-secondary btn-sm mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(produs)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-danger btn-sm mr-1"
                                        onClick={() => this.deleteClick(produs.produsId)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
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
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Denumire</span>
                                    <input type="text" className="form-control"
                                        value={this.state.numeProdus}
                                        onChange={this.changeNumeProdus}
                                    />
                                </div>

                                {this.state.produsId === 0 ?
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-primary float-start"
                                        onClick={() => this.saveClick()}
                                    >Salveaza</button>
                                    : null}

                                {this.state.produsId !== 0 ?
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

    async getProdData() {
        const response = await fetch('produse');
        const data = await response.json();
        this.setState({ produse: data, loading: false });
    }

    addClick() {

        this.setState({
            modalTitle: "Adauga produs",
            produsId: 0,
            numeProdus: ""
        });
    }

    editClick(prod) {
        this.setState({
            modalTitle: "Modifica produs",
            produsId: prod.produsId,
            numeProdus: prod.numeProdus
        });
    }

    saveClick() {
        fetch('produse', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numeProdus: this.state.numeProdus
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({ showToast: true, serverMsg: result });
                this.componentDidMount();
            }, (error) => {
                this.setState({ showToast: true, serverMsg: error });
            })
    }

    updateClick() {
        fetch('produse', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                produsId: this.state.produsId,
                numeProdus: this.state.numeProdus
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({ showToast: true, serverMsg: result });
                this.componentDidMount();
            }, (error) => {
                this.setState({ showToast: true, serverMsg: error });
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch('produse/' + id, {
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
                    this.setState({ showToast: true, serverMsg: error });
                })
        }
    }
}
