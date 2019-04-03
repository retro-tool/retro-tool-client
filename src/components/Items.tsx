import React, { useContext, useEffect, useState } from "react";
import c from "color";
import styled from "styled-components/macro";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Item, LoadingCard, Topic, SlugContext, StatusContext } from ".";
import { Slug, Topic as TopicType } from "../types";
import { themeGet } from "styled-system";

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
  retroUpdated?: {
    [key: string]: Array<{
      id: string;
      hidden: boolean;
      title: string;
      votes: number;
    }>;
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

type ItemT = {
  title: string;
  hidden?: boolean;
  id: string;
  votes: number;
};

type ParentItem = {
  title: string;
  hidden?: boolean;
  id: string;
  votes: number;
  similarItems?: ItemT[];
};

interface ItemListProps {
  items: ParentItem[];
}

interface ReorderItemsParams {
  items: ParentItem[];
  startIndex: number;
  endIndex: number;
}

const reorderItems = ({
  items,
  startIndex,
  endIndex
}: ReorderItemsParams): ParentItem[] => {
  const result = Array.from(items);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface CombineItemsParams {
  items: ParentItem[];
  childId: string;
  childIndex: number;
  parentId: string;
}

const combineItems = ({
  items,
  childId,
  childIndex,
  parentId
}: CombineItemsParams): ParentItem[] => {
  const combinedItems = items.map(item => {
    const similarItems = item.similarItems
      ? [...item.similarItems, items[childIndex]]
      : [items[childIndex]];

    return item.id === parentId
      ? {
          ...item,
          similarItems,
          votes: item.votes + items[childIndex].votes
        }
      : item;
  });
  const filteredItems = combinedItems.filter(
    (_item, index) => index !== childIndex
  );

  return filteredItems;
};

const ItemList = ({ items: itemsProp }: ItemListProps) => {
  const [items, setItems] = useState(itemsProp);
  const { status } = useContext(StatusContext);

  const onDragEnd = result => {
    if (result.destination) {
      const reorderedItems = reorderItems({
        items,
        startIndex: result.source.index,
        endIndex: result.destination.index
      });
      setItems(reorderedItems);
    } else if (result.combine) {
      const combinedItems = combineItems({
        items,
        childId: result.draggableId,
        childIndex: result.source.index,
        parentId: result.combine.draggableId
      });
      setItems(combinedItems);
    }
  };

  useEffect(() => {
    setItems(itemsProp);
  }, [itemsProp]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" isCombineEnabled>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => {
              const dragIsDisabled =
                status === `initial` ||
                status === `actions` ||
                !!item.similarItems;

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
                      <Item
                        key={item.id}
                        hidden={item.hidden}
                        id={item.id}
                        similarItems={item.similarItems}
                        votes={item.votes}
                      >
                        {item.title}
                      </Item>
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
