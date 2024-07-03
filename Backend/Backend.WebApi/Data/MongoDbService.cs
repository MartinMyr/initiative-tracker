using MongoDB.Driver;

namespace Backend.WebApi.Data;

public class MongoDbService
{
   private readonly IConfiguration _configuration;
   private readonly IMongoDatabase? _database;
   public IMongoDatabase? Database => _database;
   
   public MongoDbService(IConfiguration configuration)
   {
      _configuration = configuration;

      var connectionString = GetConnectionString();
      var mongoUrl = MongoUrl.Create(connectionString);
      var mongoClient = new MongoClient(mongoUrl);
      _database = mongoClient.GetDatabase(_configuration.GetConnectionString("MongoDbName"));
   }

   private string GetConnectionString()
   {
      var connectionString = _configuration.GetConnectionString("DbConnection");
      connectionString += _configuration.GetConnectionString("MongoDbUser") + ":";
      connectionString += _configuration.GetConnectionString("MongoDbPassword") + "@";
      connectionString += _configuration.GetConnectionString("MongoDbCluster");
      connectionString += _configuration.GetConnectionString("MongoDbEndUri");

      return connectionString;
   }
}