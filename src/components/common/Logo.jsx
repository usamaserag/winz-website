import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/WhatsApp_Image_2025-01-28_at_20.49.53_7afb9577-removebg-preview.png';

const Logo = ({ className = 'w-12 h-auto', onClick }) => {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2">
      <img 
        src={logoImage} 
        alt="WINZ Logo" 
        className={`${className} object-contain`} 
      />
    </Link>
  );
};

export default Logo;
