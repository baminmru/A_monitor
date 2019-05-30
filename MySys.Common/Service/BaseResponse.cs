using System;
using System.Collections.Generic;
using System.Text;

namespace MySys.Common.Service
{
    public class BaseResponseSimple<I>
    {
        public BaseResponseSimple()
        {
            requestId = Guid.NewGuid();
            apiVersion = 1;
            requestDate = DateTimeOffset.Now;
        }

        public int apiVersion { get; set; }
        public DateTimeOffset requestDate { get; set; }
        public Guid requestId { get; set; }
        public I code { get; set; }
        public string message { get; set; }
        public string description { get; set; }

    }

    public class BaseResponse<Y, I> : BaseResponseSimple<I>
    {
        public BaseResponse()
        {
            errors = new List<Y>();
        }
        public List<Y> errors { get; set; }
    }


    public class BaseResponseData<T, Y, I> : BaseResponse<Y, I>
    {
        public BaseResponseData()
        {
            errors = new List<Y>();
        }
        public T data { get; set; }
    }
    public class BaseResponseOnlyData<T, I> : BaseResponseSimple<I>
    {
        public BaseResponseOnlyData()
        {
        }

        public T data { get; set; }
    }

    public class ResponseData<T> : BaseResponseSimple<BaseStatus>
    {
        public ResponseData()
        {
        }

        public T data { get; set; }
    }
}
