import React, { Component } from "react";
import Cabecalho from '../../Components/NavBar';
import Rodape from '../../Components/Footer';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCol, MDBRow, MDBContainer, MDBCardHeader } from 'mdbreact';
import API from '../../Services/api'

class Pacientes extends Component {
    constructor() {
        super();
        this.state = {
            pacientes: []
        }
    }

    ListarPacientes() {
        console.log('Bearer ' + localStorage.getItem("usuario-lindao"));
        fetch(API + '/usuarios/pacientes', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ pacientes: data }))
            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.ListarPacientes();
    }

    render() {
        return (
            <div>
                <Cabecalho />
                <h1 className='text-center' style={{marginTop:'2%'}}><span style={{color:'#42f498'}}>T</span><span style={{color:'#5fbfe1'}}>odos</span> <span style={{color:'#42f498'}}>P</span><span style={{color:'#5fbfe1'}}>acientes</span></h1>
                <MDBContainer style={{marginTop:'3%'}}>
                    <MDBRow className="mb-32">

                        {
                            this.state.pacientes.map(function (pac) {
                                if (pac.telefone === undefined) {
                                 pac.telefone = "Telefone indisponível"   
                                }
                                return (
                                    <MDBCol sm="6" style={{marginBottom:"2.9%" }}>
                                        <MDBCard>
                                        <MDBCardHeader color="primary-color" tag="h3">
                                                    Paciente {pac.id}
                                                </MDBCardHeader>
                                            <MDBCardBody >
                                                <div style={{ marginLeft: "3%", marginBottom:"5%" }}>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Nome do Paciente: </span>{pac.nome}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>RG: </span>{pac.rg}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>CPF: </span>{pac.cpf}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Data de Nascimento: </span>{pac.dataNascimento}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Endereço: </span>{pac.endereco}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Telefone: </span>{pac.telefone}</MDBCardText>
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
export default Pacientes;