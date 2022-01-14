using BtDataAcces.Dto;
using BtDataAcces.Generic;
using BtEntityFramework;
using BtEntityFramework.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BtApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VanzariController : ControllerBase
    {
        private BTDbContext Context { get; }
        private IRepository<Vanzari> RepoVanzari { get; }

        public VanzariController(BTDbContext context, IRepository<Vanzari> repoVanzari)
        {
            Context = context;
            RepoVanzari = repoVanzari;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VanzareDto>>> Get()
        {
            var vanzariList = await Context.Vanzari.Include(x => x.Produs).Include(x => x.Persoana).ToListAsync();
            var rez = vanzariList.Select(x=> new VanzareDto 
            {
                VanzareId = x.VanzareId,
                ProdusId = x.ProdusId,
                NumeProdus = x.Produs.NumeProdus,
                PersoanaId = x.PersoanaId,
                NumePersoana = x.Persoana.NumePersoana,
                An = x.An,
                Luna = x.Luna,
                NrProduse = x.NrProduse,
            }).ToArray();
            return rez;
        }

        [HttpPost]
        public ActionResult SaveVanzare(Vanzari vanzare)
        {
            RepoVanzari.Insert(vanzare);
            return Ok("Salvat!");
        }

        [HttpPut]
        public ActionResult<Vanzari> UpdateVanzare(Vanzari produs)
        {
            RepoVanzari.Update(produs);
            return Ok("Modificat!");
        }

        [HttpDelete("{id:int}")]
        public ActionResult DeleteVanzare(int id)
        {
            Context.Vanzari.Remove(Context.Vanzari.Find(id));
            Context.SaveChanges();
            return Ok("Modificat!");
        }
    }
}
