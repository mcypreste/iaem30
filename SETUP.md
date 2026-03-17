# 🚀 Setup: GitHub + Vercel em 3 minutos

## O que você vai ter no final
- Site publicado em `iaem30.vercel.app` (depois conecta `iaem30.com.br`)
- Qualquer atualização nos arquivos → push no GitHub → site atualiza em ~10s
- Totalmente grátis

---

## Passo 1 — Instalar o Git (se não tiver)
Acesse: https://git-scm.com/downloads e instale.

---

## Passo 2 — Criar conta no GitHub (se não tiver)
Acesse: https://github.com e crie uma conta gratuita.

---

## Passo 3 — Criar o repositório

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name:** `iaem30`
   - Deixe **Public** marcado
   - NÃO marque nenhum checkbox (README, gitignore, etc.)
3. Clique em **Create repository**
4. **Copie a URL** que aparece — vai ser algo como: `https://github.com/SEU_USUARIO/iaem30.git`

---

## Passo 4 — Subir os arquivos

Abra o terminal/prompt de comando na pasta onde estão os arquivos `index.html` e `admin.html` e rode:

```bash
git init
git add .
git commit -m "primeiro deploy iaem30"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/iaem30.git
git push -u origin main
```

> Substitua `SEU_USUARIO` pelo seu usuário do GitHub

---

## Passo 5 — Conectar ao Vercel

1. Acesse: https://vercel.com (já tem conta)
2. Clique em **Add New... → Project**
3. Em **Import Git Repository**, clique em **Add GitHub Account** se não aparecer o repositório
4. Selecione o repositório `iaem30`
5. Clique **Deploy** — sem alterar nada
6. ✅ Pronto! Site no ar em ~30 segundos

---

## Passo 6 — Conectar o domínio iaem30.com.br

1. No painel do Vercel, acesse seu projeto → **Settings → Domains**
2. Clique em **Add Domain** e digite: `iaem30.com.br`
3. O Vercel vai te dar dois registros DNS para adicionar. São eles:

| Tipo | Nome | Valor |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

4. Acesse onde você comprou o domínio (Registro.br, GoDaddy, etc.)
5. Cole os registros DNS acima
6. Aguarde até 24h para propagar (geralmente menos de 1h)

---

## Como atualizar o site depois

Sempre que eu gerar novos arquivos aqui no Claude:

1. Substitua os arquivos `index.html` e/ou `admin.html` na pasta
2. No terminal, dentro da pasta:

```bash
git add .
git commit -m "atualização site"
git push
```

3. ✅ O Vercel detecta automaticamente e publica em ~10 segundos

---

## Dica: Como acessar o admin
Após publicar, acesse: `https://iaem30.vercel.app/admin`

Ou com domínio próprio: `https://iaem30.com.br/admin`

Senha padrão: `admin123` (altere nas Configurações do painel)
