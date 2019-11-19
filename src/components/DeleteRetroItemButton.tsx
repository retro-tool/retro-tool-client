import React from "react";
import { DeleteItem } from "./DeleteItemButton";
import { useRemoveRetroItemMutation } from "generated/graphql";

type Props = {
  id: string;
  className?: string;
};

const DeleteRetroItem: React.FC<Props> = ({ className, id }) => (
  <DeleteItem
    mutation={useRemoveRetroItemMutation}
    className={className}
    id={id}
  />
);

export { DeleteRetroItem };
