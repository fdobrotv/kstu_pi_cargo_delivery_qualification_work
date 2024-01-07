import {
    Road,
    RoadsApi,
    Configuration,
    ListRoadsRequest,
    ConfigurationParameters,
    DeleteRoadByIdRequest,
    CreateRoadRequest,
    RoadIn,
} from "@/generated";

let configurationParameters: ConfigurationParameters =
{basePath: "http://127.0.0.1:8080/v1"};
let configuration = new Configuration(configurationParameters);
let roadsApi = new RoadsApi(configuration);

export function create(roadIn: RoadIn): Promise<Road> {
    let createRoadRequest: CreateRoadRequest = {roadIn: roadIn}
    let createdRoad: Promise<Road> = roadsApi.createRoad(createRoadRequest);
    return createdRoad;
}

export function getRoads(): Promise<Array<Road>> {
    let listRoadsRequest: ListRoadsRequest = {limit: 100}
    let roads: Promise<Array<Road>> = roadsApi.listRoads(listRoadsRequest);
    return roads;
}

export function deleteById(roadId: String): Promise<void> {
    let deleteRoadByIdRequest: DeleteRoadByIdRequest = {id: roadId}
    let deletePromise: Promise<void> = roadsApi.deleteRoadById(deleteRoadByIdRequest);
    return deletePromise;
}