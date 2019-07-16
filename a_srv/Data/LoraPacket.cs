using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a_srv.Data
{
    

    public class Cluster
    {
        public int? id { get; set; }
    }

    public class EndDevice
    {
        public string devEui { get; set; }
        public string devAddr { get; set; }
        public Cluster cluster { get; set; }
    }

    public class GwInfo
    {
        public string gwEui { get; set; }
        public string rfRegion { get; set; }
        public int? rssi { get; set; }
        public int? rssis { get; set; }
        public int? rssisd { get; set; }
        public int? snr { get; set; }
        public double? latitude { get; set; }
        public double? longitude { get; set; }
        public int? altitude { get; set; }
        public int? channel { get; set; }
        public int? radioId { get; set; }
        public int? fineTimestamp { get; set; }
        public int? antenna { get; set; }
        public int? frequencyOffset { get; set; }
    }

    public class LoraPacket
    {
        public string id { get; set; }
        public EndDevice endDevice { get; set; }
        public int? fPort { get; set; }
        public int? fCntDown { get; set; }
        public int? fCntUp { get; set; }
        public bool? adr { get; set; }
        public bool? confirmed { get; set; }
        public bool? encrypted { get; set; }
        public string payload { get; set; }
        public double recvTime { get; set; }
        public double? ulFrequency { get; set; }
        public string modulation { get; set; }
        public string dataRate { get; set; }
        public string codingRate { get; set; }
        public int? gwCnt { get; set; }
        public List<GwInfo> gwInfo { get; set; }
    }

    /*  
     {
  "id": "5cf6748d969387000123f60c",
  "endDevice": {
    "devEui": "343636365A377C16",
    "devAddr": "0200013B",
    "cluster": {
      "id": 1
    }
  },
  "fPort": 99,
  "fCntDown": 2,
  "fCntUp": 3840,
  "adr": false,
  "confirmed": false,
  "encrypted": false,
  "payload": "006700d1010002",
  "recvTime": 1559655565387,
  "ulFrequency": 868.9,
  "modulation": "LORA",
  "dataRate": "SF12BW125",
  "codingRate": "4/5",
  "gwCnt": 3,
  "gwInfo": [
    {
      "gwEui": "7276FF002E062BDF",
      "rfRegion": "RU864",
      "rssi": -113,
      "rssis": -118,
      "rssisd": 1,
      "snr": -3,
      "latitude": 70.47344,
      "longitude": 68.20353,
      "altitude": 12,
      "channel": 22,
      "radioId": 0,
      "fineTimestamp": 186681336,
      "antenna": 0,
      "frequencyOffset": 8283
    },
    {
      "gwEui": "7276FF002E062C23",
      "rfRegion": "RU864",
      "rssi": -115,
      "rssis": -133,
      "rssisd": 0,
      "snr": -17,
      "latitude": 70.40002,
      "longitude": 68.34522,
      "altitude": 39,
      "channel": 22,
      "radioId": 0,
      "fineTimestamp": 186713996,
      "antenna": 0,
      "frequencyOffset": 8284
    },
    {
      "gwEui": "7276FF002E062BBD",
      "rfRegion": "RU864",
      "rssi": -115,
      "rssis": -124,
      "rssisd": 0,
      "snr": -8,
      "latitude": 70.44229,
      "longitude": 68.1434,
      "altitude": 25,
      "channel": 22,
      "radioId": 0,
      "fineTimestamp": 186684160,
      "antenna": 0,
      "frequencyOffset": 8253
    }
  ]
}
     */
}
