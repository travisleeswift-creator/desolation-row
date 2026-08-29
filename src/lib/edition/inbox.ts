import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";

const contactInput = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120),
  body: z.string().trim().min(10).max(2000),
});

const listInput = z.object({
  name: z.string().trim().max(80).optional(),
  email: z.string().trim().email().max(120),
});

export const submitContact = createServerFn({ method: "POST" })
  .validator(contactInput)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into contact_messages (name, email, body)
      values (${data.name}, ${data.email}, ${data.body})
    `;
    return { ok: true as const };
  });

export const joinPartTwo = createServerFn({ method: "POST" })
  .validator(listInput)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into part_two_list (name, email)
      values (${data.name ?? null}, ${data.email})
      on conflict (email) do nothing
    `;
    return { ok: true as const };
  });
