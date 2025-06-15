import { useEffect, useState } from "react";
import type { LinkedInCompanyPost } from "../_utils/getLinkedInCompanyPosts";

export function useLinkedInCompanyPosts() {
  const [posts, setPosts] = useState<LinkedInCompanyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/linkedin/company-posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.data || []))
      .catch((e) => setError(e.message || "Error fetching posts"))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}
