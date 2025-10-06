import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "mt-8 text-xs text-muted-foreground animate-fade-in" }) => {
  return (
    <p
      className={className}
      style={{ animationDelay: '1.2s' }}
    >
      Powered by{' '}
      <span className="text-accent font-semibold">GLIA Intelligence</span>
    </p>
  );
};

export default Footer;
