import { writeStorage, useLocalStorage } from "@rehooks/local-storage";
import { useSlug } from "components/Slug.context";
import { client } from "services/api";
import gql from "graphql-tag";

type Uuid = string;

const useUserId = (): Uuid | null => {
  const slug = useSlug();
  const [uuid] = useLocalStorage("uuid");

  const getUuid = async () => {
    const { data } = await client.query({
      query: gql`
        {
          currentUser (retroSlug: "${slug}") {
            uuid
          }
        }
      `
    });

    writeStorage("uuid", data.currentUser.uuid);
  };

  !uuid && getUuid();

  return uuid;
};

export { useUserId };
