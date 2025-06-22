// Next.js 15 Enhanced Loading UI
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffbe7]">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated logo/spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#ffe082] border-t-[#ffa000] rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#ff8f00] rounded-full animate-ping"></div>
        </div>
        
        {/* Loading text with pulse animation */}
        <div className="text-[#ffa000] text-lg font-medium animate-pulse">
          Loading your content...
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-[#ffe082] rounded-full overflow-hidden">
          <div className="h-full bg-[#ffa000] rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
