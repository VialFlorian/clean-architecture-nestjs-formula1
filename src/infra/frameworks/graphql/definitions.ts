
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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

type Nullable<T> = T | null;
