import React, { Component } from 'react';
import { toast } from 'react-toastify';

export class Remuneratii extends Component {
    static displayName = Remuneratii.name;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            modalTitle: "",
            remuneratii: [],
            produse: [],
            produsId: 0,
            produs: "",
            remuneratieId: 0,
            an: 0,
            luna: 0,
            remuneratie: 0
        }
    }

    componentDidMount() {
        this.getRemuneratiiData();
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

    changeRemuneratie = (e) => {
        this.setState({ remuneratie: parseInt(e.target.value) });
    }

    render() {
        return (
            <div>
                <h4 id="tabelLabel" >Remuneratii</h4>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.addClick()}>
                    Adauga
                </button>
                {this.state.loading
                    ? <p><em>Loading...</em></p>
                    :
                    
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Produs</th>
                                <th>An</th>
                                <th>Luna</th>
                                <th>Remuneratie</th>
                                <th className="text-center col-2">Optiuni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.remuneratii.map(remuneratie =>
                                <tr key={remuneratie.remuneratieId}>
                                    <td>{remuneratie.numeProdus}</td>
                                    <td>{remuneratie.an}</td>
                                    <td>{remuneratie.luna}</td>
                                    <td>{remuneratie.remuneratie}</td>
                                    <td className="text-center col-2">
                                        <button type="button"
                                            className="btn btn-secondary btn-sm mr-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => this.editClick(remuneratie)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>

                                        <button type="button"
                                            className="btn btn-danger btn-sm mr-1"
                                            onClick={() => this.deleteClick(remuneratie.remuneratieId)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
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
                                    <span className="input-group-text col-3">Produs</span>
                                    <select className="form-select"
                                        onChange={this.changeProd}
                                        defaultValue={{ label: "Select", value: 0 }}
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
                                    <span className="input-group-text col-3">Remuneratie</span>
                                    <input type="number" className="form-control"
                                        value={this.state.remuneratie}
                                        onChange={this.changeRemuneratie}
                                    />
                                </div>

                                {this.state.remuneratieId === 0 ?
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-primary float-start"
                                        onClick={() => this.saveClick()}
                                    >Salveaza</button>
                                    : null}

                                {this.state.remuneratieId !== 0 ?
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

    async getRemuneratiiData() {
        const response = await fetch('remuneratii');
        const data = await response.json();
        this.setState({ remuneratii: data, loading: false });

        await fetch('produse')
            .then(response => response.json())
            .then(data => {
                this.setState({ produse: data });
            });
    }

    addClick() {
        this.setState({
            modalTitle: "Adauga remuneratie",
            remuneratieId: 0,
            produsId: 0,
            an: "",
            luna: "",
            remuneratie: ""
        });
    }

    editClick(rem) {
        this.setState({
            modalTitle: "Modifica produs",
            remuneratieId: rem.remuneratieId,
            produsId: rem.produsId,
            an: rem.an,
            luna: rem.luna,
            remuneratie: rem.remuneratie
        });
    }

    saveClick() {

        fetch('remuneratii', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                produsId: this.state.produsId,
                an: this.state.an,
                luna: this.state.luna,
                remuneratie: this.state.remuneratie
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
        fetch('remuneratii', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                remuneratieId: this.state.remuneratieId,
                produsId: this.state.produsId,
                an: this.state.an,
                luna: this.state.luna,
                remuneratie: this.state.remuneratie
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
            fetch('remuneratii/' + id, {
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
