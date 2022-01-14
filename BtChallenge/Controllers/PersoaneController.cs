using BtDataAcces.Generic;
using BtEntityFramework.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BtApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersoaneController : ControllerBase
    {
        private IRepository<Persoane> RepoPersoane { get; }

        public PersoaneController(IRepository<Persoane> repoPersoane)
        {
            RepoPersoane = repoPersoane;
        }

        [HttpGet]
        public async Task<IEnumerable<Persoane>> Get()
        {
            var prodList = RepoPersoane.GetAll();
            return await Task.FromResult(prodList);
        }

        [HttpPost]
        public ActionResult SavePersoana(Persoane persoana)
        {
            RepoPersoane.Insert(persoana);
            return Ok("Salvat!");
        }

        [HttpPut]
        public ActionResult<Persoane> UpdatePersoana(Persoane persoana)
        {
            RepoPersoane.Update(persoana);
            return Ok("Modificat!");
        }

        [HttpDelete("{id:int}")]
        public ActionResult<Persoane> DeletePersoana(int id)
        {
            RepoPersoane.Delete(RepoPersoane.Get(id));
            return Ok("Sters!");
        }
    }
}
