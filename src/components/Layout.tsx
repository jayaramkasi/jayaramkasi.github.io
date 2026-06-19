import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "~/components/Sidebar";

function Layout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="px-5 pb-6 pt-20 sm:px-8 lg:ml-64 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-3xl">
          <div
            key={pathname}
            className="animate-tab-enter motion-reduce:animate-none"
          >
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
