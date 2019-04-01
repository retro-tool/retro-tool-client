import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";

const LOCAL_SOCKET_URL = "ws://localhost:4000/";
const socketUrl =
  process.env.NODE_ENV === "development" ? LOCAL_SOCKET_URL : "/";

export default uuid =>
  createAbsintheSocketLink(
    AbsintheSocket.create(
      new PhoenixSocket(`${socketUrl}socket`, {
        params: { user_uuid: uuid }
      })
    )
  );
