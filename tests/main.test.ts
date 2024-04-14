import {env, createExecutionContext, waitOnExecutionContext} from 'cloudflare:test'
import {describe, it, expect} from 'vitest'
// Could import any other source file/function here
import {Manager} from '../src'

it('should be ok', async () => {
	const res = await env.MANAGER_SERVICE
})
