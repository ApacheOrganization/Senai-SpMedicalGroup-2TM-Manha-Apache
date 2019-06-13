import React, { Component } from "react";
import Cabecalho from '../../Components/NavBar';
import Rodape from '../../Components/Footer';
import API from '../../Services/api'
import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow, MDBContainer, MDBCardHeader } from 'mdbreact';


class Clinicas extends Component{
    constructor(){
        super();
        this.state = {
            clinicas : []
        }
    }

    ListarClinicas(){
        fetch(API + '/clinicas',{
            method: 'GET',
            headers : {
            'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ clinicas : data }))
            .catch(erro => console.log(erro)) 
    }

    componentDidMount(){
        this.ListarClinicas();
    }

    render(){
        return(
            <div>
                <Cabecalho />
                <h1 className='text-center' style={{marginTop:'2%'}}><span style={{color:'#42f498'}}>T</span><span style={{color:'#5fbfe1'}}>odas</span> <span style={{color:'#42f498'}}>C</span><span style={{color:'#5fbfe1'}}>línicas</span></h1>
                <MDBContainer style={{marginTop:'3%'}}>
                    <MDBRow className="mb-32">

                        {
                            this.state.clinicas.map(function(cons) {
                                return (
                                    <MDBCol sm="6" style={{marginBottom:"2.9%" }}>
                                        <MDBCard>
                                        <MDBCardHeader color="primary-color" tag="h3">
                                                    Clinica {cons.id}
                                                </MDBCardHeader>
                                            <MDBCardBody >
                                                <div style={{ marginLeft: "3%", marginBottom:"5%" }}>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Nome: </span>{cons.nome}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Horario Funcionamento: </span>{cons.horarioFuncionamento}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Endereço: </span>{cons.localidade}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>CNPJ: </span>{cons.cnpj}</MDBCardText>
                                                    <MDBCardText><span style={{ fontWeight: 'bold' }}>Razão Social: </span>{cons.razaoSocial}</MDBCardText>
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
export default Clinicas;