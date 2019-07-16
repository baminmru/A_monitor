using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using a_srv.models;
using a_srv.Data;
using System.IO;
using Newtonsoft.Json;

namespace a_srv.Service
{
    public class LoraInputService
    {
        private readonly MyContext _context;

        public LoraInputService(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
           
        }


        public async Task<string> SavePacket(LoraPacket packet)
        {
            //packet.endDevice.devAddr

            LoraInput li = new LoraInput();
            if (packet != null)
            {
                if (!LoraInputExists(packet.id))
                {
                    li.id = packet.id;
                    li.recvTime = UnixTimeStampToDateTime(packet.recvTime);
                    li.fCntUp = packet.fCntUp.Value;
                    li.fCntDoun = packet.fCntDown.Value;
                    li.payload = packet.payload;
                    li.devEui = packet.endDevice.devEui;


                    _context.LoraInput.Add(li);
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (System.Exception ex)
                    {
                        return ex.Message;
                    }


                    return "Packet: " + packet.id + " saved";
                }
                else
                {
                    return "Packet: " + packet.id + " already received.";
                }
            }
            else
            {
                return "packet is null";
            }

        }


        private bool LoraInputExists(string id)
        {
            return _context.LoraInput.Any(e => e.id == id);
        }

        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddMilliseconds(unixTimeStamp).ToLocalTime();
            return dtDateTime;
        }
    }
}
