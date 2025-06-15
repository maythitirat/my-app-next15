import { render, screen } from "@testing-library/react";
import ResumePage from "../resume/page";

jest.mock("../_logic/useResumeAuth", () => ({
  useResumeAuth: () => true
}));

describe("Resume page", () => {
  it("renders resume content", () => {
    render(<ResumePage />);
    expect(screen.getByText(/Thitirat Thongthaew/)).toBeInTheDocument();
    expect(screen.getByText(/Full Stack Developer/)).toBeInTheDocument();
  });
});
