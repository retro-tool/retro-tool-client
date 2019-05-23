import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Input } from "components";
import { useSlug } from "components/Slug.context";
import { Topic } from "types";

const createItemMutations = {
  works: "createWorksItem",
  improve: "createImproveItem",
  others: "createOtherItem"
};

const CREATE_ITEM = (topic: Topic) =>
  gql`
    mutation CreateITem($slug: String!, $title: String!) {
      ${createItemMutations[topic]} (retroSlug: $slug, title: $title) {
        id
        hidden
        title
        userUuid
        votes
      }
    }
  `;

type Props = {
  topic: Topic;
  placeholder?: string;
};

const CreateItem = ({ topic, placeholder }: Props) => {
  const [value, setValue] = useState("");
  const slug = useSlug();

  return (
    <Mutation mutation={CREATE_ITEM(topic)}>
      {(createItem, { loading, error }) => (
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
      )}
    </Mutation>
  );
};

export default CreateItem;
