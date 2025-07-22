export type UserRole = "admin" | "editor" | "viewer";
export type UserStatus = "active" | "inactive" | "suspended";

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  skills: string[];
  joinedAt: string;
  lastActiveAt: string;
  avatar?: string;
};

export type UserFilters = {
  searchQuery: string;
  roleFilter: UserRole | "all";
  statusFilter: UserStatus | "all";
  departmentFilter: string | "all";
  skillsFilter: string[];
};

export type UserFormData = {
  email: string;
  name: string;
  role: UserRole;
  department: string;
  skills: string[];
};
