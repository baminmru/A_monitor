using System;
using System.Collections.Generic;
using System.Text;
using NLog;

namespace STKService
{
    static class Program
    {

        private static Logger logger = LogManager.GetCurrentClassLogger();
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        static void Main(string[] args)
        {

            // The Length property provides the number of array elements
            logger.Info("parameter count = {0}", args.Length);
            Guid DevID = Guid.Empty;
            bool NextD=false ;
            for (int i = 0; i < args.Length; i++)
            {
                logger.Info("Arg[{0}] = [{1}]", i, args[i]);
                if (NextD==true){
                    NextD=false;
                    DevID = new Guid(args[i]);
                }

                if (args[i].ToLower() == "-d")
                {
                    NextD = true;
                }
            }

            if (DevID == Guid.Empty)
            {
                logger.Info("Just exit");
                return;
            }

            logger.Info("Start Device processor");
            DeviceProcessor Srv = new DeviceProcessor();
            Srv.DivID = DevID;
            Srv.Run();
            Srv = null; 
        }
    }
}