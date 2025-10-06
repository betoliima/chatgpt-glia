import React from 'react';
import { ChatContainer, GliaLogo, TaglinesSection, Footer } from '../components';
import { APP_CONFIG } from '../constants/config';

const Index: React.FC = () => {
  const { taglines } = APP_CONFIG;

  return (
    <div className="main-container">
      <div className="content-wrapper" style={{ minHeight: '100vh' }}>
        {/* Logo GLIA */}
        <GliaLogo />

        {/* Taglines */}
        <TaglinesSection taglines={taglines} />

        {/* Espaçador para empurrar o Chat para o rodapé */}
        <div style={{ flex: 1 }} />

        {/* Chat Container */}
        <ChatContainer />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
