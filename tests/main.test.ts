import {
	env,
	runInDurableObject,
	createExecutionContext,
	waitOnExecutionContext,
} from 'cloudflare:test'
import {describe, it, expect, expectTypeOf} from 'vitest'
// Could import any other source file/function here
import {Manager} from '../src'

it('should be ok', async () => {
	const stub = env.MANAGER.get(env.MANAGER.idFromName('main'))
	const resp = await runInDurableObject(stub, (inst: Manager) =>
		inst.test(Date.now() + 60 * 1000, 'hi there')
	)

	expectTypeOf(resp).toEqualTypeOf('')
})
