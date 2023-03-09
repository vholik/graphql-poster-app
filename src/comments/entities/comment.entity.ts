import { User } from 'src/users/entities';

export class Comment {
  id: number;

  owner: User;

  date: Date;

  vote_users_upvote: User[];

  vote_users_downvote: User[];

  subcomments: Comment;
}
