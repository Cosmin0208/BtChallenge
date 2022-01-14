using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using BtEntityFramework;
using System.Linq;

namespace BtDataAcces.Generic
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private BTDbContext Context { get; }
        private DbSet<T> Entities { get; }
        
        public Repository(BTDbContext context)
        {
            Context = context;
            Entities = context.Set<T>();
        }
        public IEnumerable<T> GetAll()
        {
            return Entities.AsEnumerable();
        }
        public T Get(int id)
        {
            return Entities.Find(id);
        }
        public void Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            Entities.Add(entity);
            Context.SaveChanges();
        }
        public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            Entities.Update(entity);
            Context.SaveChanges();
        }
        public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            Entities.Remove(entity);
            Context.SaveChanges();
        }
    }
}
