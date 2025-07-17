import Link from 'next/link';

const NavbarLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="transition-all duration-300 hover:ring-2 hover:ring-emerald-500 hover:ring-offset-2 rounded-md px-2 py-1"
    >
      {children}
    </Link>
  );
};

export default NavbarLink;
