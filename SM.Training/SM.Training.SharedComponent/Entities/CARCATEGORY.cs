using SoftMart.Core.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.Training.SharedComponent.Entities
{
    public class CARCATEGORY : BaseEntity
    {
        #region Primitive members

        public const string C_CARCATEGORY_ID = "CARCATEGORY_ID"; // 
        private int? _CARCATEGORY_ID;
        [PropertyEntity(C_CARCATEGORY_ID, true)]
        public int? CARCATEGORY_ID
        {
            get { return _CARCATEGORY_ID; }
            set { _CARCATEGORY_ID = value; NotifyPropertyChanged(C_CARCATEGORY_ID); }
        }

        public const string C_NAME = "NAME"; // 
        private string _NAME;
        [PropertyEntity(C_NAME, false)]
        public string NAME
        {
            get { return _NAME; }
            set { _NAME = value; NotifyPropertyChanged(C_NAME); }
        }

        public const string C_DESCRIPTION = "DESCRIPTION"; // 
        private string _DESCRIPTION;
        [PropertyEntity(C_DESCRIPTION, false)]
        public string DESCRIPTION
        {
            get { return _DESCRIPTION; }
            set { _DESCRIPTION = value; NotifyPropertyChanged(C_DESCRIPTION); }
        }

        public const string C_DELETED = "DELETED"; // 
        private int? _DELETED;
        [PropertyEntity(C_DELETED, false)]
        public int? DELETED
        {
            get { return _DELETED; }
            set { _DELETED = value; NotifyPropertyChanged(C_DELETED); }
        }

        public const string C_VERSION = "VERSION"; // 
        private int? _VERSION;
        [PropertyEntity(C_VERSION, false)]
        public int? VERSION
        {
            get { return _VERSION; }
            set { _VERSION = value; NotifyPropertyChanged(C_VERSION); }
        }

        public const string C_CREATEDBY = "CREATEDBY"; // 
        private string _CREATEDBY;
        [PropertyEntity(C_CREATEDBY, false)]
        public string CREATEDBY
        {
            get { return _CREATEDBY; }
            set { _CREATEDBY = value; NotifyPropertyChanged(C_CREATEDBY); }
        }

        public const string C_CREATEDDTG = "CREATEDDTG"; // 
        private DateTime? _CREATEDDTG;
        [PropertyEntity(C_CREATEDDTG, false)]
        public DateTime? CREATEDDTG
        {
            get { return _CREATEDDTG; }
            set { _CREATEDDTG = value; NotifyPropertyChanged(C_CREATEDDTG); }
        }

        public const string C_UPDATEDBY = "UPDATEDBY"; // 
        private string _UPDATEDBY;
        [PropertyEntity(C_UPDATEDBY, false)]
        public string UPDATEDBY
        {
            get { return _UPDATEDBY; }
            set { _UPDATEDBY = value; NotifyPropertyChanged(C_UPDATEDBY); }
        }

        public const string C_UPDATEDDTG = "UPDATEDDTG"; // 
        private DateTime? _UPDATEDDTG;
        [PropertyEntity(C_UPDATEDDTG, false)]
        public DateTime? UPDATEDDTG
        {
            get { return _UPDATEDDTG; }
            set { _UPDATEDDTG = value; NotifyPropertyChanged(C_UPDATEDDTG); }
        }


        public CARCATEGORY() : base("CARCATEGORY", "CARCATEGORY_ID", C_DELETED, C_VERSION) { }

        #endregion

        #region Extend members

        #endregion

        #region Clone

        public CARCATEGORY CloneToInsert()
        {
            CARCATEGORY newItem = new CARCATEGORY();

            newItem.CARCATEGORY_ID = this.CARCATEGORY_ID;
            newItem.NAME = this.NAME;
            newItem.DESCRIPTION = this.DESCRIPTION;

            return newItem;
        }

        public CARCATEGORY CloneToUpdate()
        {
            CARCATEGORY newItem = new CARCATEGORY();

            newItem.CARCATEGORY_ID = this.CARCATEGORY_ID;
            newItem.NAME = this.NAME;
            newItem.DESCRIPTION = this.DESCRIPTION;

            return newItem;
        }

        #endregion
    }
}
