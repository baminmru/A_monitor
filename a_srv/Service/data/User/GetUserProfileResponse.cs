using a_srv.models;
using System;
using System.Collections.Generic;
using System.Text;

namespace a_srv.Services.Users.Data
{
    public class GetUserProfileRequest
    {
        public Guid Id { get; set; }
    }
    public class GetUserProfileResponse
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Phone { get; set; }
        public Guid? OrganizationId { get; set; }



        public string FullName
        {
            get
            {
                return $"{FirstName} {MiddleName} {LastName}";
            }
        }
        public Guid LoginId { get; set; }


        public GetUserProfileResponse()
        {

        }

        public GetUserProfileResponse(MON_USR user)
        {
            Id = user.MON_USRId ;
            FirstName = user.name;
            MiddleName = user.surname ;
            LastName = user.lastname;
            Phone = user.thephone ;
            LoginId = new Guid(user.login) ;
            OrganizationId = user.theClient ;
           
        }
    }

}
