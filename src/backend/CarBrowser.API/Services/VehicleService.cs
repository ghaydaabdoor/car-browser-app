using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;
using VehicleBrowser.API.Models;

namespace VehicleBrowser.API.Services
{
    public class VehicleService(HttpClient httpClient, IConfiguration configuration, IMemoryCache cache) : IVehicleService
    {
        private readonly string _baseUrl = configuration["NhtsaApi:BaseUrl"]
            ?? throw new InvalidOperationException("NhtsaApi:BaseUrl is not configured.");

        private readonly JsonSerializerOptions _jsonOptions = new()
        {
            PropertyNameCaseInsensitive = true
        };

        private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(24);

        public Task<List<MakeDto>> GetAllVehicleMakesAsync() =>
            FetchWithCacheAsync<MakeDto>("makes", $"{_baseUrl}/getallmakes?format=json");

        public Task<List<VehicleTypeDto>> GetVehicleTypesAsync(int makeId) =>
            FetchWithCacheAsync<VehicleTypeDto>($"types_{makeId}", $"{_baseUrl}/GetVehicleTypesForMakeId/{makeId}?format=json");

        public Task<List<VehicleModelDto>> GetVehicleModelsAsync(int makeId, int year) =>
            FetchAsync<VehicleModelDto>($"{_baseUrl}/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json");

        private async Task<List<T>> FetchWithCacheAsync<T>(string cacheKey, string url)
        {
            if (cache.TryGetValue(cacheKey, out List<T>? cached) && cached is not null)
                return cached;

            var result = await FetchAsync<T>(url);
            cache.Set(cacheKey, result, CacheDuration);
            return result;
        }

        private async Task<List<T>> FetchAsync<T>(string url)
        {
            var response = await httpClient.GetStringAsync(url);
            var result = JsonSerializer.Deserialize<NhtsaResponse<T>>(response, _jsonOptions);
            return result?.Results ?? [];
        }
    }
}