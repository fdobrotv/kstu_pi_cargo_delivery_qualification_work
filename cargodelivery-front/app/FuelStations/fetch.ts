import {
    FuelStation,
    FuelStationsApi,
    Configuration,
    ListFuelStationsRequest,
    ConfigurationParameters,
    DeleteFuelStationByIdRequest,
    CreateFuelStationRequest,
    FuelStationIn,
} from "@/generated";

let configurationParameters: ConfigurationParameters =
{basePath: "http://127.0.0.1:8080/v1"};
let configuration = new Configuration(configurationParameters);
let fuelStationsApi = new FuelStationsApi(configuration);

export function create(fuelStationIn: FuelStationIn): Promise<FuelStation> {
    let createFuelStationRequest: CreateFuelStationRequest = {fuelStationIn: fuelStationIn}
    let createdFuelStation: Promise<FuelStation> = fuelStationsApi.createFuelStation(createFuelStationRequest);
    return createdFuelStation;
}

export function getFuelStations(): Promise<Array<FuelStation>> {
    let listFuelStationsRequest: ListFuelStationsRequest = {limit: 100}
    let fuelStations: Promise<Array<FuelStation>> = fuelStationsApi.listFuelStations(listFuelStationsRequest);
    return fuelStations;
}

export function deleteById(fuelStationId: String): Promise<void> {
    let deleteFuelStationByIdRequest: DeleteFuelStationByIdRequest = {id: fuelStationId}
    let deletePromise: Promise<void> = fuelStationsApi.deleteFuelStationById(deleteFuelStationByIdRequest);
    return deletePromise;
}