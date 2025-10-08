@echo off
REM Script de Teste da Integração GLIA (Windows)
REM Execute este script para testar se tudo está funcionando

echo 🚀 Testando a integração GLIA...

echo.
echo 1. Verificando se a API Python está rodando...
curl -s http://localhost:8000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ API Python está rodando na porta 8000
) else (
    echo ❌ API Python não está rodando. Execute: cd api ^&^& uvicorn chatbot:app --reload --port 8000
    pause
    exit /b 1
)

echo.
echo 2. Verificando se o front-end está rodando...
curl -s http://localhost:5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Front-end está rodando na porta 5173
) else (
    echo ❌ Front-end não está rodando. Execute: cd front-end ^&^& npm run dev
    pause
    exit /b 1
)

echo.
echo 3. Testando comunicação API ↔ Front-end...
curl -s -X POST http://localhost:8000/api/chat -H "Content-Type: application/json" -d "{\"message\": \"Olá, GLIA!\"}" > temp_response.json
if exist temp_response.json (
    echo ✅ API está respondendo corretamente
    echo 📝 Verifique temp_response.json para ver a resposta
    del temp_response.json
) else (
    echo ❌ API não está respondendo corretamente
)

echo.
echo 🎉 Teste concluído! Se tudo estiver ✅, sua integração está funcionando!
echo.
echo 📱 Acesse: http://localhost:5173
echo 🔗 API: http://localhost:8000
echo 📚 Docs da API: http://localhost:8000/docs
pause
