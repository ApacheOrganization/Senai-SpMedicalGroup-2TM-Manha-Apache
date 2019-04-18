import React, { Component } from "react";

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
                <table id="tabela-lista">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>nome</th>
                    <th>rg</th>
                    <th>cpf</th>
                    <th>dataNascimento</th>
                    <th>endereco</th>
                    <th>email</th>
                    <th>telefone</th>

                  </tr>
                </thead>

                <tbody>
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
                </tbody>
              </table>
            </div>
        );
    }
}
export default Pacientes;