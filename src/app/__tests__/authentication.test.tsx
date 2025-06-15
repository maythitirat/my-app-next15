import { render, screen } from "@testing-library/react";
import AuthPage from "../authentication/page";

jest.mock("../_logic/useAuthRedirect", () => ({
  useRedirectIfToken: () => undefined
}));

describe("Authentication page", () => {
  it("renders AuthForm", () => {
    render(<AuthPage />);
    // Check heading
    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
    // Check button
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });
});
