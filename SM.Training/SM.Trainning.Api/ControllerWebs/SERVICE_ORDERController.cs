using Microsoft.AspNetCore.Mvc;
using SM.Training.BookingCar.Biz;
using SM.Training.SharedComponent.Entities;
using System.Collections.Generic;

namespace SM.Trainning.Api.ControllerWebs
{
    [Route("api/v1/ServiceOrder")]
    public class SERVICE_ORDERController: Controller
    {
        //get all Service_Order
        [HttpPost]
        [Route("")]
        public SERVICE_ORDERDTO GetAllSERVICE_ORDER([FromBody] SERVICE_ORDERDTO dtoRequest)
        {
            SERVICE_ORDERBiz biz = new SERVICE_ORDERBiz();
            SERVICE_ORDERDTO dtoResponse = new SERVICE_ORDERDTO();
            var _getAll = biz.GetAllSERVICE_ORDER((int)dtoRequest.pageIndex, (int)dtoRequest.pageSize, dtoRequest.SERVICE_ORDER);
            dtoResponse.SERVICE_ORDERs = _getAll.orders;
            return dtoResponse;
        }


        //insert Service_Order
        [HttpPost]
        [Route("insert")]
        public SERVICE_ORDERDTO InsertSERVICE_ORDER([FromBody] SERVICE_ORDERDTO request)
        {
            SERVICE_ORDERBiz biz = new SERVICE_ORDERBiz();
            SERVICE_ORDERDTO dtoResponse = new SERVICE_ORDERDTO();
            var item = request.SERVICE_ORDER.CloneToInsert();
            var _insert = biz.InsertSERVICE_ORDER(item);
            dtoResponse.number = _insert.itemData;
            return dtoResponse;
        }
        //update status Service_Order
        [HttpPost]
        [Route("update-status")]
        public SERVICE_ORDERDTO UpdateStatusSERVICE_ORDER([FromBody] SERVICE_ORDERDTO request)
        {
            SERVICE_ORDERBiz biz = new SERVICE_ORDERBiz();
            SERVICE_ORDERDTO dtoResponse = new SERVICE_ORDERDTO();
            var _updateStatus = biz.UpdateStatusSERVICE_ORDER(request.SERVICE_ORDER, request.type);
            dtoResponse.number = _updateStatus.itemData;
            return dtoResponse;
        }


        //update time Service_Order
        [HttpPost]
        [Route("update-time")]
        public SERVICE_ORDERDTO UpdateTimeSERVICE_ORDER([FromBody] SERVICE_ORDERDTO request)
        {
            SERVICE_ORDERBiz biz = new SERVICE_ORDERBiz();
            SERVICE_ORDERDTO dtoResponse = new SERVICE_ORDERDTO();
            var _updateStatus = biz.UpdateTimeSERVICE_ORDER(request.SERVICE_ORDER);
            dtoResponse.number = _updateStatus.itemData;
            return dtoResponse;
        }


        //delete Service_Order
        [HttpPost]
        [Route("delete")]
        public SERVICE_ORDERDTO DeleteSERVICE_ORDER([FromBody] SERVICE_ORDERDTO request)
        {
            SERVICE_ORDERBiz biz = new SERVICE_ORDERBiz();
            SERVICE_ORDERDTO dtoResponse = new SERVICE_ORDERDTO();
            var _updateStatus = biz.DeleteSERVICE_ORDER((int)request.id);
            dtoResponse.number = _updateStatus.itemData;
            return dtoResponse;
        }
    }

    public class SERVICE_ORDERDTO
    {
        public SERVICE_ORDER SERVICE_ORDER { get; set; }
        public List<SERVICE_ORDER> SERVICE_ORDERs { get; set; }
        public int? number { get; set; }
        public int? pageIndex { get; set; }
        public int? pageSize { get; set; }
        public int? id { get; set; }
        public string type { get; set; }
    }
}
