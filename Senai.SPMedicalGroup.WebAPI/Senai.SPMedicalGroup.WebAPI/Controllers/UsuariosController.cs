using System;
using System.IO;
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
                return Ok(MedicoRepository.ListarMedicos());
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
                return Ok(PacienteRepository.ListarPacientes());
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
            catch 
                    {
                return BadRequest();
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
            catch 
            {
                return BadRequest();
            }
        }

        [HttpPost("paciente")]
        [Authorize(Roles = "Administrador")]
        public IActionResult CadastrarPaciente( PacienteStandaloneViewModel pacienteModel)
        {
            try
            {
                PacienteViewModel paciente = PacienteRepository.RetornarPacienteViewModel(pacienteModel);

                

                if (paciente.Paciente.DataNascimento.Date > DateTime.Now.Date)
                {
                    return BadRequest();
                }

                UsuarioRepository.CadastrarPaciente(paciente);

                return Ok();
            }
            catch  
            {
                return BadRequest();
            }
        }
    }
}