import { TopPageLink } from "@/navigation-menu/top-page-link";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-icons/lu", () => ({
  LuDoorOpen: () => <svg data-testid="LuDoorOpen" />,
}));

it("should have href attribute that has `/`", () => {
  render(<TopPageLink />);
  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "/");
});

it("should have `LuDoorOpen` icons", () => {
  render(<TopPageLink />);
  const link = screen.getByRole("link", { name: "トップページへ" });
  expect(within(link).getByTestId("LuDoorOpen")).toBeInTheDocument();
});

it("should show tooltip with `トップページへ` on the mouse hover", async () => {
  const event = userEvent.setup();
  render(<TopPageLink />);
  const link = screen.getByRole("link", { name: "トップページへ" });
  await event.hover(link);
  expect(await screen.findByText("トップページへ")).toBeInTheDocument();
});
