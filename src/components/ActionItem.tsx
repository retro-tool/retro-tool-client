import React from "react";
import styled from "styled-components/macro";
import { ItemText, ItemLeft, Text } from "components";
import { Box, Flex, FlexType } from "./UI";
import { BaseItemContainer } from "./BaseItem";
import { DeleteActionItem } from "components/DeleteActionItemButton";
import { ActionItem, useToggleCompletedMutation } from "generated/graphql";
import { space, SpaceProps } from "styled-system";

const DeleteItemButton = styled(DeleteActionItem)`
  display: none;
  position: absolute;
  top: 11px;
  left: 16px;
  transform: rotate(45deg);
`;

const ItemContainer = styled(BaseItemContainer)`
  &:hover ${DeleteItemButton} {
    display: block;
  }
`;

const Label = styled(Flex).attrs({ as: "label" })<FlexType>`
  cursor: pointer;
`;

const Checkbox = styled.input.attrs<SpaceProps>({ type: "checkbox", mr: 2 })`
  ${space}
  cursor: pointer;
`;

const Item: React.FC<ActionItem> = ({ children, id, completed, title }) => {
  const [toggleComplete] = useToggleCompletedMutation();

  return (
    <ItemContainer>
      <ItemText>
        <ItemLeft>
          <DeleteItemButton id={id} />
        </ItemLeft>
        <Text>
          <Label>
            <Checkbox
              checked={completed}
              onChange={() =>
                // @ts-ignore
                toggleComplete({
                  variables: {
                    id: id
                  },
                  optimisticResponse: {
                    __typename: "Mutation",
                    toggleCompleted: {
                      id: id,
                      __typename: "ActionItem",
                      title: title,
                      completed: !completed
                    }
                  }
                })
              }
            />
            <Box mt="-2px">{children}</Box>
          </Label>
        </Text>
      </ItemText>
    </ItemContainer>
  );
};

export default Item;
