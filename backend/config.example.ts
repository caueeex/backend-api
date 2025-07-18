// =====================================================
// Configuração de Exemplo - Stefanini Brasil
// =====================================================

export const config = {
  // Configurações do Banco de Dados
  database: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root', // Altere para sua senha
    database: 'stefanini_db',
  },

  // Configurações do Redis
  redis: {
    host: 'localhost',
    port: 6379,
    ttl: 60, // segundos
  },

  // Configurações da Aplicação
  app: {
    port: 3001,
    environment: 'development',
  },
};

// =====================================================
// Como usar:
// 1. Copie este arquivo para config.ts
// 2. Ajuste as configurações conforme necessário
// 3. Importe no app.module.ts
// ===================================================== 