import React from "react";
import { DeleteItem } from "./DeleteItemButton";
import { useRemoveActionItemMutation } from "generated/graphql";

type Props = {
  id: string;
  className?: string;
};

const DeleteActionItem: React.FC<Props> = ({ className, id }) => (
  <DeleteItem
    mutation={useRemoveActionItemMutation}
    className={className}
    id={id}
  />
);

export { DeleteActionItem };
