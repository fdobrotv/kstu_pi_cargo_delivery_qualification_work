import {
    Refuel,
    RefuelsApi,
    Configuration,
    ListRefuelsRequest,
    ConfigurationParameters,
    DeleteRefuelByIdRequest,
    CreateRefuelRequest,
    RefuelIn,
} from "@/generated";

let configurationParameters: ConfigurationParameters =
{basePath: "http://127.0.0.1:8080/v1"};
let configuration = new Configuration(configurationParameters);
let refuelsApi = new RefuelsApi(configuration);

export function create(refuelIn: RefuelIn): Promise<Refuel> {
    let createRefuelRequest: CreateRefuelRequest = {refuelIn: refuelIn}
    let createdRefuel: Promise<Refuel> = refuelsApi.createRefuel(createRefuelRequest);
    return createdRefuel;
}

export function getRefuels(): Promise<Array<Refuel>> {
    let listRefuelsRequest: ListRefuelsRequest = {limit: 100}
    let refuels: Promise<Array<Refuel>> = refuelsApi.listRefuels(listRefuelsRequest);
    return refuels;
}

export function deleteById(refuelId: string): Promise<void> {
    let deleteRefuelByIdRequest: DeleteRefuelByIdRequest = {id: refuelId}
    let deletePromise: Promise<void> = refuelsApi.deleteRefuelById(deleteRefuelByIdRequest);
    return deletePromise;
}