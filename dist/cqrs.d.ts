export type Command<T = unknown> = {
    type: string;
    data: T;
};
type CommandHandler<T = any> = (data: T) => Promise<void>;
export declare function registerCommand<T>(type: string, handler: CommandHandler<T>): void;
export declare function dispatchCommand<T>(command: Command<T>): Promise<void>;
export {};
