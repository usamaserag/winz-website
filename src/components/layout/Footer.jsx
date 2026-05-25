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
import { useCookieConsent } from "../../context/CookieContext";

const Footer = () => {
  const { t } = useTranslation(["common"]);
  const { openPreferences } = useCookieConsent();

  return (
    <>
      {/* Gradient Top Border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

      <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-6">
              <Logo className="h-12 w-auto" />
              <p className="text-sm leading-relaxed text-slate-600 max-w-xs">
                {t("footer.description")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-slate-900 font-semibold text-lg mb-6">
                {t("footer.quickLinks")}
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/about"
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/transport"
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    Transport
                  </Link>
                </li>
                <li>
                  <Link
                    to="/warehouse"
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    Warehouse
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="text-slate-900 font-semibold text-lg mb-6">
                {t("nav.services")}
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/import"
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    {t("nav.clearance.import")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/export"
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    {t("nav.clearance.export")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/transit"
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    {t("nav.clearance.transit")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-slate-900 font-semibold text-lg mb-6">
                {t("footer.contactInfo")}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">Gentsesteenweg 102 D4, 9240 Zele, Belgium</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="text-slate-600" dir="ltr">+ 32496322467</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="text-slate-600">info@winz.be</span>
                </li>
                <li className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="text-slate-600">VAT/TVA no: BE1030.165.041</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-sm text-slate-600 text-center">
              &copy; {new Date().getFullYear()} WINZ. {t("footer.rights")}
            </p>
            <span className="hidden md:inline text-slate-300" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={openPreferences}
              className="text-sm text-slate-600 transition-colors hover:text-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 rounded"
            >
              {t("cookies.footer.settings")}
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
