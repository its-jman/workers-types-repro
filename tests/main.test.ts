import {env, createExecutionContext, waitOnExecutionContext} from 'cloudflare:test'
import {describe, it, expect} from 'vitest'
// Could import any other source file/function here
import {Manager} from '../src'

it('should be ok', async () => {
	const stub = env.MANAGER.get(env.MANAGER.idFromName('main'))
	return await stub.test("")
})
