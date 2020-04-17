import { Injectable } from '@angular/core';

@Injectable()
export class StorageFunctions {

    constructor() { }

    getEngine() {
        return JSON.parse(localStorage.getItem('engine'));
    }

    setEngine(engine) {
        localStorage.setItem('engine', JSON.stringify(engine));
    }
}
