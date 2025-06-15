import { render, screen } from "@testing-library/react";
import SearchPeoplePage from "../linkedin/searchpeople/page";

jest.mock("../_logic/useLinkedInSearchPeople", () => ({
  useLinkedInSearchPeople: () => ({
    people: [
      { id: "1", name: "John Doe", occupation: "Engineer", image: "", headline: "Test headline", location: "Bangkok", profileUrl: "#" }
    ],
    total: 1,
    error: "",
    loading: false
  })
}));

describe.skip("LinkedIn SearchPeoplePage", () => {
  it("renders people list", () => {
    // mock searchParams
    render(<SearchPeoplePage searchParams={{ keywords: "test", geo: "1" }} />);
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Test headline/)).toBeInTheDocument();
  });
});
