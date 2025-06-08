export type LinkedInCompanyPost = {
  isBrandPartnership: boolean;
  text: string;
  totalReactionCount: number;
  likeCount: number;
  appreciationCount: number;
  empathyCount: number;
  InterestCount: number;
  praiseCount: number;
  funnyCount: number;
  commentsCount: number;
  repostsCount: number;
  postUrl: string;
  shareUrl: string;
  postedAt: string;
  postedDate: string;
  postedDateTimestamp: number;
  urn: string;
  shareUrn: string;
  image?: { url: string; width: number; height: number }[];
  video?: { url: string; poster: string; duration: number }[];
  company?: { name: string; url: string };
  contentType?: string;
};

export type LinkedInCompanyPostsResponse = {
  success: boolean;
  message: string;
  data: LinkedInCompanyPost[];
  total: number;
  totalPage: number;
  paginationToken: string;
};

export async function getLinkedInCompanyPosts(): Promise<LinkedInCompanyPostsResponse> {
  if (typeof window !== "undefined") {
    throw new Error("getLinkedInCompanyPosts should only be called on the server (in Server Component or getServerSideProps)");
  }
  const res = await fetch("https://linkedin-api8.p.rapidapi.com/get-company-posts?username=google&start=0", {
    headers: {
      'x-rapidapi-host': 'linkedin-api8.p.rapidapi.com',
      'x-rapidapi-key': '49f746cc25msh1fc75b3c9be6927p1ea0d7jsnac87ea4b3477',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
