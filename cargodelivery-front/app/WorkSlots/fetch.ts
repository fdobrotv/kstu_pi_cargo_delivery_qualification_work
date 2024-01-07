import {
    WorkSlot,
    WorkSlotsApi,
    Configuration,
    ListWorkSlotsRequest,
    ConfigurationParameters,
    DeleteWorkSlotByIdRequest,
    CreateWorkSlotRequest,
    WorkSlotIn,
} from "@/generated";

let configurationParameters: ConfigurationParameters =
{basePath: "http://127.0.0.1:8080/v1"};
let configuration = new Configuration(configurationParameters);
let workSlotsApi = new WorkSlotsApi(configuration);

export function create(workSlotIn: WorkSlotIn): Promise<WorkSlot> {
    let createWorkSlotRequest: CreateWorkSlotRequest = {workSlotIn: workSlotIn}
    let createdWorkSlot: Promise<WorkSlot> = workSlotsApi.createWorkSlot(createWorkSlotRequest);
    return createdWorkSlot;
}

export function getWorkSlots(): Promise<Array<WorkSlot>> {
    let listWorkSlotsRequest: ListWorkSlotsRequest = {limit: 100}
    let workSlots: Promise<Array<WorkSlot>> = workSlotsApi.listWorkSlots(listWorkSlotsRequest);
    return workSlots;
}

export function deleteById(workSlotId: string): Promise<void> {
    let deleteWorkSlotByIdRequest: DeleteWorkSlotByIdRequest = {id: workSlotId}
    let deletePromise: Promise<void> = workSlotsApi.deleteWorkSlotById(deleteWorkSlotByIdRequest);
    return deletePromise;
}