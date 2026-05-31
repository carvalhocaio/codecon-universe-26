import { ANSWER } from "@codecon-universe-26/answer";
import { env } from "@codecon-universe-26/env/server";
import fastifyCors from "@fastify/cors";
import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
  origin: env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

const PROCESSING_LOGS = [
  { message: "Inicializando substrato quântico do Deep Thought…", level: "info" },
  { message: "Consultando datacenter de Magrathea…", level: "info" },
  { message: "Validando conformidade da toalha…", level: "info" },
  { message: "Executando verificações de consistência existencial…", level: "warn" },
  { message: "Consultando malha de inferência hiperdimensional…", level: "info" },
  { message: "Calibrando buffer de improbabilidade…", level: "info" },
  { message: "Compilando 7.5M de anos de computação…", level: "info" },
  { message: "Estabilidade da resposta confirmada: 42", level: "success" },
] as const;

const ABSURD_QUESTIONS = [
  "O que você obtém se multiplicar seis por nove?",
  "Quantas reuniões são necessárias para fazer deploy na sexta-feira?",
  "Quantas toalhas são necessárias para conformidade existencial?",
  "Qual é o SLA aceitável para incerteza cósmica?",
  "Quantos microsserviços são necessários para trocar uma lâmpada?",
  "Qual é a velocidade de sprint ideal para pavor existencial?",
  "Quantas dailies faltam para a morte térmica do universo?",
  "Qual é a latência P99 da iluminação?",
  "Quantos tickets do Jira para alcançar o nirvana?",
  "Qual é o sentido da vida no formato JSON?",
  "Quantas tentativas antes do cosmos responder 200?",
  "Qual é a capacidade de carga de um pensamento filosófico?",
];

// 42 × 120ms = 5040ms total ÷ 8 logs ≈ 630ms per log
const LOG_DELAY = 42 * 120;
const LOG_INTERVAL = Math.floor(LOG_DELAY / PROCESSING_LOGS.length);

fastify.get("/", async () => ({ status: "ok", answer: ANSWER }));

fastify.get("/dont_panic", async () => ({
  status: "healthy",
  message:
    "O cálculo está dentro da janela esperada de 7.5 milhões de anos. Não entre em pânico.",
  uptime: "7.500.000 anos",
  dont_panic: true,
  answer: ANSWER,
  towel: true,
}));

fastify.post("/api/ask", (_req, reply) => {
  reply.raw.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "X-Accel-Buffering": "no",
    "Access-Control-Allow-Origin": env.CORS_ORIGIN,
    "Access-Control-Allow-Credentials": "true",
  });

  reply.hijack();

  let index = 0;

  const sendNext = () => {
    if (index >= PROCESSING_LOGS.length) {
      reply.raw.write(
        `data: ${JSON.stringify({ type: "answer", answer: ANSWER })}\n\n`
      );
      reply.raw.end();
      return;
    }

    const log = PROCESSING_LOGS[index];
    if (!log) { index++; setTimeout(sendNext, LOG_INTERVAL); return; }
    reply.raw.write(
      `data: ${JSON.stringify({ type: "log", message: log.message, level: log.level })}\n\n`
    );
    index++;
    setTimeout(sendNext, LOG_INTERVAL);
  };

  setTimeout(sendNext, 400);
});

fastify.post("/api/question", async () => {
  const question =
    ABSURD_QUESTIONS[Math.floor(Math.random() * ABSURD_QUESTIONS.length)];
  return { question };
});

fastify.listen({ port: 4242, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Deep Thought online — porta ${ANSWER * 101} (4242)`);
});
