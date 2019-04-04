import React, { useContext } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import {
  borderColor,
  BorderColorProps,
  space,
  SpaceProps,
  themeGet
} from "styled-system";
import { StatusContext } from ".";
import { Clear } from "styled-icons/material/Clear";

interface DeleteItemContainerProps extends SpaceProps {
  disabled: boolean;
  className?: string;
}
const DeleteItemContainer = styled.div.attrs({
  p: 1
})<DeleteItemContainerProps>`
  display: flex;
  align-items: center;
  background: white;
  display: ${({ disabled }) => (disabled ? "none" : "block")};
  border-color: ${({ theme }) => theme.colors.borderGrey};
  border-width: 0 0 1px 1px;
  border-style: solid;
  border-radius: 99px;

  ${space}
`;

const DeleteItemButton = styled.button.attrs({
  p: "2px"
})`
  display: block;
  cursor: pointer;
  border: none;
  padding: 0;
  background: transparent;
  color: white;
  background: ${themeGet("colors.mediumGrey")};
  border-radius: 99px;
  transform: rotate(45deg);

  ${space}

  &:hover {
    background: ${themeGet("colors.red")};
  }

  &:focus {
    outline: none;
  }
`;

const REMOVE_ITEM = gql`
  mutation RemoveItem($id: String!) {
    removeItem(id: $id) {
      id
    }
  }
`;

type DeleteItemProps = {
  id: string;
  className?: string;
};

const DeleteIcon = styled(Clear)`
  display: block;
  width: 12px;
  color: currentColor;
`;

const DeleteItem: React.FC<DeleteItemProps> = ({ className, id }) => {
  const { status } = useContext(StatusContext);

  const disabled = status === "final";

  return (
    <Mutation mutation={REMOVE_ITEM}>
      {removeItem => {
        return (
          <DeleteItemContainer className={className} disabled={disabled}>
            <DeleteItemButton onClick={() => removeItem({ variables: { id } })}>
              <DeleteIcon />
            </DeleteItemButton>
          </DeleteItemContainer>
        );
      }}
    </Mutation>
  );
};

export { DeleteItem };
