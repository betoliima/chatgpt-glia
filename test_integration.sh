# Script de Teste da Integração GLIA
# Execute este script para testar se tudo está funcionando

echo "🚀 Testando a integração GLIA..."

echo ""
echo "1. Verificando se a API Python está rodando..."
curl -s http://localhost:8000/api/health > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ API Python está rodando na porta 8000"
else
    echo "❌ API Python não está rodando. Execute: cd api && uvicorn chatbot:app --reload --port 8000"
    exit 1
fi

echo ""
echo "2. Verificando se o front-end está rodando..."
curl -s http://localhost:5173 > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Front-end está rodando na porta 5173"
else
    echo "❌ Front-end não está rodando. Execute: cd front-end && npm run dev"
    exit 1
fi

echo ""
echo "3. Testando comunicação API ↔ Front-end..."
response=$(curl -s -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Olá, GLIA!"}')

if echo "$response" | grep -q "reply"; then
    echo "✅ API está respondendo corretamente"
    echo "📝 Resposta da API: $(echo $response | jq -r '.reply' 2>/dev/null || echo 'Resposta recebida')"
else
    echo "❌ API não está respondendo corretamente"
    echo "Resposta: $response"
fi

echo ""
echo "🎉 Teste concluído! Se tudo estiver ✅, sua integração está funcionando!"
echo ""
echo "📱 Acesse: http://localhost:5173"
echo "🔗 API: http://localhost:8000"
echo "📚 Docs da API: http://localhost:8000/docs"
