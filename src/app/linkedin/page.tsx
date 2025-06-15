"use client";
import { useLinkedInCompanyPosts } from "../_logic/useLinkedInCompanyPosts";
import Image from "next/image";
import Link from "next/link";

export default function LinkedinPage() {
  const { posts, loading, error } = useLinkedInCompanyPosts();

  return (
    <main className="flex flex-col gap-8 items-center sm:items-start p-8 relative">
      <Link href="/" style={{ position: "absolute", left: 24, top: 24, textDecoration: "none", color: "#0073b1", fontWeight: 600, fontSize: 18, padding: 8, background: "#ffe066", borderRadius: 6, zIndex: 10 }}>
        ← Back
      </Link>
      <div style={{ minHeight: 40 }} />
      <h2 className="font-bold text-2xl mb-4">Google LinkedIn Posts</h2>
      {loading && (
        <div className="flex items-center gap-2 text-blue-600 mb-4">
          <span className="inline-block w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
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
