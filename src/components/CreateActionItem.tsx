import React, { useState } from "react";
import { Input } from "components";
import { useSlug } from "components/Slug.context";
import { useCreateActionItemMutation } from "generated/graphql";

type Props = {
  disabled: boolean;
};

const CreateItem = ({ disabled }: Props) => {
  const [value, setValue] = useState("");
  const slug = useSlug();
  const [createActionItemMutation] = useCreateActionItemMutation();

  return (
    <Input
      placeholder="We need to do..."
      onSubmit={title => {
        if (!title) return;

        createActionItemMutation({ variables: { slug: slug, title } });
        setValue("");
      }}
      onChange={title => setValue(title)}
      value={value}
      disabled={disabled}
    />
  );
};

export default CreateItem;
