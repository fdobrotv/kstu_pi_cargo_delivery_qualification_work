/* tslint:disable */
/* eslint-disable */
/**
 * Cargo delivery
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {string}
     * @memberof User
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    firstName: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    lastName: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    middleName: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    role: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    phone: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    email: string;
    /**
     * 
     * @type {Date}
     * @memberof User
     */
    createdAt: Date;
}

/**
 * Check if a given object implements the User interface.
 */
export function instanceOfUser(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "firstName" in value;
    isInstance = isInstance && "lastName" in value;
    isInstance = isInstance && "middleName" in value;
    isInstance = isInstance && "role" in value;
    isInstance = isInstance && "phone" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "createdAt" in value;

    return isInstance;
}

export function UserFromJSON(json: any): User {
    return UserFromJSONTyped(json, false);
}

export function UserFromJSONTyped(json: any, ignoreDiscriminator: boolean): User {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'firstName': json['firstName'],
        'lastName': json['lastName'],
        'middleName': json['middleName'],
        'role': json['role'],
        'phone': json['phone'],
        'email': json['email'],
        'createdAt': (new Date(json['createdAt'])),
    };
}

export function UserToJSON(value?: User | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'firstName': value.firstName,
        'lastName': value.lastName,
        'middleName': value.middleName,
        'role': value.role,
        'phone': value.phone,
        'email': value.email,
        'createdAt': (value.createdAt.toISOString()),
    };
}

