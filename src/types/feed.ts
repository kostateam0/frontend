// types/feed.ts
export type Comment = {
  commentID: string;
  userID: string;
  content: string;
  createdAt: string;
};

export type Feed = {
  feedID: string;
  userID: string;
  content: string;
  createdAt: string;
  duration?: string;
  isLiked: boolean;
  _count: {
    likes: number;
    comments: number;
  };
  Comment: Comment[];
  imageUrl?: string | null;
};
