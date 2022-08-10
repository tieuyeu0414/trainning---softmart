using Microsoft.AspNetCore.Mvc;
using SM.Training.BookingCar.Biz;
using SM.Training.SharedComponent.Entities;
using System.Collections.Generic;

namespace SM.Trainning.Api.ControllerWebs
{
    [Route("api/v1/TimeCategory")]
    public class TIMECATEGORYController: Controller
    {
        //get all TimeCategory
        [HttpPost]
        [Route("")]
        public TIMECATEGORYDTO GetAllCAR([FromBody] TIMECATEGORYDTO dtoRequest)
        {
            TIMECATEGORYBiz biz = new TIMECATEGORYBiz();
            TIMECATEGORYDTO dtoResponse = new TIMECATEGORYDTO();
            var _getAll = biz.GetAllTIMECATEGORY((int)dtoRequest.pageIndex, (int)dtoRequest.pageSize);
            dtoResponse.TIMECATEGORies = _getAll.timeCategories;
            return dtoResponse;
        }


        //get by id TimeCategory
        [HttpPost]
        [Route("get-by-id")]
        public TIMECATEGORYDTO GetByIdTIMECATEGORY([FromBody] TIMECATEGORYDTO dtoRequest)
        {
            TIMECATEGORYBiz biz = new TIMECATEGORYBiz();
            TIMECATEGORYDTO dtoResponse = new TIMECATEGORYDTO();
            var _getById = biz.GetByIdTIMECATEGORY((int)dtoRequest.id);
            dtoResponse.TIMECATEGORY = _getById.timeCategory;
            return dtoResponse;
        }


        //insert TimeCategory
        [HttpPost]
        [Route("insert")]
        public TIMECATEGORYDTO InsertTIMECATEGORY([FromBody] TIMECATEGORYDTO dtoRequest)
        {
            TIMECATEGORYBiz biz = new TIMECATEGORYBiz();
            TIMECATEGORYDTO dtoResponse = new TIMECATEGORYDTO();
            var item = dtoRequest.TIMECATEGORY.CloneToInsert(); ;
            var _insert = biz.InsertTIMECATEGORY(item);
            dtoResponse.number = _insert.itemData;
            return dtoResponse;
        }


        //update TimeCategory
        [HttpPost]
        [Route("update")]
        public TIMECATEGORYDTO UpdateTIMECATEGORY([FromBody] TIMECATEGORYDTO dtoRequest)
        {

            TIMECATEGORYBiz biz = new TIMECATEGORYBiz();
            TIMECATEGORYDTO dtoResponse = new TIMECATEGORYDTO();
            var item = dtoRequest.TIMECATEGORY.CloneToUpdate();
            var _update = biz.UpdateTIMECATEGORY(item);
            dtoResponse.number = _update.itemData;
            return dtoResponse;
        }


        //delete TimeCategory
        [HttpPost]
        [Route("delete")]
        public TIMECATEGORYDTO DeleteCAR([FromBody] TIMECATEGORYDTO dtoRequest)
        {

            TIMECATEGORYBiz biz = new TIMECATEGORYBiz();
            TIMECATEGORYDTO dtoResponse = new TIMECATEGORYDTO();
            var _delete = biz.DeleteTIMECATEGORY((int)dtoRequest.id);
            dtoResponse.number = _delete.itemData;
            return dtoResponse;
        }


        //get all TimeCategory - select
        [HttpPost]
        [Route("list-select")]
        public TIMECATEGORYDTO GetAllSelectTIMECATEGORY()
        {
            TIMECATEGORYBiz biz = new TIMECATEGORYBiz();
            TIMECATEGORYDTO dtoResponse = new TIMECATEGORYDTO();
            var _getListSelect = biz.GetAllSelectTIMECATEGORY();
            dtoResponse.TIMECATEGORies = _getListSelect.timeCategories;
            return dtoResponse;
        }
    }

    public class TIMECATEGORYDTO
    {
        public TIMECATEGORY TIMECATEGORY { get; set; }
        public List<TIMECATEGORY> TIMECATEGORies { get; set; }
        public int? number { get; set; }
        public int? id { get; set; }
        public int? pageIndex { get; set; }
        public int? pageSize { get; set; }
    }
}
