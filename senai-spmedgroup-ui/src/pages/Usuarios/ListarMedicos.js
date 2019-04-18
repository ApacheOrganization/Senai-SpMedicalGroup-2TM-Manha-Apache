import React, { Component } from "react";

class Medicos extends Component{
    constructor(){
        super();
        this.state = {
            medicos : []
        }
    }

    ListarMedicos(){
        console.log('Bearer ' + localStorage.getItem("usuario-lindao"));
        fetch('http://localhost:5000/api/usuarios/medicos',{
            method: 'GET',
            headers : {
            'Authorization': 'Bearer ' + localStorage.getItem("usuario-lindao"),
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ medicos : data }))
            .catch(erro => console.log(erro)) 
    }

    componentDidMount(){
        this.ListarMedicos();
    }

    render(){
        return(
            <div>
                <table id="tabela-lista">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>crm</th>
                    <th>nome</th>
                    <th>email</th>
                    <th>telefone</th>
                    <th>Especialidade</th>
                  </tr>
                </thead>

                <tbody>
                    {
                       this.state.medicos.map(function(med){
                           return(
                                <tr key={med.id}>
                                    <td>{med.id}</td>
                                    <td>{med.crm}</td>
                                    <td>{med.idUsuarioNavigation.nome}</td>
                                    <td>{med.idUsuarioNavigation.email}</td>
                                    <td>{med.idUsuarioNavigation.telefone}</td>
                                    <td>{med.idEspecialidadeNavigation.nome}</td>   
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
export default Medicos;