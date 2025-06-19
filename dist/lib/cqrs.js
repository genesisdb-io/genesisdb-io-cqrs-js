const registry = new Map();
export function registerCommand(type, handler) {
    if (registry.has(type)) {
        throw new Error(`Command '${type}' is already registered`);
    }
    registry.set(type, handler);
}
export async function dispatchCommand(command) {
    const handler = registry.get(command.type);
    if (!handler) {
        throw new Error(`No handler for command '${command.type}'`);
    }
    await handler(command.data);
}
