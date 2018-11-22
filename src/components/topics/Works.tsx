import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Item, Topic } from "..";
import { Slug } from "../../types";

const GET_WORKS_ITEMS = gql`
  query Retro($slug: String) {
    retro(slug: $slug) {
      works {
        id
        hidden
        title
        votes
      }
    }
  }
`;

const SUBSCRIBE_WORKS_ITEMS = gql`
  subscription onItemAdded($slug: String!) {
    retroUpdated(slug: $slug) {
      works {
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
    works: Array<{
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

class WorksQuery extends Query<Data, Variables> {}

type WorksProps = {
  slug: Slug;
};

// @ts-ignore
const Works = ({ slug }: WorksProps) => (
  <WorksQuery query={GET_WORKS_ITEMS} variables={{ slug }}>
    {({ subscribeToMore, ...result }) => {
      if (result.loading) return <div>"LOADING"</div>;
      if (result.error) return <div>"ERROR"</div>;

      return (
        <Topic
          title="😃"
          slug={slug}
          subscribeToNewItems={() =>
            subscribeToMore({
              document: SUBSCRIBE_WORKS_ITEMS,
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
            result.data.retro.works.map(item => (
              <Item key={item.id}>{item.title}</Item>
            ))}
        </Topic>
      );
    }}
  </WorksQuery>
);

export default Works;
