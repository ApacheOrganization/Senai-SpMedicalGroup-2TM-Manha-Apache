using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Senai.SPMedicalGroup.WebAPI.Domains;
using Senai.SPMedicalGroup.WebAPI.Interfaces;
using Senai.SPMedicalGroup.WebAPI.Repositories;

namespace Senai.SPMedicalGroup.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ClinicasController : ControllerBase
    {
        private IClinicaRepository ClinicaRepository { get; set; }

        public ClinicasController()
        {
            ClinicaRepository = new ClinicaRepository();
        }

        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public IActionResult Cadastrar(Clinica clinica)
        {
            try
            {
                ClinicaRepository.CadastrarDados(clinica);
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

        [HttpGet]
        [Authorize]
        public IActionResult ListarTodas()
        {
            try
            {
                
                return Ok(ClinicaRepository.ListarTodas());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpPut]
        public IActionResult Atualizar(Clinica novaClinica)
        {
            try
            {
                Clinica clinicaCadastrada = ClinicaRepository.BuscarClinicaPorId(novaClinica.Id);

                if (clinicaCadastrada == null)
                {
                    return NotFound();
                }

                ClinicaRepository.AtualizarDados(novaClinica, clinicaCadastrada);

                return Ok();
            }
            catch 
            {
                return BadRequest();
            }
        }
    }
}