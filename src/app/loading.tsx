// Next.js 15 Enhanced Loading UI
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated logo/spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-gray-600 rounded-full animate-ping"></div>
        </div>
        
        {/* Loading text with pulse animation */}
        <div className="text-gray-900 text-lg font-medium animate-pulse">
          Loading your content...
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full bg-gray-900 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
