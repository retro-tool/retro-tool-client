import React, { useContext } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Item, LoadingCard, Topic, SlugContext } from ".";
import { Slug, Topic as TopicType } from "../types";

const getItems = (topic: TopicType) =>
  gql`
    query Retro($slug: String) {
      retro(slug: $slug) {
        ${topic} {
          id
          hidden
          title
          votes
        }
      }
    }
  `;

const getSubscribeItems = (topic: TopicType) =>
  gql`
    subscription onItemAdded($slug: String!) {
      retroUpdated(slug: $slug) {
        ${topic} {
          id
          hidden
          title
          votes
        }
        status
      }
    }
  `;

interface Data {
  retro: {
    [key: string]: Array<{
      id: string;
      hidden: boolean;
      title: string;
      votes: number;
    }>;
  };
}

interface Variables {
  slug: Slug;
}

class QueryItems extends Query<Data, Variables> {}

type ItemsProps = {
  title: string;
  topic: TopicType;
};

const Items = ({ title, topic }: ItemsProps) => {
  const { slug } = useContext(SlugContext);

  return (
    <QueryItems query={getItems(topic)} variables={{ slug }}>
      {({ subscribeToMore, ...result }) => {
        if (result.loading) return <LoadingCard />;
        if (result.error) return null;

        return (
          <Topic
            title={title}
            topic={topic}
            subscribeToNewItems={() =>
              subscribeToMore({
                document: getSubscribeItems(topic),
                variables: { slug },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  // @ts-ignore
                  const newItems = subscriptionData.data.retroUpdated;

                  return {
                    retro: newItems
                  };
                }
              })
            }
          >
            {result.data &&
              result.data.retro[topic].map(item => (
                <Item
                  key={item.id}
                  hidden={item.hidden}
                  id={item.id}
                  votes={item.votes}
                >
                  {item.title}
                </Item>
              ))}
          </Topic>
        );
      }}
    </QueryItems>
  );
};

export default Items;
