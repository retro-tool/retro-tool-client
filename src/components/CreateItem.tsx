import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Input } from ".";
import { Slug, Topic } from "../types";

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
  slug: Slug;
  topic: Topic;
};

const CreateItem = ({ slug, topic }: Props) => {
  const [value, setValue] = useState("");

  return (
    <Mutation mutation={CREATE_ITEM(topic)}>
      {(createItem, { loading, error }) => (
        <Input
          ml={2}
          flex="1 1 auto"
          onSubmit={title => {
            createItem({ variables: { slug: slug, title } });
            setValue("");
          }}
          onChange={title => setValue(title)}
          value={value}
        />
      )}
    </Mutation>
  );
};

export default CreateItem;
