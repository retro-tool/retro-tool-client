export type Topic = "works" | "improve" | "others" | "actions";
export type Status = "initial" | "review" | "actions" | "final";
export type Size = "base" | "title";
export type Slug = string;

export type Item = {
  title: string;
  hidden?: boolean;
  ref: string;
  id: string;
  votes: number;
  similarItems: Item[];
};
