import Link from "next/link";

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">EpicTales</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link href="/explorer">Explorer</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link href="/mes-salles">Mes Salles</Link>
            </li>
            <li>
              <Link href="/profil">Profil</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/connexion">Connexion</Link>
            </li>
            <li>
              <Link href="/inscription">Inscription</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;