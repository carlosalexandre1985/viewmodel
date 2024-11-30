import { Entity } from "../../src";

export default interface IStub {
    get entity(): Entity;
    get json(): any;
    get persistentJSON(): any;
}