export type Command<T = unknown> = {
  type: string
  data: T
}

type CommandHandler<T = any> = (data: T) => Promise<void>

const registry = new Map<string, CommandHandler<any>>()

export function registerCommand<T>(type: string, handler: CommandHandler<T>) {
  if (registry.has(type)) {
    throw new Error(`Command '${type}' is already registered`)
  }
  registry.set(type, handler)
}

export async function dispatchCommand<T>(command: Command<T>): Promise<void> {
  const handler = registry.get(command.type)
  if (!handler) {
    throw new Error(`No handler for command '${command.type}'`)
  }
  await handler(command.data)
}
