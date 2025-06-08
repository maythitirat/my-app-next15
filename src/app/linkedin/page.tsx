import Image from "next/image";
import { getLinkedInCompanyPosts, LinkedInCompanyPost } from "../_utils/getLinkedInCompanyPosts";

export default async function LinkedinPage() {
  const data = await getLinkedInCompanyPosts();
  const posts: LinkedInCompanyPost[] = data?.data || [];

  return (
    <main className="flex flex-col gap-8 items-center sm:items-start p-8">
      <h2 className="font-bold text-2xl mb-4">Google LinkedIn Posts</h2>
      <ul className="w-full max-w-2xl space-y-6">
        {posts.map((post) => (
          <li key={post.urn} className="border rounded p-4 bg-white/80 dark:bg-black/40">
            <div className="mb-2 text-base font-semibold">{post.text}</div>
            {post.image && post.image[0] && post.image[0].url && (
              <Image src={post.image[0].url} alt="post image" width={post.image[0].width || 480} height={post.image[0].height || 270} className="mb-2 rounded max-w-full h-auto" />
            )}
            <div className="text-xs text-gray-500">Posted: {post.postedDate}</div>
            <div className="text-xs text-gray-500">Likes: {post.likeCount} | Comments: {post.commentsCount} | Reposts: {post.repostsCount}</div>
            <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs mt-2 inline-block">View on LinkedIn</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
