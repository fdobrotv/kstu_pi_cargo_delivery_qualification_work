/* tslint:disable */
/* eslint-disable */
/**
 * Tourist agency
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
 * @interface TourIn
 */
export interface TourIn {
    /**
     * 
     * @type {string}
     * @memberof TourIn
     */
    departureFlightId: string;
    /**
     * 
     * @type {string}
     * @memberof TourIn
     */
    arrivalFlightId: string;
    /**
     * 
     * @type {string}
     * @memberof TourIn
     */
    transferToHotelId: string;
    /**
     * 
     * @type {string}
     * @memberof TourIn
     */
    transferFromHotelId: string;
    /**
     * 
     * @type {string}
     * @memberof TourIn
     */
    description: string;
    /**
     * 
     * @type {number}
     * @memberof TourIn
     */
    price: number;
    /**
     * 
     * @type {string}
     * @memberof TourIn
     */
    roomId: string;
    /**
     * 
     * @type {string}
     * @memberof TourIn
     */
    selectedFoodOptionId: string;
}

/**
 * Check if a given object implements the TourIn interface.
 */
export function instanceOfTourIn(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "departureFlightId" in value;
    isInstance = isInstance && "arrivalFlightId" in value;
    isInstance = isInstance && "transferToHotelId" in value;
    isInstance = isInstance && "transferFromHotelId" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "price" in value;
    isInstance = isInstance && "roomId" in value;
    isInstance = isInstance && "selectedFoodOptionId" in value;

    return isInstance;
}

export function TourInFromJSON(json: any): TourIn {
    return TourInFromJSONTyped(json, false);
}

export function TourInFromJSONTyped(json: any, ignoreDiscriminator: boolean): TourIn {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'departureFlightId': json['departureFlightId'],
        'arrivalFlightId': json['arrivalFlightId'],
        'transferToHotelId': json['transferToHotelId'],
        'transferFromHotelId': json['transferFromHotelId'],
        'description': json['description'],
        'price': json['price'],
        'roomId': json['roomId'],
        'selectedFoodOptionId': json['selectedFoodOptionId'],
    };
}

export function TourInToJSON(value?: TourIn | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'departureFlightId': value.departureFlightId,
        'arrivalFlightId': value.arrivalFlightId,
        'transferToHotelId': value.transferToHotelId,
        'transferFromHotelId': value.transferFromHotelId,
        'description': value.description,
        'price': value.price,
        'roomId': value.roomId,
        'selectedFoodOptionId': value.selectedFoodOptionId,
    };
}
