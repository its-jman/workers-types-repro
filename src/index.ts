import {DurableObject, WorkerEntrypoint} from 'cloudflare:workers'
import {z} from "zod"

export interface Env {
	MANAGER: DurableObjectNamespace
}

export class Manager  {
	constructor(private ctx: DurableObjectState, private env: Env) {}
	async fetch(req: Request) {
		const data = z.object({at: z.number(), val: z.string()}).parse(await req.json())
		const resp = await this.test(data.at, data.val)
		return new Response(resp)
	}
	async test(at: number, val: string) {
		await this.ctx.storage.put("test", val)
		await this.ctx.storage.setAlarm(at)
		return "ok"
  }
}

export default {
	fetch() {
		return new Response('N/A')
	},
} satisfies ExportedHandler<Env>
