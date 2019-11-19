import React, { useContext } from "react";
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

const DeleteIcon = styled(Clear)`
  display: block;
  width: 12px;
  color: currentColor;
`;

type Props = {
  id: string;
  mutation: Function;
  className?: string;
};

const DeleteItem: React.FC<Props> = ({ className, id, mutation }) => {
  const { status } = useContext(StatusContext);
  const disabled = status === "final";
  const [removeItem] = mutation();

  return (
    <DeleteItemContainer className={className} disabled={disabled}>
      <DeleteItemButton onClick={() => removeItem({ variables: { id } })}>
        <DeleteIcon />
      </DeleteItemButton>
    </DeleteItemContainer>
  );
};

export { DeleteItem };
