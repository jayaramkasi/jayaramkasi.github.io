import { Outlet } from "react-router-dom";
import Sidebar from "~/components/Sidebar";

function Layout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="px-6 py-12 sm:px-10 lg:ml-64 lg:px-20 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
