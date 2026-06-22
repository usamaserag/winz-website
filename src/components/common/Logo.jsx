import { Link } from '../routing';
import logoColoredWebp from '../../assets/images/logo-colored.webp';
import logoColoredPng from '../../assets/images/WhatsApp_Image_2026-05-13_at_12.54.03_AM-removebg-preview.png';
import logoWhiteWebp from '../../assets/images/logo-white.webp';
import logoWhitePng from '../../assets/images/Icon-removebg-preview.png';

const LOGO_SIZES = { width: 112, height: 40 };

/**
 * @param {{ className?: string, onClick?: () => void, variant?: 'default' | 'white', priority?: boolean }} props
 */
const Logo = ({
  className = 'h-10 w-28',
  onClick,
  variant = 'default',
  priority = false,
}) => {
  const isWhite = variant === 'white';
  const webpSrc = isWhite ? logoWhiteWebp : logoColoredWebp;
  const pngSrc = isWhite ? logoWhitePng : logoColoredPng;

  return (
    <Link to="/" onClick={onClick} className="flex items-center shrink-0">
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={pngSrc}
          alt="WINZ Logo"
          width={LOGO_SIZES.width}
          height={LOGO_SIZES.height}
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={`${className} object-contain`}
        />
      </picture>
    </Link>
  );
};

export default Logo;
