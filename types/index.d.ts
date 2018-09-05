import * as Driver from "driver.js";

declare module 'driver.js' {
    export interface NgDriverTour {
        title: string,
        steps: Driver.Step[]
    }
}
