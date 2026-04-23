# 📋 Guia de Configuração - Harmonia Terapias

## ✅ O que foi atualizado

### 1. **Informações de Contato Alteradas**
- ✓ **WhatsApp**: (32) 999789647
- ✓ **Telefone**: (32) 999789647  
- ✓ **Email**: contatoharmoniaterapias20@gmail.com

Essas informações foram atualizadas em:
- Página de contato (HTML)
- Botões de ação (WhatsApp e chamadas telefônicas)
- Links de contato

### 2. **Sistema de Envio de Formulário**
Agora o formulário de contato envia os dados de forma **organizada e profissional** para o email da clínica.

---

## 🚀 Como Configurar e Executar

### Pré-requisitos
- Node.js instalado (versão 14+)
- npm ou yarn
- Conta Gmail configurada

### Passo 1: Instalar Dependências

```bash
cd site_clinica
npm install
```

### Passo 2: Configurar Variáveis de Ambiente

1. Crie um arquivo `.env` na pasta `site_clinica`:

```bash
# Duplicar o arquivo .env.example
cp .env.example .env
```

2. Abra o arquivo `.env` e configure suas credenciais:

```
GMAIL_USER=seu_email@gmail.com
GMAIL_PASSWORD=sua_senha_de_app
PORT=3000
```

### 📌 Como Gerar a Senha de App do Gmail

1. Acesse: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Selecione "Mail" e "Windows (ou seu SO)"
3. Copie a senha gerada (será 16 caracteres)
4. Cole no arquivo `.env` no campo `GMAIL_PASSWORD`

> ⚠️ **IMPORTANTE**: Use a senha de app, não sua senha comum do Gmail!

### Passo 3: Iniciar o Servidor

**Modo produção:**
```bash
npm start
```

**Modo desenvolvimento (com auto-reload):**
```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

---

## 📧 Como o Formulário Funciona

### Cliente preenche o formulário

O cliente acessa a página de contato e preenche:
- Nome completo
- Email
- Telefone
- Serviço de interesse
- Mensagem

### 1️⃣ Email para a Clínica (contatoharmoniaterapias20@gmail.com)

O formulário envia um email bem formatado com:
- ✓ Todos os dados do cliente organizados em tabela
- ✓ Data e hora do contato
- ✓ Mensagem clara e legível

### 2️⃣ Email de Confirmação para o Cliente

O cliente recebe automaticamente:
- ✓ Confirmação que a mensagem foi recebida
- ✓ Resumo dos dados que foi enviado
- ✓ Informações de contato da clínica
- ✓ Tempo estimado de resposta

---

## 📱 Links de Contato Atualizados

Todos os links foram atualizados para o novo número:

```
WhatsApp:  https://wa.me/5532999789647
Telefone:  tel:+5532999789647
Email:     contatoharmoniaterapias20@gmail.com
```

---

## 🔒 Segurança

- ✓ Arquivo `.env` está no `.gitignore` (não será versionado)
- ✓ Credenciais não ficam expostas no código
- ✓ Use apenas senhas de app do Gmail, nunca a senha real

---

## 📂 Estrutura de Arquivos

```
site_clinica/
├── html/
│   └── contato.html (✓ ATUALIZADO)
├── js/
│   └── contato.js (✓ ATUALIZADO)
├── css/
├── png/
├── server.js (✓ NOVO)
├── package.json (✓ NOVO)
├── .env.example (✓ NOVO)
└── .env (criar após configurar)
```

---

## 🛠️ Troubleshooting

### "Erro: Cannot find module 'express'"
```bash
npm install
```

### "Erro de autenticação no Gmail"
- Verifique se usou a senha de app (não a senha comum)
- Veja o passo de gerar senha de app acima

### "Porta 3000 já está em uso"
Mude a porta no arquivo `.env`:
```
PORT=5000
```

### Formulário não está sendo enviado
- Verifique o console do navegador (F12 > Console)
- Verifique se o servidor está rodando
- Confirme que as credenciais do Gmail estão corretas

---

## ✨ Resumo das Mudanças

| Item | Antes | Depois |
|------|-------|--------|
| Telefone | (11) 9999-9999 | (32) 999789647 |
| WhatsApp | 5511999999999 | 5532999789647 |
| Email | contato@harmoniaterap.com.br | contatoharmoniaterapias20@gmail.com |
| Formulário | Apenas mensagem local | Envia email formatado |
| Confirmação Cliente | Não | ✓ Sim |

---

## 📞 Próximos Passos

1. Configure o arquivo `.env` com suas credenciais
2. Execute `npm install`
3. Inicie o servidor com `npm start`
4. Teste o formulário na página de contato
5. Verifique se os emails chegam na caixa de entrada

---

**Pronto! 🎉 Seu sistema de contato está funcionando!**
