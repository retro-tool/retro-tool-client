import React from "react";
import { ActionItem, LoadingCard, Topic } from "components";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

import {
  useGetActionItemsQuery,
  OnActionItemAddedDocument,
  useToggleCompletedMutation
} from "generated/graphql";
import { useSlug } from "components/Slug.context";

type LabelProps = SpaceProps;

const Label = styled.label<LabelProps>`
  cursor: pointer;
`;

type CheckboxProps = SpaceProps;

const Checkbox = styled.input.attrs<CheckboxProps>({ type: "checkbox", mr: 2 })`
  ${space}
  cursor: pointer;
`;

type Props = {
  title: React.ReactNode;
};

const ActionItems: React.FC<Props> = ({ title }) => {
  const slug = useSlug();
  const { subscribeToMore, data, loading, error } = useGetActionItemsQuery({
    variables: { slug }
  });
  const [toggleComplete] = useToggleCompletedMutation();

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
            <ActionItem key={item.id} id={item.id}>
              <Label>
                <Checkbox
                  checked={item.completed}
                  onChange={() =>
                    // @ts-ignore
                    toggleComplete({
                      variables: {
                        id: item.id
                      },
                      optimisticResponse: {
                        __typename: "Mutation",
                        toggleCompleted: {
                          id: item.id,
                          __typename: "ActionItem",
                          title: item.title,
                          completed: !item.completed
                        }
                      }
                    })
                  }
                />
                {item.title}
              </Label>
            </ActionItem>
          );
        })}
    </Topic>
  );
};

export default ActionItems;
