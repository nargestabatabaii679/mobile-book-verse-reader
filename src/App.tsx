
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Diagnostics from "./pages/Diagnostics";
import StoryViewer from "./components/story-mode/StoryViewer";
import InteractiveStoryPlayer from "./components/interactive-story/InteractiveStoryPlayer";
import ConnectionStatus from "./components/ConnectionStatus";
import { config } from "./config";

// Enhanced QueryClient configuration with environment-based settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        // Don't retry for authentication errors
        const err = error as { status?: number };
        if (err?.status === 401 || err?.status === 403) {
          return false;
        }
        // Use configured max retries
        return failureCount < config.api.maxRetries;
      },
      retryDelay: (attemptIndex) => Math.min(config.api.retryDelay * 2 ** attemptIndex, 30000),
      staleTime: config.cache.staleTime,
      gcTime: config.cache.duration,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: (failureCount, error: unknown) => {
        // Don't retry mutations for authentication errors
        const err = error as { status?: number };
        if (err?.status === 401 || err?.status === 403) {
          return false;
        }
        // Retry once for network errors
        return failureCount < 1;
      },
      retryDelay: config.api.retryDelay,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen">
        {/* Connection status indicator */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <ConnectionStatus className="m-2" />
        </div>

        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/diagnostics" element={<Diagnostics />} />
            <Route path="/interactive/:storyId" element={<StoryViewer />} />
            <Route path="/interactive/story/:storyId" element={<InteractiveStoryPlayer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
