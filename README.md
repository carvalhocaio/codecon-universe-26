# Deep Thought as a Service (DTaaS)

> *"A resposta para a Pergunta Fundamental da Vida, do Universo e Tudo Mais é... 42."*

Uma API empresarial de nível galáctico que processa **qualquer pergunta do universo** — durante 7,5 milhões de anos — e entrega, com toda a solenidade que a ocasião merece: **42**.

Feito com amor absurdo pelo time **Bug Bang** para a [Codecon Universe 2026](https://codecon.dev).

---

## Setup rápido

```bash
# 1. Clone e instale
git clone <repo-url>
cd codecon-universe-26
pnpm install

# 2. Configure as variáveis de ambiente
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example    apps/web/.env

# 3. Rode tudo
pnpm dev
```

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:3001 |
| API      | http://localhost:4242 |

> **Requisito:** Node.js 20+ e pnpm 9+

---

## O que faz

1. Você digita qualquer pergunta ("Como faço deploy na sexta sem chorar?")
2. O sistema inicia **7,5 milhões de anos de computação** — comprimidos em ~5 segundos com logs hiperdimensionais em tempo real via SSE
3. O supercomputador entrega, com voz robótica solene: **`42`**
4. Clique em **"Quero a Pergunta"** e descubra qual seria a pergunta cuja resposta é 42

---

## API

```
POST /api/ask          → SSE stream de logs + { type: "answer", answer: 42 }
POST /api/question     → { question: "string absurda" }
GET  /dont_panic       → health check galáctico
```

### GET /dont_panic

```json
{
  "status": "healthy",
  "message": "O cálculo está dentro da janela esperada de 7.5 milhões de anos. Não entre em pânico.",
  "uptime": "7.500.000 anos",
  "dont_panic": true,
  "answer": 42,
  "towel": true
}
```

---

## Arquitetura

```
codecon-universe-26/
├── apps/
│   ├── web/              # Next.js 16 — landing, console, dashboard de SLA
│   └── server/           # Fastify 5 — a "infraestrutura" do Deep Thought
├── packages/
│   ├── answer/           # export const ANSWER = 42  ← a única dependência core
│   ├── ui/               # componentes shadcn/ui compartilhados
│   ├── env/              # variáveis de ambiente tipadas (t3-oss/env)
│   └── config/           # tsconfig base compartilhado
└── turbo.json
```

**Stack:** TypeScript · Turborepo · Next.js · Fastify · Tailwind v4 · React Bits (Aurora, DecryptedText, CountUp) · Web Speech API · Web Audio API

---

## Easter eggs para quem inspecionar o código

| Assinatura | Onde |
|-----------|------|
| API na porta **4242** | `apps/server/src/index.ts` |
| Versão **v42.0.0** | `packages/answer/package.json` |
| `const ANSWER = 42` | `packages/answer/src/index.ts` |
| Delay base: **42 × 120ms** | `apps/server/src/index.ts` |

---

## Scripts disponíveis

```bash
pnpm dev            # inicia tudo (web + server)
pnpm dev:web        # só o frontend
pnpm dev:server     # só a API
pnpm build          # build de produção
pnpm check-types    # TypeScript em todos os packages
```

---

*"Don't Panic." — e leve uma toalha.*

**Bug Bang** · Codecon Universe 2026
