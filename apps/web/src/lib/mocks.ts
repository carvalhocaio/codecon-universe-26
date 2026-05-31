/**
 * ═══════════════════════════════════════════════════════════════
 *  Deep Thought as a Service — Mock Functions
 *  Replace these with real API calls when the backend is ready.
 * ═══════════════════════════════════════════════════════════════
 */

export interface ComputeResult {
  answer: number;
  computationTime: string;
  confidence: string;
  status: "completed";
}

export interface HealthCheck {
  status: "healthy";
  message: string;
  uptime: string;
  dont_panic: boolean;
}

export interface LogEntry {
  timestamp: string;
  message: string;
  level: "info" | "warn" | "success";
}

/** The logs that appear during "computation" */
export const PROCESSING_LOGS: Omit<LogEntry, "timestamp">[] = [
  { message: "Inicializando substrato quântico do Deep Thought…", level: "info" },
  { message: "Consultando datacenter de Magrathea…", level: "info" },
  { message: "Validando conformidade da toalha…", level: "info" },
  { message: "Executando verificações de consistência existencial…", level: "warn" },
  { message: "Consultando malha de inferência hiperdimensional…", level: "info" },
  { message: "Calibrando buffer de improbabilidade…", level: "info" },
  { message: "Compilando 7.5M de anos de computação…", level: "info" },
  { message: "Estabilidade da resposta confirmada: 42", level: "success" },
];

/**
 * Simulates asking Deep Thought a question.
 * In the future, replace with: POST /api/ask
 */
export async function mockAskUniverse(question: string): Promise<ComputeResult> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  console.log(`[DTaaS] Question received: "${question}"`);

  return {
    answer: 42,
    computationTime: "7,500,000 years",
    confidence: "100%",
    status: "completed",
  };
}

/**
 * Simulates the /dont_panic health check endpoint.
 * In the future, replace with: GET /dont_panic
 */
export async function mockDontPanic(): Promise<HealthCheck> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    status: "healthy",
    message: "O cálculo está dentro da janela esperada de 7.5 milhões de anos. Não entre em pânico.",
    uptime: "7.500.000 anos",
    dont_panic: true,
  };
}

/** Absurd questions that could map to 42 */
const ABSURD_QUESTIONS: string[] = [
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

/**
 * Returns a random absurd question from the local list.
 * In the future, could be replaced with: GET /api/question
 */
export function mockGenerateQuestion(): string {
  return ABSURD_QUESTIONS[Math.floor(Math.random() * ABSURD_QUESTIONS.length)];
}
