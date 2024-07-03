using Backend.WebApi.Data;
using Backend.WebApi.Entities;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Backend.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IMongoCollection<User>? _users;
    
    public UserController(MongoDbService mongoDbService)
    {
        _users = mongoDbService.Database?.GetCollection<User>("users");
    }
    
    [HttpGet(Name = "GetInitiatives")]
    public async Task<IEnumerable<User>> Get()
    {
        return await _users.Find(FilterDefinition<User>.Empty).ToListAsync();
    }
}