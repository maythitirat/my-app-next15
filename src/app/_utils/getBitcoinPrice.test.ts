/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBitcoinPrice } from "../_utils/getBitcoinPrice";

describe("getBitcoinPrice", () => {
  it("should fetch bitcoin price data successfully", async () => {
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ bpi: { USD: { rate: "70,000.00" } }, time: { updated: "2025-06-08" } }),
    }) as any;

    const data = await getBitcoinPrice();
    expect(data.bpi.USD.rate).toBe("70,000.00");
    expect(data.time.updated).toBe("2025-06-08");
  });

  it("should throw error if fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false }) as any;
    await expect(getBitcoinPrice()).rejects.toThrow("Failed to fetch data");
  });
});
