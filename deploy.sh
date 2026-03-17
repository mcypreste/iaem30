#!/bin/bash
# Script de deploy para iaem30
# Rode: bash deploy.sh

echo ""
echo "🚀 IA em 30 — Deploy automático"
echo "================================"
echo ""

# Verifica se está em um repositório git
if [ ! -d ".git" ]; then
  echo "❌ Esta pasta não é um repositório git."
  echo "   Rode primeiro: git init"
  exit 1
fi

# Verifica se os arquivos existem
if [ ! -f "index.html" ]; then
  echo "❌ index.html não encontrado nesta pasta."
  exit 1
fi

# Adiciona todos os arquivos
git add .

# Cria commit com data/hora
TIMESTAMP=$(date "+%d/%m/%Y %H:%M")
git commit -m "atualização: $TIMESTAMP"

# Faz push
git push origin main

echo ""
echo "✅ Publicado! O Vercel vai atualizar o site em ~10 segundos."
echo "   Acesse: https://iaem30.vercel.app"
echo ""
