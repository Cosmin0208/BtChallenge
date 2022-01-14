using BtEntityFramework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Linq;

namespace BtApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SituatieVanzariController : ControllerBase
    {
        private BTDbContext Context { get; }

        public SituatieVanzariController(BTDbContext context)
        {
            Context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<object>> Get()
        {
            DataTable dataTable = new DataTable();
            string sql = @"declare @columns nvarchar(max) = '', 
                                   @sql nvarchar(max) = '',
                                   @selectColumns nvarchar(max) = '';

                            select @columns += quotename(NumePersoana) + ',',@selectColumns  += 'isnull([' + NumePersoana + '],0) as '+quotename(NumePersoana) +','
                            from(select distinct NumePersoana
	                             from BTDb..Vanzari v
	                             join BtDb..Persoane p on v.PersoanaId = p.PersoanaId) t

                            set @columns = left(@columns, len(@columns) - 1);
							set @selectColumns = left(@selectColumns, len(@selectColumns) - 1)
						
                            set @sql = 'select [NumeProdus] as[Produs],'+ @selectColumns +' 
										from (
			                            select [NumeProdus],[NumePersoana],isnull(NrProduse * Remuneratie,0) as [Suma]
			                            from BTDb..Vanzari v
			                            join BTDb..Persoane pers on v.PersoanaId = pers.PersoanaId
			                            join BtDb..Produse p on v.ProdusId = p.ProdusId
			                            join BtDb..Remuneratii r on p.ProdusId = r.ProdusId) t
			                            pivot 
			                            (
			                              sum([Suma])
			                              for [NumePersoana]
			                              in ('+ @columns +')
			                            ) as Result;';
                            execute sp_executesql @sql;";
            using (var command = Context.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = sql;
                Context.Database.OpenConnection();
                using var result = command.ExecuteReader();
                dataTable.Load(result);
            }
            return DataTableToObject(dataTable).ToArray();
        }

        private static IEnumerable<dynamic> DataTableToObject(DataTable dt)
        {
            foreach (DataRow dr in dt.Rows)
            {
                dynamic dinamico = new ExpandoObject();
                foreach (DataColumn dc in dt.Columns)
                    ((IDictionary<string, object>)dinamico)[dc.ColumnName] = dr[dc];
                yield return dinamico;
            }
        }
    }
}
