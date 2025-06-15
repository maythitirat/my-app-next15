import { useEffect, useState } from "react";
import { getLinkedInSearchPeople, LinkedInPerson } from "../_utils/getLinkedInSearchPeople";

export function useLinkedInSearchPeople(keywords: string, geo: string) {
  const [people, setPeople] = useState<LinkedInPerson[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getLinkedInSearchPeople({ keywords, geo })
      .then((res) => {
        setPeople(res.data.items);
        setTotal(res.data.total);
        setError("");
      })
      .catch((e) => setError(e.message || "Error fetching people"))
      .finally(() => setLoading(false));
  }, [keywords, geo]);

  return { people, total, error, loading };
}
