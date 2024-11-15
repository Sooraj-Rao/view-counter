import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-sm py-3">
      <div className="container mx-auto px-6">
        <div className="flex sm:px-40 px-4  justify-between items-center">
          <p>&copy; 2024 ViewCounter. All rights reserved.</p>
          <p>
            Developed by{" "}
            <Link
              target="_blank"
              href="https://soorajrao.in"
              className="underlines text-primary font-semibold"
            >
              Sooraj
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
