import { DEFAULT_LOCALE, type Locale, type Localized } from "../i18n/config";

/** What the quiz consumes: one language, already resolved. */
export interface Question {
    category: string;
    text: string;
    options: string[];
    correctIndex: number;
}

interface BilingualQuestion {
    category: Localized<string>;
    text: Localized<string>;
    options: Localized<string[]>;
    correctIndex: number;
}

const FOOTBALL_EU = { en: "European Football", es: "Fútbol Europa" };
const FOOTBALL_SA = { en: "South American Football", es: "Fútbol Sudamérica" };
const CR7 = { en: "CR7 History", es: "Historia CR7" };
const BACKEND = { en: "Backend", es: "Backend" };
const DS = { en: "Data Science", es: "Data Science" };
const AIML = { en: "AI/ML", es: "IA/ML" };
const MATHS = { en: "Maths", es: "Matemática" };

const bank: BilingualQuestion[] = [
    // FOOTBALL
    { category: FOOTBALL_EU, text: { en: "Who won the 2017 Champions League?", es: "¿Quién ganó la Champions League 2017?" }, options: { en: ["Juventus", "Real Madrid", "Barcelona", "Liverpool"], es: ["Juventus", "Real Madrid", "Barcelona", "Liverpool"] }, correctIndex: 1 },
    { category: FOOTBALL_EU, text: { en: "In which year did Messi debut in the Champions League?", es: "¿En qué año debutó Messi en la Champions League?" }, options: { en: ["2003", "2004", "2005", "2006"], es: ["2003", "2004", "2005", "2006"] }, correctIndex: 1 },
    { category: FOOTBALL_EU, text: { en: "Who won Euro 2016?", es: "¿Quién ganó la Eurocopa 2016?" }, options: { en: ["France", "Spain", "Portugal", "Germany"], es: ["Francia", "España", "Portugal", "Alemania"] }, correctIndex: 2 },
    { category: FOOTBALL_SA, text: { en: "Which club has won the most Copa Libertadores titles?", es: "¿Quién es el club con más Copas Libertadores?" }, options: { en: ["River Plate", "Boca Juniors", "Peñarol", "Independiente"], es: ["River Plate", "Boca Juniors", "Peñarol", "Independiente"] }, correctIndex: 3 },
    { category: FOOTBALL_SA, text: { en: "Which national team won the 2021 Copa América?", es: "¿Qué selección ganó la Copa América 2021?" }, options: { en: ["Uruguay", "Argentina", "Brazil", "Chile"], es: ["Uruguay", "Argentina", "Brasil", "Chile"] }, correctIndex: 1 },
    { category: FOOTBALL_EU, text: { en: "Who scored the decisive goal in the 2012 Champions League final?", es: "¿Quién marcó el gol decisivo en la final de Champions 2012?" }, options: { en: ["Drogba", "Lampard", "Robben", "Ramires"], es: ["Drogba", "Lampard", "Robben", "Ramires"] }, correctIndex: 0 },
    { category: FOOTBALL_EU, text: { en: "Which team completed the treble in 2013?", es: "¿Qué equipo logró el triplete en 2013?" }, options: { en: ["Inter", "Bayern Munich", "Barcelona", "Manchester United"], es: ["Inter", "Bayern Múnich", "Barcelona", "Manchester United"] }, correctIndex: 1 },
    { category: FOOTBALL_EU, text: { en: "Who won the 1999 Champions League?", es: "¿Quién ganó la Champions 1999?" }, options: { en: ["Bayern", "Manchester United", "Milan", "Ajax"], es: ["Bayern", "Manchester United", "Milan", "Ajax"] }, correctIndex: 1 },
    { category: FOOTBALL_EU, text: { en: "Which national team won Euro 2008?", es: "¿Qué selección ganó la Euro 2008?" }, options: { en: ["Italy", "France", "Spain", "Germany"], es: ["Italia", "Francia", "España", "Alemania"] }, correctIndex: 2 },
    { category: FOOTBALL_EU, text: { en: "Who won the 2006 Champions League?", es: "¿Quién ganó la Champions League 2006?" }, options: { en: ["Arsenal", "Barcelona", "Milan", "Liverpool"], es: ["Arsenal", "Barcelona", "Milan", "Liverpool"] }, correctIndex: 1 },

    // CR7
    { category: CR7, text: { en: "At which club did Cristiano Ronaldo make his professional debut?", es: "¿En qué club debutó profesionalmente Cristiano Ronaldo?" }, options: { en: ["Porto", "Sporting CP", "Braga", "Nacional"], es: ["Porto", "Sporting CP", "Braga", "Nacional"] }, correctIndex: 1 },
    { category: CR7, text: { en: "In which year did Cristiano win his first Ballon d'Or?", es: "¿En qué año ganó Cristiano su primer Balón de Oro?" }, options: { en: ["2007", "2008", "2009", "2010"], es: ["2007", "2008", "2009", "2010"] }, correctIndex: 1 },
    { category: CR7, text: { en: "How many goals did CR7 score for Real Madrid?", es: "¿Cuántos goles marcó CR7 con el Real Madrid?" }, options: { en: ["389", "451", "422", "311"], es: ["389", "451", "422", "311"] }, correctIndex: 1 },
    { category: CR7, text: { en: "Against which team did he score his famous play-off hat-trick on the road to the 2014 World Cup?", es: "¿Contra qué equipo marcó su famoso hat-trick en repesca rumbo al Mundial 2014?" }, options: { en: ["Sweden", "Italy", "Poland", "Croatia"], es: ["Suecia", "Italia", "Polonia", "Croacia"] }, correctIndex: 0 },
    { category: CR7, text: { en: "Which shirt number was he given when he joined Manchester United in 2003?", es: "¿Qué dorsal le dieron al llegar al Manchester United en 2003?" }, options: { en: ["7", "10", "11", "17"], es: ["7", "10", "11", "17"] }, correctIndex: 0 },
    { category: CR7, text: { en: "What is his country of birth?", es: "¿Cuál es su país de nacimiento?" }, options: { en: ["Cape Verde", "Brazil", "Portugal", "Angola"], es: ["Cabo Verde", "Brasil", "Portugal", "Angola"] }, correctIndex: 2 },
    { category: CR7, text: { en: "In which country did he make his international debut for Portugal?", es: "¿En qué país fue su debut internacional con Portugal?" }, options: { en: ["England", "Portugal", "Spain", "Luxembourg"], es: ["Inglaterra", "Portugal", "España", "Luxemburgo"] }, correctIndex: 1 },

    // BACKEND
    { category: BACKEND, text: { en: "What is a middleware?", es: "¿Qué es un middleware?" }, options: { en: ["A template engine", "An interceptor between the request and the response", "A database", "A compiler"], es: ["Motor de plantillas", "Interceptor entre la petición y la respuesta", "Base de datos", "Compilador"] }, correctIndex: 1 },
    { category: BACKEND, text: { en: "What does Redis primarily give you?", es: "¿Qué beneficio aporta Redis principalmente?" }, options: { en: ["More RAM", "A fast in-memory cache", "More security", "Less CPU usage"], es: ["Aumenta RAM", "Cache rápido en memoria", "Más seguridad", "Menos CPU"] }, correctIndex: 1 },
    { category: BACKEND, text: { en: "Which protocol suits high-performance microservices best?", es: "¿Qué protocolo es óptimo para microservicios de alta performance?" }, options: { en: ["SOAP", "HTTP/1.1", "gRPC", "FTP"], es: ["SOAP", "HTTP/1.1", "gRPC", "FTP"] }, correctIndex: 2 },
    { category: BACKEND, text: { en: "Idempotency means that…", es: "¿La idempotencia implica que…?" }, options: { en: ["The server changes on every call", "Repeating the action leaves the server unchanged", "It requires JWT", "It only works with POST"], es: ["El servidor cambia en cada llamada", "El servidor no cambia si la acción se repite", "Requiere JWT", "Solo funciona con POST"] }, correctIndex: 1 },
    { category: BACKEND, text: { en: "Which pattern handles distributed transactions?", es: "¿Qué patrón maneja transacciones distribuidas?" }, options: { en: ["Strategy", "Saga", "Factory", "Singleton"], es: ["Strategy", "Saga", "Factory", "Singleton"] }, correctIndex: 1 },
    { category: BACKEND, text: { en: "What is a reverse proxy?", es: "¿Qué es un Reverse Proxy?" }, options: { en: ["An antivirus", "A traffic balancer in front of your services", "A compiler", "An indexer"], es: ["Un antivirus", "Un balanceador de tráfico", "Un compilador", "Un indexador"] }, correctIndex: 1 },
    { category: BACKEND, text: { en: "Which database type fits complex relationships best?", es: "¿Qué base de datos es ideal para relaciones complejas?" }, options: { en: ["Document", "CSV", "Relational", "Key-value"], es: ["Documental", "CSV", "Relacional", "Key-value"] }, correctIndex: 2 },

    // VIDEO GAMES
    { category: { en: "Minecraft", es: "Minecraft" }, text: { en: "Which material do you need to activate a Nether portal?", es: "¿Qué material necesitas para activar un portal al Nether?" }, options: { en: ["Diamond", "Iron", "Obsidian", "Blackstone"], es: ["Diamante", "Hierro", "Obsidiana", "Piedra negra"] }, correctIndex: 2 },
    { category: { en: "Clash Royale", es: "Clash Royale" }, text: { en: "How much elixir does the Royal Giant cost?", es: "¿Cuánto elixir cuesta el Gigante Noble?" }, options: { en: ["5", "6", "7", "8"], es: ["5", "6", "7", "8"] }, correctIndex: 1 },
    { category: { en: "Rocket League", es: "Rocket League" }, text: { en: "The move that restores your flip mid-air is called…", es: "El movimiento para recuperar un flip en el aire se llama…" }, options: { en: ["Air Roll", "Flip Reset", "Rocket Dash", "Turbo Hop"], es: ["Air Roll", "Flip Reset", "Rocket Dash", "Turbo Hop"] }, correctIndex: 1 },
    { category: { en: "Geometry Dash", es: "Geometry Dash" }, text: { en: "Which official level is famous for its music synchronization?", es: "¿Qué nivel oficial es famoso por su sincronización musical?" }, options: { en: ["Electroman Adventures", "xStep", "Electrodynamix", "Time Machine"], es: ["Electroman Adventures", "xStep", "Electrodynamix", "Time Machine"] }, correctIndex: 2 },

    // DATA SCIENCE
    { category: DS, text: { en: "What is a confusion matrix?", es: "¿Qué es una matriz de confusión?" }, options: { en: ["An error", "A table that evaluates predictions", "A corrupted file", "A static plot"], es: ["Un error", "Tabla que evalúa predicciones", "Archivo corrupto", "Una gráfica estática"] }, correctIndex: 1 },
    { category: DS, text: { en: "What causes overfitting?", es: "¿Qué genera el overfitting?" }, options: { en: ["A model that is too simple", "A model that is too complex for the data", "A huge dataset", "Perfectly clean data"], es: ["Modelo demasiado simple", "Modelo demasiado complejo", "Dataset enorme", "Datos completamente limpios"] }, correctIndex: 1 },
    { category: DS, text: { en: "What is a dataset?", es: "¿Qué es un dataset?" }, options: { en: ["An algorithm", "A structured collection of data", "A chart", "A model"], es: ["Un algoritmo", "Conjunto estructurado de datos", "Un gráfico", "Un modelo"] }, correctIndex: 1 },

    // AI / ML
    { category: AIML, text: { en: "What does the optimizer do?", es: "¿Para qué sirve el optimizer?" }, options: { en: ["Creates layers", "Adjusts weights using the gradient", "Displays metrics", "Frees memory"], es: ["Crear capas", "Ajustar pesos mediante gradiente", "Ver métricas", "Limpiar memoria"] }, correctIndex: 1 },
    { category: AIML, text: { en: "Why do we use activation functions?", es: "¿Por qué usamos funciones de activación?" }, options: { en: ["To sort data", "To introduce non-linearity", "To reduce RAM", "To enlarge the dataset"], es: ["Para ordenar datos", "Para introducir no linealidad", "Para reducir RAM", "Para aumentar el dataset"] }, correctIndex: 1 },
    { category: AIML, text: { en: "What is the learning rate?", es: "¿Qué es el learning rate?" }, options: { en: ["The number of neurons", "The dataset size", "The step size used to update the weights", "The number of layers"], es: ["Cantidad de neuronas", "Tamaño del dataset", "Paso con que se actualizan los pesos", "Capas del modelo"] }, correctIndex: 2 },
    { category: AIML, text: { en: "Why split into train and test sets?", es: "¿Por qué dividir train/test?" }, options: { en: ["To take up space", "To measure generalization", "To shuffle the data", "To remove noise"], es: ["Para ocupar espacio", "Para medir generalización", "Para desordenar datos", "Para eliminar ruido"] }, correctIndex: 1 },
    { category: AIML, text: { en: "What causes exploding gradients?", es: "¿Qué causa explosión del gradiente?" }, options: { en: ["Very large weights across deep layers", "Unsorted data", "A low learning rate", "Too many epochs"], es: ["Pesos enormes en capas profundas", "Dataset desordenado", "Tasa de aprendizaje baja", "Muchas epochs"] }, correctIndex: 0 },

    // C++, RUST, PYTHON
    { category: { en: "C++", es: "C++" }, text: { en: "What happens if you use new without delete?", es: "¿Qué pasa si usas new sin delete?" }, options: { en: ["Nothing", "It frees itself", "Memory leak", "Compilation error"], es: ["Nada", "Se libera solo", "Fuga de memoria", "Error de compilación"] }, correctIndex: 2 },
    { category: { en: "C++", es: "C++" }, text: { en: "Move constructors…", es: "Los move constructors…" }, options: { en: ["Copy slowly", "Avoid expensive copies", "Delete pointers", "Replace virtual methods"], es: ["Copian lento", "Evitan copias costosas", "Eliminan punteros", "Reemplazan métodos virtuales"] }, correctIndex: 1 },
    { category: { en: "C++", es: "C++" }, text: { en: "What does int a = 3; cout << a++; print?", es: "¿Qué imprime int a=3; cout<<a++;?" }, options: { en: ["4", "3", "Error", "2"], es: ["4", "3", "Error", "2"] }, correctIndex: 1 },
    { category: { en: "Rust", es: "Rust" }, text: { en: "What is the borrow checker for?", es: "¿Para qué sirve el borrow checker?" }, options: { en: ["Adding dependencies", "Preventing data races at compile time", "Improving graphics", "Reducing RAM"], es: ["Agregar dependencias", "Evitar condiciones de carrera", "Mejorar gráficos", "Reducir RAM"] }, correctIndex: 1 },
    { category: { en: "Rust", es: "Rust" }, text: { en: "What does the Send trait indicate?", es: "¿Qué indica el trait Send?" }, options: { en: ["It can be printed", "It can be transferred across threads", "It can be serialized", "It becomes immutable"], es: ["Se imprime", "Se envía entre threads", "Se serializa", "Se vuelve inmutable"] }, correctIndex: 1 },
    { category: { en: "Rust", es: "Rust" }, text: { en: "Rust prevents data races through…", es: "Rust evita data races gracias a…" }, options: { en: ["A garbage collector", "Ownership and borrowing", "Automatic retries", "Dynamic typing"], es: ["Garbage collector", "Ownership y borrowing", "Reintentos automáticos", "Tipos dinámicos"] }, correctIndex: 1 },
    { category: { en: "Python", es: "Python" }, text: { en: "What separates a tuple from a list?", es: "¿Qué diferencia a una tupla de una lista?" }, options: { en: ["Lists are immutable", "Tuples are immutable", "Both are mutable", "Nothing"], es: ["Lista inmutable", "Tupla inmutable", "Ambas mutables", "Ninguna"] }, correctIndex: 1 },
    { category: { en: "Python", es: "Python" }, text: { en: "What is a decorator?", es: "¿Qué es un decorator?" }, options: { en: ["A control structure", "A function that wraps another function", "A special class", "A module compressor"], es: ["Estructura de control", "Función que envuelve otra función", "Clase especial", "Compresor de módulos"] }, correctIndex: 1 },
    { category: { en: "Python", es: "Python" }, text: { en: "What type does input() return?", es: "¿Qué tipo devuelve input()?" }, options: { en: ["int", "str", "float", "bool"], es: ["int", "str", "float", "bool"] }, correctIndex: 1 },

    // MATHS
    { category: MATHS, text: { en: "Solve: 3x - 5 > 2x + 4", es: "Resuelve: 3x – 5 > 2x + 4" }, options: { en: ["x > 9", "x < -9", "x > -9", "x < 9"], es: ["x > 9", "x < -9", "x > -9", "x < 9"] }, correctIndex: 0 },
    { category: MATHS, text: { en: "Solve: 4(x - 1) = 2x + 6", es: "Resuelve: 4(x – 1) = 2x + 6" }, options: { en: ["x = 2", "x = 5", "x = 8", "x = -2"], es: ["x = 2", "x = 5", "x = 8", "x = -2"] }, correctIndex: 1 },
    { category: MATHS, text: { en: "A determinant equal to 0 means…", es: "Un determinante igual a 0 significa…" }, options: { en: ["The matrix is invertible", "The matrix has no inverse", "The matrix is diagonal", "The matrix is orthogonal"], es: ["Matriz invertible", "No tiene inversa", "Matriz diagonal", "Matriz ortogonal"] }, correctIndex: 1 },
    { category: MATHS, text: { en: "A unit vector has…", es: "Un vector unitario tiene…" }, options: { en: ["Magnitude 0", "Magnitude 1", "Magnitude 2", "Random magnitude"], es: ["Magnitud 0", "Magnitud 1", "Magnitud 2", "Magnitud aleatoria"] }, correctIndex: 1 },
    { category: MATHS, text: { en: "∫ x dx =", es: "∫ x dx =" }, options: { en: ["x² + C", "x/2 + C", "x²/2 + C", "2x + C"], es: ["x² + C", "x/2 + C", "x²/2 + C", "2x + C"] }, correctIndex: 2 },
];

export function getQuestionBank(locale: Locale = DEFAULT_LOCALE): Question[] {
    return bank.map((q) => ({
        category: q.category[locale],
        text: q.text[locale],
        options: q.options[locale],
        correctIndex: q.correctIndex,
    }));
}

/** Default-locale bank, for callers that do not resolve a locale themselves. */
export const questionBank: Question[] = getQuestionBank(DEFAULT_LOCALE);
