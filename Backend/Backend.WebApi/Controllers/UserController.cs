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
    
    [HttpGet]
    public async Task<IEnumerable<User>> Get()
    {
        return await _users.Find(FilterDefinition<User>.Empty).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User?>> GetById(string id)
    {
        var filter = Builders<User>.Filter.Eq(x => x.Id, id);
        var user = _users.Find(filter).FirstOrDefault();
        
        return user is not null ? Ok(user) : NotFound();
    }

    [HttpPost]
    public async Task<ActionResult> Post(User user)
    {
        await _users.InsertOneAsync(user);
        
        return CreatedAtAction(nameof(GetById), new {id = user.Id}, user);
    }

    [HttpPut]
    public async Task<ActionResult> Update(User user)
    {
        var filter = Builders<User>.Filter.Eq(x => x.Id, user.Id);
        await _users.ReplaceOneAsync(filter, user);

        return Ok();
    }

    [HttpDelete]
    public async Task<ActionResult> Delete(string id)
    {
        var filter = Builders<User>.Filter.Eq(x => x.Id, id);
        await _users.DeleteOneAsync(filter);

        return Ok();
    }
}