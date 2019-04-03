import React, { useContext } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ActionItem, LoadingCard, Topic, SlugContext } from ".";
import { Slug } from "../types";

const GET_ACTION_ITEMS = gql`
  query Retro($slug: String) {
    retro(slug: $slug) {
      actionItems {
        completed
        id
        title
      }
    }
  }
`;

const SUBSCRIBE_ACTION_ITEMS = gql`
  subscription onActionItemAdded($slug: String!) {
    retroUpdated(slug: $slug) {
      actionItems {
        completed
        id
        title
      }
      status
    }
  }
`;

interface Data {
  retro: {
    [key: string]: Array<{
      id: string;
      completed: boolean;
      title: string;
    }>;
  };
}

interface Variables {
  slug: Slug;
}

class QueryActionItems extends Query<Data, Variables> {}

type ActionItemsProps = {
  title: React.ReactNode;
};

const ActionItems = ({ title }: ActionItemsProps) => {
  const { slug } = useContext(SlugContext);

  return (
    <QueryActionItems query={GET_ACTION_ITEMS} variables={{ slug }}>
      {({ subscribeToMore, ...result }) => {
        if (result.loading) return <LoadingCard />;
        if (result.error) return null;

        return (
          <Topic
            title={title}
            subscribeToNewItems={() =>
              subscribeToMore({
                document: SUBSCRIBE_ACTION_ITEMS,
                variables: { slug },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  // @ts-ignore
                  const newActionItems = subscriptionData.data.retroUpdated;

                  return {
                    retro: newActionItems
                  };
                }
              })
            }
          >
            {result.data &&
              result.data.retro.actionItems.map(item => (
                <ActionItem
                  key={item.id}
                  completed={item.completed}
                  id={item.id}
                >
                  {item.title}
                </ActionItem>
              ))}
          </Topic>
        );
      }}
    </QueryActionItems>
  );
};

export default ActionItems;
