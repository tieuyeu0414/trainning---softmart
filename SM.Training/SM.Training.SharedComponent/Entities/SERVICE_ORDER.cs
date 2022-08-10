using SoftMart.Core.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.Training.SharedComponent.Entities
{

    public class SERVICE_ORDER : BaseEntity
    {
        #region Primitive members

        public const string C_ORDER_ID = "ORDER_ID"; // 
        private int? _ORDER_ID;
        [PropertyEntity(C_ORDER_ID, true)]
        public int? ORDER_ID
        {
            get { return _ORDER_ID; }
            set { _ORDER_ID = value; NotifyPropertyChanged(C_ORDER_ID); }
        }

        public const string C_CAR_ID = "CAR_ID"; // 
        private int? _CAR_ID;
        [PropertyEntity(C_CAR_ID, false)]
        public int? CAR_ID
        {
            get { return _CAR_ID; }
            set { _CAR_ID = value; NotifyPropertyChanged(C_CAR_ID); }
        }

        public const string C_TIME_CATEGORY = "TIME_CATEGORY"; // 
        private int? _TIME_CATEGORY;
        [PropertyEntity(C_TIME_CATEGORY, false)]
        public int? TIME_CATEGORY
        {
            get { return _TIME_CATEGORY; }
            set { _TIME_CATEGORY = value; NotifyPropertyChanged(C_TIME_CATEGORY); }
        }

        public const string C_ORDER_DURATION = "ORDER_DURATION"; // 
        private int? _ORDER_DURATION;
        [PropertyEntity(C_ORDER_DURATION, false)]
        public int? ORDER_DURATION
        {
            get { return _ORDER_DURATION; }
            set { _ORDER_DURATION = value; NotifyPropertyChanged(C_ORDER_DURATION); }
        }

        public const string C_PLANSTART_DTG = "PLANSTART_DTG"; // 
        private DateTime? _PLANSTART_DTG;
        [PropertyEntity(C_PLANSTART_DTG, false)]
        public DateTime? PLANSTART_DTG
        {
            get { return _PLANSTART_DTG; }
            set { _PLANSTART_DTG = value; NotifyPropertyChanged(C_PLANSTART_DTG); }
        }

        public const string C_PLANEND_DTG = "PLANEND_DTG"; // 
        private DateTime? _PLANEND_DTG;
        [PropertyEntity(C_PLANEND_DTG, false)]
        public DateTime? PLANEND_DTG
        {
            get { return _PLANEND_DTG; }
            set { _PLANEND_DTG = value; NotifyPropertyChanged(C_PLANEND_DTG); }
        }

        public const string C_ACTUALSTART_DTG = "ACTUALSTART_DTG"; // 
        private DateTime? _ACTUALSTART_DTG;
        [PropertyEntity(C_ACTUALSTART_DTG, false)]
        public DateTime? ACTUALSTART_DTG
        {
            get { return _ACTUALSTART_DTG; }
            set { _ACTUALSTART_DTG = value; NotifyPropertyChanged(C_ACTUALSTART_DTG); }
        }

        public const string C_ACTUALEND_DTG = "ACTUALEND_DTG"; // 
        private DateTime? _ACTUALEND_DTG;
        [PropertyEntity(C_ACTUALEND_DTG, false)]
        public DateTime? ACTUALEND_DTG
        {
            get { return _ACTUALEND_DTG; }
            set { _ACTUALEND_DTG = value; NotifyPropertyChanged(C_ACTUALEND_DTG); }
        }

        public const string C_CUSTOMER_NAME = "CUSTOMER_NAME"; // 
        private string _CUSTOMER_NAME;
        [PropertyEntity(C_CUSTOMER_NAME, false)]
        public string CUSTOMER_NAME
        {
            get { return _CUSTOMER_NAME; }
            set { _CUSTOMER_NAME = value; NotifyPropertyChanged(C_CUSTOMER_NAME); }
        }

        public const string C_DESCRIPTION = "DESCRIPTION"; // 
        private string _DESCRIPTION;
        [PropertyEntity(C_DESCRIPTION, false)]
        public string DESCRIPTION
        {
            get { return _DESCRIPTION; }
            set { _DESCRIPTION = value; NotifyPropertyChanged(C_DESCRIPTION); }
        }

        public const string C_STATUS = "STATUS"; // 
        private int? _STATUS;
        [PropertyEntity(C_STATUS, false)]
        public int? STATUS
        {
            get { return _STATUS; }
            set { _STATUS = value; NotifyPropertyChanged(C_STATUS); }
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
        
        public SERVICE_ORDER() : base("SERVICE_ORDER", "ORDER_ID", C_DELETED, C_VERSION) { }

        #endregion

        #region Extend members

        //[PropertyEntity("LIST_ID", false, false)]
        public List<int> LIST_ID { get; set; }

        public int CARCATEGORY_ID { get; set; }

        [PropertyEntity("NAME_CAR", false, false)]
        public string NAME_CAR { get; set; }

        [PropertyEntity("NAME_TIMECATEGORY", false, false)]
        public string NAME_TIMECATEGORY { get; set; }

        #endregion

        #region Clone

        public SERVICE_ORDER CloneToInsert()
        {
            SERVICE_ORDER newItem = new SERVICE_ORDER();

            newItem.LIST_ID = this.LIST_ID;

            newItem.ORDER_ID = this.ORDER_ID;
            newItem.CAR_ID = this.CAR_ID;
            newItem.TIME_CATEGORY = this.TIME_CATEGORY;
            newItem.ORDER_DURATION = this.ORDER_DURATION;
            newItem.PLANSTART_DTG = this.PLANSTART_DTG;
            newItem.PLANEND_DTG = this.PLANEND_DTG;
            newItem.ACTUALSTART_DTG = this.ACTUALSTART_DTG;
            newItem.ACTUALEND_DTG = this.ACTUALEND_DTG;
            newItem.CUSTOMER_NAME = this.CUSTOMER_NAME;
            newItem.DESCRIPTION = this.DESCRIPTION;

            return newItem;
        }

        public SERVICE_ORDER CloneToUpdate()
        {
            SERVICE_ORDER newItem = new SERVICE_ORDER();

            newItem.LIST_ID = this.LIST_ID;

            newItem.ORDER_ID = this.ORDER_ID;
            newItem.CAR_ID = this.CAR_ID;
            newItem.TIME_CATEGORY = this.TIME_CATEGORY;
            newItem.ORDER_DURATION = this.ORDER_DURATION;
            newItem.PLANSTART_DTG = this.PLANSTART_DTG;
            newItem.PLANEND_DTG = this.PLANEND_DTG;
            newItem.ACTUALSTART_DTG = this.ACTUALSTART_DTG;
            newItem.ACTUALEND_DTG = this.ACTUALEND_DTG;
            newItem.CUSTOMER_NAME = this.CUSTOMER_NAME;
            newItem.DESCRIPTION = this.DESCRIPTION;

            return newItem;
        }

        #endregion
    }

}
