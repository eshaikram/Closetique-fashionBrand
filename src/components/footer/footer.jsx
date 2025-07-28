// components/Footer.js
export default function Footer() {
  return (
    <footer className="text-center text-sm text-black border-t border-b border-primary py-4">
      <p>
        &copy; {new Date().getFullYear()} Horeca All Rights Reserved Developed by{" "}
        <span className="text-primary font-semibold">The Web Concept</span>
      </p>
    </footer>
  );
}
