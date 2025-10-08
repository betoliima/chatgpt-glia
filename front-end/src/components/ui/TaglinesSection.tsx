import React from 'react';

interface TaglinesSectionProps {
  taglines: readonly string[];
}

const TaglinesSection: React.FC<TaglinesSectionProps> = ({ taglines }) => {
  return (
    <div className="space-y-2 text-center">
      {taglines.map((tagline, index) => (
        <p
          key={index}
          className="text-lg md:text-xl text-muted-foreground font-medium animate-fade-in tagline-text"
          style={{ 
            animationDelay: `${0.2 + index * 0.2}s`
          }}
        >
          {tagline}
        </p>
      ))}
    </div>
  );
};

export default TaglinesSection;
