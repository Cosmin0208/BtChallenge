import React, { Component } from 'react';
import { toast } from 'react-toastify';

export class Persoane extends Component {
    static displayName = Persoane.name;

    constructor(props) {
        super(props);
        this.state = {
            persoane: [],
            loading: true,
            modalTitle: "",
            persoanaId: 0,
            numePersoana: "",
        }
    }

    componentDidMount() {
        this.getPersData();
    }

    changeNumePersoana = (e) => {
        this.setState({ numePersoana: e.target.value });
    }

    render() {
        return (
            <div>
                <h4 id="tabelLabel" >Persoane</h4>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.addClick()}>
                    Adauga
                </button>
                {this.state.loading
                    ? <p><em>Loading...</em></p> :
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Nume persoana</th>
                                <th className="text-center col-2">Optiuni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.persoane.map(persoana => <tr key={persoana.persoanaId}>
                                <td>{persoana.numePersoana}</td>
                                <td className="text-center col-2">
                                    <button type="button"
                                        className="btn btn-secondary btn-sm mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(persoana)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-danger btn-sm mr-1"
                                        onClick={() => this.deleteClick(persoana.persoanaId)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
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
                                    <span className="input-group-text">Nume</span>
                                    <input type="text" className="form-control"
                                        value={this.state.numePersoana}
                                        onChange={this.changeNumePersoana}
                                    />
                                </div>

                                {this.state.persoanaId === 0 ?
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-primary float-start"
                                        onClick={() => this.saveClick()}
                                    >Salveaza</button>
                                    : null}

                                {this.state.persoanaId !== 0 ?
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

    async getPersData() {
        const response = await fetch('persoane');
        const data = await response.json();
        this.setState({ persoane: data, loading: false });
    }

    addClick() {

        this.setState({
            modalTitle: "Adauga persoana",
            persoanaId: 0,
            numePersoana: ""
        });
    }

    editClick(pers) {
        this.setState({
            modalTitle: "Modifica persoana",
            persoanaId: pers.persoanaId,
            numePersoana: pers.numePersoana
        });
    }

    saveClick() {
        fetch('persoane', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numePersoana: this.state.numePersoana
            })
        })
            .then(res => res.json())
            .then((result) => {
                toast.success(result, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.componentDidMount();
            }, (error) => {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    updateClick() {
        fetch('persoane', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                persoanaId: this.state.persoanaId,
                numePersoana: this.state.numePersoana
            })
        })
            .then(res => res.json())
            .then((result) => {
                toast.success(result, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.componentDidMount();
            }, (error) => {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch('persoane/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    toast.success(result, {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    this.componentDidMount();
                }, (error) => {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
        }
    }
}
