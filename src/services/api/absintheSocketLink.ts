import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";

export default uuid =>
  createAbsintheSocketLink(
    AbsintheSocket.create(
      new PhoenixSocket("ws://localhost:4000/socket", {
        params: { user_uuid: uuid }
      })
    )
  );
