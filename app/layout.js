import "./globals.css";

export const metadata = {
  title: "PumpBuild — We build the token. You keep the fees.",
  description: "PumpBuild builds fee-earning tokens on Solana for developers shipping open-source work and startup founders building a product.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
