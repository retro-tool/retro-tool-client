import React, { useContext, useEffect, useState } from "react";
import c from "color";
import styled from "styled-components/macro";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Item, LoadingCard, Topic, StatusContext } from "components";
import { useSlug } from "components/Slug.context";
import { Slug, Topic as TopicType, Item as ItemType } from "types";

const getItems = (topic: TopicType) =>
  gql`
    query Retro($slug: String) {
      retro(slug: $slug) {
        ${topic} {
          id
          hidden
          title
          ref
          votes
          similarItems {
            id
            title
          }
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
          ref
          similarItems {
            id
            title
          }
        }
        status
      }
    }
  `;

interface Data {
  retro: {
    [key: string]: ItemType[];
  };
  retroUpdated?: {
    [key: string]: ItemType[];
  };
}

interface DraggableItemProps {
  combineWith?: string | null;
  combineTargetFor?: string | null;
  isDragging: boolean;
}

const DraggableItem = styled.div<DraggableItemProps>`
  position: relative;
  background: ${({ combineTargetFor, theme }) =>
    combineTargetFor
      ? c(theme.colors.lime)
          .alpha(0.2)
          .rgb()
          .string()
      : "white"};
  transition: background 0.2s ease;
  box-shadow: ${({ isDragging }) =>
    isDragging && "0 0 1px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.15)"};
  border-radius: ${({ isDragging }) => isDragging && "3px"};
  outline: ${({ combineTargetFor, theme }) =>
    combineTargetFor ? `2px dashed ${theme.colors.lime}` : "none"};
  z-index: ${({ combineTargetFor }) => combineTargetFor && 2};

  &:hover {
    cursor: hand;
  }
`;

interface ItemListProps {
  items: ItemType[];
}

interface ReorderItemsParams {
  items: ItemType[];
  startIndex: number;
  endIndex: number;
}

const reorderItems = ({
  items,
  startIndex,
  endIndex
}: ReorderItemsParams): ItemType[] => {
  const result = Array.from(items);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface CombineItemsParams {
  items: ItemType[];
  childIndex: number;
  parentId: string;
}

const combineItems = ({
  items,
  childIndex,
  parentId
}: CombineItemsParams): ItemType[] => {
  const combinedItems = items.map(item => {
    return item.id === parentId
      ? {
          ...item,
          similarItems: item.similarItems,
          votes: item.votes + items[childIndex].votes
        }
      : item;
  });
  const filteredItems = combinedItems.filter(
    (_item, index) => index !== childIndex
  );

  return filteredItems;
};

const COMBINE_ITEMS = gql`
  mutation CombineItems($parentId: String!, $childId: String!) {
    combineItems(parentId: $parentId, childId: $childId) {
      id
    }
  }
`;

const ItemList = ({ items: itemsProp }: ItemListProps) => {
  const [items, setItems] = useState(itemsProp);
  const { status } = useContext(StatusContext);

  const onDragEnd = (result, combineItemsMutation) => {
    if (result.destination) {
      const reorderedItems = reorderItems({
        items,
        startIndex: result.source.index,
        endIndex: result.destination.index
      });
      setItems(reorderedItems);
    } else if (result.combine) {
      const parentId = result.combine.draggableId;
      const childId = result.draggableId;

      combineItemsMutation({ variables: { parentId, childId } });
      const combinedItems = combineItems({
        items,
        parentId,
        childIndex: result.source.index
      });
      setItems(combinedItems);
    }
  };

  useEffect(() => {
    setItems(itemsProp);
  }, [itemsProp]);

  return (
    <Mutation mutation={COMBINE_ITEMS}>
      {(combineItems, { data, loading }) => {
        return (
          <DragDropContext
            onDragEnd={result => {
              onDragEnd(result, combineItems);
            }}
          >
            <Droppable droppableId="droppable" isCombineEnabled>
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((item, index) => {
                    const dragIsDisabled =
                      status === `initial` ||
                      status === `actions` ||
                      item.similarItems.length > 0;

                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        isDragDisabled={dragIsDisabled}
                      >
                        {(provided, snapshot) => (
                          <DraggableItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            combineWith={snapshot.combineWith}
                            combineTargetFor={snapshot.combineTargetFor}
                            isDragging={snapshot.isDragging}
                            style={{
                              userSelect: "none",
                              ...provided.draggableProps.style
                            }}
                          >
                            <Item key={item.id} item={item} />
                          </DraggableItem>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        );
      }}
    </Mutation>
  );
};

interface Variables {
  slug: Slug;
}

class QueryItems extends Query<Data, Variables> {}

type ItemsProps = {
  title: React.ReactNode;
  topic: TopicType;
  placeholder?: string;
};

const Items = ({ title, topic, placeholder }: ItemsProps) => {
  const slug = useSlug();

  return (
    <QueryItems query={getItems(topic)} variables={{ slug }}>
      {({ subscribeToMore, ...result }) => {
        if (result.loading) return <LoadingCard />;
        if (result.error) return null;

        return (
          <Topic
            title={title}
            topic={topic}
            placeholder={placeholder}
            subscribeToNewItems={() =>
              subscribeToMore({
                document: getSubscribeItems(topic),
                variables: { slug },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  const newItems = subscriptionData.data.retroUpdated
                    ? subscriptionData.data.retroUpdated
                    : prev.retro;

                  return {
                    retro: newItems
                  };
                }
              })
            }
          >
            {result.data && <ItemList items={result.data.retro[topic]} />}
          </Topic>
        );
      }}
    </QueryItems>
  );
};

export default Items;
