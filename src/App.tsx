import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GlobalClickSpark from "./components/GlobalClickSpark";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  // Enable coffee cursor globally
  if (typeof document !== 'undefined') {
    document.body.classList.add('coffee-cursor');
    // Toggle tilt on click briefly
    const handleDown = () => document.body.classList.add('cursor-active');
    const handleUp = () => document.body.classList.remove('cursor-active');
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);
  }

  return (
    <GlobalClickSpark>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </GlobalClickSpark>
  );
};

export default App;
