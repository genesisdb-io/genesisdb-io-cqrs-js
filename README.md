# CQRS

### Register commands

```ts
import { z } from "zod"
import { registerCommand } from "@/lib/cqrs"

export const RegisterUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type Input = z.infer<typeof RegisterUserSchema>

registerCommand("register-user", async (data: Input) => {
  const validated = RegisterUserSchema.parse(data)

  // Everything that the command should do, happens here ...

  console.log("RegisterUserCommand received:", validated)
})
```

### Example command route

```ts
import { dispatchCommand } from "@/lib/cqrs"
import "@/commands/register-user"
import * from "@/commands"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body?.type || !body?.data) {
      return new Response("Missing 'type' or 'data'", { status: 400 })
    }

    await dispatchCommand(body)
    return new Response("Command executed", { status: 200 })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return new Response(`Error: ${message}`, { status: 400 })
  }
}
```

### Do what you want ... maybe with an server action, for example.

```ts
await fetch("/api/commands", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "register-user",
    data: {
      firstName: "Bruce",
      lastname: "Wayne",
      emailAddress: "bruce.wayne@enterprise.wayne",
      password: "super-secret-password"
    }
  })
})
```
