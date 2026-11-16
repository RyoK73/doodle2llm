import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/design-system/toast";
import { MyToolTipProvider } from "@/design-system/tool-tip-provider";
import { ThemeProvider } from "@/design-system/theme-provider";
import { Zen_Kurenaido } from "next/font/google";
import { WebAnalytics } from "@/analytics";
import { getSiteUrl } from "@/utils/getSiteUrl";

const zenKurenaido = Zen_Kurenaido({
  variable: "--font-zen-kurenaido",
  weight: "400",
  subsets: ["latin"],
});

const SITE_NAME = "Ultra-Simple-Wireframer";
const SITE_DESCRIPTION =
  "思いついたアイデアをその場でスケッチして、そのままLLMに渡せるキャンバスです";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${zenKurenaido.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Toaster>
            <MyToolTipProvider>{children}</MyToolTipProvider>
          </Toaster>
        </ThemeProvider>
        <WebAnalytics />
      </body>
    </html>
  );
}
