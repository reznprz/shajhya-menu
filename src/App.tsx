import React from "react";
import "./App.css";
import FoodMenu from "./pages/FoodMenu/FoodMenu";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <FoodMenu />
      </QueryClientProvider>
    </div>
  );
}

export default App;
