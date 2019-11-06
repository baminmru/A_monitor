using System;
using System.Collections.Generic;
using System.Text;

namespace a_srv.models
{
    public class LoraInput
    {
      
        public string id { get; set; }
        public string devEui { get; set; }
        public DateTime recvTime { get; set; }
        public int fCntDoun { get; set; }
        public int fCntUp { get; set; }

        public string payload { get; set; }
        public int processed { get; set; }

    }
}
