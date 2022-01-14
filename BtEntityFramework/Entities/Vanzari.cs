
namespace BtEntityFramework.Entities
{
    public partial class Vanzari
    {
        public int VanzareId { get; set; }
        public int PersoanaId { get; set; }
        public int ProdusId { get; set; }
        public int An { get; set; }
        public int Luna { get; set; }
        public int NrProduse { get; set; }

        public virtual Persoane Persoana { get; set; }
        public virtual Produse Produs { get; set; }
    }
}
