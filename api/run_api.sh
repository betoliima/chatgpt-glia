#!/bin/bash
# Script para rodar a API Python (Linux/Mac)

# Instalar dependências (se necessário)
pip install fastapi uvicorn openai python-multipart

# Rodar a API
uvicorn chatbot:app --reload --host 0.0.0.0 --port 8000
