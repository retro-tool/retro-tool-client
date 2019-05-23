import React, { useContext } from "react";
import { Mutation } from "react-apollo";
import { DocumentNode } from "graphql";
import styled from "styled-components";
import { space, SpaceProps, themeGet } from "styled-system";
import { StatusContext } from "components";
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
  display: ${({ disabled }) => (disabled ? "none" : "block")};
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

type DeleteItemProps = {
  id: string;
  mutation: DocumentNode;
  className?: string;
};

const DeleteIcon = styled(Clear)`
  display: block;
  width: 12px;
  color: currentColor;
`;

const DeleteItem: React.FC<DeleteItemProps> = ({ className, id, mutation }) => {
  const { status } = useContext(StatusContext);

  const disabled = status === "final";

  return (
    <Mutation mutation={mutation}>
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
