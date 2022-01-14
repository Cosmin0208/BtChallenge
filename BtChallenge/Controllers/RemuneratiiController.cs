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
    public class RemuneratiiController : ControllerBase
    {
        private BTDbContext Context { get; }
        private IRepository<Remuneratii> RepoRemuneratii { get; }

        public RemuneratiiController(BTDbContext context, IRepository<Remuneratii> repoRemuneratii)
        {
            Context = context;
            RepoRemuneratii = repoRemuneratii;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RemuneratieDto>>> Get()
        {
            var remuneratiiList = await Context.Remuneratii.Include(x => x.Produs).ToListAsync();
            return remuneratiiList.Select(x => new RemuneratieDto
            {
                RemuneratieId = x.RemuneratieId,
                ProdusId = x.ProdusId,
                NumeProdus = x.Produs.NumeProdus,
                An = x.An,
                Luna = x.Luna,
                Remuneratie = x.Remuneratie
            }).ToArray();
        }

        [HttpPost]
        public ActionResult SaveRemuneratie(Remuneratii vanzare)
        {
            RepoRemuneratii.Insert(vanzare);
            return Ok("Salvat!");
        }

        [HttpPut]
        public ActionResult<Remuneratii> UpdateRemuneratie(Remuneratii produs)
        {
            RepoRemuneratii.Update(produs);
            return Ok("Modificat!");
        }

        [HttpDelete("{id:int}")]
        public ActionResult DeleteRemuneratie(int id)
        {
            Context.Remuneratii.Remove(Context.Remuneratii.Find(id));
            Context.SaveChanges();
            return Ok("Sters!");
        }
    }
}
