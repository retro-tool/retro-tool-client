import React from "react";
import { ActionItem, LoadingCard, Topic, Text, useStatus } from "components";
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
  const { status } = useStatus();

  const { subscribeToMore, data, loading, error } = useGetActionItemsQuery({
    variables: { slug }
  });

  if (loading) return <LoadingCard />;
  if (error) return null;

  const previousActionItems =
    data &&
    data.retro &&
    data.retro.previousRetro &&
    data.retro.previousRetro.actionItems;

  const actionItems =
    data && data.retro && data.retro.actionItems && data.retro.actionItems;

  const renderItem = item => {
    if (!item) return null;

    return (
      <ActionItem key={item.id} {...item}>
        {item.title}
      </ActionItem>
    );
  };

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
      <>
        {(status === "initial" || status === "review") && previousActionItems && (
          <>
            <Text color="secondaryGrey" mb={2} ml={9}>
              Action items from previous retro
            </Text>
            {previousActionItems.map(renderItem)}
          </>
        )}
        {actionItems && actionItems.map(renderItem)}
      </>
    </Topic>
  );
};

export default ActionItems;
