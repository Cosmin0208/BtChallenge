using System.Collections.Generic;

namespace BtEntityFramework.Entities
{
    public partial class Produse
    {
        public Produse()
        {
            Remuneratii = new HashSet<Remuneratii>();
            Vanzari = new HashSet<Vanzari>();
        }

        public int ProdusId { get; set; }
        public string NumeProdus { get; set; }

        public virtual ICollection<Remuneratii> Remuneratii { get; set; }
        public virtual ICollection<Vanzari> Vanzari { get; set; }
    }
}
