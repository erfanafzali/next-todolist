import NoteProvider from "@/components/context/NoteContext";
import "../styles/globals.css";
import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <NoteProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NoteProvider>
  );
}
