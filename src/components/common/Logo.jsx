import { Link } from "react-router-dom";
import logoColored from "../../assets/images/WhatsApp_Image_2026-05-13_at_12.54.03_AM-removebg-preview.png";
import logoWhite   from "../../assets/images/Icon-removebg-preview.png";

// variant="white"   → white logo  (use on dark/colored hero backgrounds)
// variant="default" → colored logo (use on white nav backgrounds)
const Logo = ({ className = "h-10 w-28", onClick, variant = "default" }) => (
  <Link to="/" onClick={onClick} className="flex items-center">
    <img
      src={variant === "white" ? logoWhite : logoColored}
      alt="WINZ Logo"
      className={`${className} object-contain`}
    />
  </Link>
);

export default Logo;
