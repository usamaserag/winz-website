import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Truck,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Building,
} from "lucide-react";
import Logo from "../common/Logo";

const Footer = () => {
  const { t } = useTranslation(["common"]);

  return (
    <>
      {/* Gradient Top Border */}
      <div className="h-px w-full bg-gradient-to-r from-slate-900 via-sky-400 to-slate-900" />

      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-6">
              <Logo className="h-12 w-auto" />
              <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
                {t("footer.description")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">
                {t("footer.quickLinks")}
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-primary-400 transition-colors"
                  >
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/transport"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Transport
                  </Link>
                </li>
                <li>
                  <Link
                    to="/warehouse"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Warehouse
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-primary-400 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">
                {t("nav.services")}
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/import"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Import Clearance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/export"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Export Clearance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/transit"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Transit Clearance
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">
                {t("footer.contactInfo")}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                  <span>Gentsesteenweg 102 D4, 9240 Zele, Belgium</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span dir="ltr">+ 32496322467</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span>info@winz.be</span>
                </li>
                <li className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span>VAT/TVA no: BE1030.165.041</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-sm text-gray-500 text-center">
              &copy; {new Date().getFullYear()} WINZ. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
