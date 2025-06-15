import { render, screen } from "@testing-library/react";
import LinkedinPage from "../linkedin/page";

jest.mock("../_logic/useLinkedInCompanyPosts", () => ({
  useLinkedInCompanyPosts: () => ({
    posts: [{ urn: "1", text: "Test post", postedDate: "2024-01-01", likeCount: 1, commentsCount: 2, repostsCount: 0, postUrl: "#" }],
    loading: false,
    error: ""
  })
}));

describe("LinkedinPage", () => {
  it("renders LinkedIn posts", () => {
    render(<LinkedinPage />);
    expect(screen.getByText(/Test post/)).toBeInTheDocument();
  });
});
