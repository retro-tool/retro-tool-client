import React from "react";
import { useCreateRetroQuery } from "generated/graphql";
import { Redirect } from "@reach/router";
import { RouteComponentProps } from "@reach/router";

const CreateRetro: React.FC<RouteComponentProps> = () => {
  const { data, loading, error } = useCreateRetroQuery();

  if (loading) return null;
  if (error) return null;
  if (!data || !data.retro) return null;

  return <Redirect noThrow to={`/${data.retro.slug}`} />;
};

export default CreateRetro;
