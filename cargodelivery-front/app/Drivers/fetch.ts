import {
    Driver,
    DriversApi,
    Configuration,
    ListDriversRequest,
    ConfigurationParameters,
    DeleteDriverByIdRequest,
    CreateDriverRequest,
    DriverIn,
} from "@/generated";

let configurationParameters: ConfigurationParameters =
{basePath: "http://127.0.0.1:8080/v1"};
let configuration = new Configuration(configurationParameters);
let driversApi = new DriversApi(configuration);

export function create(driverIn: DriverIn): Promise<Driver> {
    let createDriverRequest: CreateDriverRequest = {driverIn: driverIn}
    let createdDriver: Promise<Driver> = driversApi.createDriver(createDriverRequest);
    return createdDriver;
}

export function getDrivers(): Promise<Array<Driver>> {
    let listDriversRequest: ListDriversRequest = {limit: 100}
    let drivers: Promise<Array<Driver>> = driversApi.listDrivers(listDriversRequest);
    return drivers;
}

export function deleteById(driverId: string): Promise<void> {
    let deleteDriverByIdRequest: DeleteDriverByIdRequest = {id: driverId}
    let deletePromise: Promise<void> = driversApi.deleteDriverById(deleteDriverByIdRequest);
    return deletePromise;
}