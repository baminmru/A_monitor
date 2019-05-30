using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using MySys.Identity.Models;
using MySys.Common.Service ;
using MySys.Common.User;
using a_srv.Services.Users.Data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using a_srv.models;
using a_srv.Services.Data.User;

namespace a_srv.Services.Users
{
    public class UserService
    {
        public MyContext _ctx { get; set; }
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<MyIdentityRole> _roleManager;
        private readonly ILogger _logger;
        //private readonly SignInManager<ApplicationUser> _signInManager;
        //private readonly EmailService _emailService;
        //private readonly ILogger _logger;

        public UserService(MyContext ctx,
            UserManager<ApplicationUser> userManager,
            RoleManager<MyIdentityRole> roleManager,
            //EmailService emailService,
            ILogger<UserService> logger
            )
        {
            _ctx = ctx;
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
            //_emailService = emailService;
            //_logger = logger;
        }

        //public async Task<TokenResponse> ClientLoginAsync(string email, string password, string clientid, string appsecret, string ip, string userAgent, string appVersion)
        //{
        //    try
        //    {
        //        var client = new TokenClient(_settings.TokenEndpoint, clientid, appsecret);
        //        TokenResponse result = null;

        //        if (clientid == _settings.ClientIdPublicOwner)
        //        {
        //            result = await client.RequestResourceOwnerPasswordAsync(email, password, _settings.PublicScope);
        //        }

        //        return result;

        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Fail login", ex);
        //    }
        //}

        public async Task<ResponseData<GetUserProfileResponse>> GetUserProfile(UserToken userToken)
        {
            return await GetUserProfile(userToken, new GetUserProfileRequest
            {
                Id = userToken.Id
            });
        }
        public async Task<ResponseData<GetUserProfileResponse>> GetUserProfile(UserToken userToken, GetUserProfileRequest request)
        {
            try
            {
                var response = new ResponseData<GetUserProfileResponse>();

                var user = await CheckAccess(userToken, request.Id);
                GetUserProfileResponse profile = new GetUserProfileResponse(user);

                if (profile == null)
                    throw new ServiceException("Неправильный пользователь");


                response.code = BaseStatus.Success;
                response.data = profile;
                return response;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "could not get user profile");

                return new ResponseData<GetUserProfileResponse>
                {
                    code = BaseStatus.Exception,
                    message = "Ошибка",
                    description = "Не удалось получить профиль"
                };
            }
        }
        public async Task<ResponseData<UpdateUserProfileResponse>> UpdateUserProfile(UserToken userToken, UpdateUserProfileRequest request)
        {
            try
            {
                var response = new ResponseData<UpdateUserProfileResponse>();

                if (userToken == null)
                    throw new UnauthorizedAccessException();

                var profile = await CheckAccess(userToken, request.Id);

                if (profile == null)
                    throw new ServiceException("Неправильный пользователь");


                profile.thephone = request.Phone;
                profile.name = request.FirstName;
                profile.surname  = request.MiddleName;
                profile.lastname = request.LastName;

                await _ctx.SaveChangesAsync();

                response.code = BaseStatus.Success;
                response.data = new UpdateUserProfileResponse() { Status = "ok" };
                return response;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "could not update user profile");

                return new ResponseData<UpdateUserProfileResponse>
                {
                    code = BaseStatus.Exception,
                    message = "Ошибка",
                    description = "Не удалось обновить профиль"
                };
            }
        }
        public async Task<ResponseData<UpdateUserProfileRoleResponse>> UpdateUserProfileRole(UserToken userToken, UpdateUserProfileRoleRequest request)
        {
            try
            {
                var response = new ResponseData<UpdateUserProfileRoleResponse>();

                if (userToken == null)
                    throw new UnauthorizedAccessException();

                var profile = await CheckAccess(userToken, request.Id);

                if (profile == null)
                    throw new ServiceException("Неправильный пользователь");

                var role = await _roleManager.FindByNameAsync(request.Role);
                if (role == null)
                    throw new ServiceException("Роль не найдена");

                var user = await _userManager.Users.FirstOrDefaultAsync(p => p.Id == profile.MON_USRId );

                var removeRoleResult = await _userManager.RemoveFromRolesAsync(user, MyIdentityRole.ALL_ROLES);
                if (!removeRoleResult.Succeeded)
                    throw new ServiceException("Не удалось назначить роль");

                var addRoleResult = await _userManager.AddToRoleAsync(user, request.Role);

                if (!addRoleResult.Succeeded)
                    throw new ServiceException("Не удалось назначить роль");



                response.code = BaseStatus.Success;
                response.data = new UpdateUserProfileRoleResponse() { Status = "ok" };
                return response;

            }
            catch (ServiceException ex)
            {
                _logger.LogError(ex, "could not get user role");

                return new ResponseData<UpdateUserProfileRoleResponse>
                {
                    code = BaseStatus.Exception,
                    message = "Ошибка",
                    description = ex.Message
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ResponseData<UpdateUserProfileRoleResponse>
                {
                    code = BaseStatus.Exception,
                    message = "Ошибка",
                    description = "Не удалось обновить профиль"
                };
            }
        }
        public async Task<ResponseData<CreateUserProfileResponse>> CreateUserProfile(UserToken userToken, CreateUserProfileRequest request)
        {
            try
            {
                var response = new ResponseData<CreateUserProfileResponse>();

                if (userToken == null)
                    throw new UnauthorizedAccessException();


                var organization = await _ctx.moncli_info.
                    Where(p => p.moncli_infoId == request.OrganizationId).
                    AsNoTracking().
                    FirstOrDefaultAsync();

                if (organization == null)
                    throw new ServiceException("Несуществующая организация");

                var selfProfile = await _ctx.MON_USR
                                    .Where(p => p.login == userToken.Id.ToString())
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync();

                var currentuser = await _userManager.Users.FirstOrDefaultAsync(p => p.Id == userToken.Id);

                if (await _userManager.IsInRoleAsync(currentuser, MyIdentityRole.ROLE_SUPERADMIN) ||
                    (await _userManager.IsInRoleAsync(currentuser, MyIdentityRole.ROLE_ADMIN) && selfProfile.theClient  == request.OrganizationId))
                {
                    // ok, have access
                }
                else
                    throw new UnauthorizedAccessException();

                var role = await _roleManager.FindByNameAsync(request.Role);
                if (role == null)
                    throw new ServiceException("Роль не найдена");

                var user = new ApplicationUser
                {
                    Id = Guid.NewGuid(),
                    Email = request.Email,
                    EmailConfirmed = true,
                    UserName = request.Email,
                };
                var createUserResult = await _userManager.CreateAsync(user, request.Password);

                if (!createUserResult.Succeeded)
                    throw new ServiceException("Не удалось создать пользователя");

                var addRoleResult = await _userManager.AddToRoleAsync(user, request.Role);

                if (!addRoleResult.Succeeded)
                    throw new ServiceException("Не удалось назначить роль");

                _ctx.Add(new MON_USR
                {
                    email = request.Email,
                    name = request.FirstName,
                    lastname = request.FirstName,
                    surname = request.MiddleName,
                    theClient  = request.OrganizationId,
                    thephone = request.Phone,
                    login  = user.Id.ToString(),
                    MON_USRId = user.Id
                });
                await _ctx.SaveChangesAsync();



                response.code = BaseStatus.Success;
                response.data = new CreateUserProfileResponse
                {
                    Status = "ok",
                    Id = user.Id
                };
                return response;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "could not create user profile");

                return new ResponseData<CreateUserProfileResponse>
                {
                    code = BaseStatus.Exception,
                    message = "Не удалось создать пользователя",
                    description = ex.Message
                };
            }
        }
        public async Task<ResponseData<DeleteUserProfileResponse>> DeleteUserProfile(UserToken userToken, DeleteUserProfileRequest request)
        {
            try
            {
                var response = new ResponseData<DeleteUserProfileResponse>();

                if (userToken == null)
                    throw new UnauthorizedAccessException();

                var profile = await CheckAccess(userToken, request.Id);

                if (profile == null)
                    throw new ServiceException("Неправильный пользователь");

                _ctx.Remove(profile);
                await _ctx.SaveChangesAsync();

                var user = await _userManager.Users.FirstOrDefaultAsync(p => p.Id == request.Id);
                var blockResult = await _userManager.SetLockoutEnabledAsync(user, true);

                if (!blockResult.Succeeded)
                    throw new ServiceException("Не удалось заблокировать пользователь");

                response.code = BaseStatus.Success;
                response.data = new DeleteUserProfileResponse
                {
                    Status = "ok",
                };
                return response;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "could not delete");
                return new ResponseData<DeleteUserProfileResponse>
                {
                    code = BaseStatus.Exception,
                    message = "Не удалось удалить пользователя",
                    description = ex.Message
                };
            }
        }
        public async Task<ResponseData<ChangePasswordResponse>> ChangePassword(UserToken userToken, ChangePasswordRequest request)
        {
            try
            {
                var response = new ResponseData<ChangePasswordResponse>();

                if (userToken == null)
                    throw new UnauthorizedAccessException();

                var profile = await _ctx.MON_USR
                                .Where(p => p.login == request.Id.ToString())
                                .FirstOrDefaultAsync();

                // access
                bool isOwner = false;
                if (userToken.Id != request.Id)
                {
                    var selfProfile = await _ctx.MON_USR
                        .Where(p => p.login == userToken.Id.ToString() )
                        .AsNoTracking()
                        .FirstOrDefaultAsync();

                    var selfuser = await _userManager.Users.FirstOrDefaultAsync(p => p.Id == userToken.Id);

                    if (await _userManager.IsInRoleAsync(selfuser, MyIdentityRole.ROLE_SUPERADMIN) ||
                        (await _userManager.IsInRoleAsync(selfuser, MyIdentityRole.ROLE_ADMIN) && selfProfile.theClient  == profile.theClient ))
                    {
                        // ok, have access
                        isOwner = true;
                    }
                    else
                        throw new UnauthorizedAccessException();


                }

                if (profile == null)
                    throw new ServiceException("Неправильный пользователь");


                var user = await _userManager.Users.FirstOrDefaultAsync(p => p.Id == request.Id);
                if (isOwner)
                {
                    var removePasswordResult = await _userManager.RemovePasswordAsync(user);
                    if (!removePasswordResult.Succeeded)
                        throw new ServiceException("Не удалось сбросить пароль");
                    var addPasswordResult = await _userManager.AddPasswordAsync(user, request.NewPassword);
                    if (!addPasswordResult.Succeeded)
                        throw new ServiceException("Не удалось установить пароль");
                }
                else
                {
                    var changePasswordResult = await _userManager.ChangePasswordAsync(user, request.OldPassword, request.NewPassword);

                    if (!changePasswordResult.Succeeded)
                        throw new ServiceException("Не удалось сменить пароль");
                }


                response.code = BaseStatus.Success;
                response.data = new ChangePasswordResponse() { Status = "ok" };
                return response;

            }
            catch (ServiceException ex)
            {
                _logger.LogError(ex, "could not update user password");

                return new ResponseData<ChangePasswordResponse>
                {
                    code = BaseStatus.Exception,
                    message = "Ошибка",
                    description = ex.Message
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "could not update user password");

                return new ResponseData<ChangePasswordResponse>
                {
                    code = BaseStatus.Exception,
                    message = "Ошибка",
                    description = "Не удалось обновить профиль"
                };
            }
        }

        public async Task<ResponseData<GetOrganizationsResponse>> GetOrganizations(UserToken userToken, GetOrganizationsRequest request)
        {
            try
            {
                var response = new ResponseData<GetOrganizationsResponse>();

                if (userToken == null)
                    throw new UnauthorizedAccessException();

                var selfProfile = await _ctx.MON_USR
                        .Where(p => p.login == userToken.Id.ToString())
                        .AsNoTracking()
                        .FirstOrDefaultAsync();

                List<OrganizationItem> items = null;
                var selfuser = await _userManager.Users.FirstOrDefaultAsync(p => p.Id == userToken.Id);
                if (await _userManager.IsInRoleAsync(selfuser, MyIdentityRole.ROLE_SUPERADMIN))
                {
                    items = await _ctx.moncli_info.
                        Select(p => new OrganizationItem(p)).
                        ToListAsync();
                }
                else
                {
                    items = await _ctx.moncli_info.
                        Where(p => p.moncli_infoId == selfProfile.theClient  ).
                        Select(p => new OrganizationItem(p)).
                        ToListAsync();
                }


                response.code = BaseStatus.Success;
                response.data = new GetOrganizationsResponse() { Items = items };
                return response;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "could not get organizations");

                return new ResponseData<GetOrganizationsResponse>
                {
                    code = BaseStatus.Exception,
                    message = "Ошибка",
                    description = "Не удалось получить организации"
                };
            }
        }
        public async Task<ResponseData<GetOrganizationUsersResponse>> GetOrganizationUsers(UserToken userToken, GetOrganizationUsersRequest request)
        {
            try
            {
                var response = new ResponseData<GetOrganizationUsersResponse>();

                if (userToken == null)
                    throw new UnauthorizedAccessException();

                // access
                var selfProfile = await _ctx.MON_USR
                    .Where(p => p.login == userToken.Id.ToString())
                    .AsNoTracking()
                    .FirstOrDefaultAsync();

                var selfuser = await _userManager.Users.FirstOrDefaultAsync(p => p.Id == userToken.Id);

                List<OrganizationUserItem> items = null;
                if (await _userManager.IsInRoleAsync(selfuser, MyIdentityRole.ROLE_SUPERADMIN) ||
                    request.Id == selfProfile.theClient )
                {
                    items = await _ctx.MON_USR.Where(p => p.theClient  == request.Id).
                        Select(p => new OrganizationUserItem
                        {
                            Id = p.MON_USRId,
                            FirstName = p.name,
                            MiddleName = p.surname,
                            LastName = p.lastname,
                            Email = p.email,
                        }).ToListAsync();

                    foreach (var item in items)
                    {
                        var user = await _userManager.Users.FirstOrDefaultAsync(p => p.Id == item.Id);
                        var roles = await _userManager.GetRolesAsync(user);
                        item.Role = roles.FirstOrDefault();
                    }
                    
                }
                else
                    throw new UnauthorizedAccessException();


                response.code = BaseStatus.Success;
                response.data = new GetOrganizationUsersResponse() { Items = items };
                return response;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "could not get organization users");

                return new ResponseData<GetOrganizationUsersResponse>
                {
                    code = BaseStatus.Exception,
                    message = "Ошибка",
                    description = "Не удалось получить пользователей"
                };
            }
        }

        private async Task<MON_USR> CheckAccess(UserToken userToken, Guid userId)
        {
            var profile = await _ctx.MON_USR
                                .Where(p => p.login  == userId.ToString())
                                .FirstOrDefaultAsync();

            // access
            if (userToken.Id != userId)
            {
                var selfProfile = await _ctx.MON_USR
                    .Where(p => p.login == userToken.Id.ToString())
                    .AsNoTracking()
                    .FirstOrDefaultAsync();

                var selfuser = await _userManager.Users.FirstOrDefaultAsync(p => p.Id == userToken.Id);
                if (await _userManager.IsInRoleAsync(selfuser, MyIdentityRole.ROLE_SUPERADMIN) ||
                    (await _userManager.IsInRoleAsync(selfuser, MyIdentityRole.ROLE_ADMIN) && selfProfile.theClient == profile.theClient ))
                {
                    // ok, have access
                }
                else
                    throw new UnauthorizedAccessException();


            }

            return profile;
        }

    }
}
