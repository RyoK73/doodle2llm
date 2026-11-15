import { getSiteUrl } from "@/utils/getSiteUrl";

// `undefined` means that the variable is not set at all.
// `.env.local` is loaded by `setupTests.ts`, so every test sets the variable explicitly.
const setSiteUrl = (siteUrl: string | undefined) => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", siteUrl);
};

describe("getSiteUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("Development Environment", () => {
    beforeEach(() => {
      vi.stubEnv("VERCEL_ENV", undefined);
    });

    test.each([
      { siteUrl: "https://example.com", expected: "https://example.com" },
      { siteUrl: "https://example.com/", expected: "https://example.com" },
      { siteUrl: "http://localhost:3000", expected: "http://localhost:3000" },
      { siteUrl: "http://localhost:3000/", expected: "http://localhost:3000" },
      // The fallback when the variable is not set.
      { siteUrl: undefined, expected: "http://localhost:3000" },
    ])("should return $expected for $siteUrl", ({ siteUrl, expected }) => {
      setSiteUrl(siteUrl);

      expect(getSiteUrl()).toBe(expected);
    });

    test.each([
      { name: "an empty string", siteUrl: "" },
      { name: "only spaces", siteUrl: "   " },
    ])("should throw for $name", ({ siteUrl }) => {
      setSiteUrl(siteUrl);

      expect(() => getSiteUrl()).toThrow();
    });
  });

  describe("Production Environment", () => {
    beforeEach(() => {
      vi.stubEnv("VERCEL_ENV", "production");
    });

    test.each([
      { siteUrl: "https://example.com", expected: "https://example.com" },
      { siteUrl: "https://example.com/", expected: "https://example.com" },
    ])("should return $expected for $siteUrl", ({ siteUrl, expected }) => {
      setSiteUrl(siteUrl);

      expect(getSiteUrl()).toBe(expected);
    });

    test.each([
      { name: "an http url", siteUrl: "http://example.com" },
      { name: "http://localhost:3000", siteUrl: "http://localhost:3000" }, // The fallback is http, so it is rejected.
      { name: "an unset variable", siteUrl: undefined },
      { name: "an empty string", siteUrl: "" },
      { name: "only spaces", siteUrl: "   " },
    ])("should throw for $name", ({ siteUrl }) => {
      setSiteUrl(siteUrl);

      expect(() => getSiteUrl()).toThrow();
    });
  });
});
