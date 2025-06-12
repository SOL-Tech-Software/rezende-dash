import Image from "next/image";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="h-full px-4 flex items-center">
        <Image
          src="/soltech-logo.svg"
          alt="Soltech Solutions"
          width={120}
          height={40}
          className="dark:invert"
        />
      </div>
    </nav>
  );
} 