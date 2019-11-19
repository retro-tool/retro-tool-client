import React, { useContext, useEffect, useState } from "react";
import c from "color";
import styled from "styled-components/macro";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Item, LoadingCard, Topic, StatusContext } from "components";
import { useSlug } from "components/Slug.context";
import { Topic as TopicType } from "types";
import {
  RetroItem,
  useGetWorksItemsQuery,
  useGetImproveItemsQuery,
  useGetOthersItemsQuery,
  OnWorksItemAddedDocument,
  OnImproveItemAddedDocument,
  OnOthersItemAddedDocument,
  useCombineItemsMutation
} from "generated/graphql";

const getRetroItems = {
  works: useGetWorksItemsQuery,
  improve: useGetImproveItemsQuery,
  others: useGetOthersItemsQuery
};

const getSubscribeRetroDocuments = {
  works: OnWorksItemAddedDocument,
  improve: OnImproveItemAddedDocument,
  others: OnOthersItemAddedDocument
};

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
  items: RetroItem[];
}

interface ReorderItemsParams {
  items: RetroItem[];
  startIndex: number;
  endIndex: number;
}

const reorderItems = ({
  items,
  startIndex,
  endIndex
}: ReorderItemsParams): RetroItem[] => {
  const result = Array.from(items);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface CombineItemsParams {
  items: RetroItem[];
  childIndex: number;
  parentId: string;
}

const combineItems = ({
  items,
  childIndex,
  parentId
}: CombineItemsParams): RetroItem[] => {
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
    (_, index) => index !== childIndex
  );

  return filteredItems;
};

const ItemList = ({ items: itemsProp }: ItemListProps) => {
  const [items, setItems] = useState(itemsProp);
  const { status } = useContext(StatusContext);
  const [combineItemsMutation] = useCombineItemsMutation();

  const onDragEnd = result => {
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
    <DragDropContext
      onDragEnd={result => {
        onDragEnd(result);
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
};

type ItemsProps = {
  title: React.ReactNode;
  topic: TopicType;
  placeholder?: string;
};

const Items = ({ title, topic, placeholder }: ItemsProps) => {
  const slug = useSlug();
  const { subscribeToMore, data, loading, error } = getRetroItems[topic]({
    variables: { slug }
  });
  const [newItems, setNewItems] = useState();
  const [retroItems, setRetroItems] = useState();

  // Note: the next side effect is performed in order to maintain a consistent list of
  // retro items, because we query for retro items when the component is mounted and then
  // we keep updating them through a graphql subscription
  useEffect(() => {
    if (newItems) {
      setRetroItems(newItems);
      return;
    }

    if (!loading && data && data.retro) {
      setRetroItems(data.retro);
    }
  }, [loading, data, newItems]);

  if (loading) return <LoadingCard />;
  if (error) return null;

  return (
    <Topic
      title={title}
      topic={topic}
      placeholder={placeholder}
      subscribeToNewItems={() =>
        // @ts-ignore
        subscribeToMore({
          document: getSubscribeRetroDocuments[topic],
          variables: { slug },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;

            const newItems = subscriptionData.data.retroUpdated;
            setNewItems(newItems);

            return {
              retro: newItems
            };
          }
        })
      }
    >
      {retroItems && retroItems[topic] && (
        <ItemList items={retroItems[topic]} />
      )}
    </Topic>
  );
};

export default Items;
