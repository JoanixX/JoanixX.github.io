export interface Question {
    category: string;
    text: string;
    options: string[];
    correctIndex: number;
}

export const questionBank: Question[] = [
    // FOOTBALL
    { category: "European Football", text: "Who won the 2017 Champions League?", options: ["Juventus", "Real Madrid", "Barcelona", "Liverpool"], correctIndex: 1 },
    { category: "European Football", text: "In which year did Messi debut in the Champions League?", options: ["2003", "2004", "2005", "2006"], correctIndex: 1 },
    { category: "European Football", text: "Who won Euro 2016?", options: ["France", "Spain", "Portugal", "Germany"], correctIndex: 2 },
    { category: "South American Football", text: "Which club has won the most Copa Libertadores titles?", options: ["River Plate", "Boca Juniors", "Peñarol", "Independiente"], correctIndex: 3 },
    { category: "South American Football", text: "Which national team won the 2021 Copa América?", options: ["Uruguay", "Argentina", "Brazil", "Chile"], correctIndex: 1 },
    { category: "European Football", text: "Who scored the decisive goal in the 2012 Champions League final?", options: ["Drogba", "Lampard", "Robben", "Ramires"], correctIndex: 0 },
    { category: "European Football", text: "Which team completed the treble in 2013?", options: ["Inter", "Bayern Munich", "Barcelona", "Manchester United"], correctIndex: 1 },
    { category: "European Football", text: "Who won the 1999 Champions League?", options: ["Bayern", "Manchester United", "Milan", "Ajax"], correctIndex: 1 },
    { category: "European Football", text: "Which national team won Euro 2008?", options: ["Italy", "France", "Spain", "Germany"], correctIndex: 2 },
    { category: "European Football", text: "Who won the 2006 Champions League?", options: ["Arsenal", "Barcelona", "Milan", "Liverpool"], correctIndex: 1 },

    // CR7
    { category: "CR7 History", text: "At which club did Cristiano Ronaldo make his professional debut?", options: ["Porto", "Sporting CP", "Braga", "Nacional"], correctIndex: 1 },
    { category: "CR7 History", text: "In which year did Cristiano win his first Ballon d'Or?", options: ["2007", "2008", "2009", "2010"], correctIndex: 1 },
    { category: "CR7 History", text: "How many goals did CR7 score for Real Madrid?", options: ["389", "451", "422", "311"], correctIndex: 1 },
    { category: "CR7 History", text: "Against which team did he score his famous play-off hat-trick on the road to the 2014 World Cup?", options: ["Sweden", "Italy", "Poland", "Croatia"], correctIndex: 0 },
    { category: "CR7 History", text: "Which shirt number was he given when he joined Manchester United in 2003?", options: ["7", "10", "11", "17"], correctIndex: 0 },
    { category: "CR7 History", text: "What is his country of birth?", options: ["Cape Verde", "Brazil", "Portugal", "Angola"], correctIndex: 2 },
    { category: "CR7 History", text: "In which country did he make his international debut for Portugal?", options: ["England", "Portugal", "Spain", "Luxembourg"], correctIndex: 1 },

    // BACKEND & DEV
    { category: "Backend", text: "What is a middleware?", options: ["A template engine", "An interceptor between the request and the response", "A database", "A compiler"], correctIndex: 1 },
    { category: "Backend", text: "What does Redis primarily give you?", options: ["More RAM", "A fast in-memory cache", "More security", "Less CPU usage"], correctIndex: 1 },
    { category: "Backend", text: "Which protocol suits high-performance microservices best?", options: ["SOAP", "HTTP/1.1", "gRPC", "FTP"], correctIndex: 2 },
    { category: "Backend", text: "Idempotency means that…", options: ["The server changes on every call", "Repeating the action leaves the server unchanged", "It requires JWT", "It only works with POST"], correctIndex: 1 },
    { category: "Backend", text: "Which pattern handles distributed transactions?", options: ["Strategy", "Saga", "Factory", "Singleton"], correctIndex: 1 },
    { category: "Backend", text: "What is a reverse proxy?", options: ["An antivirus", "A traffic balancer in front of your services", "A compiler", "An indexer"], correctIndex: 1 },
    { category: "Backend", text: "Which database type fits complex relationships best?", options: ["Document", "CSV", "Relational", "Key-value"], correctIndex: 2 },

    // VIDEO GAMES
    { category: "Minecraft", text: "Which material do you need to activate a Nether portal?", options: ["Diamond", "Iron", "Obsidian", "Blackstone"], correctIndex: 2 },
    { category: "Clash Royale", text: "How much elixir does the Royal Giant cost?", options: ["5", "6", "7", "8"], correctIndex: 1 },
    { category: "Rocket League", text: "The move that restores your flip mid-air is called…", options: ["Air Roll", "Flip Reset", "Rocket Dash", "Turbo Hop"], correctIndex: 1 },
    { category: "Geometry Dash", text: "Which official level is famous for its music synchronization?", options: ["Electroman Adventures", "xStep", "Electrodynamix", "Time Machine"], correctIndex: 2 },

    // DATA SCIENCE
    { category: "Data Science", text: "What is a confusion matrix?", options: ["An error", "A table that evaluates predictions", "A corrupted file", "A static plot"], correctIndex: 1 },
    { category: "Data Science", text: "What causes overfitting?", options: ["A model that is too simple", "A model that is too complex for the data", "A huge dataset", "Perfectly clean data"], correctIndex: 1 },
    { category: "Data Science", text: "What is a dataset?", options: ["An algorithm", "A structured collection of data", "A chart", "A model"], correctIndex: 1 },

    // AI / ML
    { category: "AI/ML", text: "What does the optimizer do?", options: ["Creates layers", "Adjusts weights using the gradient", "Displays metrics", "Frees memory"], correctIndex: 1 },
    { category: "AI/ML", text: "Why do we use activation functions?", options: ["To sort data", "To introduce non-linearity", "To reduce RAM", "To enlarge the dataset"], correctIndex: 1 },
    { category: "AI/ML", text: "What is the learning rate?", options: ["The number of neurons", "The dataset size", "The step size used to update the weights", "The number of layers"], correctIndex: 2 },
    { category: "AI/ML", text: "Why split into train and test sets?", options: ["To take up space", "To measure generalization", "To shuffle the data", "To remove noise"], correctIndex: 1 },
    { category: "AI/ML", text: "What causes exploding gradients?", options: ["Very large weights across deep layers", "Unsorted data", "A low learning rate", "Too many epochs"], correctIndex: 0 },

    // C++, RUST, PYTHON
    { category: "C++", text: "What happens if you use new without delete?", options: ["Nothing", "It frees itself", "Memory leak", "Compilation error"], correctIndex: 2 },
    { category: "C++", text: "Move constructors…", options: ["Copy slowly", "Avoid expensive copies", "Delete pointers", "Replace virtual methods"], correctIndex: 1 },
    { category: "C++", text: "What does int a = 3; cout << a++; print?", options: ["4", "3", "Error", "2"], correctIndex: 1 },
    { category: "Rust", text: "What is the borrow checker for?", options: ["Adding dependencies", "Preventing data races at compile time", "Improving graphics", "Reducing RAM"], correctIndex: 1 },
    { category: "Rust", text: "What does the Send trait indicate?", options: ["It can be printed", "It can be transferred across threads", "It can be serialized", "It becomes immutable"], correctIndex: 1 },
    { category: "Rust", text: "Rust prevents data races through…", options: ["A garbage collector", "Ownership and borrowing", "Automatic retries", "Dynamic typing"], correctIndex: 1 },
    { category: "Python", text: "What separates a tuple from a list?", options: ["Lists are immutable", "Tuples are immutable", "Both are mutable", "Nothing"], correctIndex: 1 },
    { category: "Python", text: "What is a decorator?", options: ["A control structure", "A function that wraps another function", "A special class", "A module compressor"], correctIndex: 1 },
    { category: "Python", text: "What type does input() return?", options: ["int", "str", "float", "bool"], correctIndex: 1 },

    // MATHS
    { category: "Maths", text: "Solve: 3x - 5 > 2x + 4", options: ["x > 9", "x < -9", "x > -9", "x < 9"], correctIndex: 0 },
    { category: "Maths", text: "Solve: 4(x - 1) = 2x + 6", options: ["x = 2", "x = 5", "x = 8", "x = -2"], correctIndex: 1 },
    { category: "Maths", text: "A determinant equal to 0 means…", options: ["The matrix is invertible", "The matrix has no inverse", "The matrix is diagonal", "The matrix is orthogonal"], correctIndex: 1 },
    { category: "Maths", text: "A unit vector has…", options: ["Magnitude 0", "Magnitude 1", "Magnitude 2", "Random magnitude"], correctIndex: 1 },
    { category: "Maths", text: "∫ x dx =", options: ["x² + C", "x/2 + C", "x²/2 + C", "2x + C"], correctIndex: 2 }
];
