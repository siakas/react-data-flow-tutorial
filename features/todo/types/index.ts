export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
};

export type FilterType = "all" | "active" | "completed";
export type SortType = "date" | "priority" | "alphabetical";
