# Workers Types Issues
Goal is to build a library around workers / durable objects. I don't have any compatibility date requirements in the library itself.

## Problems:
1. My worker code has `types: ["@cloudflare/workers-types"]`, my test code has `types: ["@cloudflare/workers-types/experimental", "@cloudflare/vitest-pool-workers"]`. This doesn't throw any explicit errors, but when attempting to access the durable object rpc, it doesn't include the rpc types.
2. Removing the `experimental` from the test code works, and gives the correct types, but at runtime throws `The receiving Durable Object does not support RPC, because its class was not declared with `extends DurableObject`.`
