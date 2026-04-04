import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { bookFixtures } from "@/test/fixtures/books";
import {
  getSearchRequestLog,
  searchEmptyHandler,
  searchErrorHandler,
  searchSuccessHandler,
} from "@/test/mocks/handlers";
import { server } from "@/test/mocks/server";
import { renderApp } from "@/test/renderApp";

describe("SearchBooks integration", () => {
  it("검색어 Enter 입력 시 요청 파라미터와 결과를 함께 검증한다", async () => {
    const user = userEvent.setup();

    renderApp("/");

    const input = screen.getByPlaceholderText("검색어 입력");
    await user.type(input, "리액트{enter}");

    expect(await screen.findAllByText(bookFixtures[0].title)).not.toHaveLength(0);

    await waitFor(() => {
      expect(getSearchRequestLog()).toHaveLength(1);
    });

    expect(getSearchRequestLog()[0]).toMatchObject({
      query: "리액트",
      target: null,
      page: "1",
      size: "10",
      sort: "accuracy",
    });
  });

  it("공백만 입력하면 요청을 보내지 않는다", async () => {
    const user = userEvent.setup();

    renderApp("/");

    const input = screen.getByPlaceholderText("검색어 입력");
    await user.type(input, "   {enter}");

    await waitFor(() => {
      expect(getSearchRequestLog()).toHaveLength(0);
    });
  });

  it("상세검색 target 선택이 요청 파라미터에 반영된다", async () => {
    const user = userEvent.setup();

    renderApp("/");

    await user.click(screen.getByRole("button", { name: "상세검색" }));
    await user.click(screen.getByRole("button", { name: /제목/ }));
    await user.click(screen.getByRole("button", { name: "저자명" }));

    const detailInput = screen.getAllByPlaceholderText("검색어 입력")[1];
    await user.type(detailInput, "한강");
    await user.click(screen.getByRole("button", { name: "검색하기" }));

    expect(await screen.findAllByText(bookFixtures[0].title)).not.toHaveLength(0);

    await waitFor(() => {
      expect(getSearchRequestLog()).toHaveLength(1);
    });

    expect(getSearchRequestLog()[0]).toMatchObject({
      query: "한강",
      target: "person",
    });
  });

  it("응답이 느리면 로딩 UI를 보여준 뒤 결과를 렌더링한다", async () => {
    const user = userEvent.setup();

    server.use(searchSuccessHandler({ delayMs: 200 }));

    renderApp("/");

    const input = screen.getByPlaceholderText("검색어 입력");
    await user.type(input, "비동기{enter}");

    expect(await screen.findByText("검색 결과를 가져오는 중이에요")).toBeInTheDocument();
    expect(await screen.findAllByText(bookFixtures[0].title)).not.toHaveLength(0);

    await waitFor(() => {
      expect(
        screen.queryByText("검색 결과를 가져오는 중이에요"),
      ).not.toBeInTheDocument();
    });
  });

  it("빈 결과 응답이면 빈 상태를 유지한다", async () => {
    const user = userEvent.setup();

    server.use(searchEmptyHandler());

    renderApp("/");

    const input = screen.getByPlaceholderText("검색어 입력");
    await user.type(input, "없는책{enter}");

    await waitFor(() => {
      expect(getSearchRequestLog()).toHaveLength(1);
    });

    expect(await screen.findByText("검색된 결과가 없습니다.")).toBeInTheDocument();
    expect(screen.queryAllByText(bookFixtures[0].title)).toHaveLength(0);
  });

  it("에러 응답이면 사용자에게 다이얼로그를 보여준다", async () => {
    const user = userEvent.setup();

    server.use(searchErrorHandler({ message: "검색 중 오류가 발생했습니다." }));

    renderApp("/");

    const input = screen.getByPlaceholderText("검색어 입력");
    await user.type(input, "에러{enter}");

    expect(
      await screen.findByText("검색 중 오류가 발생했습니다."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });
});
