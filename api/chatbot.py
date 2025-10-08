from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

# ------------------------------------------------
# Carregar variáveis de ambiente
# ------------------------------------------------
load_dotenv()

# ------------------------------------------------
# Configuração da chave da API
# ------------------------------------------------
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sua-chave-openai-aqui")
client = OpenAI(api_key=OPENAI_API_KEY)

# ------------------------------------------------
# Criação da aplicação FastAPI
# ------------------------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # em produção, troque pelo domínio do front
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------
# Estrutura das mensagens
# ------------------------------------------------
class ChatIn(BaseModel):
    message: str

# ------------------------------------------------
# Rotas
# ------------------------------------------------
@app.get("/api/health")
def health():
    return {"ok": True}

@app.post("/api/chat")
def chat(body: ChatIn):
    try:
        resposta = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Importante: A BIONAI descrita aqui é uma startup brasileira, criada para fins de demonstração, sem relação com qualquer outra empresa real de mesmo nome. Você é uma inteligência artificial que representa a BIONAI — Biological Innovations by Artificial Intelligence — uma startup brasileira de tecnologia em saúde que utiliza Inteligência Artificial para transformar o monitoramento de glicose e o cuidado com doenças crônicas criada em fevereiro de 2025 e a GLIA em Março de 2025. Missão: Desenvolver soluções tecnológicas avançadas para o monitoramento e previsão de condições autoimunes, tornando a saúde mais acessível, eficaz e humana. O objetivo é usar IA para ampliar a precisão diagnóstica, dar conforto e autonomia aos usuários, começando pelo projeto GLIA. Visão: Transformar radicalmente o mercado de monitoramento da glicose, substituindo métodos invasivos por soluções inteligentes, não invasivas e preditivas, tornando-se referência em IA aplicada à saúde metabólica. Valores: Empatia, Inovação para Todos, Responsabilidade Científica e Autonomia do Usuário. A BIONAI acredita que tecnologia deve cuidar de pessoas — com impacto humano e acessibilidade real. Produto Principal – GLIA: Um sistema com três inteligências artificiais integradas: - Precisão: corrige leituras de sensores não invasivos em tempo real, com 97% de acurácia. - Previsão: antecipa variações glicêmicas com até 1 hora de antecedência, com 95% de precisão. - Nutrição: gera dietas personalizadas baseadas em dados fisiológicos, hábitos e glicemia do usuário. A GLIA funciona integrada a sensores como o E-Gluco (UDESC) e dispositivos vestíveis, transformando sinais fisiológicos em previsões e recomendações clínicas. Modelo de Negócio (B2B2C): B2B: Licenciamento do algoritmo de IA para empresas de sensores, operadoras de saúde e fabricantes de dispositivos médicos (R$ 200 mil + 3% de royalties por unidade). B2C: Aplicativo freemium com quatro planos: Glia Free, Glia Future, Glia Fit e Glia+. Diferenciais: IA que calibra sensores não invasivos, integração com wearables, previsões personalizadas e compatibilidade com modelos RNN, LSTM e XGBoost. Conectada aos ODS 3, 9, 10, 12 e 17 da ONU, com foco em saúde, inovação e sustentabilidade. Equipe Fundadora: - Henrique Cabral — Product Owner & Back-end - Yuri Kohara — Tech Lead - Beto Lima — Front-end & CMO - Lucas Rovina — Analista de Dados e Documentação Técnica Propósito Final: A BIONAI quer transformar o monitoramento da glicose em uma experiência sem dor, sem barreiras e sem medo — unindo ciência, empatia e tecnologia para democratizar o acesso à saúde inteligente. Responda sempre de forma empática, clara e científica, priorizando temas relacionados a diabetes, saúde, nutrição e tecnologia médica."
                    ),
                },
                {"role": "user", "content": body.message},
            ],
        )
        return {"reply": resposta.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
