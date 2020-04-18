import useSessionStorage from "react-use/lib/useSessionStorage";
import { useSlug } from "components/Slug.context";
import { client } from "services/api";
import gql from "graphql-tag";

type Uuid = string;

const useUserId = (): Uuid | null => {
  const slug = useSlug();
  const [uuid, setUuid] = useSessionStorage("uuid");

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

    setUuid(data.currentUser.uuid);
  };

  !uuid && getUuid();

  return uuid;
};

export { useUserId };
