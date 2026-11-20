# 環境変数

## 置き場所

- リポジトリ直下に`.env.local`を作成します。
- `.env.example`をコピーして作成してください。
- `.env*`はgit管理外です。ただし`.env.example`のみ管理対象です。
- `src/setupTests.ts`が全テストの実行時に`.env.local`を読み込みます。
- そのため、`pnpm test`の実行にも`.env.local`が必要です。

## 変数一覧

| 変数                            | 使用箇所                            | 用途                                       |
| ------------------------------- | ----------------------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | アプリ(ブラウザ、サーバー)          | SupabaseプロジェクトのURL                  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | アプリ(ブラウザ、サーバー)          | Supabaseのanonキー                         |
| `SUPABASE_SECRET_KEY`           | アプリ(サーバーのみ)                | Supabaseのsecret key(匿名サインイン専用)   |
| `NEXT_PUBLIC_SITE_URL`          | アプリ(`getSiteUrl`)                | サイトの公開URL(`metadataBase`、sitemap)   |
| `SUPABASE_LOCAL_URL`            | ローカルDBに対するテスト            | ローカルSupabaseのAPI URL                  |
| `SUPABASE_LOCAL_ANON_KEY`       | ローカルDBに対するテスト            | ローカルSupabaseのanonキー                 |
| `SUPABASE_LOCAL_ADMIN_KEY`      | ローカルDBに対するテスト            | ローカルSupabaseの管理者キー               |
| `SUPABASE_LOCAL_DB_URL`         | `pg`でPostgresに直接接続するテスト  | ローカルDBの接続文字列                     |
| `PROJECTID`                     | `pnpm type:gen`、`pnpm test:remote` | リモートSupabaseのプロジェクトID           |
| `SUPABASE_ACCESS_TOKEN`         | `pnpm test:remote`                  | Supabase Management APIのアクセストークン  |
| `SENTRY_AUTH_TOKEN`             | ビルド(`withSentryConfig`)          | ソースマップのアップロード用の認証トークン |
| `NEXT_PUBLIC_SENTRY_DSN`        | SentryとVercelの連携                | コードは読まない。Vercel連携の案内の値     |
| `SENTRY_ORG`                    | SentryとVercelの連携                | コードは読まない。Vercel連携の案内の値     |
| `SENTRY_PROJECT`                | SentryとVercelの連携                | コードは読まない。Vercel連携の案内の値     |
| `SENTRY_PUBLIC_KEY`             | SentryとVercelの連携                | コードは読まない。Vercel連携の案内の値     |
| `SENTRY_OTLP_TRACES_URL`        | SentryとVercelの連携                | コードは読まない。Vercel連携の案内の値     |
| `SENTRY_VERCEL_LOG_DRAIN_URL`   | SentryとVercelの連携                | コードは読まない。Vercel連携の案内の値     |

- アプリは`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`、`SUPABASE_SECRET_KEY`をzodで検証します(`src/supabase/utils/env.ts`)。
- `NEXT_PUBLIC_SITE_URL`は、`src/utils/getSiteUrl.ts`の`getSiteUrl`がzodで検証して返します。
  - 未設定のときは、`http://localhost:3000`になります。
  - 空文字と空白のみは、エラーです。
  - 末尾のスラッシュは、取り除きます。
  - `VERCEL_ENV`が`production`(Vercelの本番)のときだけ、`https://`で始まらない値はエラーです。
    本番で未設定の場合も、`http://localhost:3000`が`https://`でないため、エラーになります。
  - `src/app/layout.tsx`の`metadataBase`と、`src/app/sitemap.ts`のURLに使います。
- `SUPABASE_SECRET_KEY`は、RLSをバイパスします。
  `NEXT_PUBLIC_`を付けず、ブラウザに公開しないでください。
  使うのは、匿名サインイン専用のクライアントだけです。
  詳細は[認証](../architecture/auth.ja.md)を参照してください。
- 本番では、VercelのEnvironment Variablesに`SUPABASE_SECRET_KEY`を登録します。
  SupabaseダッシュボードのAuthentication > Rate Limitsで、IP address forwardingも有効にします。
- ローカル用の値は、`pnpm db:start`の後に`pnpm db:status`で確認できます。
  `SUPABASE_SECRET_KEY`のローカル用の値は、`sb_secret_`で始まるキーです。
  この値は、匿名サインインを実際のローカルSupabaseに対して行うテストにも必要です。
- `SENTRY_AUTH_TOKEN`以外の`SENTRY_*`と、`NEXT_PUBLIC_SENTRY_DSN`は、現在のコードからは読みません。
  DSNは、`src/instrumentation-client.ts`、`sentry.server.config.ts`、`sentry.edge.config.ts`に直接書かれています。
  `org`と`project`は、`next.config.ts`に直接書かれています。
  SentryのVercel連携のセットアップで、設定するよう案内されている変数です。
- `SENTRY_AUTH_TOKEN`は、ビルド時のソースマップのアップロードに使います(`next.config.ts`の`authToken`)。
  `NEXT_PUBLIC_`を付けず、ブラウザに公開しないでください。
  ビルドプラグイン用の`.env.sentry-build-plugin`は、`.gitignore`に追加済みです。
- ローカルで`next build`を実行してソースマップのアップロードを試すときは、`SENTRY_AUTH_TOKEN`を`.env.local`に設定します。
- 本番では、VercelのEnvironment Variablesに、`SENTRY_AUTH_TOKEN`を登録します。
- 実際の値は絶対にコミットしないでください。

## 次のステップ

- [データベース](./database.ja.md)
