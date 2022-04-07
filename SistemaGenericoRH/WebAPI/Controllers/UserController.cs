using AutoMapper;
using Core.Entitites;
using Core.Interfaces;
using Core.Interfaces.UserInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebAPI.Dtos.UserDtos;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {       
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;

        public UserController(IMapper mapper, ITokenService tokenService, IUserService userService)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _userService = userService;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] User user)
        {
            var userLogin = await _userService.ValidateUser(user.Correo , user.Contraseña);
            if (userLogin == null)
            {
                return BadRequest(new { message = "Usuario o contraseña invalidos" });
            }

            var userDto = _mapper.Map<User, UserDto>(userLogin);
            userDto.Token = _tokenService.CreateToken(userLogin);

            return userDto;
        }   

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetUser()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var usuario = await _userService.getUserByEmail(email);

            var userDto = _mapper.Map<User, UserDto>(usuario);
            userDto.Token = _tokenService.CreateToken(usuario);
            return userDto;
        }

        [Authorize]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserDto>> getUserById(int id)
        {
            var user = await _userService.getUserByIdAsync(id);
            var userDto = _mapper.Map<User, UserDto>(user);

            return userDto;
        }

        [Authorize]
        [HttpGet("Usuarios")]
        public async Task<ActionResult<List<UserDto>>> getUsers(int id)
        {
            var user = await _userService.getUsersAsync();
            var usersDto = _mapper.Map < IReadOnlyList<User>, IReadOnlyList<UserDto>>(user);

            return Ok(usersDto);
        }

        [Authorize]
        [HttpPost("CrearUsuario")]
        public async Task<ActionResult<string>> CreateUser(RegisterUserDto regUserDto)
        {
            regUserDto.Id = 0;
            var user = _mapper.Map<RegisterUserDto, User>(regUserDto);            
            int result = await _userService.CreateUser(user);
            string message = _userService.getResultMessage(result);
            if (result != 1)
            {
                return BadRequest(new { message = message });
            }

            return Ok(new { message = message});
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<string>> UpdateUser(RegisterUserDto regUserDto)
        {
            User user = _mapper.Map<RegisterUserDto, User>(regUserDto);
            int result = await _userService.UpdateUser(user);
            string mensaje = _userService.getResultMessage(result);
        
                
            if (result != 1)
            {
                return BadRequest(new { message = mensaje});
            }           

            return Ok(new { message= mensaje });
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<string>> deleteUser(int id)
        {
            int result = await _userService.deleteUser(id);
            string message = _userService.getResultMessage(result);

            if (result != 1)
                return BadRequest(new { message = message });

            return Ok(new { message = message });
        
        }
    }
}
