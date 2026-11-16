import { buildSitemap } from "./buildSitemap";

const SITE_URL = "https://example.com";

describe("buildSitemap", () => {
  const urls = () => buildSitemap(SITE_URL).map((entry) => entry.url);

  test("should include the landing page, signin and signup urls", () => {
    expect(urls()).toEqual(
      expect.arrayContaining([
        `${SITE_URL}/`,
        `${SITE_URL}/signin`,
        `${SITE_URL}/signup`,
      ]),
    );
  });

  test("should not include any url under /sketches", () => {
    const sketchesUrls = urls().filter((url) =>
      url.startsWith(`${SITE_URL}/sketches`),
    );

    expect(sketchesUrls).toEqual([]);
  });

  test("should start every url with the site url", () => {
    for (const url of urls()) {
      expect(url.startsWith(SITE_URL)).toBe(true);
    }
  });
});
