import { useTasks } from "./hooks/useTasks";

function App() {
  const { data, isLoading, error } = useTasks(1, 10);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tasks</p>;

  return (
    <div>
      <h1>Tasks Loaded via React Query</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
