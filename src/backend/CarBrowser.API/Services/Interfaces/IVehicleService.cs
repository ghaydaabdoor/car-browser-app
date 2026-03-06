using VehicleBrowser.API.Models;

namespace VehicleBrowser.API.Services
{
    public interface IVehicleService
    {
        Task<List<MakeDto>> GetAllVehicleMakesAsync();
        Task<List<VehicleTypeDto>> GetVehicleTypesAsync(int makeId);
        Task<List<VehicleModelDto>> GetVehicleModelsAsync(int makeId, int year);
    }
}