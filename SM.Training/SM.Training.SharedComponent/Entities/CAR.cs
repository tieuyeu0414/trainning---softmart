using SoftMart.Core.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.Training.SharedComponent.Entities
{
    public class CAR : BaseEntity
    {
        #region Primitive members

        public const string C_CAR_ID = "CAR_ID"; // 
        private int? _CAR_ID;
        [PropertyEntity(C_CAR_ID, true)]
        public int? CAR_ID
        {
            get { return _CAR_ID; }
            set { _CAR_ID = value; NotifyPropertyChanged(C_CAR_ID); }
        }

        public const string C_CATEGORY_ID = "CATEGORY_ID"; // 
        private int? _CATEGORY_ID;
        [PropertyEntity(C_CATEGORY_ID, false)]
        public int? CATEGORY_ID
        {
            get { return _CATEGORY_ID; }
            set { _CATEGORY_ID = value; NotifyPropertyChanged(C_CATEGORY_ID); }
        }

        public const string C_COLOR = "COLOR"; // 
        private string _COLOR;
        [PropertyEntity(C_COLOR, false)]
        public string COLOR
        {
            get { return _COLOR; }
            set { _COLOR = value; NotifyPropertyChanged(C_COLOR); }
        }

        public const string C_DESCRIPTION = "DESCRIPTION"; // 
        private string _DESCRIPTION;
        [PropertyEntity(C_DESCRIPTION, false)]
        public string DESCRIPTION
        {
            get { return _DESCRIPTION; }
            set { _DESCRIPTION = value; NotifyPropertyChanged(C_DESCRIPTION); }
        }

        public const string C_PLATE_NUMBER = "PLATE_NUMBER"; // 
        private string _PLATE_NUMBER;
        [PropertyEntity(C_PLATE_NUMBER, false)]
        public string PLATE_NUMBER
        {
            get { return _PLATE_NUMBER; }
            set { _PLATE_NUMBER = value; NotifyPropertyChanged(C_PLATE_NUMBER); }
        }

        public const string C_PRICE = "PRICE"; // 
        private int? _PRICE;
        [PropertyEntity(C_PRICE, false)]
        public int? PRICE
        {
            get { return _PRICE; }
            set { _PRICE = value; NotifyPropertyChanged(C_PRICE); }
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

        public const string C_NAME = "NAME"; // 
        private string _NAME;
        [PropertyEntity(C_NAME, false)]
        public string NAME
        {
            get { return _NAME; }
            set { _NAME = value; NotifyPropertyChanged(C_NAME); }
        }


        public CAR() : base("CAR", "CAR_ID", C_DELETED, C_VERSION) { }

        #endregion

        #region Extend members
        [PropertyEntity("NAME_CARCATEGORY", false, false)]
        public string NAME_CARCATEGORY { get; set; }

        #endregion

        #region Clone

        public CAR CloneToInsert()
        {
            CAR newItem = new CAR();

            newItem.CAR_ID = this.CAR_ID;
            newItem.CATEGORY_ID = this.CATEGORY_ID;
            newItem.COLOR = this.COLOR;
            newItem.DESCRIPTION = this.DESCRIPTION;
            newItem.PLATE_NUMBER = this.PLATE_NUMBER;
            newItem.PRICE = this.PRICE;
            newItem.NAME = this.NAME;

            return newItem;
        }

        public CAR CloneToUpdate()
        {
            CAR newItem = new CAR();

            newItem.CAR_ID = this.CAR_ID;
            newItem.CATEGORY_ID = this.CATEGORY_ID;
            newItem.COLOR = this.COLOR;
            newItem.DESCRIPTION = this.DESCRIPTION;
            newItem.PLATE_NUMBER = this.PLATE_NUMBER;
            newItem.PRICE = this.PRICE;
            newItem.NAME = this.NAME;

            return newItem;
        }

        #endregion
    }

}
