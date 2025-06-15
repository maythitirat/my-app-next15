import { getLinkedInSearchPeople, LinkedInPerson } from "../../_utils/getLinkedInSearchPeople";
import Link from "next/link";

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await searchParams;
  const keywords = typeof resolvedParams.keywords === "string" ? resolvedParams.keywords : "max";
  const geo = typeof resolvedParams.geo === "string" ? resolvedParams.geo : "103644278,101165590";
  let people: LinkedInPerson[] = [];
  let total = 0;
  let error = "";
  try {
    const res = await getLinkedInSearchPeople({ keywords, geo });
    if (res.success && res.data?.items) {
      people = res.data.items;
      total = res.data.total;
    } else {
      error = res.message || "Unknown error";
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = "Failed to fetch people";
    }
  }
  return (
    <main>
      <Link href="/">Back</Link>
      <h1>LinkedIn People Search</h1>
      {error && <div>{error}</div>}
      <div>Total results: {total}</div>
      <ul>
        {people.map((p) => (
          <li key={p.username}>{p.fullName}</li>
        ))}
      </ul>
    </main>
  );
}
