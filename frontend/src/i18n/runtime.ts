// Strings needed by code that runs in the browser (the map, the modal, the
// minigames). Astro components take `lang` as a prop; client scripts cannot, so
// they read the locale off <html lang>, which the layout already sets correctly
// for every prerendered page.

import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config";

export function currentLocale(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const tag = (document.documentElement.lang || "").slice(0, 2).toLowerCase();
  return (LOCALES as readonly string[]).includes(tag) ? (tag as Locale) : DEFAULT_LOCALE;
}

const strings = {
  // map
  coinPickup: { en: "You picked up 10 coins!", es: "¡Has recogido 10 monedas!" },

  // modal
  claimReward: { en: "Claim Reward (+50 coins)", es: "Reclamar Recompensa (+50 monedas)" },
  claimed: { en: "CLAIMED ✓", es: "COBRADO ✓" },
  techStack: { en: "TECH STACK:", es: "TECNOLOGÍAS:" },
  githubRepo: { en: "GitHub Repo", es: "Repositorio GitHub" },
  reward25: { en: "Reward (+25 coins)", es: "Recompensa (+25 monedas)" },
  comingSoon: { en: "COMING SOON", es: "PRÓXIMAMENTE" },
  underConstruction: { en: "UNDER CONSTRUCTION", es: "EN CONSTRUCCIÓN" },

  // shared minigame chrome
  pressPlay: { en: "Press PLAY to start", es: "Presiona JUGAR para comenzar" },
  play75: { en: "PLAY (75 Coins)", es: "JUGAR (75 Monedas)" },
  playAgain: { en: "PLAY AGAIN", es: "JUGAR DE NUEVO" },
  playAgain75: { en: "PLAY AGAIN (75 Coins)", es: "JUGAR DE NUEVO (75 Monedas)" },

  // connect 4
  linusChallenge: { en: "Dare to challenge Linus?", es: "¿Te atreves a retar a Linus?" },
  linusBackdoor: {
    en: "A backdoor? Using granted root permissions...",
    es: "¿Un backdoor? Usando permisos root concedidos...",
  },
  linusReady: {
    en: "The compiler is ready. Make your move (O(1)).",
    es: "El compilador está listo. Haz tu movimiento (O(1)).",
  },
  linusThinking: { en: "Searching the minimax tree...", es: "Analizando árbol Minimax..." },
  linusTaunt1: { en: "My kernel would never fail like that.", es: "Mi kernel nunca fallaría así." },
  linusTaunt2: {
    en: "You should read the Connect 4 documentation.",
    es: "Deberías leer la documentación del Conecta 4.",
  },
  linusTaunt3: { en: "Your alpha-beta pruning is weak.", es: "Tu poda alfa-beta es débil." },
  linusLost: {
    en: "Impossible! ...You must have found a bug in my code.",
    es: "¡Imposible! ...Seguro encontraste un bug en mi código.",
  },
  linusDraw: { en: "Draw. Spaghetti code on both sides.", es: "Empate. Código espagueti por ambos lados." },
  won150: { en: "You won 150 coins!", es: "¡Ganaste 150 monedas!" },
  drawRefund: { en: "Draw. You get your 75 coins back.", es: "Empate. Recuperas tus 75 monedas." },

  // fishing
  castAway: { en: "Cast away! (use SPACE)", es: "¡A pescar! (Usa ESPACIO)" },
  capReached: { en: "Winnings cap reached! (150)", es: "¡Límite de ganancias alcanzado! (150)" },
  negativeScore: { en: "Negative score! Game over.", es: "¡Puntos negativos! Game Over." },
  reelingIn: { en: "Reeling in!", es: "¡Subiendo!" },
  gotAway: { en: "It got away! 🥫", es: "¡Se escapó! 🥫" },

  // farm
  emptyNest: { en: "Empty nest", es: "Nido vacío" },
  goldenEgg: { en: "SECRET GOLDEN EGG! +100", es: "¡HUEVO DORADO SECRETO! +100" },
  foxCaught: { en: "FOX CAUGHT! +50", es: "¡ZORRO CAZADO! +50" },

  // shop
  equipped: { en: "EQUIPPED", es: "EQUIPADO" },
  equip: { en: "EQUIP", es: "EQUIPAR" },

  // quiz
  sprout: { en: "Just a sprout.", es: "Un simple brote." },
  category15: { en: "CATEGORY 1/5", es: "CATEGORÍA 1/5" },
  questionPlaceholder: { en: "Question?", es: "¿Pregunta?" },
  correct: { en: "CORRECT!", es: "¡CORRECTO!" },
  perfectScore: { en: "PERFECT SCORE! (Bonus +50)", es: "¡PERFECTO! (Bono +50)" },
} as const;

export type StringKey = keyof typeof strings;

/** Game translate. Reads <html lang> on every call, so it is safe after navigation. */
export function gt(key: StringKey): string {
  return strings[key][currentLocale()];
}

/** Templated variants that need runtime values interpolated. */
export const gtf = {
  farmGreat: (score: number) =>
    currentLocale() === "es"
      ? `¡Impresionante granjero! Lograste ${score} puntos.`
      : `Impressive farming! You scored ${score} points.`,
  farmBad: (score: number) =>
    currentLocale() === "es"
      ? `¡Desastre en la granja! Tu puntuación fue ${score}.`
      : `Disaster on the farm! You scored ${score}.`,
  wonCoins: (coins: number) =>
    currentLocale() === "es" ? ` Ganaste ${coins} monedas.` : ` You won ${coins} coins.`,
  quizEnd: (correct: number) =>
    currentLocale() === "es"
      ? `Juego terminado. ${correct}/5 aciertos. ¡Buena suerte a la próxima!`
      : `Game over. ${correct}/5 correct. Better luck next time!`,
};
