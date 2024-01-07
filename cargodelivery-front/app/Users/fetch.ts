import {
    User,
    UsersApi,
    Configuration,
    ListUsersRequest,
    ConfigurationParameters,
    DeleteUserByIdRequest,
    CreateUserRequest,
    UserIn,
} from "@/generated";

let configurationParameters: ConfigurationParameters =
{basePath: "http://127.0.0.1:8080/v1"};
let configuration = new Configuration(configurationParameters);
let usersApi = new UsersApi(configuration);

export function create(userIn: UserIn): Promise<User> {
    let createUserRequest: CreateUserRequest = {userIn: userIn}
    let createdUser: Promise<User> = usersApi.createUser(createUserRequest);
    return createdUser;
}

export function getUsers(): Promise<Array<User>> {
    let listUsersRequest: ListUsersRequest = {limit: 100}
    let users: Promise<Array<User>> = usersApi.listUsers(listUsersRequest);
    return users;
}

export function deleteById(userId: string): Promise<void> {
    let deleteUserByIdRequest: DeleteUserByIdRequest = {id: userId}
    let deletePromise: Promise<void> = usersApi.deleteUserById(deleteUserByIdRequest);
    return deletePromise;
}