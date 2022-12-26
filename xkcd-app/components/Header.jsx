import Link from "next/link";

export  function Header() {
  return (
    <header
      className="
      flex 
      justify-between 
      items-center 
      p-4"
    >
      <h3>
        <Link href="/">
          XKCD
        </Link>
      </h3>
        <nav>
          <ul className="flex row gap-3">
            <li><Link href="/Search">Search</Link></li>
            <li><Link href="/home">Home</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>
    </header>
  );
}