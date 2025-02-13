
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class DriverInput {
    code?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    dateOfBirth?: Nullable<string>;
    nationality?: Nullable<string>;
}

export class Driver {
    code?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    dateOfBirth?: Nullable<string>;
    nationality?: Nullable<string>;
}

export abstract class IQuery {
    abstract driver(code?: Nullable<string>): Nullable<Driver> | Promise<Nullable<Driver>>;

    abstract drivers(): Driver[] | Promise<Driver[]>;
}

export abstract class IMutation {
    abstract addDriver(driver?: Nullable<DriverInput>): Nullable<string> | Promise<Nullable<string>>;
}

type Nullable<T> = T | null;
