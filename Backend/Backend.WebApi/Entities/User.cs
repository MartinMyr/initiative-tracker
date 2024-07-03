using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.WebApi.Entities;

public class User
{
    [BsonId]
    [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    [BsonElement("name"), BsonRepresentation(BsonType.String)]
    public string? Name { get; set; }
    
    [BsonElement("initiative"), BsonRepresentation(BsonType.Int32)]
    public int? Initiative { get; set; }
    
    [BsonElement("shield"), BsonRepresentation(BsonType.Int32)]
    public int? Shield { get; set; }
    
    [BsonElement("retaliate"), BsonRepresentation(BsonType.Int32)]
    public int? Retaliate { get; set; }
}