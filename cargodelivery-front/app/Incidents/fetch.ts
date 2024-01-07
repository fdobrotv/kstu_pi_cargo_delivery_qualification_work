import {
    Incident,
    IncidentsApi,
    Configuration,
    ListIncidentsRequest,
    ConfigurationParameters,
    DeleteIncidentByIdRequest,
    CreateIncidentRequest,
    IncidentIn,
} from "@/generated";

let configurationParameters: ConfigurationParameters =
{basePath: "http://127.0.0.1:8080/v1"};
let configuration = new Configuration(configurationParameters);
let incidentsApi = new IncidentsApi(configuration);

export function create(incidentIn: IncidentIn): Promise<Incident> {
    let createIncidentRequest: CreateIncidentRequest = {incidentIn: incidentIn}
    let createdIncident: Promise<Incident> = incidentsApi.createIncident(createIncidentRequest);
    return createdIncident;
}

export function getIncidents(): Promise<Array<Incident>> {
    let listIncidentsRequest: ListIncidentsRequest = {limit: 100}
    let incidents: Promise<Array<Incident>> = incidentsApi.listIncidents(listIncidentsRequest);
    return incidents;
}

export function deleteById(incidentId: string): Promise<void> {
    let deleteIncidentByIdRequest: DeleteIncidentByIdRequest = {id: incidentId}
    let deletePromise: Promise<void> = incidentsApi.deleteIncidentById(deleteIncidentByIdRequest);
    return deletePromise;
}