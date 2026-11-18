# Routing

## Routes

| Path             | Content                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| `/`              | The landing page. The buttons change with the auth state                                             |
| `/signin`        | Sign-in. Renders `AuthPage` from `src/auth-form/`                                                    |
| `/signup`        | Registration. For a guest, it registers the email address                                            |
| `/sketches`      | The sketch list. Shows a skeleton by `Suspense` while fetching                                       |
| `/sketches/[id]` | The sketch page. The link target of each item in the list. Has a `loading.tsx` and a `not-found.tsx` |

See [Authentication](./auth.en.md) for the redirects by path.
See [Authentication](./auth.en.md) also for the behavior of `/signin` and `/signup`.
`src/app/(auth)/layout.tsx` renders `NavigationMenu` on `/signin` and `/signup`.
See [Toolbars](./toolbar.en.md) for details.

## Landing page (`/`)

`src/app/page.tsx` renders `LandingPage` from `src/landing-page/`.
It is always shown, whether the user is signed out or signed in.

- `LandingPage` passes a client made by `createSupabaseServerClient` to `getAuthState`, and shows different buttons by the auth state.
- "ゲストとして続ける" (Continue as a guest) is `NewSketchButton`.
  The flow is the same as "Creating a sketch" in [Sketch list](#sketch-list-sketches).

| Auth state   | Buttons                                                                              |
| ------------ | ------------------------------------------------------------------------------------ |
| `signedOut`  | "ゲストとして続ける", "アカウント登録" (`/signup`), "サインイン" (`/signin`)         |
| `guest`      | "スケッチ一覧へ" (`/sketches`), "アカウント登録（他の端末でも使えます）" (`/signup`) |
| `registered` | "スケッチ一覧へ" (`/sketches`)                                                       |

## Sketch list (`/sketches`)

`src/app/sketches/page.tsx` renders `SketchList` from `src/sketch-list/`.
It shows the heading (`<h1>`) at once, and wraps only `SketchList`, which fetches the data, in `Suspense`.
The `fallback` is `SketchListSkeleton` from `src/sketch-list/`.
See [Overview](./overview.en.md) for the components.

`src/app/sketches/layout.tsx` renders `NavigationMenu` on every page under `/sketches` (including `/sketches/[id]`).
See [Toolbars](./toolbar.en.md) for details.

### Fetching

- `SketchList` passes a client made by `createSupabaseServerClient` to `getSketchList` (`src/supabase/sketch-crud/getSketchList.ts`).
- `getSketchList` is server only (`server-only`).
- It gets `id`, `title`, `description`, `created_at` and `updated_at`.
  It does not get `canvas_json`.
- It orders the rows by `updated_at` descending.
- `getSketchList` itself has no filter by `user_id`.
  The RLS of the `sketches` table (`auth.uid() = user_id`) returns only the rows of the signed-in user.
  See [Database](./database.en.md).
- `getSketchList` returns `Result<T>` (`src/utils/utility.types.ts`).
- The browser back button reuses the client cache of Next.js.
  To show the latest list after a save on the sketch page, the cache of `/sketches` is discarded after a save succeeds.
  See `revalidateSketchList` in [Saving sketches](./save.en.md).

### Display

| State   | Display                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------- |
| Loading | `SketchListSkeleton`. It has no text, and shows 3 rows of bars that are the same size as the real items |
| Error   | "スケッチ一覧の取得に失敗しました。" with `role="alert"`                                                |
| No rows | "スケッチがまだありません。"                                                                            |
| 1+ rows | Each item links to `/sketches/{id}`. Shows `title`, `description` (if any) and the updated time         |

- The updated time is shown by `LocalTime` (`src/design-system/local-time.tsx`). It is not shown when `updated_at` is `null`.

### Creating a sketch

The new-sketch button is rendered by `NewSketchIconButton` in `NavigationMenu`, using `NewSketchButton` from `src/new-sketch/`.
`src/app/sketches/page.tsx` itself has no button.

- `NewSketchButton` is a Client Component.
  It calls the Server Action `startNewSketch` through `useActionState`.
- `startNewSketch` works as follows.
  1. It creates a client for Server Actions (`createSupabaseAnonActionClient`).
  2. Only when `getAuthState` returns `signedOut`, it signs in anonymously by `signInAnonymouslyWithForwardedIp`.
     After signing in, it creates `createSupabaseAnonActionClient` again.
     See [Authentication](./auth.en.md).
  3. It creates an empty sketch by `upsertSketch` with only `fabric_version`.
     It does not pass `id`.
     `title`, `canvas_json`, `width`, `height` and so on are filled in by the DB defaults and the trigger.
     See [Database](./database.en.md).
  4. On success, it redirects to `/sketches/{id}`.
- It returns an error message in the following cases.
  - When the anonymous sign-in fails, it returns "サインインに失敗しました。".
  - When `upsertSketch` fails with `SK001` (the sketch count limit), it returns "スケッチの作成上限に達しました。".
    See [Database](./database.en.md) for the limit.
  - When the creation fails for any other reason, it returns "スケッチの作成に失敗しました。".
- `NewSketchButton` shows the returned message as a toast (`src/design-system/toast.tsx`).
- `<Toaster>` is placed in `src/app/layout.tsx`.

## Sketch page (`/sketches/[id]`)

`src/app/sketches/[id]/page.tsx` renders `SketchDetail` from `src/sketch-detail/`.

- `SketchDetail` calls `notFound()` when `id` is not a uuid.
- It calls `getSketchCached` (`src/sketch-detail/getSketchCached.ts`).
  `getSketchCached` passes a client made by `createSupabaseServerClient` to `getSketch` (`src/supabase/sketch-crud/getSketch.ts`).
- `getSketch` is server only (`server-only`).
  It gets `id`, `title`, `description`, `width`, `height`, `created_at` and `updated_at`, and also `canvas_json`, `cell_size` and `frame_id`, which are needed to restore the canvas.
  It also gets `fabric_version`, but the app does not use it.
- By the RLS, both a nonexistent `id` and an `id` of another user give `null`.

| State                         | Display                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Loading                       | `SketchDetailSkeleton` from `loading.tsx`. Shows the paper of the canvas and the frames of the 3 toolbars          |
| `id` is not a uuid, or `null` | `notFound()`. `not-found.tsx` shows "スケッチが見つかりません。" and a link to the list                            |
| Error                         | "スケッチの取得に失敗しました。" with `role="alert"`                                                               |
| Success                       | Shows `TitleToolbar` (inputs for `title` and `description`, `width × height`, the updated time) and `SketchCanvas` |

## 404 and error pages

The frame, the retry button, the link button and the error page (`UniversalErrorPage`) are components in `src/error-pages/`.
See [Overview](./overview.en.md) for details.
`not-found.tsx` writes the wording and the link target in each file.
`error.tsx` passes the link target and the button text to `UniversalErrorPage`.

| File                                  | Kind             | Heading                  | Actions                                      |
| ------------------------------------- | ---------------- | ------------------------ | -------------------------------------------- |
| `src/app/not-found.tsx`               | Server Component | ページが見つかりません   | "トップへ戻る" (`/`)                         |
| `src/app/sketches/[id]/not-found.tsx` | Server Component | スケッチが見つかりません | "スケッチ一覧へ戻る" (`/sketches`)           |
| `src/app/error.tsx`                   | Client Component | 問題が発生しました       | "再試行", "トップへ戻る" (`/`)               |
| `src/app/sketches/error.tsx`          | Client Component | 問題が発生しました       | "再試行", "スケッチ一覧へ戻る" (`/sketches`) |

- `error.tsx` receives only `reset`.
  It does not receive `error`, so `message`, `stack` and `digest` are never shown.
- "再試行" calls `reset` to render the segment again.
- `src/app/sketches/error.tsx` is rendered inside `sketches/layout.tsx`.
  So `NavigationMenu` stays on an error.
- There is no `global-error.tsx`.
  An error in the root `layout.tsx` shows the default Next.js screen.

## Title and metadata

`src/app/layout.tsx` defines the metadata shared by the whole site.
Each page specifies only `title`.

### Shared metadata (`src/app/layout.tsx`)

| Item             | Value                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `metadataBase`   | The value of `getSiteUrl()` (`src/utils/getSiteUrl.ts`) as a `URL`. See [Environment variables](../setup/environment.en.md) |
| `title.default`  | `Doodle2LLM`. It is used when a page does not specify `title`                                                               |
| `title.template` | `%s \| Doodle2LLM`. When a page specifies `title`, the value goes into `%s`                                                 |
| `description`    | "思いついたアイデアをその場でスケッチして、そのままLLMに渡せるキャンバスです"                                               |
| `openGraph`      | `type` is `website`, `siteName`, `locale` is `ja_JP`, `title` and `description`. `url` and `images` are not specified       |
| `twitter`        | `card` is `summary_large_image`, `title` and `description`. `images` is not specified                                       |

- `<html lang>` is fixed to `ja`.
- The site name and the description are constants in `layout.tsx` (`SITE_NAME` and `SITE_DESCRIPTION`).

### Share image

By the file convention, `src/app/opengraph-image.png` (1200x630) becomes `og:image` and `twitter:image` of every page.
There is no `twitter-image`; this one image serves both.

- The URL of the image is output as an absolute URL, using `metadataBase`.
  The width and the height (`og:image:width` and `og:image:height`) are also output automatically.
- `layout.tsx` does not write `images` in `openGraph` or `twitter`.
  `layout.tsx` specifies `twitter:card` as `summary_large_image`.
- `src/app/opengraph-image.alt.txt` becomes `og:image:alt` and `twitter:image:alt`.
  It has the site name and the description, the same values as `SITE_NAME` and `SITE_DESCRIPTION`.
- A path that ends with `.png` is excluded by the matcher of `src/proxy.ts`.
  So fetching the image does not refresh the auth session.
- See "Share image" in [Overview](./overview.en.md) for how the image is made.

### Title of each page

| Path             | How it is specified | title                                            |
| ---------------- | ------------------- | ------------------------------------------------ |
| `/`              | Not specified       | `Doodle2LLM` (`default`)                         |
| `/signin`        | `metadata`          | `サインイン`                                     |
| `/signup`        | `metadata`          | `アカウント登録`                                 |
| `/sketches`      | `metadata`          | `スケッチ`                                       |
| `/sketches/[id]` | `generateMetadata`  | The `title` of the sketch (see the next section) |

- `not-found.tsx` and `error.tsx` do not specify `title`.
- By `title.template`, `/signin` is shown as `サインイン | Doodle2LLM`.

### `generateMetadata` of `/sketches/[id]`

`generateMetadata` in `src/app/sketches/[id]/page.tsx` only takes out `id` and passes it to `generateSketchMetadata` in `src/sketch-detail/`.

- `generateSketchMetadata` returns the `title` of the sketch got by `getSketchCached`.
- `getSketchCached` is `getSketch` wrapped with `cache()`.
  `SketchDetail` also uses it.
  The purpose is to share the result in the same request.
- `cache()` compares the arguments by reference, so the only argument of `getSketchCached` is `id` (a string).
  The client is created inside the function.
- `SketchDetail` is in charge of the error display and the 404 page.
- `SketchDetail` and `generateSketchMetadata` both check whether `id` is a uuid with `isSketchId` (`src/sketch-detail/isSketchId.ts`).
- `generateSketchMetadata` does not request the database when `id` is not a uuid.

| State                                             | Returned value                 |
| ------------------------------------------------- | ------------------------------ |
| `id` is not a uuid                                | `{}`                           |
| Success, and `title` is not blank                 | `{ title }`                    |
| Success, and `title` is empty or only spaces      | `{}` (`title.default` is used) |
| `null` (nonexistent, or a sketch of another user) | `{}`                           |
| Error                                             | `{}`                           |

## Sitemap

`src/app/sitemap.ts` serves `/sitemap.xml`.
It only passes the value of `getSiteUrl()` (`src/utils/getSiteUrl.ts`) to `buildSitemap` in `src/sitemap/`.

- It lists 3 pages: `/`, `/signin` and `/signup`.
  The pages under `/sketches` need sign-in, so they are not included.
- Each URL is the value of `getSiteUrl()` followed by the path.
  Only `/` ends with a slash (for example, `https://example.com/`).
  `/signin` and `/signup` have no trailing slash.
- Each entry has only `url`.
  `lastModified`, `changeFrequency` and `priority` are not specified.
- When `NEXT_PUBLIC_SITE_URL` is invalid, the exception of `getSiteUrl()` is passed on as it is.
  See [Environment variables](../setup/environment.en.md).

## Web Analytics

`src/app/layout.tsx` places `WebAnalytics` from `src/analytics/` at the end of `body`.
`WebAnalytics` is a Client Component that uses `Analytics` from `@vercel/analytics/next`.

- The `beforeSend` of `WebAnalytics` drops the events whose `event.url` pathname starts with `/sketches` (it returns `null`).
  It sends all other events as they are.
- The check is a prefix match (`startsWith`) on the pathname.
  The query string is not used.
- `/sketches` and `/sketches/[id]` are not measured.
  `/`, `/signin` and `/signup` are measured.
- Reasons for excluding them:
  - `proxy.ts` redirects `signedOut` from under `/sketches` to `/`.
    Only signed-in users (`guest` and `registered`) can open these pages.
    See [Authentication](./auth.en.md).
  - The URLs contain user-specific data such as the sketch ID.
    It is not sent to the analytics service.
