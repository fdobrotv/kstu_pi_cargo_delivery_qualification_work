import {
    Settlement,
    SettlementsApi,
    Configuration,
    ListSettlementsRequest,
    ConfigurationParameters,
    DeleteSettlementByIdRequest,
    CreateSettlementRequest,
    SettlementIn,
} from "@/generated";

let configurationParameters: ConfigurationParameters =
{basePath: "http://127.0.0.1:8080/v1"};
let configuration = new Configuration(configurationParameters);
let settlementsApi = new SettlementsApi(configuration);

export function create(settlementIn: SettlementIn): Promise<Settlement> {
    let createSettlementRequest: CreateSettlementRequest = {settlementIn: settlementIn}
    let createdSettlement: Promise<Settlement> = settlementsApi.createSettlement(createSettlementRequest);
    return createdSettlement;
}

export function getSettlements(): Promise<Array<Settlement>> {
    let listSettlementsRequest: ListSettlementsRequest = {limit: 100}
    let settlements: Promise<Array<Settlement>> = settlementsApi.listSettlements(listSettlementsRequest);
    return settlements;
}

export function deleteById(settlementId: string): Promise<void> {
    let deleteSettlementByIdRequest: DeleteSettlementByIdRequest = {id: settlementId}
    let deletePromise: Promise<void> = settlementsApi.deleteSettlementById(deleteSettlementByIdRequest);
    return deletePromise;
}