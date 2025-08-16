import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
      <Link href="/"><a style={{ fontWeight: "bold" }}>Interior Solutions KE</a></Link>
      <Link href="/services"><a>Services</a></Link>
      <Link href="/portfolio"><a>Portfolio</a></Link>
      <Link href="/shop"><a>Shop</a></Link>
      <Link href="/about"><a>About</a></Link>
      <Link href="/contact"><a>Contact</a></Link>
    </nav>
  );
}