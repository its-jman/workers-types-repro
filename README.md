# Workers Types Issues

Goal is to build a library around workers / durable objects. I don't have any compatibility date requirements in the library itself.

## Problems:

1. My worker code has `types: ["@cloudflare/workers-types"]`, my test code has `types: ["@cloudflare/workers-types/experimental", "@cloudflare/vitest-pool-workers"]`. This doesn't throw any explicit errors, but when attempting to access the durable object rpc, it doesn't include the rpc types.
2. Removing the `experimental` from the test code works, and gives the correct types, but at runtime throws `The receiving Durable Object does not support RPC, because its class was not declared with "extends DurableObject".`
3. Adding `rpc` compat flag says "The compatibility flag rpc became the default", but it does change the error. Now just getting "Vitest caught 1 unhandled error during the test run." -- "The Workers runtime failed to start. There is likely additional logging output above." -- "Serialized Error: { code: 'ERR_RUNTIME_FAILURE' }"
   - Resolved with new version of wrangler and vitest-integration
4. Worker "core:user:vitest-pool-workers-runner-"'s binding "MANAGER_SERVICE" refers to a service "core:user:manager", but no such service is defined.
5. Failed to pop isolated storage stack frame in tests/main.test.ts's test...
   - This gets resolved in non-RPC by ensuring you consume the requests body (per this thread https://discord.com/channels/595317990191398933/1218150105777963101/1227337525484326933), but no luck resolving with RPC communication.
   - This gets resolved in RPC by stuffing your call inside `runInDurableObject`. `runInDurableObject` doesn't correctly infer the type of your RPC. You have to manually type.
6. `'(inst: Manager)' is not assignable to '(instance: DurableObject)' Type 'DurableObject' is missing types from 'Manager': [Rpc.__DURABLE_OBJECT_BRAND]` when passing to runInDurableObject
   - Resolved by adding a blank `fetch` handler to the durable object.
