using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SM.Trainning.Api.ControllerWebs
{
    [AllowAnonymous]
    [Route("api/webs/Sample")]
    public class SampleController : Controller
    {
        [HttpGet]
        [Route("TestConnection")]
        public string Test()
        {
            return "Helloworld";
        }

        [HttpPost]
        [Route("TestPost")]
        public SampleDTO Post([FromBody] SampleDTO dtoRequest)
        {
            var dtoResponse = new SampleDTO();

            //todo: Code
            dtoResponse.Sample_ID = string.Format("Đã nhận request: SampleId = {0}", dtoRequest.Sample_ID);

            return dtoResponse;
        }

        public class SampleDTO
        {
            public string Sample_ID { get; set; }
        }
    }
}
