import "reflect-metadata";

import { render, screen } from "@testing-library/react";

import faker, { Faker } from "@faker-js/faker";

import { Route, Router, Routes } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";

import { NotFound } from "@/presentation/pages";

const history = createMemoryHistory();

const makeSut = (path: string = faker.internet.domainWord()) => {
  const url: string[] = path.split("");

  if (url[0] === "/") url.shift();

  history.push(`/${url.join("")}`);

  render(
    <Router navigator={history} location={history.location}>
      <Routes>
        <Route path="/hello" element={<h1>Hello World</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

describe("PageNotFound", () => {
  test("Should be able return page 404 if no has page for that url", () => {
    makeSut();

    const heading = screen.getByRole("heading", { name: /404/i });

    expect(heading).toBeInTheDocument();
  });

  test("Should not be able return page 404 if has page for that url", () => {
    makeSut("/hello");

    const heading = screen.queryByRole("heading", {
      name: /404/i,
    });

    expect(heading).not.toBeInTheDocument();
  });
});
