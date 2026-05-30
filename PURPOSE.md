# PURPOSE.md — Deep Thought as a Service (DTaaS)

> _"A resposta para a Pergunta Fundamental da Vida, do Universo e Tudo Mais é... 42."_
> Construímos a infraestrutura empresarial que entrega essa resposta. Para qualquer pergunta. Sempre.

Este documento consolida **o contexto do hackathon**, **a ideia do projeto** e **as restrições** que guiam todas as decisões do time **Bug Bang** durante a Codecon Universe. Serve como bússola: se uma decisão de produto ou código não casar com o que está aqui, é a decisão que está errada — não o documento.

---

## 🛸 O Time

**Bug Bang** — um trocadilho com _Big Bang_. Somos um time que curte astrofísica, e queremos que isso transpareça no projeto como assinatura de personalidade (não é obrigatório pelas regras, mas é a nossa cara).

---

## 🌌 O Hackathon: Codecon Universe

A Codecon Universe **não é um hackathon normal**. É o **Hackathon de Ideias Inúteis** da Codecon: três dias, online, no Discord (29 a 31 de maio de 2026).

A premissa, dita com todas as letras na abertura: **não queremos resolver problemas reais.** Queremos construir algo **absolutamente inútil, tecnicamente impressionante**, que faça todo mundo se perguntar _"por que alguém fez isso?"_.

### O espírito (a linha fina que precisamos respeitar)

Não é fazer qualquer bobagem. É **absurdo COM propósito**. Três coisas precisam andar juntas:

1. **Inútil** — não precisa resolver nada. Ninguém pediu, e está tudo certo.
2. **Tecnicamente impressionante** — bem feito de verdade. O absurdo está na *ideia*, não na *execução*.
3. **"Por que fizeram isso?"** — o resultado deixa todo mundo se perguntando. Esse é o objetivo.

### Cronograma

| Quando | O quê |
| --- | --- |
| Sex 29 → Dom 31 | Mão na massa (código criado do zero nessa janela) |
| **Dom 31 · 15h** | **Entrega** (não se move): GitHub + vídeo demo + página no DevPost |
| Dom 31 · 17h | Top 5 se apresentam ao vivo |
| Logo depois | Júri decide os vencedores na live de encerramento |

### O que precisamos entregar

- **GitHub** — repositório **público**, com **README claro** e **setup rápido**.
- **Vídeo demo** — até **3 minutos** no DevPost, vendendo o produto e mostrando funcionando.
- **Página do projeto** no DevPost — submissão completa.

> ⚠️ Finalistas rodam o projeto **AO VIVO**. Tudo precisa funcionar de ponta a ponta na frente do júri — nada de "funciona na minha máquina".

### Os 6 critérios de julgamento

1. O código **roda**.
2. **Funciona de ponta a ponta** (fluxo completo).
3. **Todo mundo do time codou** de verdade (histórico de commits distribuído importa).
4. O **absurdo tem propósito**.
5. A ideia é **genuinamente estranha**.
6. Você **vende com carisma**.

### Regras técnicas resumidas

Código do zero entre 29–31/05 · repositório público com README · vídeo de até 3 min · pode usar IA para *ajudar* a codar, mas não terceirize o projeto inteiro · sem dados sensíveis · sem conteúdo tóxico · **não seja babaca**.

---

## 📡 A Restrição do Time: `dont_panic()`

O bot do hackathon sorteia uma **restrição absurda** por time, que precisa estar presente no projeto. É **bônus na avaliação**: não é obrigatória para chegar ao Top 5, mas conta — quem abraça o caos sai na frente.

**Nossa restrição:**

> O projeto precisa ter pelo menos um endpoint ou função chamado **`dont_panic()`**.

Isso é um presente: **"Don't Panic"** é literalmente a frase estampada em letras grandes e amigáveis na capa do _Guia do Mochileiro das Galáxias_ — o mesmo universo de onde vem o número **42**. Ou seja, a restrição já conversa perfeitamente com o tema do projeto. Vamos tratar `dont_panic()` como um endpoint **de verdade**, documentado no README e exibido no pitch.

---

## 🤖 O Projeto: Deep Thought as a Service (DTaaS)

### Pitch (uma linha)

> Uma API empresarial "séria" que responde **qualquer** pergunta do universo — depois de processar por 7,5 milhões de anos — e a resposta é **sempre 42**.

### O que é

Uma **paródia de SaaS/IA** completa. Landing page com cara de produto enterprise (planos, SLA, "powered by AI", selo de uptime), console de perguntas estilo chatbot, e toda a teatralidade de um supercomputador do tamanho de uma cidade pensando sobre a existência. O produto funciona perfeitamente. Ele só é **inútil por construção**: a resposta nunca muda.

A piada vem direto do livro: o computador Deep Thought leva **7 milhões e meio de anos** para calcular a resposta da Pergunta Fundamental, chega em **42**, e então constata que a resposta parece sem sentido — porque ninguém jamais soube qual era a *pergunta*.

### O que faz (o fluxo)

1. **Você pergunta qualquer coisa** num campo estilo ChatGPT ("Como faço deploy na sexta sem chorar?").
2. **A "computação" começa**: uma barra de progresso exibe _"Calculando… tempo estimado restante: 7.499.998 anos"_, com logs pomposos de "processamento hiperdimensional" rolando na tela (streaming).
3. **Após alguns segundos** (comprimimos 7,5 milhões de anos em ~5s), o sistema entrega, com toda a solenidade do mundo: **`42`** — anunciado também em voz robótica (Web Speech API, nativa do browser).
4. **Botão "Quero a Pergunta"**: um LLM gera, sob demanda, uma pergunta absurda que *teria* 42 como resposta — homenagem à pergunta canônica do livro, _"Quanto é seis vezes nove?"_.
5. **Painel de SLA**: dashboard mostrando uptime de "7.500.000 anos" e 100% de disponibilidade do "datacenter de Magrathea".

### Por que é absurdo (com propósito)

É a sátira perfeita do hype de IA/SaaS: toda a embalagem séria — pricing, enterprise-grade, observabilidade — para um produto que **não serve para absolutamente nada**, porque a saída é constante. O contraste entre a gravidade institucional da apresentação e a futilidade total do resultado **é** a piada. E ela é fiel à fonte: o próprio Deep Thought admite que a resposta é inútil sem a pergunta.

### O momento "wow" da demo (os 3 minutos)

O coração do vídeo e da apresentação ao vivo:

- Digitar uma pergunta **real e mundana**, ver o contador de **7,5 milhões de anos** correndo com os logs pomposos, o suspense crescendo...
- ...e a revelação solene de **`42`** com efeito de texto cinematográfico + voz robótica.
- Fechar clicando em **"gere a pergunta"** e o LLM cuspir algo como _"Quanto é seis vezes nove?"_ — selando o loop da piada.

Regra de ouro do vídeo: **o momento wow precisa acontecer nos primeiros 30 segundos.**

### Onde entra `dont_panic()`

`GET /dont_panic` é o **health-check / fallback de erro** do sistema, em tom de "suporte de nível galáctico". Sempre que a "computação" parecer travar (ou qualquer rota der erro), o front chama `dont_panic()` e recebe uma mensagem tranquilizadora ("O cálculo está nos 7 milhões de anos esperados. Pegue uma toalha. Não entre em pânico."). É simultaneamente:

- o **liveness probe** irônico da API,
- o **error boundary** global do produto,
- e o **easter egg** que garante o bônus da restrição.

### Como a astrofísica entra (a assinatura Bug Bang)

- O "datacenter" é estilizado como **Magrathea**, o planeta que fabricava planetas.
- A escala de tempo da "computação" usa **tempo cosmológico real** como referência (idade do universo) para dar régua aos 7,5 milhões de anos.
- Opcional: durante o "processamento", a IA finge "consultar o cosmos" puxando nomes de **exoplanetas reais** do NASA Exoplanet Archive — dados verdadeiros, conclusão totalmente inútil.

### Os motivos do 42 (espalhados como assinatura)

Para reforçar a identidade e divertir quem for olhar o código:

- A API roda na porta **`4242`**.
- A versão do produto é **`v42.0.0`**.
- O pacote `packages/answer` exporta uma única constante — **`const ANSWER = 42`** — vendida como "a única dependência *core* do produto" (piada de engenharia).
- O delay base da computação é **42 × algo**; contadores e métricas convergem para 42.

---

## 🧩 Stack Técnica

Monorepo em **TypeScript** com **Turborepo**.

| Camada | Tecnologia |
| --- | --- |
| Frontend | **Next.js** + **React Bits** (componentes animados) |
| Backend / API | **Fastify** |
| Monorepo | **Turborepo** |
| Voz | **Web Speech API** (`speechSynthesis`, nativa do browser, sem chave) |
| IA (opcional) | API de LLM para gerar a "pergunta" absurda |
| Dados (opcional) | NASA Exoplanet Archive (exoplanetas reais para o "processamento") |

### Sobre o React Bits (e a dúvida "interfere no texto?")

**Não interfere em nada.** O [React Bits](https://reactbits.dev) é uma biblioteca open-source (MIT + Commons Clause, uso comercial liberado) de **110+ componentes React animados** — categorias de **text animations, animations, components e backgrounds** — que você copia/instala via CLI (`shadcn` ou `jsrepo`) e integra direto no Next.js. É **puramente camada de apresentação**: não muda conteúdo, lógica nem este documento.

Na prática, é um casamento perfeito com o DTaaS, porque nosso "wow" é todo teatro visual. Componentes que valem a pena explorar:

- **Text Animations** para a revelação do `42` e os logs de "processamento" — efeitos como _Decrypted Text_, _Scrambled Text_, _Glitch Text_, _Count Up_, _Split Text_.
- **Backgrounds** para o "datacenter de Magrathea" — efeitos como _Aurora_, _Particles_, _Galaxy_, _Hyperspeed_, _Threads_.
- **Components** para os cards de SLA/pricing e a vibe enterprise.

> Dica: o React Bits gera variantes em **TS + Tailwind**, então peça/instale exatamente essa variante para casar com a stack.

### Estrutura sugerida do monorepo

```
bug-bang/
├─ apps/
│  ├─ web/                 # Next.js + React Bits (landing, console, dashboard de SLA)
│  └─ api/                 # Fastify (a "infraestrutura" de Deep Thought)
│     └─ rotas:
│        • POST /api/ask        → sempre retorna 42, com delay teatral + logs via SSE/stream
│        • POST /api/question   → LLM gera uma pergunta absurda cuja resposta é 42
│        • GET  /dont_panic     → health-check / fallback de erro (a restrição)
├─ packages/
│  ├─ answer/              # exporta `const ANSWER = 42` — a única dependência "core"
│  ├─ ui/                  # componentes compartilhados / config do React Bits
│  └─ config/              # tsconfig, eslint, tipos compartilhados
└─ turbo.json
```

---

## ✅ Como o DTaaS pontua em cada critério

| Critério | Como atendemos |
| --- | --- |
| **1. O código roda** | App Next + API Fastify rodando local, setup rápido no README. |
| **2. Funciona ponta a ponta** | Fluxo completo: pergunta → "computação" → 42 → pergunta gerada. |
| **3. Todo mundo codou** | Trabalho paralelizável: landing/React Bits, API/streaming, LLM, dashboard de SLA, voz. Commits distribuídos. |
| **4. Absurdo com propósito** | SaaS enterprise inteiro construído para entregar uma constante inútil. O propósito é o absurdo. |
| **5. Genuinamente estranho** | Ninguém pediu uma API que cobra para responder 42 após 7,5 milhões de anos. |
| **6. Vende com carisma** | Pitch de "captamos investimento Série 42", momento wow nos primeiros 30s, voz robótica solene. |

---

## 🎯 Escopo do MVP (e o que NÃO fazer)

**MVP mínimo viável (precisa existir):**

- Console de pergunta → barra de progresso teatral → revelação do `42` com efeito visual.
- Endpoint `GET /dont_panic` funcionando.
- Pelo menos um motivo "42" visível (porta, versão ou `ANSWER`).

**Camadas de glória (se sobrar tempo, nesta ordem):**

1. Voz robótica (Web Speech API).
2. Botão "Quero a Pergunta" com LLM.
3. Dashboard de SLA + landing enterprise caprichada com React Bits.
4. Exoplanetas reais durante o "processamento".

**Cortes graciosos (degradar sem quebrar a demo):**

- Sem LLM? A "pergunta gerada" sai de uma **lista pré-escrita** de perguntas absurdas (a demo continua engraçada).
- Sem API externa de exoplanetas? Use um **dataset local** fixo.
- O `42` e o `dont_panic()` **nunca** dependem de rede — são offline-first, porque finalista roda ao vivo.

> Princípio: travar a ideia cedo (a própria organização recomenda isso) e blindar o **momento wow** antes de qualquer firula. Tudo que é externo precisa de **fallback gravado** para o vídeo e plano B para o palco.

---

## 🎬 Roteiro do vídeo (3 min)

1. **0:00–0:30** — Hook: landing séria + digitar pergunta mundana + começar a "computação" de 7,5 milhões de anos.
2. **0:30–1:30** — A revelação do `42` (efeito + voz). Mostrar que *qualquer* pergunta dá 42.
3. **1:30–2:15** — "Quero a Pergunta" → LLM/lista cospe "seis vezes nove". Mostrar `/dont_panic` e o painel de SLA de 7,5 milhões de anos.
4. **2:15–3:00** — Pitch de fechamento com carisma: "DTaaS — a resposta você já tem. A pergunta é problema seu. Não entre em pânico."

---

_"Don't Panic." — e leve uma toalha._
