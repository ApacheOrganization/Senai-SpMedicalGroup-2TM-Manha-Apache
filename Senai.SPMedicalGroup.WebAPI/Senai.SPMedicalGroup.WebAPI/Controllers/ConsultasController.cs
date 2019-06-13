using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Senai.SPMedicalGroup.WebAPI.Domains;
using Senai.SPMedicalGroup.WebAPI.Interfaces;
using Senai.SPMedicalGroup.WebAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Senai.SPMedicalGroup.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository ConsultaRepository { get; set; }
        private IPacienteRepository PacienteRepository { get; set; }
        private IUsuarioRepository UsuarioRepository { get; set; }
        private IMedicoRepository MedicoRepository { get; set; }

        public ConsultasController()
        {
            ConsultaRepository = new ConsultaRepository();
            PacienteRepository = new PacienteRepository();
            MedicoRepository = new MedicoRepository();
            UsuarioRepository = new UsuarioRepository();
        }

        [HttpGet]
        [Authorize(Roles = "Administrador")]
        public IActionResult Listar()
        {
            try
            {
                List<Consultas> consultas = ConsultaRepository.ListarTodas();

                var retornoConsultas = from c in consultas
                                       select new
                                       {
                                           idConsulta = c.Id,
                                           pacienteCPF = c.IdPacienteNavigation.Cpf,
                                           pacienteRG = c.IdPacienteNavigation.Rg,
                                           pacienteEnd = c.IdPacienteNavigation.Endereco,
                                           pacienteNome = c.IdPacienteNavigation.IdUsuarioNavigation.Nome,
                                           nomeMedico = c.IdMedicoNavigation.IdUsuarioNavigation.Nome,
                                           dataConsulta = c.DataConsulta,
                                           observacoes = c.Observacoes,
                                           endereco = c.IdMedicoNavigation.IdUsuarioNavigation.IdClinicaNavigation.Localidade,
                                           nomeClinica = c.IdMedicoNavigation.IdUsuarioNavigation.IdClinicaNavigation.Nome,
                                           statusConsulta = c.IdStatusNavigation.Nome
                                       };
                return Ok(retornoConsultas);
            }
            catch 
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public IActionResult Cadastrar(Consultas consulta)
        {
            try
            {
                ConsultaRepository.Cadastrar(consulta);

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



        [HttpGet("paciente")]
        [Authorize(Roles = "Paciente")]
        public IActionResult ListarPorPaciente()
        {
            try
            {
                int usuarioId = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                Pacientes pacienteProcurado = PacienteRepository.BuscarPacientePorIdUsuario(usuarioId);

                if (pacienteProcurado == null)
                {
                    return NotFound();
                }

                return Ok(ConsultaRepository.ListarPorIdPaciente(pacienteProcurado.Id));
            }
            catch 
            {
                return BadRequest();
            }
        }

        [HttpGet("listarporusuariologado")]
        [Authorize]
        public IActionResult ListarPorLogado()
        {
            try
            {
                int usuarioId = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                string usuarioTipo = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value.ToString();

                if (usuarioTipo == "Médico")
                {
                    Usuarios procurado = UsuarioRepository.BuscarPorId(usuarioId);

                    List<Consultas> consultas = ConsultaRepository.ListarPorIdMedico(usuarioId);

                    var retornoConsultas = from c in consultas
                                           select new
                                           {
                                               idConsulta = c.Id,
                                               pacienteCPF = c.IdPacienteNavigation.Cpf,
                                               pacienteRG = c.IdPacienteNavigation.Rg,
                                               pacienteEnd = c.IdPacienteNavigation.Endereco,
                                               pacienteNome = c.IdPacienteNavigation.IdUsuarioNavigation.Nome,
                                               nomeMedico = c.IdMedicoNavigation.IdUsuarioNavigation.Nome,
                                               dataConsulta = c.DataConsulta,
                                               observacoes = c.Observacoes,
                                               endereco = c.IdMedicoNavigation.IdUsuarioNavigation.IdClinicaNavigation.Localidade,
                                               nomeClinica = c.IdMedicoNavigation.IdUsuarioNavigation.IdClinicaNavigation.Nome,
                                               statusConsulta = c.IdStatusNavigation.Nome
                                           };

                    return Ok(retornoConsultas);
                }
                else if (usuarioTipo == "Paciente")
                {
                    Usuarios procurado = UsuarioRepository.BuscarPorId(usuarioId);

                    List<Consultas> consultas = ConsultaRepository.ListarPorIdPaciente(usuarioId);

                    var retornoConsultas = from c in consultas
                                           select new
                                           {
                                               idConsulta = c.Id,
                                               pacienteCPF = c.IdPacienteNavigation.Cpf,
                                               pacienteRG = c.IdPacienteNavigation.Rg,
                                               pacienteNome = c.IdPacienteNavigation.IdUsuarioNavigation.Nome,
                                               pacienteEnd = c.IdPacienteNavigation.Endereco,
                                               nomeMedico = c.IdMedicoNavigation.IdUsuarioNavigation.Nome,
                                               dataConsulta = c.DataConsulta,
                                               observacoes = c.Observacoes,
                                               endereco = c.IdMedicoNavigation.IdUsuarioNavigation.IdClinicaNavigation.Localidade,
                                               nomeClinica = c.IdMedicoNavigation.IdUsuarioNavigation.IdClinicaNavigation.Nome,
                                               statusConsulta = c.IdStatusNavigation.Nome
                                           };

                    return Ok(retornoConsultas);
                }
                else
                {
                    return BadRequest();
                }

            }
            catch 
            {
                return BadRequest();
            }
        }

        [HttpGet("medico")]
        [Authorize(Roles = "Médico")]
        public IActionResult ListarPorMedico()
        {
            try
            {
                int usuarioId = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                Medicos medicoProcurado = MedicoRepository.BuscarMedicoPorIdUsuario(usuarioId);

                if (medicoProcurado == null)
                {
                    return NotFound();
                }

                return Ok(ConsultaRepository.ListarPorIdMedico(medicoProcurado.Id));
            }
            catch 
            {
                return BadRequest();
            }
        }
    }
}