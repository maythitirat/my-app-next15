import { getLinkedInSearchPeople } from "./getLinkedInSearchPeople";

describe("getLinkedInSearchPeople", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches people from LinkedIn API and returns data", async () => {
    const mockResponse = {
      success: true,
      message: "ok",
      data: {
        total: 2,
        items: [
          {
            fullName: "John Doe",
            headline: "Software Engineer",
            summary: "Experienced dev",
            profilePicture: "https://media.licdn.com/dummy.jpg",
            location: "Bangkok, Thailand",
            profileURL: "https://linkedin.com/in/johndoe",
            username: "johndoe"
          },
          {
            fullName: "Jane Smith",
            headline: "Product Manager",
            summary: "PM at Tech",
            profilePicture: "",
            location: "Singapore",
            profileURL: "https://linkedin.com/in/janesmith",
            username: "janesmith"
          }
        ]
      }
    };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });
    const res = await getLinkedInSearchPeople({ keywords: "john" });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("search-people?keywords=john"),
      expect.objectContaining({
        headers: expect.objectContaining({
          'x-rapidapi-host': expect.any(String),
          'x-rapidapi-key': expect.any(String)
        })
      })
    );
    expect(res.success).toBe(true);
    expect(res.data.items.length).toBe(2);
    expect(res.data.items[0].fullName).toBe("John Doe");
  });

  it("throws error if fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    await expect(getLinkedInSearchPeople({ keywords: "fail" })).rejects.toThrow("Failed to fetch data");
  });
});
