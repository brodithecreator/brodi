import { ICharacteristic, IPeripheral } from '../ble';
import { ICommandWithRaw, DriveFlag } from '../commands/types';
import { Stance } from './types';
export interface IReExport {
    a: Stance;
    b: DriveFlag;
}
export declare const commandsType: {
    api: {
        echo: () => ICommandWithRaw;
    };
    driving: {
        drive: (speed: number, heading: number, flags: DriveFlag[]) => ICommandWithRaw;
        driveAsRc: (heading: number, speed: number) => ICommandWithRaw;
    };
    power: {
        batteryVoltage: () => ICommandWithRaw;
        sleep: () => ICommandWithRaw;
        something2: () => ICommandWithRaw;
        something3: () => ICommandWithRaw;
        something4: () => ICommandWithRaw;
        wake: () => ICommandWithRaw;
    };
    somethingApi: {
        something5: () => ICommandWithRaw;
    };
    systemInfo: {
        appVersion: () => ICommandWithRaw;
        something: () => ICommandWithRaw;
        something6: () => ICommandWithRaw;
        something7: () => ICommandWithRaw;
    };
    userIo: {
        allLEDsRaw: (payload: number[]) => ICommandWithRaw;
        setBackLedIntensity: (i: number) => ICommandWithRaw;
        setMainLedBlueIntensity: (b: number) => ICommandWithRaw;
        setMainLedColor: (r: number, g: number, b: number) => ICommandWithRaw;
        setMainLedGreenIntensity: (g: number) => ICommandWithRaw;
        setMainLedRedIntensity: (r: number) => ICommandWithRaw;
        playAudioFile: (idx: number) => ICommandWithRaw;
        turnDome: (angle: Uint8Array) => ICommandWithRaw;
        setStance: (stance: Stance) => ICommandWithRaw;
        playAnimation: (animation: number) => ICommandWithRaw;
    };
    sensor: {
        enableCollisionAsync: () => ICommandWithRaw;
        configureCollision: (xThreshold: number, yThreshold: number, xSpeed: number, ySpeed: number, deadTime: number, method?: number) => ICommandWithRaw;
        sensorMask: (payload: number[]) => ICommandWithRaw;
        sensor1: () => ICommandWithRaw;
        sensor2: () => ICommandWithRaw;
        configureSensorStream: () => ICommandWithRaw;
    };
};
export declare const decodeType: {
    add(byte: number): number | void;
};
export interface IQueuePayload {
    command: ICommandWithRaw;
    characteristic?: ICharacteristic;
}
export declare enum Event {
    onCollision = "onCollision",
    onSensor = "onSensor"
}
export declare class Core {
    protected commands: typeof commandsType;
    private peripheral;
    private apiV2Characteristic?;
    private dfuControlCharacteristic?;
    private antiDoSCharacteristic?;
    private decoder;
    private started;
    private queue;
    private initPromise;
    private initPromiseResolve;
    private eventsListeners;
    constructor(p: IPeripheral);
    /**
     * Determines and returns the current battery charging state
     */
    batteryVoltage(): Promise<number>;
    /**
     * Wakes up the toy from sleep mode
     */
    wake(): Promise<IQueuePayload>;
    /**
     * Sets the to into sleep mode
     */
    sleep(): Promise<IQueuePayload>;
    /**
     * Starts the toy
     */
    start(): Promise<void>;
    /**
     * Determines and returns the system app version of the toy
     */
    appVersion(): Promise<{
        major: number;
        minor: number;
    }>;
    on(eventName: Event, handler: (command: ICommandWithRaw) => void): void;
    destroy(): void;
    protected queueCommand(command: ICommandWithRaw): Promise<IQueuePayload>;
    private init;
    private onExecute;
    private match;
    private bindServices;
    private bindListeners;
    private onPacketRead;
    private eventHandler;
    private handleCollision;
    private handleSensorUpdate;
    private onApiRead;
    private onApiNotify;
    private onDFUControlNotify;
    private write;
}
