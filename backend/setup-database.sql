-- =====================================================
-- Script para Inicializar o Banco de Dados
-- Execute este script para criar o banco e inserir dados
-- =====================================================

-- Remover banco se existir e recriar
DROP DATABASE IF EXISTS stefanini_db;
CREATE DATABASE stefanini_db;
USE stefanini_db;

-- =====================================================
-- Tabela: members (Membros da equipe)
-- =====================================================
CREATE TABLE members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabela: posts (Postagens)
-- =====================================================
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    member_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE SET NULL
);

-- =====================================================
-- Dados de exemplo
-- =====================================================

-- Inserir membros
INSERT INTO members (name, email) VALUES
('João Silva', 'joao.silva@stefanini.com'),
('Maria Santos', 'maria.santos@stefanini.com'),
('Carlos Pereira', 'carlos.pereira@stefanini.com'),
('Ana Oliveira', 'ana.oliveira@stefanini.com'),
('Pedro Costa', 'pedro.costa@stefanini.com'),
('Lucia Ferreira', 'lucia.ferreira@stefanini.com');

-- Inserir postagens
INSERT INTO posts (title, content, member_id) VALUES
('Nova Tecnologia Implementada', 'Implementamos com sucesso uma nova tecnologia que melhora significativamente a performance do sistema. A equipe trabalhou arduamente para garantir que tudo funcionasse perfeitamente.', 1),
('Reunião de Equipe', 'Agendada reunião para discutir os próximos passos do projeto de desenvolvimento. Todos os membros devem participar.', 2),
('Atualização de Segurança', 'Nova atualização de segurança foi aplicada em todos os sistemas. Recomendamos que todos atualizem suas senhas.', 3),
('Projeto Concluído', 'O projeto foi entregue com sucesso! Agradecemos a todos que participaram deste grande esforço.', 1),
('Novo Framework', 'Estamos migrando para um novo framework que oferece melhor performance e facilidade de manutenção.', 4),
('Workshop de Desenvolvimento', 'Workshop sobre as melhores práticas de desenvolvimento será realizado na próxima semana.', 5),
('Melhorias no Sistema', 'Implementamos melhorias significativas no sistema de monitoramento.', 6),
('Integração com APIs', 'Nova integração com APIs externas foi concluída com sucesso.', 2);

-- =====================================================
-- Índices para otimização
-- =====================================================
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_posts_member_id ON posts(member_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);

-- =====================================================
-- Verificar dados inseridos
-- =====================================================
SELECT 'Membros cadastrados:' as info;
SELECT id, name, email, created_at FROM members;

SELECT 'Postagens cadastradas:' as info;
SELECT p.id, p.title, p.content, m.name as author, p.created_at 
FROM posts p 
LEFT JOIN members m ON p.member_id = m.id; 