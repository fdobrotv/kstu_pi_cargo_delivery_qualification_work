import {
    Way,
    WaysApi,
    Configuration,
    ListWaysRequest,
    ConfigurationParameters,
    DeleteWayByIdRequest,
    CreateWayRequest,
    WayIn,
} from "@/generated";

let configurationParameters: ConfigurationParameters =
{basePath: "http://127.0.0.1:8080/v1"};
let configuration = new Configuration(configurationParameters);
let waysApi = new WaysApi(configuration);

export function create(wayIn: WayIn): Promise<Way> {
    let createWayRequest: CreateWayRequest = {wayIn: wayIn}
    let createdWay: Promise<Way> = waysApi.createWay(createWayRequest);
    return createdWay;
}

export function getWays(): Promise<Array<Way>> {
    let listWaysRequest: ListWaysRequest = {limit: 100}
    let ways: Promise<Array<Way>> = waysApi.listWays(listWaysRequest);
    return ways;
}

export function deleteById(wayId: String): Promise<void> {
    let deleteWayByIdRequest: DeleteWayByIdRequest = {id: wayId}
    let deletePromise: Promise<void> = waysApi.deleteWayById(deleteWayByIdRequest);
    return deletePromise;
}