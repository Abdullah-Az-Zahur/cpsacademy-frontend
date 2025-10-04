export type Role =
  | "normal_user"
  | "student"
  | "developer"
  | "social_media_manager";

export type Props = {
  role: Role;
  user?: User | null;
};

export interface User {
  id: number | string;
  email?: string | null;
  username?: string;
  name?: string;
  role?: Role | null;
  jwt?: string;
}
