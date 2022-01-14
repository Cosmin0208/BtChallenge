
namespace BtEntityFramework.Entities
{
    public partial class Remuneratii
    {
        public int RemuneratieId { get; set; }
        public int ProdusId { get; set; }
        public int An { get; set; }
        public int Luna { get; set; }
        public decimal Remuneratie { get; set; }

        public virtual Produse Produs { get; set; }
    }
}
