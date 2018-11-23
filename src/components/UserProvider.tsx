import React, { useContext, useEffect, useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { SlugContext } from "./SlugProvider";
import { Slug } from "../types";

export const UserContext = React.createContext({
  user: { votesLeft: 0 }
});

const QUERY_VOTES_LEFT = gql`
  query VotesLeft($slug: String!) {
    currentUser(retroSlug: $slug) {
      uuid
      votesLeft
    }
  }
`;

const SUBSCRIBE_TO_VOTES = gql`
  subscription VotesUpdated($slug: String!) {
    currentUserUpdated(retroSlug: $slug) {
      uuid
      votesLeft
    }
  }
`;

interface Data {
  currentUserUpdated: {
    votesLeft: number;
  };
}

interface Variables {
  slug: Slug;
}

class VotesLeftQuery extends Query<Data, Variables> {}

const SubscribeToVotesLeft = ({ children, subscribeToVotesLeft }) => {
  useEffect(() => {
    subscribeToVotesLeft();
  }, []);

  return children;
};

export default ({ children }) => {
  const { slug } = useContext(SlugContext);
  const [user, setUser] = useState({ votesLeft: 0 });

  return (
    <VotesLeftQuery query={QUERY_VOTES_LEFT} variables={{ slug }}>
      {({ subscribeToMore, ...result }) => {
        if (result.loading) return null;
        if (result.error) return null;

        return (
          <SubscribeToVotesLeft
            subscribeToVotesLeft={() => {
              // @ts-ignore
              const currentVotesLeft = result.data.currentUser.votesLeft;
              setUser({ votesLeft: currentVotesLeft });

              console.log("first query result:", result);

              subscribeToMore({
                document: SUBSCRIBE_TO_VOTES,
                variables: { slug },
                // @ts-ignore
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  const votesLeft =
                    subscriptionData.data.currentUserUpdated.votesLeft;

                  if (currentVotesLeft !== votesLeft) {
                    setUser({
                      votesLeft:
                        subscriptionData.data.currentUserUpdated.votesLeft
                    });
                  }
                }
              });
            }}
          >
            {/*
            // @ts-ignore */}
            <UserContext.Provider value={{ user }}>
              {children}
            </UserContext.Provider>
          </SubscribeToVotesLeft>
        );
      }}
    </VotesLeftQuery>
  );
};
