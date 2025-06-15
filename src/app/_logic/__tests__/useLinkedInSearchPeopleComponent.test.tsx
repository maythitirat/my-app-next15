import { render, screen } from "@testing-library/react";
import { useLinkedInSearchPeople } from "../useLinkedInSearchPeople";
import React from "react";

function TestComponent({ keywords, geo }: { keywords: string; geo: string }) {
  const { people, total, error, loading } = useLinkedInSearchPeople(keywords, geo);
  return (
    <div>
      <div data-testid="total">{total}</div>
      <div data-testid="error">{error}</div>
      <div data-testid="loading">{loading ? "loading" : "done"}</div>
      {people.map((p, i) => (
        <div key={i} data-testid="person">
          <span data-testid="fullName">{p.fullName}</span>
          <span data-testid="headline">{p.headline}</span>
        </div>
      ))}
    </div>
  );
}

describe("useLinkedInSearchPeople (via component)", () => {
  it("renders people and total", async () => {
    render(<TestComponent keywords="test" geo="1" />);
    // ตรวจสอบว่ามี element หลักครบ
    expect(screen.getByTestId("total")).toBeInTheDocument();
    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    // ไม่ error
    expect(screen.getByTestId("error").textContent).toBe("");
  });
});
