using Microsoft.AspNetCore.Mvc;
using PusherServer;

namespace Backend.WebApi;

public class PusherTriggerService
{
    public static async Task<IActionResult> Trigger(IConfiguration configuration, object data, string channelName, string eventName)
    {
        var options = new PusherOptions
        {
            Cluster = configuration["Pusher:Cluster"],
            Encrypted = true
        };
        var pusher = new Pusher(
            configuration["Pusher:ID"],
            configuration["Pusher:Key"],
            configuration["Pusher:Secret"],
            options
        );
            
        var result = await pusher.TriggerAsync(
            channelName,
            eventName,
            data
        );
        
        return new OkObjectResult(data);
    }
}

