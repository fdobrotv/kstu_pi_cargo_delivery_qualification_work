import { Car, Driver, FuelStation, Point, Road, Settlement } from "@/generated";
import { UUID } from "crypto";

export const validateRequired = (value: string) => !!value.length;

export const validateRequiredNumber = (value: number) => !!value;

export const validateRequiredDate = (value: Date) => !!value;

export const validateRequiredDateInFuture = (value: Date) => {
    if (value === null) {
        console.log("validateRequiredDate invalid");
        return false;
    }
    var now: Date = new Date();
    var target: Date = new Date(value);
    let inFuture: boolean = target.getDate() > now.getDate();
    console.log("inFuture: " + inFuture);
    return inFuture;
};

export const validateRequiredPoint = (value: Point) => !!value.latitude && !!value.longitude;

export const validateRequiredSettlement = (value: Settlement) => !!value.id && !!value.name && !!value.coordinates;

export const validateRequiredPoints = (value: Point[]) => !!value.map(point => !!point.latitude && !!point.longitude);

export const validateRequiredRoadIds = (value: Array<string>) => !!value.map(id => !!id);

export const validateRequiredRoads = (value: Array<Road>) => !!value.map(road => !!road.id);

export const validateRequiredFuelStation = (value: FuelStation) => !!value;

export const validateRequiredCar = (value: Car) => !!value;

export const validateRequiredDriver = (value: Driver) => !!value;