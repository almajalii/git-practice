import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostForm } from "../src/components/PostForm";
jest.mock("@heroui/react", () => ({
  Button: ({
    isDisabled,
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isDisabled?: boolean;
  }) => (
    <button disabled={isDisabled} {...props}>
      {children}
    </button>
  ),
}));
test("invalid input displays errors and valid values reach submit", async () => {
  const submit = jest.fn().mockResolvedValue(undefined);
  const user = userEvent.setup();
  render(<PostForm onSubmit={submit} />);
  await user.click(screen.getByRole("button", { name: /save post/i }));
  expect(
    await screen.findByText("Give your post a title."),
  ).toBeInTheDocument();
  expect(submit).not.toHaveBeenCalled();
  await user.type(screen.getByLabelText("Post title"), "A better interface");
  await user.type(
    screen.getByLabelText("Your story"),
    "A useful story about building thoughtful interfaces.",
  );
  await user.click(screen.getByRole("button", { name: /save post/i }));
  await waitFor(() =>
    expect(submit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "A better interface",
        category: "Design",
      }),
    ),
  );
});
