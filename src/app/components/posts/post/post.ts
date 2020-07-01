export interface Post {
  id: number;
  user_id?: number;
  title: string;
  body: string;
  _links?: {self: {href: string}, edit: {href: string}};
}
