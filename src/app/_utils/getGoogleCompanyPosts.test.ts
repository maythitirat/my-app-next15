/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLinkedInCompanyPosts } from "./getLinkedInCompanyPosts";

describe("getLinkedInCompanyPosts", () => {
  it("should fetch LinkedIn company posts successfully", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: "",
        data: [
          {
            isBrandPartnership: false,
            text: "The Gemini app helps you crush your to-do list with scheduled actions 📅 Wake up to a summary of your calendar or get a list of local events every Friday — all you have to do is ask Gemini → https://goo.gle/45i5U89",
            totalReactionCount: 455,
            likeCount: 415,
            appreciationCount: 5,
            empathyCount: 20,
            InterestCount: 11,
            praiseCount: 3,
            funnyCount: 1,
            commentsCount: 50,
            repostsCount: 26,
            postUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7336843499134140418/",
            shareUrl: "https://www.linkedin.com/posts/google_the-gemini-app-helps-you-crush-your-to-do-activity-7336843499134140418-Qe68?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFkiIN8B0u0k6zQnbJk3vyEW7ESH4mlaGmM",
            postedAt: "1d",
            postedDate: "2025-06-06 19:56:42.154 +0000 UTC",
            postedDateTimestamp: 1749239802154,
            urn: "7336843499134140418",
            shareUrn: "7336843498123382784",
            image: [
              {
                url: "https://media.licdn.com/dms/image/v2/D5610AQFo1zHZM5BKyA/image-shrink_480/B56ZdG0P2ZHUAo-/0/1749239791396?e=1750003200&v=beta&t=3T_NQJxqTP_dR2QS1h4pjYzK64eO1OJbBPvwEpaVmds",
                width: 480,
                height: 270
              }
            ]
          }
        ],
        total: 288,
        totalPage: 6,
        paginationToken: "1495408863-1749395034562-787454fe2536a565a42a7153faf5884c"
      })
    }) as jest.MockedFunction<any>;

    const data = await getLinkedInCompanyPosts();
    expect(data.success).toBe(true);
    expect(data.data[0].text).toContain("The Gemini app helps you crush your to-do list");
    expect(data.data[0].likeCount).toBe(415);
    expect(data.data[0].image?.[0].url).toContain("licdn.com");
  });

  it("should throw error if fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, json: async () => ({}) }) as jest.MockedFunction<any>;
    await expect(getLinkedInCompanyPosts()).rejects.toThrow("Failed to fetch data");
  });
});
