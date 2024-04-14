import {DurableObject, WorkerEntrypoint} from 'cloudflare:workers'

export interface Env {
	MANAGER: DurableObjectNamespace<Manager>
}

export class Manager extends DurableObject<Env> {
	async test(ctx: string) {}
}

export default {
	fetch() {
		return new Response('N/A')
	},
} satisfies ExportedHandler<Env>
