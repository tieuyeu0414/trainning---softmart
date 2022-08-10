using Microsoft.AspNetCore.Mvc;
using SM.Training.BookingCar.Biz;
using SM.Training.SharedComponent.Entities;
using System.Collections.Generic;

namespace SM.Trainning.Api.ControllerWebs
{
    [Route("api/v1/Car")]
    public class CARController : Controller
    {


        //get all CarCategory
        [HttpPost]
        [Route("")]
        public CARDTO GetAllCAR([FromBody] CARDTO dtoRequest)
        {
            CARBiz biz = new CARBiz();
            CARDTO dtoResponse = new CARDTO();
            var _getAll = biz.GetAllCAR((int)dtoRequest.pageIndex, (int)dtoRequest.pageSize);
            dtoResponse.CARs = _getAll.cars;
            return dtoResponse;
        }


        //get by id CarCategory
        [HttpPost]
        [Route("get-by-id")]
        public CARDTO GetByIdCAR([FromBody] CARDTO dtoRequest)
        {
            CARBiz biz = new CARBiz();
            CARDTO dtoResponse = new CARDTO();
            var _getById = biz.GetByIdCAR((int)dtoRequest.id);
            dtoResponse.CAR = _getById.car;
            return dtoResponse;
        }


        //insert CarCategory
        [HttpPost]
        [Route("insert")]
        public CARDTO InsertCAR([FromBody] CARDTO dtoRequest)
        {
            CARBiz biz = new CARBiz();
            CARDTO dtoResponse = new CARDTO();
            var item = dtoRequest.CAR.CloneToInsert();
            var _insert = biz.InsertCAR(item);
            dtoResponse.number = _insert.itemData;
            return dtoResponse;
        }


        //update CarCategory
        [HttpPost]
        [Route("update")]
        public CARDTO UpdateCAR([FromBody] CARDTO dtoRequest)
        {
            CARBiz biz = new CARBiz();
            CARDTO dtoResponse = new CARDTO();
            var item = dtoRequest.CAR.CloneToUpdate();
            var _update = biz.UpdateCAR(item);
            dtoResponse.number = _update.itemData;
            return dtoResponse;
           
        }


        //delete CarCategory
        [HttpPost]
        [Route("delete")]
        public CARDTO DeleteCAR([FromBody] CARDTO dtoRequest)
        {
            CARBiz biz = new CARBiz();
            CARDTO dtoResponse = new CARDTO();
            var _delete = biz.DeleteCAR((int)dtoRequest.id);
            dtoResponse.number = _delete.itemData;
            return dtoResponse;
        }


        //get all Car - select
        [HttpPost]
        [Route("list-select")]  
        public CARDTO GetAllSelectCAR([FromBody] CARDTO dtoRequest)
        {
            CARBiz biz = new CARBiz();
            CARDTO dtoResponse = new CARDTO();
            var _getListSelect = biz.GetAllSelectCAR((int)dtoRequest.id_Category);
            dtoResponse.CARs = _getListSelect.cars;
            return dtoResponse;
        }


        //search list id Car - select
        [HttpPost]
        [Route("search-listID")]
        public CARDTO SearchIdCAR([FromBody] CARDTO dtoRequest)
        {
            CARBiz biz = new CARBiz();
            CARDTO dtoResponse = new CARDTO();
            var _getListID = biz.SearchIdCAR(dtoRequest.listID);
            dtoResponse.CARs = _getListID.cars;
            return dtoResponse;
        }
    }

    public class CARDTO
    {
        public CAR CAR { get; set; }
        public List<CAR> CARs { get; set; }
        public int? number { get; set; }
        public int? id { get; set; }
        public int? pageIndex { get; set; }
        public int? pageSize { get; set; }
        public int? id_Category { get; set; }
        public List<int> listID { get; set; }
    }
}
