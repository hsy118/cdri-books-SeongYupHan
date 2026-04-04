import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { bookFixtures } from "@/test/fixtures/books";
import { renderApp } from "@/test/renderApp";

describe("Favorites integration", () => {
  it("검색 결과에서 찜한 책이 즐겨찾기 탭에 반영되고 해제할 수 있다", async () => {
    const user = userEvent.setup();

    renderApp("/");

    const input = screen.getByPlaceholderText("검색어 입력");
    await user.type(input, "리액트{enter}");

    expect(await screen.findAllByText(bookFixtures[0].title)).not.toHaveLength(0);

    await user.click(screen.getAllByRole("button", { name: "찜하기" })[0]);
    await user.click(screen.getByRole("link", { name: "내가 찜한 책" }));

    expect(await screen.findAllByText(bookFixtures[0].title)).not.toHaveLength(0);

    await user.click(screen.getAllByRole("button", { name: "찜하기" })[0]);

    await waitFor(() => {
      expect(
        screen.getByText("찜한 책이 없습니다."),
      ).toBeInTheDocument();
    });
  });
});
