export interface UserActivityInfo {
  updated_at: string;
  watchers_count: string;
  owner: { login: string; avatar_url: string };
  id: number;
  name: string;
}
