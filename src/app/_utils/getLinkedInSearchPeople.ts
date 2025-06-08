export type LinkedInPerson = {
  fullName: string;
  headline: string;
  summary: string;
  profilePicture: string;
  location: string;
  profileURL: string;
  username: string;
};

export type LinkedInSearchPeopleResponse = {
  success: boolean;
  message: string;
  data: {
    total: number;
    items: LinkedInPerson[];
  };
};

export async function getLinkedInSearchPeople({ keywords, start = 0, geo = '' }: { keywords: string; start?: number; geo?: string }): Promise<LinkedInSearchPeopleResponse> {
  if (typeof window !== "undefined") {
    throw new Error("getLinkedInSearchPeople should only be called on the server (in Server Component or getServerSideProps)");
  }
  const params = new URLSearchParams({ keywords, start: String(start) });
  if (geo) params.append('geo', geo);
  const url = `https://linkedin-api8.p.rapidapi.com/search-people?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'x-rapidapi-host': 'linkedin-api8.p.rapidapi.com',
      'x-rapidapi-key': '49f746cc25msh1fc75b3c9be6927p1ea0d7jsnac87ea4b3477',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
