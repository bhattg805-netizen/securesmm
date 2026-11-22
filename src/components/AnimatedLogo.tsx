import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { fetchPublicSettings } from '../lib/api.ts';

interface AnimatedLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  theme?: 'dark' | 'light' | 'auto';
}

const LEGACY_BRAND_NAMES = new Set(['ethicalsmm', 'youthsmm', 'trustysmm']);

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  theme = 'auto',
}) => {
  const [logoImg, setLogoImg] = React.useState<string>('');
  const [siteName, setSiteName] = React.useState<string>('SecureSMM');

  React.useEffect(() => {
    const cachedLogo = localStorage.getItem('websiteLogo');
    const cachedName = localStorage.getItem('websiteName');
    if (cachedLogo) setLogoImg(cachedLogo);
    if (cachedName && !LEGACY_BRAND_NAMES.has(cachedName.trim().toLowerCase())) {
      setSiteName(cachedName);
    } else {
      setSiteName('SecureSMM');
    }

    fetchPublicSettings().then((data) => {
      if (data) {
        if (data.websiteLogo !== undefined) {
          setLogoImg(data.websiteLogo);
        }
        if (data.websiteName && !LEGACY_BRAND_NAMES.has(data.websiteName.trim().toLowerCase())) {
          setSiteName(data.websiteName);
        } else {
          setSiteName('SecureSMM');
        }
      }
    });
  }, []);

  const iconSizes = {
    xs: 'w-7 h-7',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    xs: 'text-sm sm:text-base',
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const rawName = siteName || 'SecureSMM';
  const name = LEGACY_BRAND_NAMES.has(rawName.trim().toLowerCase()) ? 'SecureSMM' : rawName;
  const mid = name.toLowerCase().startsWith('secure') ? 6 : Math.ceil(name.length / 2);
  const prefix = name.slice(0, mid);
  const suffix = name.slice(mid);

  const isSuffixLight = theme === 'dark';

  return (
    <div className={`inline-flex items-center space-x-2.5 select-none ${className}`}>
      {/* Dynamic Kinetic SecureSMM Shield Emblem */}
      <motion.div
        className="relative flex items-center justify-center cursor-pointer group flex-shrink-0"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {/* Glow Background Pulse */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#FF3030] via-red-600 to-rose-500 opacity-55 blur-md"
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.45, 0.78, 0.45],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Foreground Emblem Box */}
        <div
          className={`${iconSizes[size]} relative rounded-2xl bg-gradient-to-br from-[#FF3030] via-[#E60023] to-[#9E0014] border border-white/25 flex items-center justify-center overflow-hidden z-10 shadow-lg text-white shadow-red-600/30`}
        >
          {logoImg ? (
            <img src={logoImg} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center p-1">
              {/* Shimmer sweep animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-20"
                animate={{
                  x: ['-140%', '140%'],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: 'easeInOut',
                }}
              />

              {/* Animated SecureSMM Shield + Stylized "S" Emblem */}
              <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow-md" fill="none">
                {/* Outer Security Shield Outline */}
                <motion.path
                  d="M18 4 L30 8.5 V17.5 C30 24.8 24.8 30.2 18 32.5 C11.2 30.2 6 24.8 6 17.5 V8.5 Z"
                  fill="rgba(16, 16, 16, 0.45)"
                  stroke="#ffffff"
                  strokeWidth="2.3"
                  strokeLinejoin="round"
                  animate={{
                    strokeOpacity: [0.9, 1, 0.9],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Bold Geometric "S" inside Shield */}
                <motion.path
                  d="M22.4 13.4 C22.4 11.4 20.5 10.6 18 10.6 C15.2 10.6 13.5 11.9 13.5 13.8 C13.5 15.8 15.6 16.6 18.1 17.4 C20.6 18.2 22.6 19 22.6 21.4 C22.6 23.6 20.6 25 18 25 C15.2 25 13.4 23.8 13.2 22"
                  stroke="#ffffff"
                  strokeWidth="2.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{
                    strokeWidth: [2.85, 3.15, 2.85],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Golden Security Core Streak */}
                <motion.path
                  d="M14.8 16.1 C16 16.9 17.2 17.2 18.4 17.6 C19.6 18 20.8 18.5 21.6 19.4"
                  stroke="#facc15"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  animate={{
                    stroke: ['#facc15', '#fef08a', '#facc15'],
                    opacity: [0.85, 1, 0.85],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />

                {/* Top Shield Crest Verified Gold Nucleus */}
                <motion.circle
                  cx="18"
                  cy="6.8"
                  r="1.9"
                  fill="#facc15"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.85, 1, 0.85],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>

              {/* Micro Verified Shield Accent */}
              <motion.div
                className="absolute -bottom-0.5 -right-0.5 bg-[#101010] rounded-full p-0.5 border border-white/20"
                animate={{
                  scale: [0.95, 1.08, 0.95],
                }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <ShieldCheck className="w-2.5 h-2.5 text-yellow-300" />
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col items-start leading-none">
          <div className="flex items-center">
            {/* "Secure" Prefix in bold red gradient */}
            <span
              className={`${textSizes[size]} font-black tracking-tight bg-gradient-to-r from-[#FF3030] via-rose-500 to-orange-400 bg-clip-text text-transparent group-hover:brightness-110 transition-all font-display`}
            >
              {prefix}
            </span>

            {/* "SMM" Suffix in crisp contrast */}
            <span
              className={`${textSizes[size]} font-black tracking-tight ${
                isSuffixLight ? 'text-white' : 'text-gray-900'
              } ml-0.5 flex items-center font-display`}
            >
              {suffix}
            </span>
          </div>

          <div className="flex items-center space-x-1 mt-0.5">
            <span className="text-[8px] font-black uppercase tracking-wider text-[#FF4D4D] bg-[#FF3030]/10 border border-[#FF3030]/25 px-1.5 py-0.5 rounded font-mono flex items-center space-x-1">
              <ShieldCheck className="w-2.5 h-2.5 inline-block" />
              <span>VERIFIED SMM</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
