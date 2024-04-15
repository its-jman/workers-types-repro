import {DurableObject, WorkerEntrypoint} from 'cloudflare:workers'

export interface Env {
	MANAGER: DurableObjectNamespace<Manager>
}

export class Manager extends DurableObject<Env> {
	fetch() {
		return new Response('')
	}
	async test(at: number, val: string) {
		await this.ctx.storage.put('test', val)
		await this.ctx.storage.setAlarm(at)
		return val
	}
}

export default {
	fetch() {
		return new Response('N/A')
	},
} satisfies ExportedHandler<Env>
