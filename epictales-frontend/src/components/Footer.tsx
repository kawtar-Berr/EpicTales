import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-footer text-white text-center py-6 mt-10">
      {/* Social Media Icons */}
      <div className="mt-3 flex justify-center gap-4">
        <Link href="#"><img src="/facebook.svg" alt="Facebook" className="h-6"/></Link>
        <Link href="#"><img src="/twitter.svg" alt="Twitter" className="h-6"/></Link>
        <Link href="#"><img src="/instagram.svg" alt="Instagram" className="h-6"/></Link>
      </div>
      <p>&copy; 2025 EpicTales. Tous droits réservés.</p>
      <div className="mt-3 flex justify-center gap-6">
        <Link href="/mentions" className="hover:text-gold">Mentions légales</Link>
        <Link href="/contact" className="hover:text-gold">Contact & Support</Link>
      </div>
    </footer>
  );
};
export default Footer;
