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

  it("should throw error if called on client side (window defined)", async () => {
    // @ts-expect-error test: simulate window for client-side error
    global.window = {};
    await expect(getLinkedInSearchPeople({ keywords: "test" })).rejects.toThrow("getLinkedInSearchPeople should only be called on the server");
    // @ts-expect-error test: cleanup window after test
    delete global.window;
  });

  it("should append geo param if provided", async () => {
    const mockResponse = {
      success: true,
      message: "ok",
      data: { total: 0, items: [] }
    };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });
    await getLinkedInSearchPeople({ keywords: "john", geo: "12345" });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("geo=12345"),
      expect.any(Object)
    );
  });

  it("throws error if response success is false", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: false, message: "API error" })
    });
    await expect(getLinkedInSearchPeople({ keywords: "error" })).rejects.toThrow("API error");
  });

  it("throws error with default message if response success is false and no message", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: false })
    });
    await expect(getLinkedInSearchPeople({ keywords: "error" })).rejects.toThrow("LinkedIn API error");
  });

  it("throws error if response is missing data field", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "ok" })
    });
    await expect(getLinkedInSearchPeople({ keywords: "nodata" })).rejects.toThrow("Malformed response: missing data field");
  });
});
