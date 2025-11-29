import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div>
      {/* TODO: header, nav, theme toggle */}
      <header style={{ padding: "1rem" }}>
        <h2>Task Manager</h2>
      </header>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
