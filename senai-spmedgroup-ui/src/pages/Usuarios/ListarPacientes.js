import React, { Component } from "react";
import Cabecalho from '../../Components/NavBar';
import Rodape from '../../Components/Footer';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class Pacientes extends Component{
    constructor(){
        super();
        this.state = {
            pacientes : []
        }
    }

    ListarPacientes(){
        console.log('Bearer ' + localStorage.getItem("usuario-lindao"));
        fetch('http://localhost:5000/api/usuarios/pacientes',{
            method: 'GET',
            headers : {
            'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ pacientes : data }))
            .catch(erro => console.log(erro)) 
    }

    componentDidMount(){
        this.ListarPacientes();
    }

    render(){
        return(
            <div>
                <Cabecalho/>
                <br/>
                <br/>
                <div style={{paddingLeft:"2em", paddingRight:"2em"}}>
                <MDBTable >
                    <MDBTableHead color="primary-color" textWhite>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>RG</th>
                            <th>CPF</th>
                            <th>Data de Nascimento</th>
                            <th>Endereço</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                            {
                            this.state.pacientes.map(function(pac){
                                return(
                                        <tr key={pac.id}>
                                            <td>{pac.id}</td>
                                            <td>{pac.idUsuarioNavigation.nome}</td>
                                            <td>{pac.rg}</td>
                                            <td>{pac.cpf}</td>
                                            <td>{pac.dataNascimento}</td>
                                            <td>{pac.endereco}</td>
                                            <td>{pac.idUsuarioNavigation.email}</td>
                                            <td>{pac.idUsuarioNavigation.telefone}</td>

                                        </tr>
                                );
                            }) 
                            }
                    </MDBTableBody>
                </MDBTable>
                </div>
              <br/>
              <br/>
              <Rodape/>
            </div>
        );
    }
}
export default Pacientes;