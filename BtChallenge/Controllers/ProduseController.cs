using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using BtDataAcces.Generic;
using BtEntityFramework.Entities;

namespace BtApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProduseController : ControllerBase
    {
        private IRepository<Produse> RepoProduse { get; }

        public ProduseController(IRepository<Produse> repoProduse)
        {
            RepoProduse = repoProduse;
        }

        [HttpGet]
        public async Task<IEnumerable<Produse>> Get()
        {
            var prodList = RepoProduse.GetAll();
            
            return await Task.FromResult(prodList);
        }

        [HttpPost]
        public ActionResult SaveProdus(Produse produs)
        {
            RepoProduse.Insert(produs);
            return Ok("Salvat!");
        }

        [HttpPut]
        public ActionResult<Persoane> UpdateProdus(Produse produs)
        {
            RepoProduse.Update(produs);
            return Ok("Modificat!");
        }

        [HttpDelete("{id:int}")]
        public ActionResult<Persoane> DeleteProdus(int id)
        {
            RepoProduse.Delete(RepoProduse.Get(id));
            return Ok("Sters!");
        }
    }
}
