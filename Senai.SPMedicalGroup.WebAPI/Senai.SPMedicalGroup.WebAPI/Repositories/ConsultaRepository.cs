using Microsoft.EntityFrameworkCore;
using Senai.SPMedicalGroup.WebAPI.Domains;
using Senai.SPMedicalGroup.WebAPI.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Senai.SPMedicalGroup.WebAPI.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        public void Atualizar(Consultas novaConsulta, Consultas consultaCadastrada)
        {
            // Validações para ver quais informações vão ser atualizadas.
            if (novaConsulta.Observacoes != null)
            {
                consultaCadastrada.Observacoes = novaConsulta.Observacoes;
            }

            if (novaConsulta.IdStatus != 0)
            {
                consultaCadastrada.IdStatus = novaConsulta.IdStatus;
            }

            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                ctx.Consultas.Update(consultaCadastrada);
                ctx.SaveChanges();
            }
        }

        public Consultas BuscarPorId(int id)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                return ctx.Consultas.Find(id);
            }
        }

        public void Cadastrar(Consultas consulta)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                ctx.Consultas.Add(consulta);
                ctx.SaveChanges();
            }
        }

        public List<Consultas> ListarPorIdMedico(int idMedico)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                Medicos medicoBuscado = ctx.Medicos.Where(p => p.IdUsuario == idMedico).FirstOrDefault();

                return ctx.Consultas.Include(x => x.IdMedicoNavigation.IdUsuarioNavigation).Include(x=>x.IdMedicoNavigation.IdUsuarioNavigation.IdClinicaNavigation).Include(x=>x.IdPacienteNavigation.IdUsuarioNavigation).Include(x => x.IdMedicoNavigation.IdEspecialidadeNavigation).Include(y => y.IdPacienteNavigation).Include(z => z.IdStatusNavigation).Where(x => x.IdMedico == medicoBuscado.Id).ToList();
            }
        }

        public List<Consultas> ListarTodas()
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                return ctx.Consultas.Include(x => x.IdMedicoNavigation.IdUsuarioNavigation).Include(x => x.IdMedicoNavigation.IdUsuarioNavigation.IdClinicaNavigation).Include(x => x.IdPacienteNavigation.IdUsuarioNavigation).Include(x=>x.IdMedicoNavigation.IdEspecialidadeNavigation).Include(y => y.IdPacienteNavigation).Include(z => z.IdStatusNavigation).ToList();
            }
        }

        public List<Consultas> ListarPorIdPaciente(int idPaciente)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                Pacientes pacienteBuscado = ctx.Pacientes.Where(p => p.IdUsuario == idPaciente).FirstOrDefault();
                // Retorna as consultas do paciente
                return ctx.Consultas.Include(x => x.IdMedicoNavigation.IdUsuarioNavigation).Include(x => x.IdMedicoNavigation.IdUsuarioNavigation.IdClinicaNavigation).Include(x => x.IdPacienteNavigation.IdUsuarioNavigation).Include(x => x.IdMedicoNavigation.IdEspecialidadeNavigation).Include(y => y.IdPacienteNavigation).Include(z => z.IdStatusNavigation).Where(x => x.IdPaciente == pacienteBuscado.Id).ToList();
            }
        }
    }
}
