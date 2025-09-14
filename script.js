/**
 * Script Lógico para el Manual Interactivo y Quiz de Certificación
 * Autor: Gemini, con mejoras y funcionalidades añadidas.
 * Descripción: Este script maneja la lógica del quiz, el historial de intentos,
 * la revisión de exámenes y la generación de certificados.
 * CORRECIÓN FINAL: No se guarda la imagen en localStorage para evitar QuotaExceededError.
 * La imagen se regenera al momento del clic.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===== CÓDIGO DE CONFETI =====
    function celebracionInicial() {
        const numeroDeRepeticiones = 3;
        const duracionEntreRepeticiones = 1500;

        const disparoEsquinaIzquierda = () => {
            confetti({
                particleCount: 120, angle: 60, spread: 70, origin: { x: 0, y: 1 },
                colors: ['#76ff03', '#ffeb3b', '#ffffff']
            });
        };
        const disparoEsquinaDerecha = () => {
            confetti({
                particleCount: 120, angle: 120, spread: 70, origin: { x: 1, y: 1 },
                colors: ['#76ff03', '#ffeb3b', '#ffffff']
            });
        };
        const explosionCentral = () => {
            confetti({
                particleCount: 200, spread: 360, startVelocity: 45, origin: { x: 0.5, y: 0.5 },
                decay: 0.9, colors: ['#76ff03', '#ffeb3b', '#ffffff', '#20c997', '#5DADE2']
            });
        };

        for (let i = 0; i < numeroDeRepeticiones; i++) {
            const delay = i * duracionEntreRepeticiones;
            setTimeout(disparoEsquinaIzquierda, delay + 100);
            setTimeout(disparoEsquinaDerecha, delay + 100);
            setTimeout(explosionCentral, delay + 400);
            setTimeout(disparoEsquinaIzquierda, delay + 700);
            setTimeout(disparoEsquinaDerecha, delay + 700);
        }
    }

    // --- BANCO DE PREGUNTAS ---
    const questionBank = [
        { q: "¿Qué comando se usa para ejecutar una aplicación Streamlit?", o: ["streamlit start app.py", "python run app.py", "streamlit run app.py", "run streamlit app.py"], a: 2 }, { q: "¿Cuál es la función principal de la librería Pandas?", o: ["Crear gráficos interactivos", "Crear aplicaciones web", "Manipulación y análisis de datos", "Realizar cálculos matemáticos complejos"], a: 2 }, { q: "El objeto principal en Pandas para manejar datos tabulares es el:", o: ["Series", "DataFrame", "Array", "Dictionary"], a: 1 }, { q: "¿Qué función de Streamlit se usa para crear un slider numérico?", o: ["st.number_input", "st.slider", "st.select_slider", "st.range"], a: 1 }, { q: "Para mostrar un texto en Streamlit, la función más simple es:", o: ["st.text", "st.markdown", "st.write", "st.header"], a: 2 }, { q: "El decorador `@st.cache_data` en Streamlit se usa para:", o: ["Hacer el código más rápido", "Guardar datos en la sesión del usuario", "Evitar que una función se re-ejecute si sus entradas no cambian", "Crear una base de datos"], a: 2 }, { q: "¿Qué librería se usa en este tutorial para crear gráficos interactivos?", o: ["Matplotlib", "Seaborn", "Plotly Express", "Bokeh"], a: 2 }, { q: "Para leer un archivo Excel con Pandas, usamos la función:", o: ["pd.read_csv()", "pd.open_excel()", "pd.read_excel()", "pd.load_excel()"], a: 2 }, { q: "¿Cómo se crea una barra lateral en Streamlit?", o: ["st.sidebar.create()", "Con el objeto `st.sidebar`", "st.layout('sidebar')", "st.add_sidebar()"], a: 1 }, { q: "¿Qué hace `df.columns.str.lower()` en Pandas?", o: ["Convierte todo el texto del DataFrame a minúsculas", "Convierte solo la primera columna a minúsculas", "Convierte los nombres de las columnas a minúsculas", "Elimina las columnas"], a: 2 }, { q: "El comando `st.rerun()` en Streamlit sirve para:", o: ["Reiniciar el servidor", "Recargar la página desde el principio", "Borrar la caché", "Detener la aplicación"], a: 1 }, { q: "En Plotly Express, el argumento `color` en un histograma sirve para:", o: ["Cambiar el color de fondo", "Segmentar las barras por una categoría", "Cambiar el color del borde de las barras", "Establecer un único color para todas las barras"], a: 1 }, { q: "¿Qué hace `df.dropna()` en Pandas?", o: ["Rellena los valores nulos", "Elimina las filas o columnas con valores nulos", "Encuentra los valores nulos", "Convierte los nulos a cero"], a: 1 }, { q: "Para crear columnas en el layout de Streamlit, usamos:", o: ["st.create_columns()", "st.layout(columns=2)", "st.columns()", "st.grid()"], a: 2 }, { q: "¿Cuál es la principal ventaja de Streamlit sobre otras herramientas como Dash o Flask?", o: ["Es más potente", "Es más rápido en ejecución", "Su simplicidad y velocidad de desarrollo", "Tiene más opciones de personalización"], a: 2 }, { q: "El método `.query()` de Pandas se utiliza para:", o: ["Hacer consultas a una base de datos SQL", "Filtrar un DataFrame usando una cadena de texto", "Buscar texto dentro del DataFrame", "Crear nuevas columnas"], a: 1 }, { q: "En `st.set_page_config()`, el argumento `layout='wide'` hace que:", o: ["El texto sea más ancho", "La aplicación ocupe todo el ancho del navegador", "La barra lateral sea más ancha", "Los gráficos sean más anchos"], a: 1 }, { q: "¿Qué es un DataFrame en Pandas?", o: ["Una lista de números", "Una estructura de datos 2D similar a una tabla de Excel", "Un tipo de gráfico", "Una función para leer datos"], a: 1 }, { q: "La función `st.multiselect` permite al usuario:", o: ["Seleccionar una única opción de una lista", "Seleccionar múltiples opciones de una lista", "Escribir texto", "Subir un archivo"], a: 1 }, { q: "Para convertir una columna a tipo fecha en Pandas, se usa:", o: ["pd.to_date()", "pd.to_datetime()", "pd.convert_date()", "df.astype('date')"], a: 1 }, { q: "¿Qué lenguaje se utiliza para dar estilo a los componentes HTML?", o: ["Python", "JavaScript", "CSS", "Markdown"], a: 2 }, { q: "En Streamlit, `st.session_state` se usa para:", o: ["Guardar variables que persisten entre recargas de la página", "Almacenar la configuración de la página", "Guardar el DataFrame", "Controlar la sesión del servidor"], a: 0 }, { q: "¿Qué hace `df.groupby('departamento').sum()`?", o: ["Agrupa el DataFrame por departamento", "Suma todos los valores del DataFrame", "Agrupa por departamento y suma los valores numéricos de cada grupo", "Elimina la columna departamento"], a: 2 }, { q: "Un 'KPI' en un dashboard significa:", o: ["Key Python Instruction", "Key Performance Indicator (Indicador Clave de Rendimiento)", "Key Plotting Interface", "Known Python Issue"], a: 1 }, { q: "La función `st.metric` es ideal para mostrar:", o: ["Gráficos complejos", "Tablas grandes", "Un valor numérico y su delta (cambio)", "Texto largo"], a: 2 }, { q: "En HTML, la etiqueta `<a>` se usa para crear:", o: ["Imágenes", "Títulos", "Párrafos", "Enlaces (Hipervínculos)"], a: 3 }, { q: "El argumento `unsafe_allow_html=True` en `st.markdown`:", o: ["Es una buena práctica de seguridad", "Permite renderizar HTML y CSS personalizado, con un riesgo de seguridad si el HTML no es de confianza", "Hace que el HTML se cargue más rápido", "Elimina todo el HTML"], a: 1 }, { q: "¿Qué hace `df.rename(columns={'old_name': 'new_name'})`?", o: ["Renombra una fila", "Renombra una columna", "Renombra el DataFrame", "Crea una nueva columna"], a: 1 }, { q: "¿Cuál de estos NO es un tipo de gráfico común en Plotly Express?", o: ["px.histogram", "px.pie", "px.scatter", "px.wordcloud"], a: 3 }, { q: "Para instalar Streamlit, usamos el comando:", o: ["install streamlit", "pip install streamlit", "conda get streamlit", "python -m streamlit install"], a: 1 }, { q: "El archivo `requirements.txt` en un proyecto Python sirve para:", o: ["Escribir el código principal", "Listar las dependencias (librerías) del proyecto", "Guardar los datos", "Documentar el proyecto"], a: 1 }, { q: "¿Qué es 'openpyxl'?", o: ["Una librería para crear gráficos", "Una dependencia de Pandas para leer/escribir archivos Excel (.xlsx)", "Una alternativa a Streamlit", "Un editor de código"], a: 1 }, { q: "Si quieres mostrar una tabla interactiva en Streamlit, ¿qué función usarías?", o: ["st.table", "st.write(df)", "st.dataframe", "st.grid"], a: 2 }, { q: "El concepto de 'Data Cleaning' o 'Limpieza de Datos' se refiere a:", o: ["Borrar todo el dataset", "Corregir o eliminar datos erróneos, corruptos o nulos", "Hacer los gráficos más bonitos", "Organizar las carpetas del proyecto"], a: 1 }, { q: "¿Qué hace `df['sueldo'].mean()` en Pandas?", o: ["Calcula la mediana del sueldo", "Calcula la suma total de sueldos", "Encuentra el sueldo más alto", "Calcula el promedio (media) de la columna sueldo"], a: 3 }, { q: "En un gráfico de torta (pie chart), ¿para qué tipo de datos es más adecuado?", o: ["Para mostrar tendencias a lo largo del tiempo", "Para mostrar la distribución de una variable categórica como porcentaje del total", "Para comparar valores entre muchas categorías", "Para ver la correlación entre dos variables"], a: 1 }, { q: "Si quieres que un filtro en Streamlit afecte a los gráficos, debes:", o: ["Usar el DataFrame original en los gráficos", "No hacer nada, es automático", "Filtrar el DataFrame según la selección del usuario y usar el DataFrame filtrado para los gráficos", "Recargar la página manualmente"], a: 2 }, { q: "¿Qué es un 'entorno virtual' en Python?", o: ["Una simulación de otro sistema operativo", "Un directorio aislado que contiene una instalación de Python y sus librerías, específico para un proyecto", "Una versión online de Python", "Un tipo de variable"], a: 1 }, { q: "El comando `git` se usa para:", o: ["Ejecutar código Python", "Control de versiones de código", "Instalar librerías", "Crear bases de datos"], a: 1 }, { q: "¿Qué hace `df.shape` en Pandas?", o: ["Muestra las primeras 5 filas del DataFrame", "Muestra información general del DataFrame", "Devuelve una tupla con el número de filas y columnas", "Cambia la forma del DataFrame"], a: 2 }, { q: "En CSS, la propiedad `border-radius: 50%` aplicada a una imagen cuadrada produce:", o: ["Un círculo", "Un óvalo", "Un rectángulo con esquinas redondeadas", "Un borde punteado"], a: 0 }, { q: "La librería `NumPy` en Python es fundamental para:", o: ["Crear aplicaciones web", "El cálculo numérico y operaciones con arrays multidimensionales", "La manipulación de datos tabulares", "El procesamiento de texto"], a: 1 }, { q: "En Streamlit, ¿qué widget usarías para que un usuario introduzca su nombre?", o: ["st.text_area", "st.text_input", "st.number_input", "st.selectbox"], a: 1 }, { q: "¿Qué hace `df.describe()`?", o: ["Describe el propósito del DataFrame", "Muestra un resumen estadístico de las columnas numéricas", "Muestra los tipos de datos de cada columna", "Describe las primeras 5 filas"], a: 1 }, { q: "Un gráfico de violín (violin plot) es útil porque combina:", o: ["Un gráfico de barras y un gráfico de líneas", "Un box plot y un gráfico de densidad (KDE)", "Un gráfico de torta y un histograma", "Un scatter plot y un mapa de calor"], a: 1 }, { q: "Para evitar que Streamlit muestre una advertencia de 'PyplotGlobalUseWarning', es mejor usar:", o: ["Gráficos de Matplotlib directamente", "Librerías orientadas a objetos como Plotly o Altair", "La función `st.pyplot(fig)`", "Ignorar la advertencia"], a: 1 }, { q: "¿Qué significa 'BI' en 'BI Developer'?", o: ["Business Intelligence (Inteligencia de Negocios)", "Basic Information", "Bold Implementation", "Business Integration"], a: 0 }, { q: "El formato de archivo 'CSV' significa:", o: ["Comma-Separated Values (Valores Separados por Comas)", "Columnar Storage Values", "Complex Structured Vocabulary", "Central System Validation"], a: 0 }, { q: "Si tu DataFrame tiene 1000 filas y aplicas `df.head(10)`, ¿cuántas filas tendrá el resultado?", o: ["1000", "990", "10", "5"], a: 2 }, { q: "El 'storytelling' con datos se refiere a:", o: ["Inventar historias sobre los datos", "Presentar los datos de forma narrativa para comunicar un mensaje claro y convincente", "Escribir un informe muy largo", "Usar solo texto para describir los datos"], a: 1 }, { q: "En CSS, `hover` es un pseudo-clase que se activa cuando:", o: ["El usuario hace clic en un elemento", "La página se carga", "El usuario pasa el cursor sobre un elemento", "El elemento está enfocado"], a: 2 }, { q: "¿Cuál de estas es una buena práctica al diseñar un dashboard?", o: ["Poner tantos gráficos como sea posible", "Usar colores muy brillantes y contrastantes en exceso", "Empezar con una visión general (KPIs) y luego permitir explorar los detalles", "Actualizar los datos cada segundo, sin importar el costo computacional"], a: 2 }, { q: "La función `pd.to_datetime(df['col'], errors='coerce')` hará que los valores de fecha no válidos se conviertan en:", o: ["Un error que detiene el script", "La fecha actual", "Cero", "`NaT` (Not a Time)"], a: 3 }, { q: "¿Qué hace `st.stop()`?", o: ["Detiene la ejecución del script en ese punto, sin renderizar nada más debajo", "Pausa la aplicación por un tiempo", "Cierra el servidor de Streamlit", "Muestra un mensaje de error"], a: 0 }, { q: "Un 'Data Pipeline' se refiere a:", o: ["Un tipo de gráfico", "Un sistema para mover datos desde una fuente a un destino, a menudo transformándolos en el camino", "Una función de Pandas", "Una base de datos"], a: 1 }, { q: "En Python, una f-string se usa para:", o: ["Formatear archivos", "Crear funciones rápidas", "Incrustar expresiones dentro de cadenas de texto de forma sencilla", "Filtrar listas"], a: 2 }, { q: "El rol de 'Data Engineer' se enfoca principalmente en:", o: ["Crear modelos de machine learning", "Construir y mantener la infraestructura y arquitectura para el flujo de datos", "Crear visualizaciones y dashboards", "Comunicar los resultados a los stakeholders"], a: 1 }, { q: "¿Qué es `localhost`?", o: ["Un servidor remoto en la nube", "Una dirección de red que se refiere a la propia computadora", "El sitio web de Streamlit", "Un tipo de base de datos"], a: 1 }, { q: "¿Qué hace el `layout='wide'` en `st.set_page_config`?", o: ["Hace que la barra lateral sea más ancha", "Utiliza todo el ancho de la pantalla para el contenido", "Aumenta el tamaño de la fuente", "Añade más espacio entre los elementos"], a: 1 }, { q: "Para crear un gráfico de barras con Plotly Express, usarías:", o: ["px.histogram", "px.bar", "px.line", "px.scatter"], a: 1 },
    ];


    // --- CONSTANTES Y ELEMENTOS DEL DOM ---
    const QUIZ_DURATION = 15 * 60;
    const QUESTIONS_TO_ASK = 30;
    const PASSING_PERCENTAGE = 80;
    const mainContent = document.getElementById('main-content');
    const startScreen = document.getElementById('quiz-start-screen');
    const quizContainer = document.getElementById('quiz-container');
    const resultsScreen = document.getElementById('quiz-results-screen');
    const reviewScreen = document.getElementById('quiz-review-screen');
    const startBtn = document.getElementById('start-quiz-btn');
    const questionCounter = document.getElementById('question-counter');
    const timerDisplay = document.getElementById('timer');
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const nextBtn = document.getElementById('next-question-btn');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    const certFormContainer = document.getElementById('certificate-form-container');
    const certNameInput = document.getElementById('cert-name-input');
    const downloadButtonsContainer = document.getElementById('download-buttons-container');
    const downloadPngBtn = document.getElementById('download-png-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const reviewAttemptBtn = document.getElementById('review-attempt-btn');
    const retryQuizBtn = document.getElementById('retry-quiz-btn');
    const historyTableBody = document.getElementById('history-table-body');
    const noHistoryMsg = document.getElementById('no-history-msg');
    const historyTable = document.getElementById('history-table');

    // --- ESTADO DE LA APLICACIÓN ---
    let currentQuestions = [];
    let userAnswers = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;
    let currentAttemptId = null;
    let certificateCanvas = null;

    // --- MANEJO DE VISTAS ---
    function showView(view) {
        mainContent.classList.add('d-none');
        reviewScreen.classList.add('d-none');
        if (view === 'main') {
            mainContent.classList.remove('d-none');
        } else if (view === 'review') {
            reviewScreen.classList.remove('d-none');
        }
    }

    // --- LÓGICA DEL QUIZ ---
    function startQuiz() {
        const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
        currentQuestions = shuffled.slice(0, QUESTIONS_TO_ASK);
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = new Array(QUESTIONS_TO_ASK).fill(null);
        currentAttemptId = Date.now();
        certificateCanvas = null;

        showView('main');
        startScreen.classList.add('d-none');
        resultsScreen.classList.add('d-none');
        quizContainer.classList.remove('d-none');

        showQuestion();
        startTimer();
    }

    function showQuestion() {
        nextBtn.classList.add('d-none');
        const question = currentQuestions[currentQuestionIndex];
        questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1} de ${QUESTIONS_TO_ASK}`;
        questionText.textContent = question.q;
        answersContainer.innerHTML = '';
        answersContainer.classList.remove('disabled-answers');

        const shuffledOptions = question.o
            .map((value, index) => ({ value, originalIndex: index }))
            .sort(() => 0.5 - Math.random());

        shuffledOptions.forEach(({ value, originalIndex }) => {
            const answerElement = document.createElement('button');
            answerElement.className = 'list-group-item list-group-item-action';
            answerElement.textContent = value;
            answerElement.dataset.originalIndex = originalIndex;
            answersContainer.appendChild(answerElement);
        });
    }

    function selectAnswer(element) {
        if (answersContainer.classList.contains('disabled-answers')) return;

        const originalIndex = parseInt(element.dataset.originalIndex);
        const question = currentQuestions[currentQuestionIndex];
        userAnswers[currentQuestionIndex] = { question: question.q, answer: originalIndex, options: question.o };
        answersContainer.classList.add('disabled-answers');

        if (originalIndex === question.a) {
            score++;
            element.classList.add('correct-answer');
        } else {
            element.classList.add('user-incorrect');
            const correctElement = Array.from(answersContainer.children).find(child => parseInt(child.dataset.originalIndex) === question.a);
            if (correctElement) correctElement.classList.add('correct-answer');
        }

        if (currentQuestionIndex < QUESTIONS_TO_ASK - 1) {
            nextBtn.classList.remove('d-none');
        } else {
            setTimeout(endQuiz, 1200);
        }
    }

    function endQuiz() {
        clearInterval(timerInterval);
        const percentage = Math.round((score / QUESTIONS_TO_ASK) * 100);
        const passed = percentage >= PASSING_PERCENTAGE;

        quizContainer.classList.add('d-none');
        resultsScreen.classList.remove('d-none');

        resultTitle.textContent = passed ? "🎉 ¡Felicidades, has aprobado! 🎉" : "🤔 Vuelve a intentarlo 🤔";
        resultMessage.textContent = `Tu puntuación fue de ${score} de ${QUESTIONS_TO_ASK} (${percentage}%).`;

        certFormContainer.classList.toggle('d-none', !passed);
        downloadButtonsContainer.classList.add('d-none');
        certNameInput.value = '';

        saveAttemptToHistory(score, percentage, passed);
    }

    // --- TEMPORIZADOR ---
    function startTimer() {
        let timeLeft = QUIZ_DURATION;
        updateTimerDisplay(timeLeft);
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay(timeLeft);
            if (timeLeft <= 0) {
                endQuiz();
            }
        }, 1000);
    }

    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // --- HISTORIAL DE INTENTOS ---
    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem('quizHistory_v2')) || [];
        } catch (e) {
            return [];
        }
    }

    function saveAttemptToHistory(score, percentage, passed) {
        const history = getHistory();
        const newAttempt = {
            id: currentAttemptId,
            date: new Date().toLocaleString('es-ES'),
            score: `${score}/${QUESTIONS_TO_ASK}`,
            percentage,
            passed,
            questions: currentQuestions,
            userAnswers: userAnswers,
            certificate: null
        };
        history.unshift(newAttempt);
        localStorage.setItem('quizHistory_v2', JSON.stringify(history));
        loadHistory();
    }

    function loadHistory() {
        const history = getHistory();
        noHistoryMsg.style.display = history.length === 0 ? 'block' : 'none';
        historyTable.classList.toggle('d-none', history.length === 0);
        historyTableBody.innerHTML = '';
        history.forEach(attempt => {
            const row = document.createElement('tr');
            let actionsCell = `<td><button class="btn btn-sm btn-outline-primary review-btn" data-id="${attempt.id}">Revisar</button>`;
            
            // Lógica corregida: El botón solo aparece si se aprobó y se guardó un nombre
            if (attempt.passed && attempt.certificate && attempt.certificate.name) {
                actionsCell += ` <button class="btn btn-sm btn-outline-info ms-1 cert-btn" data-id="${attempt.id}">Certificado</button>`;
            }
            
            actionsCell += `</td>`;
            row.innerHTML = `
                <td>${attempt.date}</td>
                <td>${attempt.score} (${attempt.percentage}%)</td>
                <td>${attempt.passed ? '<span class="text-success">Aprobado</span>' : '<span class="text-danger">Reprobado</span>'}</td>
                ${actionsCell}
            `;
            historyTableBody.appendChild(row);
        });
    }

    function reviewAttempt(id) {
        const attempt = getHistory().find(a => a.id == id);
        if (!attempt) {
            reviewScreen.innerHTML = `<div class="text-center p-5"><h2 class="mb-3 text-warning">Error</h2><p>No se encontró el intento.</p><button class="btn btn-secondary back-to-main-btn">← Volver</button></div>`;
            showView('review');
            return;
        }

        showView('review');
        let content = `<div class="p-lg-4"><h2 class="mb-3"><i class="fas fa-search me-2"></i>Revisión del Intento</h2>
                       <p class="lead">Fecha: <strong>${attempt.date}</strong> | Resultado: <strong>${attempt.score} (${attempt.percentage}%)</strong></p><hr class="my-4">`;

        if (!attempt.questions || !attempt.userAnswers) {
            content += `<div class="alert alert-warning">Los detalles de este intento no están disponibles.</div>`;
        } else {
            content += attempt.questions.map((q, i) => {
                const userAnswerData = attempt.userAnswers[i];
                const userAnswerIndex = userAnswerData ? userAnswerData.answer : null;
                const isCorrect = userAnswerIndex === q.a;

                const optionsHtml = q.o.map((option, idx) => {
                    let classes = 'list-group-item';
                    if (idx === q.a) {
                        classes += ' correct-answer';
                    }
                    if (userAnswerIndex === idx && !isCorrect) {
                        classes += ' user-incorrect';
                    }
                    return `<li class="${classes}">${option}</li>`;
                }).join('');

                const feedback = isCorrect 
                    ? `<span class="text-success feedback-icon"><i class="fas fa-check-circle"></i> Correcta</span>`
                    : `<span class="text-danger feedback-icon"><i class="fas fa-times-circle"></i> Incorrecta</span>`;

                return `<div class="card mb-3">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <strong>Pregunta ${i + 1}</strong> ${feedback}
                            </div>
                            <div class="card-body">
                                <p class="card-text">${q.q}</p>
                                <ul class="list-group list-group-flush">${optionsHtml}</ul>
                            </div>
                        </div>`;
            }).join('');
        }

        content += `<div class="mt-4 text-center">
                        <button class="btn btn-secondary me-2 back-to-main-btn">← Volver al Historial</button>
                        <button class="btn btn-primary retry-from-review-btn">🚀 Tomar Quiz de Nuevo</button>
                    </div></div>`;
        reviewScreen.innerHTML = content;
    }

    // --- LÓGICA DEL CERTIFICADO (CORREGIDA) ---
    function populateCertificate(name, scoreText, date) {
        document.getElementById('cert-name-display').textContent = name || "Nombre del Participante";
        document.getElementById('cert-score-display').textContent = scoreText || "N/A";
        document.getElementById('cert-date-display').textContent = date || new Date().toLocaleDateString('es-ES');
    }

    // Nueva función para generar la imagen. Se llama siempre que se necesita.
    async function generateCertificateImage(attempt) {
        populateCertificate(
            attempt.certificate.name,
            `${attempt.score} (${attempt.percentage}%)`,
            attempt.date.split(',')[0]
        );

        try {
            const canvas = await html2canvas(document.getElementById('certificate'), {
                scale: 3,
                useCORS: true, // Esencial por el crossorigin="anonymous"
                backgroundColor: null
            });
            if (!canvas) throw new Error("html2canvas returned a null canvas.");
            return canvas.toDataURL('image/png', 1.0);
        } catch (error) {
            console.error("Error crítico al generar la imagen del certificado:", error);
            alert("No se pudo generar la imagen del certificado. Revisa la consola para ver los errores.");
            return null;
        }
    }

    // Se llama desde los botones de descarga de un NUEVO quiz
    async function handleNewCertificateDownload(format) {
        const name = certNameInput.value.trim();
        if (name.length < 3) {
            alert("Por favor, ingresa un nombre válido.");
            return;
        }

        const history = getHistory();
        const attempt = history.find(a => a.id === currentAttemptId);
        if (!attempt) return;

        // **Paso clave:** Guardamos solo el objeto del certificado con el nombre.
        // NUNCA guardamos la imagen en base64 en localStorage.
        attempt.certificate = { name: name };
        localStorage.setItem('quizHistory_v2', JSON.stringify(history));
        
        loadHistory(); // Actualiza la tabla para mostrar el nuevo botón de certificado

        // Ahora, genera la imagen y la ofrece para descargar
        const imageBase64 = await generateCertificateImage(attempt);
        if (imageBase64) {
            offerDownloads(imageBase64, name, format);
        }
        
        downloadButtonsContainer.classList.add('d-none');
    }

    // Se llama desde el botón "Certificado" en el HISTORIAL
    async function handleHistoryCertificateClick(id, targetButton) {
        const attempt = getHistory().find(a => a.id == id);
        if (!attempt || !attempt.certificate?.name) {
            console.error('Intento no encontrado o sin nombre para generar certificado.', attempt);
            return;
        }
        
        // Regenera la imagen al momento del clic
        const imageBase64 = await generateCertificateImage(attempt);

        if (imageBase64) {
            // Elimina botones viejos si existen
            const existingContainer = document.querySelector('.download-buttons-inline');
            if (existingContainer) existingContainer.remove();
            
            // Crea y muestra los nuevos botones de descarga
            const container = document.createElement('div');
            container.className = 'd-inline-flex align-items-center ms-2 download-buttons-inline';
            
            const pngBtn = document.createElement('button');
            pngBtn.className = 'btn btn-sm btn-success';
            pngBtn.innerHTML = 'PNG';
            pngBtn.onclick = () => { offerDownloads(imageBase64, attempt.certificate.name, 'png'); container.remove(); };

            const pdfBtn = document.createElement('button');
            pdfBtn.className = 'btn btn-sm btn-danger ms-1';
            pdfBtn.innerHTML = 'PDF';
            pdfBtn.onclick = () => { offerDownloads(imageBase64, attempt.certificate.name, 'pdf'); container.remove(); };
            
            container.append(pngBtn, pdfBtn);
            targetButton.after(container);
        }
    }

    // Función de ayuda para descargar, para no repetir código
    function offerDownloads(imageBase64, name, format) {
        const fileName = `Certificado_Dashboard_RRHH_${(name || "participante").replace(/\s+/g, '_')}`;

        if (format === 'png') {
            const link = document.createElement('a');
            link.href = imageBase64;
            link.download = `${fileName}.png`;
            link.click();
        } else if (format === 'pdf') {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: 'letter' });
            doc.addImage(imageBase64, 'PNG', 0, 0, 11, 8.5);
            doc.save(`${fileName}.pdf`);
        } else { // El caso original de tu código con confirm()
             if (confirm("¿Quieres descargar el certificado en formato PNG?")) {
                const pngLink = document.createElement('a');
                pngLink.href = imageBase64;
                pngLink.download = `${fileName}.png`;
                pngLink.click();
            }
            if (confirm("¿Quieres descargar el certificado en formato PDF?")) {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: 'letter' });
                doc.addImage(imageBase64, 'PNG', 0, 0, 11, 8.5);
                doc.save(`${fileName}.pdf`);
            }
        }
    }


    // --- EVENT LISTENERS ---
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        showQuestion();
    });
    retryQuizBtn.addEventListener('click', startQuiz);
    reviewAttemptBtn.addEventListener('click', () => reviewAttempt(currentAttemptId));

    answersContainer.addEventListener('click', (event) => {
        const answerButton = event.target.closest('.list-group-item-action');
        if (answerButton) {
            selectAnswer(answerButton);
        }
    });

    certNameInput.addEventListener('input', () => {
        const name = certNameInput.value.trim();
        downloadButtonsContainer.classList.toggle('d-none', name.length <= 2);
    });

    downloadPngBtn.addEventListener('click', () => handleNewCertificateDownload('png'));
    downloadPdfBtn.addEventListener('click', () => handleNewCertificateDownload('pdf'));

    document.body.addEventListener('click', (event) => {
        if (event.target.matches('.back-to-main-btn')) showView('main');
        if (event.target.matches('.retry-from-review-btn')) startQuiz();
        if (event.target.matches('.review-btn')) reviewAttempt(event.target.dataset.id);
        if (event.target.matches('.cert-btn')) handleHistoryCertificateClick(parseInt(event.target.dataset.id), event.target);
    });

    // --- INICIALIZACIÓN ---
    celebracionInicial();
    loadHistory();
    showView('main');
});