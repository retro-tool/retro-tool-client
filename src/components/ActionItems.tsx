import React from "react";
import { ActionItem, LoadingCard, Topic } from "components";
import {
  useGetActionItemsQuery,
  OnActionItemAddedDocument
} from "generated/graphql";
import { useSlug } from "components/Slug.context";

type Props = {
  title: React.ReactNode;
};

const ActionItems: React.FC<Props> = ({ title }) => {
  const slug = useSlug();

  const { subscribeToMore, data, loading, error } = useGetActionItemsQuery({
    variables: { slug }
  });

  if (loading) return <LoadingCard />;
  if (error) return null;

  return (
    <Topic
      title={title}
      subscribeToNewItems={() =>
        subscribeToMore({
          document: OnActionItemAddedDocument,
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
      {data &&
        data.retro &&
        data.retro.actionItems &&
        data.retro.actionItems.map(item => {
          if (!item) return null;

          return (
            <ActionItem key={item.id} completed={item.completed} id={item.id}>
              {item.title}
            </ActionItem>
          );
        })}
    </Topic>
  );
};

export default ActionItems;
