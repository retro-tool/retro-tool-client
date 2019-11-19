import React, { useState } from "react";
import { Input } from "components";
import { useSlug } from "components/Slug.context";
import { useCreateActionItemMutation } from "generated/graphql";

const CreateItem = () => {
  const [value, setValue] = useState("");
  const slug = useSlug();
  const [createActionItemMutation] = useCreateActionItemMutation();

  return (
    <Input
      ml={2}
      flex="1 1 auto"
      placeholder="We need to do..."
      onSubmit={title => {
        if (!title) return;

        createActionItemMutation({ variables: { slug: slug, title } });
        setValue("");
      }}
      onChange={title => setValue(title)}
      value={value}
    />
  );
};

export default CreateItem;
