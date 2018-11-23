import React, { useState, useContext } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Input, SlugContext } from ".";

const CREATE_ITEM = gql`
  mutation CreateITem($slug: String!, $title: String!) {
    createActionItem(retroSlug: $slug, title: $title) {
      completed
      id
      title
    }
  }
`;

const CreateItem = () => {
  const [value, setValue] = useState("");
  const { slug } = useContext(SlugContext);

  return (
    <Mutation mutation={CREATE_ITEM}>
      {(createItem, { loading, error }) => (
        <Input
          ml={2}
          flex="1 1 auto"
          placeholder="We need to do..."
          onSubmit={title => {
            if (!title) return;

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
