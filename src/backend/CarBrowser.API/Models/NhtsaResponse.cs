namespace VehicleBrowser.API.Models
{
    public class NhtsaResponse<T>
    {
        public List<T> Results { get; set; } = new();
    }
}