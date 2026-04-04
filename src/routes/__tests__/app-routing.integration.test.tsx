import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderApp } from "@/test/renderApp";

describe("App routing integration", () => {
  it("첫 진입 시 도서 검색 화면과 활성 탭을 보여준다", async () => {
    renderApp("/");

    expect(
      await screen.findByRole("heading", { name: "도서 검색" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "도서 검색" })).toHaveClass(
      "border-primary",
    );
  });

  it("탭 클릭으로 도서 검색과 내가 찜한 책 화면을 오갈 수 있다", async () => {
    const user = userEvent.setup();

    renderApp("/");

    await user.click(screen.getByRole("link", { name: "내가 찜한 책" }));

    expect(
      await screen.findByRole("heading", { name: "내가 찜한 책" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "내가 찜한 책" })).toHaveClass(
      "border-primary",
    );

    await user.click(screen.getByRole("link", { name: "도서 검색" }));

    expect(
      await screen.findByRole("heading", { name: "도서 검색" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "도서 검색" })).toHaveClass(
      "border-primary",
    );
  });

  it("알 수 없는 경로로 진입하면 홈으로 리다이렉트된다", async () => {
    renderApp("/unknown");

    expect(
      await screen.findByRole("heading", { name: "도서 검색" }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
