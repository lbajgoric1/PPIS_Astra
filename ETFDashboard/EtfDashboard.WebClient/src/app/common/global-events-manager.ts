import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class GlobalEventsManager {
    public isAdmin: EventEmitter<boolean> = new EventEmitter<boolean>();
    public showMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }
}