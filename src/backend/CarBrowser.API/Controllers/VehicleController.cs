using VehicleBrowser.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace VehicleBrowser.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController(IVehicleService vehicleService) : ControllerBase
    {
        [HttpGet("makes")]
        public async Task<IActionResult> GetAllMakes()
        {
            var makes = await vehicleService.GetAllVehicleMakesAsync();
            return Ok(makes);
        }

        [HttpGet("{makeId}/types")]
        public async Task<IActionResult> GetVehicleTypes(int makeId)
        {
            var types = await vehicleService.GetVehicleTypesAsync(makeId);
            return Ok(types);
        }

        [HttpGet("{makeId}/models/{year}")]
        public async Task<IActionResult> GetVehicleModels(int makeId, int year)
        {
            var models = await vehicleService.GetVehicleModelsAsync(makeId, year);
            return Ok(models);
        }
    }
}