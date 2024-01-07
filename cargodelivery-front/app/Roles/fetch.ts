import {
    Role,
    RolesApi,
    Configuration,
    ListRolesRequest,
    ConfigurationParameters,
    DeleteRoleByIdRequest,
    CreateRoleRequest,
    RoleIn,
} from "@/generated";

let configurationParameters: ConfigurationParameters =
{basePath: "http://127.0.0.1:8080/v1"};
let configuration = new Configuration(configurationParameters);
let rolesApi = new RolesApi(configuration);

export function create(roleIn: RoleIn): Promise<Role> {
    let createRoleRequest: CreateRoleRequest = {roleIn: roleIn}
    let createdRole: Promise<Role> = rolesApi.createRole(createRoleRequest);
    return createdRole;
}

export function getRoles(): Promise<Array<Role>> {
    let listRolesRequest: ListRolesRequest = {limit: 100}
    let roles: Promise<Array<Role>> = rolesApi.listRoles(listRolesRequest);
    return roles;
}

export function deleteById(roleId: String): Promise<void> {
    let deleteRoleByIdRequest: DeleteRoleByIdRequest = {id: roleId}
    let deletePromise: Promise<void> = rolesApi.deleteRoleById(deleteRoleByIdRequest);
    return deletePromise;
}