export interface Operation<Payload, Response> {
  execute: (payload: Payload) => Promise<Response>;
}
