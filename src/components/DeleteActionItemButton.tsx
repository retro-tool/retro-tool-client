import React, { useContext } from "react";
import gql from "graphql-tag";
import { DeleteItem } from "./DeleteItemButton";

const REMOVE_ITEM = gql`
  mutation RemoveActionItem($id: String!) {
    removeActionItem(id: $id) {
      id
    }
  }
`;

type DeleteActionItemProps = {
  id: string;
  className?: string;
};

const DeleteActionItem: React.FC<DeleteActionItemProps> = ({
  className,
  id
}) => {
  return <DeleteItem mutation={REMOVE_ITEM} className={className} id={id} />;
};

export { DeleteActionItem };
