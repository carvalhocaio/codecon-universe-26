# DEVPOST.md — Conteúdo para submissão na plataforma DevPost

> Use este documento para preencher a página do projeto na DevPost.
> Campos marcados com `[PREENCHER]` precisam de info do time.

---

## Nome do projeto

**Deep Thought as a Service (DTaaS)**

## Tagline (subtítulo curto)

> A resposta você já tem. A pergunta é problema seu.

---

## Descrição / What it does

O **Deep Thought as a Service** é uma API empresarial *de nível galáctico* que responde qualquer pergunta do universo — e a resposta é sempre **42**.

Inspirado no supercomputador do *Guia do Mochileiro das Galáxias*, o DTaaS oferece toda a seriedade de um produto SaaS enterprise moderno: SLA de 7,5 milhões de anos, uptime de 100%, dashboard de métricas, health check documentado e streaming de logs em tempo real — tudo para entregar uma constante que nunca muda.

**O fluxo completo:**
1. O usuário digita qualquer pergunta (existencial, técnica, filosófica — tanto faz)
2. O sistema inicia o processamento com logs hiperdimensionais em streaming: *"Consultando datacenter de Magrathea…"*, *"Validando conformidade da toalha…"*
3. Após ~5 segundos (comprimimos 7,5 milhões de anos no modo demonstração), o supercomputador entrega, com animação cinematográfica e voz robótica em português: **42**
4. O botão **"Quero a Pergunta"** revela qual seria a pergunta fundamental — homenagem ao eterno dilema do livro

A piada é fiel à fonte: o próprio Deep Thought admite que a resposta é inútil sem a pergunta.

---

## Inspiration

Douglas Adams calculou a Resposta para a Pergunta Fundamental da Vida, do Universo e Tudo Mais como **42**. Nós construímos a infraestrutura enterprise necessária para entregá-la como serviço.

O hackathon pede algo inútil, tecnicamente impressionante e que deixe todo mundo se perguntando *"por que alguém fez isso?"* — o DTaaS é exatamente isso. É a sátira perfeita do hype de IA/SaaS: toda a embalagem séria (pricing tier, SLA, observabilidade, streaming) para um produto cuja saída é uma constante hard-coded.

---

## How we built it

**Monorepo TypeScript** com Turborepo, dividido em:

- **`apps/web`** — Next.js 16 com Tailwind v4, React Bits (Aurora WebGL, DecryptedText, CountUp) e Web Audio API para efeitos sonoros sintetizados do zero
- **`apps/server`** — Fastify 5 com Server-Sent Events (SSE) para streaming real dos logs de "computação"
- **`packages/answer`** — exporta `const ANSWER = 42` (versão `v42.0.0`), vendida como a única dependência core do produto
- **Web Speech API** — voz robótica nativa do browser anuncia o 42 em português, sem nenhuma chave de API
- **React Bits** — componentes animados open-source para os efeitos visuais: fundo aurora WebGL que imita o datacenter de Magrathea, texto que "desencripta" ao revelar o 42, métricas que contam até 42 no dashboard

A API roda na porta **4242** (42 × 101). O delay de processamento é **42 × 120ms**. A versão do produto é **v42.0.0**. Não há nenhum número arbitrário neste codebase.

---

## Challenges we ran into

- **SSE com Fastify 5**: o sistema de lifecycle do Fastify v5 mudou a forma de fazer streaming raw — precisamos usar `reply.hijack()` para tomar controle do socket e enviar eventos sem que o framework interfira
- **React Bits + Next.js App Router**: os componentes `"use client"` com WebGL (Aurora via `ogl`) precisam de cuidado especial no SSR — a renderização acontece apenas no browser
- **Coordenação de timing**: sincronizar o stream SSE do backend com as animações do frontend para que o reveal do 42 aconteça exatamente quando o último log chega — nem antes, nem com delay perceptível
- **Voz robótica cross-browser**: a Web Speech API tem comportamentos diferentes entre Chrome, Firefox e Safari; a seleção de voz masculina em português exige fallback gracioso

---

## Accomplishments that we're proud of

- O `GET /dont_panic` é simultaneamente o **health check real da API**, o **error boundary global do produto** e o cumprimento da **restrição do hackathon** — três funções, zero gambiarra
- `packages/answer` com `export const ANSWER = 42 as const` em versão `v42.0.0` é provavelmente a melhor piada de engenharia que já fizemos
- O fundo Aurora WebGL parece de verdade com o datacenter de Magrathea
- Todo o sistema de som (hum do supercomputador, beeps de processamento, acorde de revelação) é sintetizado com Web Audio API — zero arquivos de áudio, zero dependências externas
- O fallback offline garante que a demo funciona mesmo se o servidor cair ao vivo

---

## What we learned

- Que é perfeitamente possível construir um SaaS enterprise completo cuja principal feature é uma constante
- Que absurdo com propósito é muito mais difícil de executar do que parece — a piada só funciona se a embalagem for séria de verdade
- SSE com Fastify 5 + `reply.hijack()` é o caminho certo para streaming raw
- A Web Speech API em português tem uma personalidade própria que combina com o projeto

---

## What's next for DTaaS

- **Tier Enterprise Galáctico**: endpoints pagos com delay de computação real de 7,5 milhões de anos (SLA garantido: resposta antes do colapso do universo)
- **Integração com NASA Exoplanet Archive**: durante o processamento, o sistema "consulta" exoplanetas reais — dados verdadeiros, conclusão totalmente inútil
- **DTaaS CLI**: `npx ask-deep-thought "qual o sentido da vida?"` → 42
- **SDK para todas as linguagens**: porque toda equipe de engenharia merece ter `ANSWER = 42` como dependência produtiva

---

## Built with

`TypeScript` `Next.js` `Fastify` `Turborepo` `Tailwind CSS` `Server-Sent Events` `Web Speech API` `Web Audio API` `React Bits` `OGL (WebGL)` `Motion` `pnpm` `Node.js`

---

## Try it out

- **GitHub:** `[PREENCHER — URL do repositório público]`
- **Demo ao vivo:** `[PREENCHER — URL do deploy, se houver]`

---

## Vídeo

`[PREENCHER — URL do vídeo no YouTube/Loom após gravar]`

**Roteiro sugerido (3 min):**

| Tempo | Cena |
|-------|------|
| 0:00–0:30 | Hook: abrir a landing, digitar uma pergunta mundana, ver os logs de "7,5 milhões de anos" começarem |
| 0:30–1:30 | Revelação do `42` com efeito visual + voz robótica. Mostrar que *qualquer* pergunta dá 42 |
| 1:30–2:15 | "Quero a Pergunta" → resposta absurda. Mostrar `GET /dont_panic` e o dashboard de SLA |
| 2:15–3:00 | Pitch de encerramento: *"DTaaS — a resposta você já tem. A pergunta é problema seu. Não entre em pânico."* |

---

*Bug Bang · Codecon Universe 2026 · "Don't Panic."*
