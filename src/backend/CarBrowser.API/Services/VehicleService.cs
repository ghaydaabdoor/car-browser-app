using System.Text.Json;
using VehicleBrowser.API.Models;

namespace VehicleBrowser.API.Services
{
    public class VehicleService(HttpClient httpClient, IConfiguration configuration) : IVehicleService
    {
        private readonly string _baseUrl = configuration["NhtsaApi:BaseUrl"]
            ?? throw new InvalidOperationException("NhtsaApi:BaseUrl is not configured.");

        private readonly JsonSerializerOptions _jsonOptions = new()
        {
            PropertyNameCaseInsensitive = true
        };

        public Task<List<MakeDto>> GetAllVehicleMakesAsync() =>
            FetchAsync<MakeDto>($"{_baseUrl}/getallmakes?format=json");

        public Task<List<VehicleTypeDto>> GetVehicleTypesAsync(int makeId) =>
            FetchAsync<VehicleTypeDto>($"{_baseUrl}/GetVehicleTypesForMakeId/{makeId}?format=json");

        public Task<List<VehicleModelDto>> GetVehicleModelsAsync(int makeId, int year) =>
            FetchAsync<VehicleModelDto>($"{_baseUrl}/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json");

        private async Task<List<T>> FetchAsync<T>(string url)
        {
            var response = await httpClient.GetStringAsync(url);
            var result = JsonSerializer.Deserialize<NhtsaResponse<T>>(response, _jsonOptions);
            return result?.Results ?? [];
        }
    }
}