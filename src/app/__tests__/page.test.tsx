import { render, screen } from "@testing-library/react";
import Home from "../page";

jest.mock("../_logic/useAuth", () => ({
  useAuthToken: () => true,
  useUserInfo: () => ({ ip: "1.2.3.4", name: "thitirat" })
}));

describe("Home page", () => {
  it("renders user info and logout button", () => {
    render(<Home />);
    expect(screen.getByText(/thitirat/)).toBeInTheDocument();
    expect(screen.getByText(/1.2.3.4/)).toBeInTheDocument();
    expect(screen.getByText(/Log out/i)).toBeInTheDocument();
  });
});
