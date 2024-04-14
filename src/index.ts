import {DurableObject, WorkerEntrypoint} from 'cloudflare:workers'

export interface Env {
	MANAGER: DurableObjectNamespace<Manager>
	MANAGER_SERVICE: Service<ManagerService>
}

export class Manager extends DurableObject<Env> {
	async test(ctx: string) {
    return "5"
  }
}

export class ManagerService extends WorkerEntrypoint<Env> {
	async testService() {
		const stub = this.env.MANAGER.get(this.env.MANAGER.idFromName('main'))
		return await stub.test("abc")
	}
}

export default {
	fetch() {
		return new Response('N/A')
	},
} satisfies ExportedHandler<Env>
