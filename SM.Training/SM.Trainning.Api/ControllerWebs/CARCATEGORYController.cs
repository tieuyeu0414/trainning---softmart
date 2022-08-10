using Microsoft.AspNetCore.Mvc;
using SM.Training.BookingCar.Biz;
using SM.Training.SharedComponent.Entities;
using System.Collections.Generic;

namespace SM.Trainning.Api.ControllerWebs
{
    [Route("api/v1/CarCategory")]
    public class CARCATEGORYController : Controller
    {
        //get all CarCategory
        [HttpPost]
        [Route("")]
        public CARCATEGORYDTO GetAllCARCATEGORY([FromBody] CARCATEGORYDTO dtoRequest)
        {
            CARCATEGORYBiz biz = new CARCATEGORYBiz();
            CARCATEGORYDTO dtoResponse = new CARCATEGORYDTO();
            var _getAll = biz.GetAllCARCATEGORY((int)dtoRequest.pageIndex, (int)dtoRequest.pageSize);
            dtoResponse.CARCATEGORYs = _getAll.CarCategorys;
            return dtoResponse;
        }


        //get by id CarCategory
        [HttpPost]
        [Route("get-by-id")]
        public CARCATEGORYDTO GetByIdCARCATEGORY([FromBody] CARCATEGORYDTO dtoRequest)
        {
            CARCATEGORYBiz biz = new CARCATEGORYBiz();
            CARCATEGORYDTO dtoResponse = new CARCATEGORYDTO();
            var _getById = biz.GetByIdCARCATEGORY((int)dtoRequest.id);
            dtoResponse.CARCATEGORY = _getById.CarCategory;
            return dtoResponse;
        }


        //insert CarCategory
        [HttpPost]
        [Route("insert")]
        public CARCATEGORYDTO InsertCARCATEGORY([FromBody] CARCATEGORYDTO dtoRequest)
        {
            CARCATEGORYBiz biz = new CARCATEGORYBiz();
            CARCATEGORYDTO dtoResponse = new CARCATEGORYDTO();
            var item = dtoRequest.CARCATEGORY.CloneToInsert();
            var _insert = biz.InsertCARCATEGORY(item);
            dtoResponse.number = _insert.itemData;
            return dtoRequest;
        }


        //update CarCategory
        [HttpPost]
        [Route("update")]
        public CARCATEGORYDTO UpdateCARCATEGORY([FromBody] CARCATEGORYDTO dtoRequest)
        {
            CARCATEGORYBiz biz = new CARCATEGORYBiz();
            CARCATEGORYDTO dtoResponse = new CARCATEGORYDTO();
            var item = dtoRequest.CARCATEGORY.CloneToUpdate();
            var _update = biz.UpdateCARCATEGORY(item);
            dtoResponse.number = _update.itemData;
            return dtoResponse;
        }


        //delete CarCategory
        [HttpPost]
        [Route("delete")]
        public CARCATEGORYDTO DeleteCARCATEGORY([FromBody] CARCATEGORYDTO dtoRequest)
        {
            CARCATEGORYBiz biz = new CARCATEGORYBiz();
            CARCATEGORYDTO dtoResponse = new CARCATEGORYDTO();
            var _delete = biz.DeleteCARCATEGORY((int)dtoRequest.id);
            dtoResponse.number = _delete.itemData;
            return dtoResponse;
            
        }


        //get all CarCategory - select
        [HttpPost]
        [Route("list-select")]
        public CARCATEGORYDTO GetAllSelectCARCATEGORY()
        {
            CARCATEGORYBiz biz = new CARCATEGORYBiz();
            CARCATEGORYDTO dtoResponse = new CARCATEGORYDTO();
            var _getById = biz.GetAllSelectCARCATEGORY();
            dtoResponse.CARCATEGORYs = _getById.CarCategorys;
            return dtoResponse;
        }
    }

    public class CARCATEGORYDTO
    {
        public List<CARCATEGORY> CARCATEGORYs { get; set; }
        public CARCATEGORY CARCATEGORY { get; set; }
        public int? number { get; set; }
        public int? id { get; set; }
        public int? pageIndex { get; set; }
        public int? pageSize { get; set; }
    }
}
