using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Senai.SPMedicalGroup.WebAPI.Domains;
using Senai.SPMedicalGroup.WebAPI.Interfaces;
using Senai.SPMedicalGroup.WebAPI.Repositories;
using Senai.SPMedicalGroup.WebAPI.ViewModels;

namespace Senai.SPMedicalGroup.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UsuariosController : ControllerBase
    {
        private IUsuarioRepository UsuarioRepository { get; set; }
        private IPacienteRepository PacienteRepository { get; set; }
        private IMedicoRepository MedicoRepository { get; set; }

        public UsuariosController()
        {
            UsuarioRepository = new UsuarioRepository();
            PacienteRepository = new PacienteRepository();
            MedicoRepository = new MedicoRepository();
        }

        [HttpGet("medicos")]
        [Authorize]
        public IActionResult ListarMedicos()
        {
            try
            {
                List<Medicos> Medicos = MedicoRepository.ListarMedicos();
                var resultado = from m in Medicos
                                select new
                                {
                                    id = m.Id,
                                    crm = m.Crm,
                                    Especialidade = m.IdEspecialidadeNavigation.Nome,
                                    Nome = m.IdUsuarioNavigation.Nome,
                                    Email = m.IdUsuarioNavigation.Email,
                                    Telefone = m.IdUsuarioNavigation.Telefone
                                };
                return Ok(resultado);
            }
            catch 
            {
                return BadRequest();
            }
        }

        [HttpGet("pacientes")]
        [Authorize]
        public IActionResult ListarPacientes()
        {
            try
            {
                List<Pacientes> pacientes = PacienteRepository.ListarPacientes();

                var resultado = from p in pacientes
                                select new
                                {
                                    id = p.Id,
                                    idUsuario = p.IdUsuario,
                                    rg = p.Rg,
                                    cpf = p.Cpf,
                                    dataNascimento = p.DataNascimento,
                                    endereco = p.Endereco,
                                    nome = p.IdUsuarioNavigation.Nome,
                                    telefone = p.IdUsuarioNavigation.Telefone,
                                    idTipoUsuario = p.IdUsuarioNavigation.IdTipoUsuario
                                };
                return Ok(resultado);
            }
            catch 
            {
                return BadRequest();
            }
        }

        [HttpPost("administrador")]
        [Authorize(Roles = "Administrador")]
        public IActionResult CadastrarAdministrador(AdministradorStandaloneViewModel usuarioModel)
        {
            try
            {
                CadastrarUsuarioViewModel usuario = UsuarioRepository.RetornarUsuarioViewModel(usuarioModel);

                UsuarioRepository.CadastrarUsuario(usuario);

                return Ok();
            }
            catch (Exception ex)
                    {
                return BadRequest(new
                {
                    mensagem = "Erro: " + ex
                });
            }
        }

        [HttpPost("medico")]
        [Authorize(Roles = "Administrador")]
        public IActionResult CadastrarMedico(MedicoStandaloneViewModel medicoModel)
        {
            try
            {
                MedicoViewModel medico = MedicoRepository.RetornarMedicoViewModel(medicoModel);

                UsuarioRepository.CadastrarMedico(medico);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    mensagem = "Erro: " + ex
                });
            }
        }

        [HttpPost("paciente")]
        [Authorize(Roles = "Administrador")]
        public IActionResult CadastrarPaciente( PacienteStandaloneViewModel pacienteModel)
        {
            try
            {
                LoginViewModel login = new LoginViewModel();

                PacienteViewModel paciente = PacienteRepository.RetornarPacienteViewModel(pacienteModel);

                Usuarios usuario = UsuarioRepository.BuscarPorEmail(login);

                if (paciente.Paciente.DataNascimento.Date > DateTime.Now.Date)
                {
                    return BadRequest();
                }

                UsuarioRepository.CadastrarPaciente(paciente);

                return Ok();
            }
            catch  (Exception ex)
            {
                throw ex;
            }
        }
    }
}