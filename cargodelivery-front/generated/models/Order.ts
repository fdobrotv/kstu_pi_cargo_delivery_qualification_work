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
import type { Settlement } from './Settlement';
import {
    SettlementFromJSON,
    SettlementFromJSONTyped,
    SettlementToJSON,
} from './Settlement';
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './User';

/**
 * 
 * @export
 * @interface Order
 */
export interface Order {
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    id: string;
    /**
     * 
     * @type {User}
     * @memberof Order
     */
    user: User;
    /**
     * 
     * @type {Date}
     * @memberof Order
     */
    createdAt: Date;
    /**
     * 
     * @type {Settlement}
     * @memberof Order
     */
    departureSettlement: Settlement;
    /**
     * 
     * @type {Settlement}
     * @memberof Order
     */
    destinationSettlement: Settlement;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    weight: number;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    volume: number;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    price: number;
}

/**
 * Check if a given object implements the Order interface.
 */
export function instanceOfOrder(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "user" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "departureSettlement" in value;
    isInstance = isInstance && "destinationSettlement" in value;
    isInstance = isInstance && "weight" in value;
    isInstance = isInstance && "volume" in value;
    isInstance = isInstance && "price" in value;

    return isInstance;
}

export function OrderFromJSON(json: any): Order {
    return OrderFromJSONTyped(json, false);
}

export function OrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): Order {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'user': UserFromJSON(json['user']),
        'createdAt': (new Date(json['createdAt'])),
        'departureSettlement': SettlementFromJSON(json['departureSettlement']),
        'destinationSettlement': SettlementFromJSON(json['destinationSettlement']),
        'weight': json['weight'],
        'volume': json['volume'],
        'price': json['price'],
    };
}

export function OrderToJSON(value?: Order | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'user': UserToJSON(value.user),
        'createdAt': (value.createdAt.toISOString()),
        'departureSettlement': SettlementToJSON(value.departureSettlement),
        'destinationSettlement': SettlementToJSON(value.destinationSettlement),
        'weight': value.weight,
        'volume': value.volume,
        'price': value.price,
    };
}
