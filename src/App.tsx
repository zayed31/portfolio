import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GlobalClickSpark from "./components/GlobalClickSpark";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  // Enable coffee cursor globally
  if (typeof document !== 'undefined') {
    // Preload cursor images to ensure they're available immediately
    const preloadCursorImages = () => {
      const normalCursor = new Image();
      const tiltCursor = new Image();
      normalCursor.src = '/coffee-cursor.png';
      tiltCursor.src = '/coffee-cursor-tilt.png';
    };
    
    // Preload images immediately
    preloadCursorImages();
    
    // Add coffee cursor class with a small delay to ensure images are loaded
    setTimeout(() => {
      document.body.classList.add('coffee-cursor');
    }, 100);
    
    // Toggle tilt on click briefly with immediate class application
    const handleDown = () => {
      document.body.classList.add('cursor-active');
      // Force a repaint to ensure the cursor change is visible
      document.body.style.cursor = 'url("/coffee-cursor-tilt.png") 16 16, auto';
      // Trigger a reflow to ensure the cursor change is applied
      document.body.offsetHeight;
    };
    const handleUp = () => {
      document.body.classList.remove('cursor-active');
      // Force a repaint to ensure the cursor change is visible
      document.body.style.cursor = 'url("/coffee-cursor.png") 16 16, auto';
      // Trigger a reflow to ensure the cursor change is applied
      document.body.offsetHeight;
    };
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);

    // Cleanup function for performance optimization
    const cleanup = () => {
      // Clear unused event listeners
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
      
      // Force garbage collection if available
      if (window.gc) {
        window.gc();
      }
    };

    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
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
