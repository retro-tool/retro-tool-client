import React from "react";
import styled from "styled-components/macro";
import { TruncatedText } from "./Text";
import { Flex, FlexType } from "./UI";
import { BaseItemContainer, ItemText, ItemLeft } from "./BaseItem";
import { DeleteActionItem } from "./DeleteActionItemButton";
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
  min-width: 0;
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
        <ItemText>
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
            <TruncatedText mt="-2px">{children}</TruncatedText>
          </Label>
        </ItemText>
      </ItemText>
    </ItemContainer>
  );
};

export default Item;
