import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="bg-slate-700">
      <Header />
      <main>{children}</main>
    </div>
  );
}



export default Layout;
