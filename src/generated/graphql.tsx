import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ActionItem = {
  __typename?: "ActionItem";
  completed: Scalars["Boolean"];
  id: Scalars["ID"];
  title: Scalars["String"];
};

export type Retro = {
  __typename?: "Retro";
  actionItems: Array<Maybe<ActionItem>>;
  id: Scalars["Int"];
  improve: Array<Maybe<RetroItem>>;
  others: Array<Maybe<RetroItem>>;
  previousRetro?: Maybe<Retro>;
  slug: Scalars["String"];
  status: Scalars["String"];
  works: Array<Maybe<RetroItem>>;
};

export type RetroItem = {
  __typename?: "RetroItem";
  hidden: Scalars["Boolean"];
  id: Scalars["ID"];
  ref: Scalars["String"];
  similarItems: Array<Maybe<RetroItem>>;
  title?: Maybe<Scalars["String"]>;
  type: Scalars["String"];
  userUuid: Scalars["String"];
  votes: Scalars["Int"];
};

export type RetroItemVote = {
  __typename?: "RetroItemVote";
  id: Scalars["ID"];
};

export type RootMutationType = {
  __typename?: "RootMutationType";
  /** Adds a vote to an item */
  addVote?: Maybe<RetroItemVote>;
  /** Combine items into one */
  combineItems?: Maybe<RetroItem>;
  /** Create an action item */
  createActionItem?: Maybe<ActionItem>;
  /** Create a improve type item */
  createImproveItem?: Maybe<RetroItem>;
  /** Create a other type item */
  createOtherItem?: Maybe<RetroItem>;
  /** Create a works type item */
  createWorksItem?: Maybe<RetroItem>;
  /** Detach items into separate rows */
  detachItem?: Maybe<RetroItem>;
  /** Transitions retro to the next step */
  nextStep?: Maybe<Retro>;
  /** Remove action items */
  removeActionItem?: Maybe<ActionItem>;
  /** Remove items */
  removeItem?: Maybe<RetroItem>;
  /** Toggle action item completed status */
  toggleCompleted?: Maybe<ActionItem>;
};

export type RootMutationTypeAddVoteArgs = {
  itemId: Scalars["ID"];
};

export type RootMutationTypeCombineItemsArgs = {
  childId: Scalars["String"];
  parentId: Scalars["String"];
};

export type RootMutationTypeCreateActionItemArgs = {
  retroSlug: Scalars["String"];
  title: Scalars["String"];
};

export type RootMutationTypeCreateImproveItemArgs = {
  retroSlug: Scalars["String"];
  title: Scalars["String"];
};

export type RootMutationTypeCreateOtherItemArgs = {
  retroSlug: Scalars["String"];
  title: Scalars["String"];
};

export type RootMutationTypeCreateWorksItemArgs = {
  retroSlug: Scalars["String"];
  title: Scalars["String"];
};

export type RootMutationTypeDetachItemArgs = {
  id: Scalars["String"];
};

export type RootMutationTypeNextStepArgs = {
  slug: Scalars["String"];
};

export type RootMutationTypeRemoveActionItemArgs = {
  id: Scalars["String"];
};

export type RootMutationTypeRemoveItemArgs = {
  id: Scalars["String"];
};

export type RootMutationTypeToggleCompletedArgs = {
  actionItemId: Scalars["ID"];
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  currentUser?: Maybe<User>;
  /** Get one retro */
  retro?: Maybe<Retro>;
};

export type RootQueryTypeCurrentUserArgs = {
  retroSlug: Scalars["String"];
};

export type RootQueryTypeRetroArgs = {
  previousRetroId?: Maybe<Scalars["Int"]>;
  slug?: Maybe<Scalars["String"]>;
};

export type RootSubscriptionType = {
  __typename?: "RootSubscriptionType";
  retroUpdated?: Maybe<Retro>;
};

export type RootSubscriptionTypeRetroUpdatedArgs = {
  slug: Scalars["String"];
};

export type User = {
  __typename?: "User";
  uuid?: Maybe<Scalars["String"]>;
};

export type AddVoteMutationVariables = {
  id: Scalars["ID"];
};

export type AddVoteMutation = { __typename?: "RootMutationType" } & {
  addVote: Maybe<{ __typename?: "RetroItemVote" } & Pick<RetroItemVote, "id">>;
};

export type CombineItemsMutationVariables = {
  parentId: Scalars["String"];
  childId: Scalars["String"];
};

export type CombineItemsMutation = { __typename?: "RootMutationType" } & {
  combineItems: Maybe<{ __typename?: "RetroItem" } & Pick<RetroItem, "id">>;
};

export type CreateActionItemMutationVariables = {
  slug: Scalars["String"];
  title: Scalars["String"];
};

export type CreateActionItemMutation = { __typename?: "RootMutationType" } & {
  createActionItem: Maybe<
    { __typename?: "ActionItem" } & Pick<
      ActionItem,
      "completed" | "id" | "title"
    >
  >;
};

export type CreateRetroQueryVariables = {};

export type CreateRetroQuery = { __typename?: "RootQueryType" } & {
  retro: Maybe<{ __typename?: "Retro" } & Pick<Retro, "slug">>;
};

export type CreateLinkedRetroQueryVariables = {
  previousRetroId: Scalars["Int"];
};

export type CreateLinkedRetroQuery = { __typename?: "RootQueryType" } & {
  retro: Maybe<{ __typename?: "Retro" } & Pick<Retro, "slug">>;
};

export type CreateWorksItemMutationVariables = {
  slug: Scalars["String"];
  title: Scalars["String"];
};

export type CreateWorksItemMutation = { __typename?: "RootMutationType" } & {
  createWorksItem: Maybe<
    { __typename?: "RetroItem" } & Pick<
      RetroItem,
      "id" | "hidden" | "title" | "userUuid" | "votes"
    >
  >;
};

export type CreateImproveItemMutationVariables = {
  slug: Scalars["String"];
  title: Scalars["String"];
};

export type CreateImproveItemMutation = { __typename?: "RootMutationType" } & {
  createImproveItem: Maybe<
    { __typename?: "RetroItem" } & Pick<
      RetroItem,
      "id" | "hidden" | "title" | "userUuid" | "votes"
    >
  >;
};

export type CreateOtherItemMutationVariables = {
  slug: Scalars["String"];
  title: Scalars["String"];
};

export type CreateOtherItemMutation = { __typename?: "RootMutationType" } & {
  createOtherItem: Maybe<
    { __typename?: "RetroItem" } & Pick<
      RetroItem,
      "id" | "hidden" | "title" | "userUuid" | "votes"
    >
  >;
};

export type DetachRetroItemMutationVariables = {
  id: Scalars["String"];
};

export type DetachRetroItemMutation = { __typename?: "RootMutationType" } & {
  detachItem: Maybe<{ __typename?: "RetroItem" } & Pick<RetroItem, "id">>;
};

export type GetActionItemsQueryVariables = {
  slug: Scalars["String"];
};

export type GetActionItemsQuery = { __typename?: "RootQueryType" } & {
  retro: Maybe<
    { __typename?: "Retro" } & {
      actionItems: Array<
        Maybe<
          { __typename?: "ActionItem" } & Pick<
            ActionItem,
            "completed" | "id" | "title"
          >
        >
      >;
    }
  >;
};

export type GetWorksItemsQueryVariables = {
  slug: Scalars["String"];
};

export type GetWorksItemsQuery = { __typename?: "RootQueryType" } & {
  retro: Maybe<
    { __typename?: "Retro" } & {
      works: Array<
        Maybe<
          { __typename?: "RetroItem" } & Pick<
            RetroItem,
            "id" | "hidden" | "title" | "ref" | "votes"
          > & {
              similarItems: Array<
                Maybe<
                  { __typename?: "RetroItem" } & Pick<RetroItem, "id" | "title">
                >
              >;
            }
        >
      >;
    }
  >;
};

export type GetImproveItemsQueryVariables = {
  slug: Scalars["String"];
};

export type GetImproveItemsQuery = { __typename?: "RootQueryType" } & {
  retro: Maybe<
    { __typename?: "Retro" } & {
      improve: Array<
        Maybe<
          { __typename?: "RetroItem" } & Pick<
            RetroItem,
            "id" | "hidden" | "title" | "ref" | "votes"
          > & {
              similarItems: Array<
                Maybe<
                  { __typename?: "RetroItem" } & Pick<RetroItem, "id" | "title">
                >
              >;
            }
        >
      >;
    }
  >;
};

export type GetOthersItemsQueryVariables = {
  slug: Scalars["String"];
};

export type GetOthersItemsQuery = { __typename?: "RootQueryType" } & {
  retro: Maybe<
    { __typename?: "Retro" } & {
      others: Array<
        Maybe<
          { __typename?: "RetroItem" } & Pick<
            RetroItem,
            "id" | "hidden" | "title" | "ref" | "votes"
          > & {
              similarItems: Array<
                Maybe<
                  { __typename?: "RetroItem" } & Pick<RetroItem, "id" | "title">
                >
              >;
            }
        >
      >;
    }
  >;
};

export type GetRetroItemsQueryVariables = {
  slug: Scalars["String"];
};

export type GetRetroItemsQuery = { __typename?: "RootQueryType" } & {
  retro: Maybe<
    { __typename?: "Retro" } & {
      works: Array<
        Maybe<{ __typename?: "RetroItem" } & Pick<RetroItem, "id" | "title">>
      >;
      improve: Array<
        Maybe<{ __typename?: "RetroItem" } & Pick<RetroItem, "id" | "title">>
      >;
      others: Array<
        Maybe<{ __typename?: "RetroItem" } & Pick<RetroItem, "id" | "title">>
      >;
      actionItems: Array<
        Maybe<{ __typename?: "ActionItem" } & Pick<ActionItem, "id" | "title">>
      >;
    }
  >;
};

export type GetRetroStatusQueryVariables = {
  slug: Scalars["String"];
};

export type GetRetroStatusQuery = { __typename?: "RootQueryType" } & {
  retro: Maybe<
    { __typename?: "Retro" } & Pick<Retro, "status"> & {
        works: Array<
          Maybe<{ __typename?: "RetroItem" } & Pick<RetroItem, "id" | "votes">>
        >;
        improve: Array<
          Maybe<{ __typename?: "RetroItem" } & Pick<RetroItem, "id" | "votes">>
        >;
        others: Array<
          Maybe<{ __typename?: "RetroItem" } & Pick<RetroItem, "id" | "votes">>
        >;
      }
  >;
};

export type OnActionItemAddedSubscriptionVariables = {
  slug: Scalars["String"];
};

export type OnActionItemAddedSubscription = {
  __typename?: "RootSubscriptionType";
} & {
  retroUpdated: Maybe<
    { __typename?: "Retro" } & Pick<Retro, "status"> & {
        actionItems: Array<
          Maybe<
            { __typename?: "ActionItem" } & Pick<
              ActionItem,
              "completed" | "id" | "title"
            >
          >
        >;
      }
  >;
};

export type OnWorksItemAddedSubscriptionVariables = {
  slug: Scalars["String"];
};

export type OnWorksItemAddedSubscription = {
  __typename?: "RootSubscriptionType";
} & {
  retroUpdated: Maybe<
    { __typename?: "Retro" } & Pick<Retro, "status"> & {
        works: Array<
          Maybe<
            { __typename?: "RetroItem" } & Pick<
              RetroItem,
              "id" | "hidden" | "title" | "votes" | "ref"
            > & {
                similarItems: Array<
                  Maybe<
                    { __typename?: "RetroItem" } & Pick<
                      RetroItem,
                      "id" | "title"
                    >
                  >
                >;
              }
          >
        >;
      }
  >;
};

export type OnImproveItemAddedSubscriptionVariables = {
  slug: Scalars["String"];
};

export type OnImproveItemAddedSubscription = {
  __typename?: "RootSubscriptionType";
} & {
  retroUpdated: Maybe<
    { __typename?: "Retro" } & Pick<Retro, "status"> & {
        improve: Array<
          Maybe<
            { __typename?: "RetroItem" } & Pick<
              RetroItem,
              "id" | "hidden" | "title" | "votes" | "ref"
            > & {
                similarItems: Array<
                  Maybe<
                    { __typename?: "RetroItem" } & Pick<
                      RetroItem,
                      "id" | "title"
                    >
                  >
                >;
              }
          >
        >;
      }
  >;
};

export type OnOthersItemAddedSubscriptionVariables = {
  slug: Scalars["String"];
};

export type OnOthersItemAddedSubscription = {
  __typename?: "RootSubscriptionType";
} & {
  retroUpdated: Maybe<
    { __typename?: "Retro" } & Pick<Retro, "status"> & {
        others: Array<
          Maybe<
            { __typename?: "RetroItem" } & Pick<
              RetroItem,
              "id" | "hidden" | "title" | "votes" | "ref"
            > & {
                similarItems: Array<
                  Maybe<
                    { __typename?: "RetroItem" } & Pick<
                      RetroItem,
                      "id" | "title"
                    >
                  >
                >;
              }
          >
        >;
      }
  >;
};

export type OnStatusUpdatedSubscriptionVariables = {
  slug: Scalars["String"];
};

export type OnStatusUpdatedSubscription = {
  __typename?: "RootSubscriptionType";
} & {
  retroUpdated: Maybe<
    { __typename?: "Retro" } & Pick<Retro, "status"> & {
        works: Array<
          Maybe<{ __typename?: "RetroItem" } & Pick<RetroItem, "id" | "votes">>
        >;
        improve: Array<
          Maybe<{ __typename?: "RetroItem" } & Pick<RetroItem, "id" | "votes">>
        >;
        others: Array<
          Maybe<{ __typename?: "RetroItem" } & Pick<RetroItem, "id" | "votes">>
        >;
      }
  >;
};

export type RemoveActionItemMutationVariables = {
  id: Scalars["String"];
};

export type RemoveActionItemMutation = { __typename?: "RootMutationType" } & {
  removeActionItem: Maybe<
    { __typename?: "ActionItem" } & Pick<ActionItem, "id">
  >;
};

export type RemoveRetroItemMutationVariables = {
  id: Scalars["String"];
};

export type RemoveRetroItemMutation = { __typename?: "RootMutationType" } & {
  removeItem: Maybe<{ __typename?: "RetroItem" } & Pick<RetroItem, "id">>;
};

export type SetRetroNextStatusMutationVariables = {
  slug: Scalars["String"];
};

export type SetRetroNextStatusMutation = { __typename?: "RootMutationType" } & {
  nextStep: Maybe<{ __typename?: "Retro" } & Pick<Retro, "status">>;
};

export type ToggleCompletedMutationVariables = {
  id: Scalars["ID"];
};

export type ToggleCompletedMutation = { __typename?: "RootMutationType" } & {
  toggleCompleted: Maybe<
    { __typename?: "ActionItem" } & Pick<
      ActionItem,
      "id" | "title" | "completed"
    >
  >;
};

export const AddVoteDocument = gql`
  mutation addVote($id: ID!) {
    addVote(itemId: $id) {
      id
    }
  }
`;
export type AddVoteMutationFn = ApolloReactCommon.MutationFunction<
  AddVoteMutation,
  AddVoteMutationVariables
>;

/**
 * __useAddVoteMutation__
 *
 * To run a mutation, you first call `useAddVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVoteMutation, { data, loading, error }] = useAddVoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddVoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddVoteMutation,
    AddVoteMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddVoteMutation,
    AddVoteMutationVariables
  >(AddVoteDocument, baseOptions);
}
export type AddVoteMutationHookResult = ReturnType<typeof useAddVoteMutation>;
export type AddVoteMutationResult = ApolloReactCommon.MutationResult<
  AddVoteMutation
>;
export type AddVoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddVoteMutation,
  AddVoteMutationVariables
>;
export const CombineItemsDocument = gql`
  mutation combineItems($parentId: String!, $childId: String!) {
    combineItems(parentId: $parentId, childId: $childId) {
      id
    }
  }
`;
export type CombineItemsMutationFn = ApolloReactCommon.MutationFunction<
  CombineItemsMutation,
  CombineItemsMutationVariables
>;

/**
 * __useCombineItemsMutation__
 *
 * To run a mutation, you first call `useCombineItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCombineItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [combineItemsMutation, { data, loading, error }] = useCombineItemsMutation({
 *   variables: {
 *      parentId: // value for 'parentId'
 *      childId: // value for 'childId'
 *   },
 * });
 */
export function useCombineItemsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CombineItemsMutation,
    CombineItemsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CombineItemsMutation,
    CombineItemsMutationVariables
  >(CombineItemsDocument, baseOptions);
}
export type CombineItemsMutationHookResult = ReturnType<
  typeof useCombineItemsMutation
>;
export type CombineItemsMutationResult = ApolloReactCommon.MutationResult<
  CombineItemsMutation
>;
export type CombineItemsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CombineItemsMutation,
  CombineItemsMutationVariables
>;
export const CreateActionItemDocument = gql`
  mutation createActionItem($slug: String!, $title: String!) {
    createActionItem(retroSlug: $slug, title: $title) {
      completed
      id
      title
    }
  }
`;
export type CreateActionItemMutationFn = ApolloReactCommon.MutationFunction<
  CreateActionItemMutation,
  CreateActionItemMutationVariables
>;

/**
 * __useCreateActionItemMutation__
 *
 * To run a mutation, you first call `useCreateActionItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActionItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActionItemMutation, { data, loading, error }] = useCreateActionItemMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateActionItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateActionItemMutation,
    CreateActionItemMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateActionItemMutation,
    CreateActionItemMutationVariables
  >(CreateActionItemDocument, baseOptions);
}
export type CreateActionItemMutationHookResult = ReturnType<
  typeof useCreateActionItemMutation
>;
export type CreateActionItemMutationResult = ApolloReactCommon.MutationResult<
  CreateActionItemMutation
>;
export type CreateActionItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateActionItemMutation,
  CreateActionItemMutationVariables
>;
export const CreateRetroDocument = gql`
  query createRetro {
    retro(slug: null) {
      slug
    }
  }
`;

/**
 * __useCreateRetroQuery__
 *
 * To run a query within a React component, call `useCreateRetroQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateRetroQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateRetroQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreateRetroQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CreateRetroQuery,
    CreateRetroQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CreateRetroQuery, CreateRetroQueryVariables>(
    CreateRetroDocument,
    baseOptions
  );
}
export function useCreateRetroLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CreateRetroQuery,
    CreateRetroQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    CreateRetroQuery,
    CreateRetroQueryVariables
  >(CreateRetroDocument, baseOptions);
}
export type CreateRetroQueryHookResult = ReturnType<typeof useCreateRetroQuery>;
export type CreateRetroLazyQueryHookResult = ReturnType<
  typeof useCreateRetroLazyQuery
>;
export type CreateRetroQueryResult = ApolloReactCommon.QueryResult<
  CreateRetroQuery,
  CreateRetroQueryVariables
>;
export const CreateLinkedRetroDocument = gql`
  query createLinkedRetro($previousRetroId: Int!) {
    retro(slug: null, previousRetroId: $previousRetroId) {
      slug
    }
  }
`;

/**
 * __useCreateLinkedRetroQuery__
 *
 * To run a query within a React component, call `useCreateLinkedRetroQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkedRetroQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateLinkedRetroQuery({
 *   variables: {
 *      previousRetroId: // value for 'previousRetroId'
 *   },
 * });
 */
export function useCreateLinkedRetroQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CreateLinkedRetroQuery,
    CreateLinkedRetroQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    CreateLinkedRetroQuery,
    CreateLinkedRetroQueryVariables
  >(CreateLinkedRetroDocument, baseOptions);
}
export function useCreateLinkedRetroLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CreateLinkedRetroQuery,
    CreateLinkedRetroQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    CreateLinkedRetroQuery,
    CreateLinkedRetroQueryVariables
  >(CreateLinkedRetroDocument, baseOptions);
}
export type CreateLinkedRetroQueryHookResult = ReturnType<
  typeof useCreateLinkedRetroQuery
>;
export type CreateLinkedRetroLazyQueryHookResult = ReturnType<
  typeof useCreateLinkedRetroLazyQuery
>;
export type CreateLinkedRetroQueryResult = ApolloReactCommon.QueryResult<
  CreateLinkedRetroQuery,
  CreateLinkedRetroQueryVariables
>;
export const CreateWorksItemDocument = gql`
  mutation createWorksItem($slug: String!, $title: String!) {
    createWorksItem(retroSlug: $slug, title: $title) {
      id
      hidden
      title
      userUuid
      votes
    }
  }
`;
export type CreateWorksItemMutationFn = ApolloReactCommon.MutationFunction<
  CreateWorksItemMutation,
  CreateWorksItemMutationVariables
>;

/**
 * __useCreateWorksItemMutation__
 *
 * To run a mutation, you first call `useCreateWorksItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorksItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorksItemMutation, { data, loading, error }] = useCreateWorksItemMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateWorksItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateWorksItemMutation,
    CreateWorksItemMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateWorksItemMutation,
    CreateWorksItemMutationVariables
  >(CreateWorksItemDocument, baseOptions);
}
export type CreateWorksItemMutationHookResult = ReturnType<
  typeof useCreateWorksItemMutation
>;
export type CreateWorksItemMutationResult = ApolloReactCommon.MutationResult<
  CreateWorksItemMutation
>;
export type CreateWorksItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateWorksItemMutation,
  CreateWorksItemMutationVariables
>;
export const CreateImproveItemDocument = gql`
  mutation createImproveItem($slug: String!, $title: String!) {
    createImproveItem(retroSlug: $slug, title: $title) {
      id
      hidden
      title
      userUuid
      votes
    }
  }
`;
export type CreateImproveItemMutationFn = ApolloReactCommon.MutationFunction<
  CreateImproveItemMutation,
  CreateImproveItemMutationVariables
>;

/**
 * __useCreateImproveItemMutation__
 *
 * To run a mutation, you first call `useCreateImproveItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateImproveItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createImproveItemMutation, { data, loading, error }] = useCreateImproveItemMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateImproveItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateImproveItemMutation,
    CreateImproveItemMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateImproveItemMutation,
    CreateImproveItemMutationVariables
  >(CreateImproveItemDocument, baseOptions);
}
export type CreateImproveItemMutationHookResult = ReturnType<
  typeof useCreateImproveItemMutation
>;
export type CreateImproveItemMutationResult = ApolloReactCommon.MutationResult<
  CreateImproveItemMutation
>;
export type CreateImproveItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateImproveItemMutation,
  CreateImproveItemMutationVariables
>;
export const CreateOtherItemDocument = gql`
  mutation createOtherItem($slug: String!, $title: String!) {
    createOtherItem(retroSlug: $slug, title: $title) {
      id
      hidden
      title
      userUuid
      votes
    }
  }
`;
export type CreateOtherItemMutationFn = ApolloReactCommon.MutationFunction<
  CreateOtherItemMutation,
  CreateOtherItemMutationVariables
>;

/**
 * __useCreateOtherItemMutation__
 *
 * To run a mutation, you first call `useCreateOtherItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOtherItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOtherItemMutation, { data, loading, error }] = useCreateOtherItemMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateOtherItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateOtherItemMutation,
    CreateOtherItemMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateOtherItemMutation,
    CreateOtherItemMutationVariables
  >(CreateOtherItemDocument, baseOptions);
}
export type CreateOtherItemMutationHookResult = ReturnType<
  typeof useCreateOtherItemMutation
>;
export type CreateOtherItemMutationResult = ApolloReactCommon.MutationResult<
  CreateOtherItemMutation
>;
export type CreateOtherItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateOtherItemMutation,
  CreateOtherItemMutationVariables
>;
export const DetachRetroItemDocument = gql`
  mutation detachRetroItem($id: String!) {
    detachItem(id: $id) {
      id
    }
  }
`;
export type DetachRetroItemMutationFn = ApolloReactCommon.MutationFunction<
  DetachRetroItemMutation,
  DetachRetroItemMutationVariables
>;

/**
 * __useDetachRetroItemMutation__
 *
 * To run a mutation, you first call `useDetachRetroItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDetachRetroItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [detachRetroItemMutation, { data, loading, error }] = useDetachRetroItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetachRetroItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DetachRetroItemMutation,
    DetachRetroItemMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DetachRetroItemMutation,
    DetachRetroItemMutationVariables
  >(DetachRetroItemDocument, baseOptions);
}
export type DetachRetroItemMutationHookResult = ReturnType<
  typeof useDetachRetroItemMutation
>;
export type DetachRetroItemMutationResult = ApolloReactCommon.MutationResult<
  DetachRetroItemMutation
>;
export type DetachRetroItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DetachRetroItemMutation,
  DetachRetroItemMutationVariables
>;
export const GetActionItemsDocument = gql`
  query getActionItems($slug: String!) {
    retro(slug: $slug) {
      actionItems {
        completed
        id
        title
      }
    }
  }
`;

/**
 * __useGetActionItemsQuery__
 *
 * To run a query within a React component, call `useGetActionItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActionItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActionItemsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetActionItemsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetActionItemsQuery,
    GetActionItemsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetActionItemsQuery,
    GetActionItemsQueryVariables
  >(GetActionItemsDocument, baseOptions);
}
export function useGetActionItemsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetActionItemsQuery,
    GetActionItemsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetActionItemsQuery,
    GetActionItemsQueryVariables
  >(GetActionItemsDocument, baseOptions);
}
export type GetActionItemsQueryHookResult = ReturnType<
  typeof useGetActionItemsQuery
>;
export type GetActionItemsLazyQueryHookResult = ReturnType<
  typeof useGetActionItemsLazyQuery
>;
export type GetActionItemsQueryResult = ApolloReactCommon.QueryResult<
  GetActionItemsQuery,
  GetActionItemsQueryVariables
>;
export const GetWorksItemsDocument = gql`
  query getWorksItems($slug: String!) {
    retro(slug: $slug) {
      works {
        id
        hidden
        title
        ref
        votes
        similarItems {
          id
          title
        }
      }
    }
  }
`;

/**
 * __useGetWorksItemsQuery__
 *
 * To run a query within a React component, call `useGetWorksItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorksItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorksItemsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetWorksItemsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetWorksItemsQuery,
    GetWorksItemsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetWorksItemsQuery,
    GetWorksItemsQueryVariables
  >(GetWorksItemsDocument, baseOptions);
}
export function useGetWorksItemsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetWorksItemsQuery,
    GetWorksItemsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetWorksItemsQuery,
    GetWorksItemsQueryVariables
  >(GetWorksItemsDocument, baseOptions);
}
export type GetWorksItemsQueryHookResult = ReturnType<
  typeof useGetWorksItemsQuery
>;
export type GetWorksItemsLazyQueryHookResult = ReturnType<
  typeof useGetWorksItemsLazyQuery
>;
export type GetWorksItemsQueryResult = ApolloReactCommon.QueryResult<
  GetWorksItemsQuery,
  GetWorksItemsQueryVariables
>;
export const GetImproveItemsDocument = gql`
  query getImproveItems($slug: String!) {
    retro(slug: $slug) {
      improve {
        id
        hidden
        title
        ref
        votes
        similarItems {
          id
          title
        }
      }
    }
  }
`;

/**
 * __useGetImproveItemsQuery__
 *
 * To run a query within a React component, call `useGetImproveItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImproveItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImproveItemsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetImproveItemsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetImproveItemsQuery,
    GetImproveItemsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetImproveItemsQuery,
    GetImproveItemsQueryVariables
  >(GetImproveItemsDocument, baseOptions);
}
export function useGetImproveItemsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetImproveItemsQuery,
    GetImproveItemsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetImproveItemsQuery,
    GetImproveItemsQueryVariables
  >(GetImproveItemsDocument, baseOptions);
}
export type GetImproveItemsQueryHookResult = ReturnType<
  typeof useGetImproveItemsQuery
>;
export type GetImproveItemsLazyQueryHookResult = ReturnType<
  typeof useGetImproveItemsLazyQuery
>;
export type GetImproveItemsQueryResult = ApolloReactCommon.QueryResult<
  GetImproveItemsQuery,
  GetImproveItemsQueryVariables
>;
export const GetOthersItemsDocument = gql`
  query getOthersItems($slug: String!) {
    retro(slug: $slug) {
      others {
        id
        hidden
        title
        ref
        votes
        similarItems {
          id
          title
        }
      }
    }
  }
`;

/**
 * __useGetOthersItemsQuery__
 *
 * To run a query within a React component, call `useGetOthersItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOthersItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOthersItemsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetOthersItemsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetOthersItemsQuery,
    GetOthersItemsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetOthersItemsQuery,
    GetOthersItemsQueryVariables
  >(GetOthersItemsDocument, baseOptions);
}
export function useGetOthersItemsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetOthersItemsQuery,
    GetOthersItemsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetOthersItemsQuery,
    GetOthersItemsQueryVariables
  >(GetOthersItemsDocument, baseOptions);
}
export type GetOthersItemsQueryHookResult = ReturnType<
  typeof useGetOthersItemsQuery
>;
export type GetOthersItemsLazyQueryHookResult = ReturnType<
  typeof useGetOthersItemsLazyQuery
>;
export type GetOthersItemsQueryResult = ApolloReactCommon.QueryResult<
  GetOthersItemsQuery,
  GetOthersItemsQueryVariables
>;
export const GetRetroItemsDocument = gql`
  query getRetroItems($slug: String!) {
    retro(slug: $slug) {
      works {
        id
        title
      }
      improve {
        id
        title
      }
      others {
        id
        title
      }
      actionItems {
        id
        title
      }
    }
  }
`;

/**
 * __useGetRetroItemsQuery__
 *
 * To run a query within a React component, call `useGetRetroItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRetroItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRetroItemsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetRetroItemsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetRetroItemsQuery,
    GetRetroItemsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetRetroItemsQuery,
    GetRetroItemsQueryVariables
  >(GetRetroItemsDocument, baseOptions);
}
export function useGetRetroItemsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetRetroItemsQuery,
    GetRetroItemsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetRetroItemsQuery,
    GetRetroItemsQueryVariables
  >(GetRetroItemsDocument, baseOptions);
}
export type GetRetroItemsQueryHookResult = ReturnType<
  typeof useGetRetroItemsQuery
>;
export type GetRetroItemsLazyQueryHookResult = ReturnType<
  typeof useGetRetroItemsLazyQuery
>;
export type GetRetroItemsQueryResult = ApolloReactCommon.QueryResult<
  GetRetroItemsQuery,
  GetRetroItemsQueryVariables
>;
export const GetRetroStatusDocument = gql`
  query getRetroStatus($slug: String!) {
    retro(slug: $slug) {
      status
      works {
        id
        votes
      }
      improve {
        id
        votes
      }
      others {
        id
        votes
      }
    }
  }
`;

/**
 * __useGetRetroStatusQuery__
 *
 * To run a query within a React component, call `useGetRetroStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRetroStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRetroStatusQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetRetroStatusQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetRetroStatusQuery,
    GetRetroStatusQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetRetroStatusQuery,
    GetRetroStatusQueryVariables
  >(GetRetroStatusDocument, baseOptions);
}
export function useGetRetroStatusLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetRetroStatusQuery,
    GetRetroStatusQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetRetroStatusQuery,
    GetRetroStatusQueryVariables
  >(GetRetroStatusDocument, baseOptions);
}
export type GetRetroStatusQueryHookResult = ReturnType<
  typeof useGetRetroStatusQuery
>;
export type GetRetroStatusLazyQueryHookResult = ReturnType<
  typeof useGetRetroStatusLazyQuery
>;
export type GetRetroStatusQueryResult = ApolloReactCommon.QueryResult<
  GetRetroStatusQuery,
  GetRetroStatusQueryVariables
>;
export const OnActionItemAddedDocument = gql`
  subscription onActionItemAdded($slug: String!) {
    retroUpdated(slug: $slug) {
      actionItems {
        completed
        id
        title
      }
      status
    }
  }
`;

/**
 * __useOnActionItemAddedSubscription__
 *
 * To run a query within a React component, call `useOnActionItemAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnActionItemAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnActionItemAddedSubscription({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useOnActionItemAddedSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    OnActionItemAddedSubscription,
    OnActionItemAddedSubscriptionVariables
  >
) {
  return ApolloReactHooks.useSubscription<
    OnActionItemAddedSubscription,
    OnActionItemAddedSubscriptionVariables
  >(OnActionItemAddedDocument, baseOptions);
}
export type OnActionItemAddedSubscriptionHookResult = ReturnType<
  typeof useOnActionItemAddedSubscription
>;
export type OnActionItemAddedSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  OnActionItemAddedSubscription
>;
export const OnWorksItemAddedDocument = gql`
  subscription onWorksItemAdded($slug: String!) {
    retroUpdated(slug: $slug) {
      works {
        id
        hidden
        title
        votes
        ref
        similarItems {
          id
          title
        }
      }
      status
    }
  }
`;

/**
 * __useOnWorksItemAddedSubscription__
 *
 * To run a query within a React component, call `useOnWorksItemAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnWorksItemAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnWorksItemAddedSubscription({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useOnWorksItemAddedSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    OnWorksItemAddedSubscription,
    OnWorksItemAddedSubscriptionVariables
  >
) {
  return ApolloReactHooks.useSubscription<
    OnWorksItemAddedSubscription,
    OnWorksItemAddedSubscriptionVariables
  >(OnWorksItemAddedDocument, baseOptions);
}
export type OnWorksItemAddedSubscriptionHookResult = ReturnType<
  typeof useOnWorksItemAddedSubscription
>;
export type OnWorksItemAddedSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  OnWorksItemAddedSubscription
>;
export const OnImproveItemAddedDocument = gql`
  subscription onImproveItemAdded($slug: String!) {
    retroUpdated(slug: $slug) {
      improve {
        id
        hidden
        title
        votes
        ref
        similarItems {
          id
          title
        }
      }
      status
    }
  }
`;

/**
 * __useOnImproveItemAddedSubscription__
 *
 * To run a query within a React component, call `useOnImproveItemAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnImproveItemAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnImproveItemAddedSubscription({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useOnImproveItemAddedSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    OnImproveItemAddedSubscription,
    OnImproveItemAddedSubscriptionVariables
  >
) {
  return ApolloReactHooks.useSubscription<
    OnImproveItemAddedSubscription,
    OnImproveItemAddedSubscriptionVariables
  >(OnImproveItemAddedDocument, baseOptions);
}
export type OnImproveItemAddedSubscriptionHookResult = ReturnType<
  typeof useOnImproveItemAddedSubscription
>;
export type OnImproveItemAddedSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  OnImproveItemAddedSubscription
>;
export const OnOthersItemAddedDocument = gql`
  subscription onOthersItemAdded($slug: String!) {
    retroUpdated(slug: $slug) {
      others {
        id
        hidden
        title
        votes
        ref
        similarItems {
          id
          title
        }
      }
      status
    }
  }
`;

/**
 * __useOnOthersItemAddedSubscription__
 *
 * To run a query within a React component, call `useOnOthersItemAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnOthersItemAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnOthersItemAddedSubscription({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useOnOthersItemAddedSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    OnOthersItemAddedSubscription,
    OnOthersItemAddedSubscriptionVariables
  >
) {
  return ApolloReactHooks.useSubscription<
    OnOthersItemAddedSubscription,
    OnOthersItemAddedSubscriptionVariables
  >(OnOthersItemAddedDocument, baseOptions);
}
export type OnOthersItemAddedSubscriptionHookResult = ReturnType<
  typeof useOnOthersItemAddedSubscription
>;
export type OnOthersItemAddedSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  OnOthersItemAddedSubscription
>;
export const OnStatusUpdatedDocument = gql`
  subscription onStatusUpdated($slug: String!) {
    retroUpdated(slug: $slug) {
      status
      works {
        id
        votes
      }
      improve {
        id
        votes
      }
      others {
        id
        votes
      }
    }
  }
`;

/**
 * __useOnStatusUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnStatusUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnStatusUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnStatusUpdatedSubscription({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useOnStatusUpdatedSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    OnStatusUpdatedSubscription,
    OnStatusUpdatedSubscriptionVariables
  >
) {
  return ApolloReactHooks.useSubscription<
    OnStatusUpdatedSubscription,
    OnStatusUpdatedSubscriptionVariables
  >(OnStatusUpdatedDocument, baseOptions);
}
export type OnStatusUpdatedSubscriptionHookResult = ReturnType<
  typeof useOnStatusUpdatedSubscription
>;
export type OnStatusUpdatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  OnStatusUpdatedSubscription
>;
export const RemoveActionItemDocument = gql`
  mutation removeActionItem($id: String!) {
    removeActionItem(id: $id) {
      id
    }
  }
`;
export type RemoveActionItemMutationFn = ApolloReactCommon.MutationFunction<
  RemoveActionItemMutation,
  RemoveActionItemMutationVariables
>;

/**
 * __useRemoveActionItemMutation__
 *
 * To run a mutation, you first call `useRemoveActionItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveActionItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeActionItemMutation, { data, loading, error }] = useRemoveActionItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveActionItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveActionItemMutation,
    RemoveActionItemMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RemoveActionItemMutation,
    RemoveActionItemMutationVariables
  >(RemoveActionItemDocument, baseOptions);
}
export type RemoveActionItemMutationHookResult = ReturnType<
  typeof useRemoveActionItemMutation
>;
export type RemoveActionItemMutationResult = ApolloReactCommon.MutationResult<
  RemoveActionItemMutation
>;
export type RemoveActionItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveActionItemMutation,
  RemoveActionItemMutationVariables
>;
export const RemoveRetroItemDocument = gql`
  mutation removeRetroItem($id: String!) {
    removeItem(id: $id) {
      id
    }
  }
`;
export type RemoveRetroItemMutationFn = ApolloReactCommon.MutationFunction<
  RemoveRetroItemMutation,
  RemoveRetroItemMutationVariables
>;

/**
 * __useRemoveRetroItemMutation__
 *
 * To run a mutation, you first call `useRemoveRetroItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveRetroItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeRetroItemMutation, { data, loading, error }] = useRemoveRetroItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveRetroItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveRetroItemMutation,
    RemoveRetroItemMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RemoveRetroItemMutation,
    RemoveRetroItemMutationVariables
  >(RemoveRetroItemDocument, baseOptions);
}
export type RemoveRetroItemMutationHookResult = ReturnType<
  typeof useRemoveRetroItemMutation
>;
export type RemoveRetroItemMutationResult = ApolloReactCommon.MutationResult<
  RemoveRetroItemMutation
>;
export type RemoveRetroItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveRetroItemMutation,
  RemoveRetroItemMutationVariables
>;
export const SetRetroNextStatusDocument = gql`
  mutation setRetroNextStatus($slug: String!) {
    nextStep(slug: $slug) {
      status
    }
  }
`;
export type SetRetroNextStatusMutationFn = ApolloReactCommon.MutationFunction<
  SetRetroNextStatusMutation,
  SetRetroNextStatusMutationVariables
>;

/**
 * __useSetRetroNextStatusMutation__
 *
 * To run a mutation, you first call `useSetRetroNextStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRetroNextStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRetroNextStatusMutation, { data, loading, error }] = useSetRetroNextStatusMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useSetRetroNextStatusMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetRetroNextStatusMutation,
    SetRetroNextStatusMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SetRetroNextStatusMutation,
    SetRetroNextStatusMutationVariables
  >(SetRetroNextStatusDocument, baseOptions);
}
export type SetRetroNextStatusMutationHookResult = ReturnType<
  typeof useSetRetroNextStatusMutation
>;
export type SetRetroNextStatusMutationResult = ApolloReactCommon.MutationResult<
  SetRetroNextStatusMutation
>;
export type SetRetroNextStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetRetroNextStatusMutation,
  SetRetroNextStatusMutationVariables
>;
export const ToggleCompletedDocument = gql`
  mutation toggleCompleted($id: ID!) {
    toggleCompleted(actionItemId: $id) {
      id
      title
      completed
    }
  }
`;
export type ToggleCompletedMutationFn = ApolloReactCommon.MutationFunction<
  ToggleCompletedMutation,
  ToggleCompletedMutationVariables
>;

/**
 * __useToggleCompletedMutation__
 *
 * To run a mutation, you first call `useToggleCompletedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleCompletedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleCompletedMutation, { data, loading, error }] = useToggleCompletedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleCompletedMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ToggleCompletedMutation,
    ToggleCompletedMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ToggleCompletedMutation,
    ToggleCompletedMutationVariables
  >(ToggleCompletedDocument, baseOptions);
}
export type ToggleCompletedMutationHookResult = ReturnType<
  typeof useToggleCompletedMutation
>;
export type ToggleCompletedMutationResult = ApolloReactCommon.MutationResult<
  ToggleCompletedMutation
>;
export type ToggleCompletedMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ToggleCompletedMutation,
  ToggleCompletedMutationVariables
>;
