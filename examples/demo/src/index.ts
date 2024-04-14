import { make } from "workers-types-repro";
import { DurableObject } from "cloudflare:workers";

export class MyDo extends DurableObject {
  test = make(this.ctx)
}
