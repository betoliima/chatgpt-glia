import React from 'react';

interface GliaLogoProps {
  className?: string;
}

const GliaLogo: React.FC<GliaLogoProps> = ({ className = "" }) => {
  // Ajuste o tamanho visual da logo aqui (não altera o layout)
  const logoScale = 3.5; // 1.0 = normal, 2.0 = 2x, 3.5 = 3.5x
  const baseHeightPx = 120; // altura base antes do scale (não empurra elementos)

  return (
    <img
      src="\src\assets\logo_glia-removebg-preview.png"
      alt="GLIA Logo"
      className={className}
      style={{
        display: 'block',
        height: `${baseHeightPx}px`,
        width: 'auto',
        transform: `scale(${logoScale})`,
        transformOrigin: 'center',
      }}
    />
  );
};

export default GliaLogo;
