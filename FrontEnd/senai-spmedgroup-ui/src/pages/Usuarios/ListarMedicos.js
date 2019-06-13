import React, { Component } from "react";
import Cabecalho from '../../Components/NavBar';
import Rodape from '../../Components/Footer';
import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow, MDBContainer, MDBCardHeader } from 'mdbreact';
import API from '../../Services/api'

class Medicos extends Component {
    constructor() {
        super();
        this.state = {
            medicos: []
        }
    }

    ListarMedicos() {
        console.log('Bearer ' + localStorage.getItem("usuario-lindao"));
        fetch(API + '/usuarios/medicos', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ medicos: data }))
            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.ListarMedicos();
    }

    render() {
        return (
            <div>
                <Cabecalho />
                <h1 className='text-center' style={{marginTop:'2%'}}><span style={{color:'#42f498'}}>T</span><span style={{color:'#5fbfe1'}}>odos</span> <span style={{color:'#42f498'}}>M</span><span style={{color:'#5fbfe1'}}>édicos</span></h1>
                <MDBContainer style={{marginTop:'3%'}}>
                    <MDBRow className="mb-32">

                        {
                            this.state.medicos.map(function (med) {
                                return (
                                    <MDBCol sm="6" style={{marginBottom:"2.9%" }}>
                                        <MDBCard>
                                        <MDBCardHeader color="primary-color" tag="h3">
                                                    Médico {med.id}
                                                </MDBCardHeader>
                                            <MDBCardBody >
                                                <div style={{ marginLeft: "3%", marginBottom:"5%" }}>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Nome do Médico: </span>{med.nome}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>CRM: </span>{med.crm}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Email: </span>{med.email}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Especialidade: </span>{med.especialidade}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Telefone: </span>{med.telefone}</MDBCardText>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                );
                            })
                        }

                    </MDBRow>
                </MDBContainer>
                <Rodape />
            </div>
        );
    }
}
export default Medicos;