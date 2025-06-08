import { getLinkedInSearchPeople, LinkedInPerson } from "../../_utils/getLinkedInSearchPeople";
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SearchPeoplePage({ searchParams }: any) {
  const keywordsRaw = searchParams?.keywords ?? "max";
  const geoRaw = searchParams?.geo ?? "103644278,101165590";
  const keywords = Array.isArray(keywordsRaw) ? keywordsRaw[0] : keywordsRaw;
  const geo = Array.isArray(geoRaw) ? geoRaw[0] : geoRaw;
  let people: LinkedInPerson[] = [];
  let total = 0;
  let error = "";
  try {
    const res = await getLinkedInSearchPeople({ keywords, geo });
    people = res.data.items;
    total = res.data.total;
  } catch (e) {
    error = (e as Error).message || "Error fetching people";
  }

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <h1>LinkedIn People Search</h1>
      <form method="get" style={{ marginBottom: 24 }}>
        <input
          type="text"
          name="keywords"
          defaultValue={keywords}
          placeholder="Search people..."
          style={{ padding: 8, width: 220, marginRight: 8 }}
        />
        <input
          type="text"
          name="geo"
          defaultValue={geo}
          placeholder="Geo (optional)"
          style={{ padding: 8, width: 180, marginRight: 8 }}
        />
        <button type="submit" style={{ padding: 8 }}>Search</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <div style={{ marginBottom: 12, color: '#666' }}>Total results: {total}</div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {people.map((p: LinkedInPerson) => (
          <li key={p.username} style={{ display: "flex", alignItems: "center", marginBottom: 18, background: "#fafbfc", borderRadius: 8, padding: 12, boxShadow: "0 1px 4px #0001" }}>
            {p.profilePicture ? (
              <Image src={p.profilePicture} alt={p.fullName} width={56} height={56} style={{ borderRadius: "50%", marginRight: 16, objectFit: "cover" }} />
            ) : (
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#eee", marginRight: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa", fontSize: 24 }}>
                ?
              </div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 18 }}>{p.fullName}</div>
              <div style={{ color: "#555", fontSize: 15 }}>{p.headline}</div>
              <div style={{ color: "#888", fontSize: 13 }}>{p.location}</div>
              <a href={p.profileURL} target="_blank" rel="noopener noreferrer" style={{ color: "#0073b1", fontSize: 14 }}>View Profile</a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
