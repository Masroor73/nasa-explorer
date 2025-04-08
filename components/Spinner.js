'use client';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="h-10 w-10 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}

  