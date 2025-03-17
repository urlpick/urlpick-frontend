export default function Loading() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-primary/10"></div>
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

