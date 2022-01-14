using System.Collections.Generic;

namespace BtEntityFramework.Entities
{
    public partial class Persoane
    {
        public Persoane()
        {
            Vanzari = new HashSet<Vanzari>();
        }

        public int PersoanaId { get; set; }
        public string NumePersoana { get; set; }

        public virtual ICollection<Vanzari> Vanzari { get; set; }
    }
}
