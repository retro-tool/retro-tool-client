import React from "react";
import gql from "graphql-tag";
import { DeleteItem } from "./DeleteItemButton";

const REMOVE_ITEM = gql`
  mutation RemoveItem($id: String!) {
    removeItem(id: $id) {
      id
    }
  }
`;

type DeleteRetroItemProps = {
  id: string;
  className?: string;
};

const DeleteRetroItem: React.FC<DeleteRetroItemProps> = ({ className, id }) => {
  return <DeleteItem mutation={REMOVE_ITEM} className={className} id={id} />;
};

export { DeleteRetroItem };
