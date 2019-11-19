import React, { useState } from "react";
import { Input } from "components";
import {
  useCreateWorksItemMutation,
  useCreateImproveItemMutation,
  useCreateOtherItemMutation
} from "generated/graphql";
import { useSlug } from "components/Slug.context";
import { Topic } from "types";

const createItemMutations = {
  works: useCreateWorksItemMutation,
  improve: useCreateImproveItemMutation,
  others: useCreateOtherItemMutation
};

type Props = {
  topic: Topic;
  placeholder?: string;
};

const CreateItem = ({ topic, placeholder }: Props) => {
  const [value, setValue] = useState("");
  const slug = useSlug();
  const [createItem] = createItemMutations[topic]();

  return (
    <Input
      ml={2}
      flex="1 1 auto"
      placeholder={placeholder}
      onSubmit={title => {
        if (!title) return;
        createItem({ variables: { slug: slug, title } });
        setValue("");
      }}
      onChange={title => setValue(title)}
      value={value}
      shouldFocus={topic === "works"}
    />
  );
};

export default CreateItem;
