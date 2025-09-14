# Prompt Completo para Replicar el Manual Interactivo y Quiz de Certificación

## Objetivo General

Crear una página web educativa de una sola página (`index.html`) sobre la construcción de un Dashboard de RRHH con Python. La página debe ser visualmente atractiva, con un tema oscuro "cyberpunk" (negro, verde neón, amarillo), y debe incluir un tutorial detallado, un quiz interactivo para evaluar los conocimientos, y un sistema de generación de certificados para los que aprueben. El proyecto se compone de tres archivos: `index.html`, `style.css`, y `script.js`.

---

## 1. Archivo: `index.html`

**Instrucciones:**
Crea la estructura HTML completa de la página. Debe incluir las siguientes secciones en orden:

1.  **Header:** Un encabezado con el título principal del manual.
2.  **Secciones del Tutorial:** Varias secciones que explican el proyecto, las tecnologías (`Python`, `Streamlit`, `Pandas`, `Plotly`), los fundamentos, los salarios del sector, y un tutorial paso a paso sobre cómo construir el dashboard. Este tutorial debe ser extremadamente detallado, como si se explicara a un principiante, usando analogías, iconos y emojis.
3.  **Sección de Despliegue:** Una guía detallada sobre cómo desplegar la aplicación en Streamlit Community Cloud, incluyendo la creación del archivo `requirements.txt` y la subida a GitHub.
4.  **Conclusión y Retos:** Una sección de conclusión, seguida de una nueva sección con retos para el usuario, consejos profesionales y tres frases motivadoras de impacto para el sector tecnológico.
5.  **Quiz y Certificado:** La sección interactiva final, que contiene:
    *   Una pantalla de inicio para el quiz.
    *   El contenedor del quiz (preguntas, respuestas, temporizador).
    *   Una pantalla de resultados.
    *   Un formulario para introducir el nombre y botones para descargar el certificado en PNG y PDF.
    *   Una tabla para mostrar el historial de intentos.
    *   Un contenedor para la revisión detallada de un intento.
6.  **Contenedor de Certificado Oculto:** Un `div` oculto que contiene la plantilla del certificado, listo para ser rellenado con datos y renderizado con `html2canvas`.
7.  **Scripts:** Inclusión de las librerías de Bootstrap, jspdf, html2canvas y Prism.js (para resaltado de sintaxis), además del script local `script.js`.

**Contenido Específico del `<body>`:**

```html
<body>

    <!-- ===== SECCIÓN DE BIENVENIDA (HERO) ===== -->
    <header class="hero">
        <div class="container">
            <h1 class="display-3">📊 Crea un Dashboard de RRHH con Python</h1>
            <p class="lead fs-4 mt-3">Te guiaré paso a paso para que construyas una aplicación web interactiva y profesional con <span class="kw kw-streamlit">Streamlit</span>, <span class="kw kw-pandas">Pandas</span> y <span class="kw kw-plotly">Plotly</span>.</p>
        </div>
    </header>

    <main class="container">
        <!-- ===== SECCIÓN: ¿QUÉ CONSTRUIREMOS? ===== -->
        <section class="section text-center">
            <h2><i class="fas fa-rocket"></i>¿Qué Construiremos?</h2>
            <p class="lead col-md-8 mx-auto">En este manual, transformaremos un simple archivo de Excel en una poderosa herramienta de visualización de datos. Es como tener una lupa mágica 🔎 que nos permite ver, filtrar y entender la información de los empleados de una empresa de forma dinámica y atractiva.</p>
        </section>
        
        <!-- ===== SECCIÓN: TECNOLOGÍAS ===== -->
        <section class="section">
            <h2><i class="fas fa-tools"></i>Tecnologías: Nuestro Cinturón de Herramientas 🛠️</h2>
            <div class="row g-4 text-center">
                <div class="col-lg col-md-6"><div class="card p-4 h-100"><i class="fab fa-python tech-icon mb-3"></i><h4>Python</h4><p>El cerebro 🧠 de todo.</p></div></div>
                <div class="col-lg col-md-6"><div class="card p-4 h-100"><i class="fas fa-rocket tech-icon mb-3"></i><h4>Streamlit</h4><p>La varita mágica ✨ para crear la app web.</p></div></div>
                <div class="col-lg col-md-6"><div class="card p-4 h-100"><i class="fas fa-file-excel tech-icon mb-3"></i><h4>Pandas</h4><p>El experto 🧐 en organizar y limpiar datos.</p></div></div>
                <div class="col-lg col-md-6"><div class="card p-4 h-100"><i class="fas fa-chart-pie tech-icon mb-3"></i><h4>Plotly</h4><p>El artista 🎨 que dibuja los gráficos.</p></div></div>
                <div class="col-lg col-md-6"><div class="card p-4 h-100"><i class="fab fa-css3-alt tech-icon mb-3"></i><h4>HTML/CSS</h4><p>Los estilistas 💅 que le dan el look & feel.</p></div></div>
            </div>
        </section>

        <!-- ===== SECCIÓN: FUNDAMENTOS ===== -->
        <section class="section">
            <h2><i class="fas fa-graduation-cap"></i>Fundamentos: ¿Por qué aprender esto?</h2>
            <p>Imagina que los datos son como un montón de piezas de LEGO. Aprender a analizarlos es como aprender a construir cualquier cosa que imagines con esas piezas. Es una habilidad súper demandada que te abre las puertas a trabajos increíbles y bien pagados.</p>
            <div class="accordion" id="techAccordion">
                <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">🐍 Python: El Cerebro de la Operación</button></h2><div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#techAccordion"><div class="accordion-body"><strong>Definición:</strong> <span class="kw kw-python">Python</span> es un lenguaje de programación. Piensa en él como el idioma que usaremos para darle instrucciones a la computadora. Es famoso por ser muy claro y fácil de leer, ¡casi como leer inglés!<br><strong>¿Por qué aprenderlo?:</strong> Es el lenguaje #1 para Ciencia de Datos, Machine Learning e Inteligencia Artificial. Su comunidad ha creado miles de "librerías" (cajas de herramientas pre-hechas) que nos ahorran muchísimo trabajo. <br><strong>Ejemplo:</strong> <pre><code class="language-python">total_empleados = df['nombre'].count()</code></pre> Esto es como decirle a Python: "Oye, del archivo de datos, cuenta cuántos nombres hay y dime el total".</div></div></div>
                <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">🎈 Streamlit: La Magia de Crear Apps Web</button></h2><div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#techAccordion"><div class="accordion-body"><strong>Definición:</strong> <span class="kw kw-streamlit">Streamlit</span> es una librería de Python que hace que crear aplicaciones web sea increíblemente fácil y rápido. Es como tener una varita mágica que convierte tu código de análisis en una página web interactiva.<br><strong>¿Por qué aprenderlo?:</strong> Te permite compartir tus análisis y gráficos con cualquier persona (tu jefe, tus amigos, un cliente) sin que ellos necesiten saber programar. ¡Simplemente les pasas un link! <br><strong>Ejemplo:</strong> <pre><code class="language-python">st.slider("Rango de Edad", 18, 65)</code></pre> Con esta simple línea, Streamlit crea un control deslizante en la web para que el usuario pueda filtrar por edad.</div></div></div>
                <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">🐼 Pandas: El Maestro de los Datos</button></h2><div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#techAccordion"><div class="accordion-body"><strong>Definición:</strong> <span class="kw kw-pandas">Pandas</span> es la librería para trabajar con datos tabulares (piensa en tablas de Excel o de bases de datos). Su herramienta principal es el <span class="kw kw-pandas">DataFrame</span>, que es como una hoja de cálculo súper poderosa que controlas con código.<br><strong>¿Por qué aprenderlo?:</strong> Es la navaja suiza del analista de datos. La usarás para TODO: leer archivos, limpiar datos con errores, filtrar, agrupar, y hacer cálculos. <br><strong>Ejemplo:</strong> <pre><code class="language-python">df_filtrado = df[df['departamento'] == 'Ventas']</code></pre> Aquí le decimos a Pandas: "Del DataFrame completo, dame solo las filas donde el departamento sea 'Ventas'".</div></div></div>
                 <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">📈 Plotly: Visualizaciones que Cuentan Historias</button></h2><div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#techAccordion"><div class="accordion-body"><strong>Definición:</strong> <span class="kw kw-plotly">Plotly</span> es una librería para crear gráficos interactivos y hermosos. A diferencia de una imagen estática, los gráficos de Plotly te permiten pasar el mouse para ver detalles, hacer zoom, y explorar la información.<br><strong>¿Por qué aprenderlo?:</strong> Un buen gráfico vale más que mil palabras. Plotly te ayuda a contar la historia que esconden tus datos de una forma visual y atractiva, permitiendo que otros descubran patrones por sí mismos. <br><strong>Ejemplo:</strong> <pre><code class="language-python">fig = px.histogram(df, x="departamento")</code></pre> Con esto, Plotly crea un gráfico de barras que cuenta cuántos empleados hay en cada departamento.</div></div></div>
            </div>
        </section>

        <!-- ===== SECCIÓN: SALARIOS ===== -->
        <section class="section">
            <h2><i class="fas fa-dollar-sign"></i>Perfiles y Salarios en el Mundo de los Datos 💰</h2>
            <p>Dominar estas herramientas te convierte en un profesional muy valioso. Aquí tienes una idea de los roles y salarios (en USD anuales) a los que puedes aspirar. <br><small><em>(Estimaciones basadas en fuentes como Glassdoor, LinkedIn Salary, etc. y pueden variar)</em></small></p>
            <div class="table-responsive"><table class="table table-bordered table-dark table-striped"><thead><tr><th><i class="fas fa-user-tie"></i> Perfil Profesional</th><th><i class="fas fa-tasks"></i> Responsabilidades Clave</th><th><i class="fas fa-baby"></i> Junior</th><th><i class="fas fa-user-graduate"></i> Mid-Level</th><th><i class="fas fa-crown"></i> Senior</th></tr></thead><tbody><tr><td><strong>Data Analyst</strong></td><td>Limpieza, análisis y creación de reportes.</td><td>$55k - $75k</td><td>$75k - $100k</td><td>$100k - $130k+</td></tr><tr><td><strong>BI Developer</strong></td><td>Creación de dashboards (Tableau, PowerBI, <span class="kw kw-streamlit">Streamlit</span>).</td><td>$65k - $85k</td><td>$85k - $115k</td><td>$115k - $150k+</td></tr><tr><td><strong>Visualization Specialist</strong></td><td>Diseño avanzado de gráficos interactivos y storytelling.</td><td>$70k - $90k</td><td>$90k - $120k</td><td>$120k - $160k+</td></tr><tr><td><strong>Data Scientist</strong></td><td>Análisis, modelado predictivo y machine learning.</td><td>$90k - $120k</td><td>$120k - $150k</td><td>$150k - $200k+</td></tr><tr><td><strong>Data Engineer</strong></td><td>Construcción de pipelines de datos y arquitectura.</td><td>$85k - $110k</td><td>$110k - $140k</td><td>$140k - $190k+</td></tr></tbody></table></div>
        </section>

        <!-- ===== SECCIÓN: PASO A PASO ===== -->
        <section class="section">
            <h2><i class="fas fa-code-branch"></i>Paso a Paso: ¡A Construir el Dashboard!</h2>
            <p class="lead">Ok, ¡basta de teoría! Es hora de ensuciarse las manos con código. Sigue esta guía detallada para crear tu obra maestra.</p>
            
            <hr class="my-5">

            <h3 class="mt-4"><span class="highlight">Fase 1:</span> 🛠️ Configuración del Entorno de Desarrollo</h3>
            <p>Esta es la base de nuestra casa. Un buen cimiento asegura que todo lo demás se construya sin problemas.</p>

            <div class="accordion" id="setupAccordion">
                
                <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSetup1">Paso 1. Instalar Python 🐍</button></h2><div id="collapseSetup1" class="accordion-collapse collapse" data-bs-parent="#setupAccordion"><div class="accordion-body"><p>Si aún no tienes <span class="kw kw-python">Python</span>, es como querer cocinar sin cocina. ¡Vamos a instalarlo!</p><ol><li>Visita la <a href="https://www.python.org/downloads/" target="_blank">página oficial de descargas de Python <i class="fas fa-external-link-alt"></i></a>.</li><li>Descarga la última versión estable (la que no diga "beta" o "rc").</li><li>Ejecuta el instalador. <strong>🛑 ¡ESTE PASO ES CRÍTICO! 🛑</strong> En la primera ventana, marca la casilla que dice <span class="kw-general">"Add Python to PATH"</span>. Esto es como decirle a tu computadora: "Oye, quiero poder usar Python desde cualquier lugar, no solo desde su carpeta".</li><li>Para comprobar que todo salió bien, abre una terminal (CMD, PowerShell o Terminal) y escribe el comando mágico:<pre><code class="language-bash">python --version</code></pre>Si ves un número de versión, ¡lo lograste! ✅</li></ol></div></div></div>

                <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSetup2">Paso 2. Instalar VS Code 📝</button></h2><div id="collapseSetup2" class="accordion-collapse collapse" data-bs-parent="#setupAccordion"><div class="accordion-body"><p>Visual Studio Code (o <span class="kw-general">VS Code</span>) es nuestro editor de código. Es como un cuaderno súper inteligente que nos ayuda a escribir código con colores, sugerencias y herramientas.</p><ol><li>Descárgalo desde su <a href="https://code.visualstudio.com/" target="_blank">sitio web oficial <i class="fas fa-external-link-alt"></i></a>.</li><li>Instálalo (puedes aceptar todas las opciones por defecto).</li><li>Ábrelo y ve a la pestaña de Extensiones (el icono de 4 cubos 🧩 en la barra lateral).</li><li>Busca e instala la extensión oficial de <span class="kw-python">Python</span> de Microsoft. Esto le dará superpoderes a tu editor para entender Python.</li></ol></div></div></div>

                <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSetup3">Paso 3. Crear el Proyecto y Entorno Virtual 🌐</button></h2><div id="collapseSetup3" class="accordion-collapse collapse" data-bs-parent="#setupAccordion"><div class="accordion-body"><p>Un <span class="kw-general">entorno virtual</span> es como crear una caja de juguetes separada para cada proyecto. Así, las piezas (librerías) de un proyecto no se mezclan con las de otro. ¡Es una práctica súper importante para ser un programador ordenado!</p><ol><li>Crea una carpeta nueva para tu proyecto. Por ejemplo, llámala <span class="kw-path">dashboard-rrhh</span>.</li><li>En VS Code, abre esa carpeta (Archivo > Abrir Carpeta...).</li><li>Abre una nueva terminal dentro de VS Code (Terminal > Nueva Terminal).</li><li>Crea el entorno virtual con este comando. Esto creará una carpeta llamada <span class="kw-path">env</span> dentro de tu proyecto. Es tu "caja de juguetes".<pre><code class="language-bash">python -m venv env</code></pre></li><li><strong>¡Activa el entorno!</strong> Este es el paso clave. Es como abrir la caja de juguetes para empezar a usarla.<p><strong>En Windows (PowerShell):</strong></p><pre><code class="language-powershell">.\env\Scripts\Activate.ps1</code></pre><p><strong>En Mac/Linux:</strong></p><pre><code class="language-bash">source env/bin/activate</code></pre><p>Sabrás que funcionó porque verás <span class="kw-general">(env)</span> al principio de la línea de tu terminal.</p></li></ol></div></div></div>

                <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSetup4">Paso 4. Instalar las Librerías 📚</button></h2><div id="collapseSetup4" class="accordion-collapse collapse" data-bs-parent="#setupAccordion"><div class="accordion-body"><p>Con nuestra "caja de juguetes" (<span class="kw-general">env</span>) abierta, es hora de meterle las herramientas que necesitamos. Estas librerías solo existirán dentro de este entorno.</p><p>Ejecuta este comando para instalar todo de un solo golpe:</p><pre><code class="language-bash">pip install streamlit pandas plotly openpyxl</code></pre><div class="alert alert-info mt-3"><i class="fas fa-info-circle me-2"></i><strong>¿Qué es <span class="kw-general">pip</span>?</strong> Es el gestor de paquetes de Python. Imagina que es un repartidor de Amazon que va y te trae las librerías que le pides. <br><strong>¿Y <span class="kw-general">openpyxl</span>?</strong> Es una librería que <span class="kw-pandas">Pandas</span> usa por debajo para poder hablar con los archivos de Excel (`.xlsx`).</div></div></div></div>

            </div>

            <hr class="my-5">

            <h3 class="mt-4"><span class="highlight">Fase 2:</span> 💾 Análisis y Preparación de los Datos</h3>
            <p>Nuestros datos son el ingrediente principal. Crea un archivo llamado <span class="kw-path">RRHH.xlsx</span> en la raíz de tu proyecto con una estructura similar a esta. Puedes inventarte los datos.</p>
            <div class="table-responsive"><table class="table table-bordered table-dark table-striped"><thead><tr><th>nombre_completo</th><th>genero</th><th>departamento</th><th>cargo</th><th>estado</th><th>fecha_ingreso</th><th>fecha_salida</th><th>fecha_nacimiento</th><th>sueldo</th></tr></thead><tbody><tr><td>Juan Pérez</td><td>Masculino</td><td>Ventas</td><td>Analista</td><td>Activo</td><td>15/03/2020</td><td></td><td>10/05/1990</td><td>$2500</td></tr><tr><td>Ana Gómez</td><td>Femenino</td><td>IT</td><td>Desarrollador</td><td>Activo</td><td>01/02/2018</td><td></td><td>20/08/1992</td><td>$3500</td></tr></tbody></table></div>
            <p class="mt-3"><strong>🕵️‍♂️ Inspeccionando los Datos:</strong></p>
            <ul><li>✅ <strong>Datos Categóricos:</strong> <span class="kw-general">genero</span>, <span class="kw-general">departamento</span>, <span class="kw-general">cargo</span>. Son como etiquetas, perfectas para filtrar.</li><li>✅ <strong>Datos Numéricos:</strong> <span class="kw-general">sueldo</span>. Ideal para hacer cálculos matemáticos.</li><li>✅ <strong>Datos de Fecha:</strong> <span class="kw-general">fecha_ingreso</span>, <span class="kw-general">fecha_nacimiento</span>. Nos permitirán calcular edad y antigüedad.</li><li>❌ <strong>Posibles Problemas:</strong> El <span class="kw-general">sueldo</span> tiene un símbolo de `$` y es texto, no un número. ¡No podemos sumar texto! Las fechas son texto también. ¡Nuestro código deberá ser un buen limpiador de datos!</li></ul>

            <hr class="my-5">

            <h3 class="mt-4"><span class="highlight">Fase 3:</span> 👨‍💻 Construcción del Script <span class="kw-path">rrhh_dashboard.py</span></h3>
            <p>¡La hora de la verdad! Crea este archivo en tu proyecto y vamos a darle vida, bloque por bloque.</p>
            
            <h4 class="mt-4">Bloque 1: Importaciones y Configuración de Página</h4>
            <p>Lo primero es llamar a nuestras herramientas e indicarle a la página que queremos que use todo el ancho de la pantalla para que el dashboard se vea espacioso.</p>
            <pre><code class="language-python">
# 1. Importamos las librerías que instalamos
import streamlit as st
import pandas as pd
import plotly.express as px
import numpy as np # Numpy es genial para cálculos numéricos

# 2. Configuramos la página
st.set_page_config(
    page_title="Dashboard de Recursos Humanos",
    page_icon="📊",
    layout="wide" # wide = usar todo el ancho
)
            </code></pre>

            
            
            <h4 class="mt-4">Bloque 2: Carga y Limpieza de Datos (¡La Función Mágica!)</h4>
            <p>Esta función es el corazón de nuestro script. Se encargará de leer el Excel, limpiar los datos sucios y prepararlos para el análisis. Usamos <span class="kw-streamlit">@st.cache_data</span> para que Streamlit sea inteligente: si el archivo no ha cambiado, no vuelve a leerlo y procesarlo todo, ¡haciendo la app súper rápida!</p>
            <pre><code class="language-python">
# Usamos un decorador para que la función se ejecute solo una vez si los datos no cambian
@st.cache_data
def cargar_datos(ruta_archivo: str) -> pd.DataFrame:
    # Leemos el excel
    df = pd.read_excel(ruta_archivo)
    
    # --- Proceso de Limpieza (¡Muy importante!) ---
    # Nombres de columnas: a minúsculas, sin espacios raros
    df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
    
    # Sueldo: quitamos el '$' y lo convertimos a número
    if 'sueldo' in df.columns:
        df['sueldo'] = df['sueldo'].replace(r'[\$,]', '', regex=True).astype(float)
        
    # Fechas: las convertimos de texto a un formato de fecha real
    for col in ['fecha_nacimiento', 'fecha_ingreso', 'fecha_salida']:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors='coerce') # coerce = si una fecha es inválida, ponla como Nula (NaT)
            
    # --- Creación de Nuevas Columnas (¡Inteligencia!) ---
    hoy = pd.Timestamp.now()
    if 'fecha_nacimiento' in df.columns:
        df['edad'] = (hoy - df['fecha_nacimiento']).dt.days / 365.25
    
    if 'fecha_ingreso' in df.columns:
        df["antiguedad"] = (hoy - df["fecha_ingreso"]).dt.days / 365.25

    return df

# Ejecutamos la función para cargar los datos
df_original = cargar_datos("RRHH.xlsx")

# Si el dataframe está vacío, detenemos la app
if df_original.empty:
    st.error("🚨 ¡Error! No se pudo cargar el archivo 'RRHH.xlsx'. Asegúrate de que exista en la misma carpeta.")
    st.stop() # Detiene la ejecución del script
            </code></pre>

            <h4 class="mt-4">Bloque 3: Filtros Interactivos en la Barra Lateral</h4>
            <p>Aquí es donde <span class="kw-streamlit">Streamlit</span> brilla. Crearemos los controles (selectores, sliders) en la barra lateral para que el usuario pueda "jugar" con los datos.</p>
            <pre><code class="language-python">
# st.sidebar hace que todo lo que está dentro aparezca en la barra lateral
with st.sidebar:
    st.header("🔍 Filtros")
    
    # Filtro por Departamento (Selector Múltiple)
    departamentos = st.multiselect(
        "Departamento",
        options=df_original["departamento"].unique(),
        default=df_original["departamento"].unique()
    )

    # Filtro por Género
    generos = st.multiselect(
        "Género",
        options=df_original["genero"].unique(),
        default=df_original["genero"].unique()
    )

    # Filtro por Rango de Edad (Slider)
    edad_min, edad_max = int(df_original["edad"].min()), int(df_original["edad"].max())
    rango_edad = st.slider(
        "Rango de Edad",
        min_value=edad_min, 
        max_value=edad_max, 
        value=(edad_min, edad_max) # Valor inicial (todo el rango)
    )

# --- Filtrado del DataFrame ---
# Usamos el método .query() de Pandas, que es como hablarle al DataFrame
df_filtrado = df_original.query(
    "departamento == @departamentos and genero == @generos and edad >= @rango_edad[0] and edad <= @rango_edad[1]"
)

# Si después de filtrar no queda nada, mostramos un aviso
if df_filtrado.empty:
    st.warning("⚠️ No hay datos que coincidan con los filtros seleccionados.")
    st.stop()

            </code></pre>

            <h4 class="mt-4">Bloque 4: Cuerpo Principal del Dashboard (KPIs y Gráficos)</h4>
            <p>Esta es la parte principal de la página. Mostraremos los indicadores clave (KPIs) y los gráficos interactivos que creamos con <span class="kw-plotly">Plotly</span>.</p>
            <pre><code class="language-python">
# --- KPIs (Indicadores Clave de Rendimiento) ---
st.markdown("###  KPIs Principales")
kpi_cols = st.columns(4) # Creamos 4 columnas

kpi_cols[0].metric("👥 Total Empleados", f"{len(df_filtrado):,}")
kpi_cols[1].metric("💰 Sueldo Promedio", f"${df_filtrado['sueldo'].mean():,.0f}")
kpi_cols[2].metric("🎂 Edad Promedio", f"{df_filtrado['edad'].mean():.1f} años")
kpi_cols[3].metric("🏢 Antigüedad Prom.", f"{df_filtrado['antiguedad'].mean():.1f} años")

st.markdown("<hr>", unsafe_allow_html=True)

# --- Gráficos Interactivos ---
graf_col1, graf_col2 = st.columns(2)

with graf_col1:
    st.markdown("#### 📊 Distribución por Departamento")
    fig_depto = px.pie(df_filtrado, names="departamento", hole=0.4)
    st.plotly_chart(fig_depto, use_container_width=True)

with graf_col2:
    st.markdown("#### 🚻 Distribución por Género")
    fig_genero = px.pie(df_filtrado, names="genero", hole=0.4)
    st.plotly_chart(fig_genero, use_container_width=True)

# --- Tabla de Datos Detallada ---
st.markdown("### 📑 Detalle de Empleados Filtrados")
st.dataframe(df_filtrado.style.format({'sueldo': '${:,.2f}', 'edad': '{:.0f}', 'antiguedad': '{:.1f}'}))

            </code></pre>
        </section>

        <!-- ===== SECCIÓN DESPLIEGUE EN LA NUBE (RESTAURADA) ===== -->
        <section class="section">
            <h2 class="text-center"><i class="fas fa-cloud-upload-alt"></i>Fase Final: Despliegue en la Nube ☁️</h2>
            <p class="lead text-center col-md-10 mx-auto">¡Felicidades! Has construido un dashboard funcional. Pero, ¿de qué sirve si solo vive en tu computadora? ¡Vamos a compartirlo con el mundo! Desplegaremos tu aplicación en <span class="kw-streamlit">Streamlit Community Cloud</span>, un servicio <strong>gratuito</strong>.</p>
            <hr class="my-5">
            <h3 class="mt-4"><span class="highlight">Paso 1:</span> El Archivo Mágico: <span class="kw-path">requirements.txt</span> ✨</h3>
            <p>Necesitamos decirle a la "computadora en la nube" de Streamlit qué herramientas (librerías) necesita instalar. Eso se hace con este archivo.</p>
            <ol>
                <li>Abre la terminal en VS Code, asegurándote de que tu entorno virtual <span class="kw-general">(env)</span> esté activado.</li>
                <li>Ejecuta este comando. "Congela" (<span class="kw-general">freeze</span>) una lista de las librerías de tu entorno y la guarda en el archivo.</li>
            </ol>
            <pre><code class="language-bash">pip freeze > requirements.txt</code></pre>
            <p>Verás un nuevo archivo en tu proyecto. Su contenido será algo así:</p>
            <pre><code class="language-text"># El contenido puede variar, pero verás tus librerías principales
pandas==2.2.2
plotly==5.22.0
streamlit==1.35.0
# ... y otras dependencias que ellas necesitan ...</code></pre>
            <div class="alert alert-danger mt-2"><i class="fas fa-exclamation-triangle me-2"></i><strong>CRÍTICO:</strong> Sin este archivo, tu app mostrará un error en la nube. ¡No lo olvides!</div>
            <hr class="my-5">
            <h3 class="mt-4"><span class="highlight">Paso 2:</span> Sube tu Proyecto a GitHub 🐙</h3>
            <p>Streamlit Cloud es amigo de GitHub. Necesitas que tu proyecto viva en un repositorio de GitHub para que Streamlit pueda encontrarlo.</p>
            <ol>
                <li><strong>Crea una cuenta en <a href="https://github.com/" target="_blank">GitHub</a></strong> si no tienes una.</li>
                <li><strong>Crea un nuevo repositorio.</strong> Haz clic en "New" o ve a <a href="https://github.com/new" target="_blank">github.com/new</a>.</li>
                <li>Dale un nombre (ej: <span class="kw-path">dashboard-rrhh-streamlit</span>), asegúrate de que sea <strong>Público</strong> y haz clic en "Create repository".</li>
                <li><strong>Sube tus archivos.</strong> En la página de tu nuevo repositorio, busca un enlace que dice <strong>"uploading an existing file"</strong>. Arrastra y suelta tus <strong>3 archivos</strong>: <span class="kw-path">rrhh_dashboard.py</span>, <span class="kw-path">RRHH.xlsx</span> y <span class="kw-path">requirements.txt</span>.</li>
                <li>Guarda los cambios haciendo clic en "Commit changes".</li>
            </ol>
            <hr class="my-5">
            <h3 class="mt-4"><span class="highlight">Paso 3:</span> ¡El Despliegue Final en Streamlit Cloud! 🚀</h3>
            <p>Con tu código en GitHub, esto es pan comido.</p>
            <ol class="list-group list-group-flush">
                <li class="list-group-item bg-transparent"><strong>1. Crea tu cuenta:</strong> Ve a <a href="https://share.streamlit.io/signup" target="_blank">share.streamlit.io/signup</a> y regístrate con tu cuenta de GitHub.</li>
                <li class="list-group-item bg-transparent"><strong>2. Inicia un Nuevo Despliegue:</strong> Dentro de tu panel, haz clic en el botón azul <strong>"+ New app"</strong>.</li>
                <li class="list-group-item bg-transparent"><strong>3. Configura tu App:</strong> Rellena el formulario:
                    <ul class="list-unstyled mt-3 ps-4">
                        <li>✅ <strong>Repository:</strong> Elige el repositorio que acabas de crear.</li>
                        <li>✅ <strong>Branch:</strong> Déjalo en <span class="kw-general">main</span>.</li>
                        <li>✅ <strong>Main file path:</strong> Escribe el nombre de tu script: <span class="kw-path">rrhh_dashboard.py</span>.</li>
                        <li>✅ <strong>App URL:</strong> ¡Dale un nombre corto y genial a tu app!</li>
                    </ul>
                </li>
                <li class="list-group-item bg-transparent"><strong>4. ¡Desplegar!:</strong> Haz clic en el botón <strong>"Deploy!"</strong>.</li>
            </ol>
            <p class="mt-4">Verás una pantalla de instalación. Streamlit leerá tu <span class="kw-path">requirements.txt</span>, instalará todo y ejecutará tu script. ¡En unos minutos, tu dashboard estará vivo y online para que lo compartas con quien quieras!</p>
        </section>

        <!-- ===== SECCIÓN CONCLUSIÓN (RESTAURADA) ===== -->
        <section class="section">
            <h2><i class="fas fa-flag-checkered"></i>Conclusión y Próximos Pasos</h2>
            <p class="lead">¡Lo lograste! Has recorrido el camino completo desde un archivo de Excel hasta una aplicación web interactiva. Has aprendido habilidades increíblemente valiosas:</p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-transparent"><i class="fas fa-check-circle me-2 text-success"></i><span class="highlight">Limpiar y procesar datos</span> con <span class="kw kw-pandas">Pandas</span>.</li>
                <li class="list-group-item bg-transparent"><i class="fas fa-check-circle me-2 text-success"></i><span class="highlight">Construir una UI interactiva</span> con <span class="kw kw-streamlit">Streamlit</span>.</li>
                <li class="list-group-item bg-transparent"><i class="fas fa-check-circle me-2 text-success"></i><span class="highlight">Crear gráficos dinámicos</span> con <span class="kw kw-plotly">Plotly</span>.</li>
                <li class="list-group-item bg-transparent"><i class="fas fa-check-circle me-2 text-success"></i><span class="highlight">Desplegar tu trabajo</span> para que todo el mundo lo vea.</li>
            </ul>
            <p class="mt-4">Este es un gran paso en tu carrera. Ahora tienes un proyecto sólido para tu portafolio. ¿Qué sigue?</p>
        </section>

        <!-- ===== NUEVA SECCIÓN: RETOS Y CONSEJOS ===== -->
        <section class="section bg-dark rounded p-5">
            <h2 class="text-center"><i class="fas fa-lightbulb"></i>Retos, Consejos y Frases Inspiradoras</h2>
            <div class="row mt-4">
                <div class="col-md-6">
                    <h4>🚀 Retos para ir más allá</h4>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-angle-right text-success"></i> <strong>Añade más gráficos:</strong> ¿Puedes calcular la distribución de antigüedad? ¿O un gráfico de dispersión de edad vs. sueldo?</li>
                        <li><i class="fas fa-angle-right text-success"></i> <strong>Más filtros:</strong> Agrega un filtro por estado de empleado (Activo/Inactivo).</li>
                        <li><i class="fas fa-angle-right text-success"></i> <strong>Pestañas:</strong> Usa <span class="kw-streamlit">st.tabs()</span> para organizar tu dashboard en diferentes secciones (ej: "General", "Análisis de Sueldos").</li>
                        <li><i class="fas fa-angle-right text-success"></i> <strong>Sube tu propio Excel:</strong> Usa <span class="kw-streamlit">st.file_uploader()</span> para permitir que el usuario suba su propio archivo de datos.</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h4>💡 Consejos de Oro</h4>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-star text-warning"></i> <strong>La curiosidad es tu superpoder:</strong> Siempre pregúntate "¿Qué más puedo descubrir en estos datos?".</li>
                        <li><i class="fas fa-star text-warning"></i> <strong>Aprende SQL:</strong> Es el lenguaje de las bases de datos. Python + SQL es una combinación invencible.</li>
                        <li><i class="fas fa-star text-warning"></i> <strong>Comunica, no solo muestres:</strong> Un dashboard no es solo un conjunto de gráficos, es una historia. Asegúrate de que la tuya se entienda.</li>
                        <li><i class="fas fa-star text-warning"></i> <strong>Crea un portafolio:</strong> Proyectos como este son tu mejor carta de presentación. ¡Colecciónalos!</li>
                    </ul>
                </div>
            </div>
            <hr class="my-5">
            <h3 class="text-center">Frases para el Camino</h3>
            <div class="row text-center mt-4">
                <div class="col-md-4">
                    <blockquote class="blockquote">"El código es como el humor. Cuando tienes que explicarlo, es malo."</blockquote>
                    <footer class="blockquote-footer">Cory House</footer>
                </div>
                <div class="col-md-4">
                    <blockquote class="blockquote">"Torturar los datos el tiempo suficiente y confesarán cualquier cosa."</blockquote>
                    <footer class="blockquote-footer">Ronald Coase</footer>
                </div>
                <div class="col-md-4">
                    <blockquote class="blockquote">"Medir el progreso en programación por líneas de código es como medir el progreso en la construcción de aviones por su peso."</blockquote>
                    <footer class="blockquote-footer">Bill Gates</footer>
                </div>
            </div>
        </section>

        <!-- ===== SECCIÓN FINAL: QUIZ Y CERTIFICADO ===== -->
        <div id="main-content">
            <section class="section bg-dark rounded p-5">
                <h2 class="text-center"><i class="fas fa-award"></i>¡Pon a Prueba tus Conocimientos y Obtén tu Certificado!</h2>
                <div id="quiz-start-screen" class="text-center">
                    <p class="lead">Demuestra tus habilidades con este quiz. Tienes <strong>15 minutos</strong> para responder <strong>30 preguntas</strong>. Necesitas un <strong>80% de aciertos</strong> para aprobar.</p>
                    <button id="start-quiz-btn" class="btn btn-primary btn-lg mt-3">🚀 ¡Comenzar el Quiz! 🚀</button>
                </div>
                
                <div id="quiz-container" class="d-none">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h4 id="question-counter"></h4>
                        <div id="timer" class="fw-bold">15:00</div>
                    </div>
                    <p id="question-text" class="question mb-4"></p>
                    <div id="answers-container" class="list-group"></div>
                    <button id="next-question-btn" class="btn btn-secondary mt-4 float-end d-none">Siguiente &rarr;</button>
                </div>

                <div id="quiz-results-screen" class="d-none text-center">
                    <h3 id="result-title"></h3>
                    <p id="result-message" class="fs-4"></p>
                    <div id="certificate-form-container" class="d-none col-md-8 mx-auto mt-4">
                        <h5>¡Felicidades! Ingresa tu nombre completo para el certificado:</h5>
                        <div class="input-group mb-3">
                            <input type="text" id="cert-name-input" class="form-control" placeholder="Nombre Completo" required>
                        </div>
                        <div id="download-buttons-container" class="d-none">
                            <p>¡Tu certificado está listo! Descárgalo en tu formato preferido:</p>
                            <button id="download-png-btn" class="btn btn-success"><i class="fas fa-image me-2"></i>Descargar PNG</button>
                            <button id="download-pdf-btn" class="btn btn-danger"><i class="fas fa-file-pdf me-2"></i>Descargar PDF</button>
                        </div>
                    </div>
                    <div class="mt-4">
                        <button id="review-attempt-btn" class="btn btn-info"><i class="fas fa-search me-2"></i>Revisar mis Respuestas</button>
                        <button id="retry-quiz-btn" class="btn btn-secondary"><i class="fas fa-redo me-2"></i>Reintentar Quiz</button>
                    </div>
                </div>
            </section>

            <section class="section">
                <h2><i class="fas fa-history"></i>Historial de Intentos</h2>
                <div id="history-container">
                    <p id="no-history-msg">Aún no has completado ningún intento.</p>
                    <table id="history-table" class="table table-dark table-striped d-none">
                        <thead><tr><th>Fecha</th><th>Puntuación</th><th>Resultado</th><th>Acciones</th></tr></thead>
                        <tbody id="history-table-body"></tbody>
                    </table>
                </div>
            </section>
        </div>

        <section id="quiz-review-screen" class="section d-none">
            <!-- El contenido de la revisión se generará aquí con JavaScript -->
        </section>
    </main>
    
    <footer class="footer mt-5">
        <div class="container">
            <p>&copy; 2025 - Creado por Ing. Juancito Peña con la asistencia de Gemini</p>
        </div>
    </footer>

    <!-- Contenedor Oculto para Generación de Certificado -->
    <div id="certificate-wrapper">
        <div id="certificate">
            <div class="cert-content">
                <header class="cert-header">
                    <div class="cert-title-container">
                        <h1>Certificado de Finalización</h1>
                        <p>Certificate of Completion</p>
                    </div>
                    <div class="cert-logos">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" alt="Python Logo" title="Python">
                        <img src="https://res.cloudinary.com/dyd911kmh/image/upload/v1640050215/image27_frqkzv.png" alt="Streamlit Logo" title="Streamlit" style="height: 45px;">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pandas_logo.svg/1200px-Pandas_logo.svg.png" alt="Pandas Logo" title="Pandas">
                        <img src="https://images.plot.ly/logo/new-branding/plotly-logomark-light.png" alt="Plotly Logo" title="Plotly">
                    </div>
                </header>
                <main class="cert-body">
                    <p class="cert-award-text">Este certificado se otorga a:</p>
                    <h2 id="cert-name-display" class="cert-recipient-name"></h2>
                    <p class="cert-course-details">
                        Por completar exitosamente el proyecto y la evaluación de <strong>"Dashboard Interactivo de RRHH"</strong>,
                        demostrando competencia en el ecosistema de Data Science de Python, incluyendo:
                        <br>
                        <span class="kw kw-python">Python</span> para lógica de negocio, <span class="kw kw-pandas">Pandas</span> para manipulación de datos, <span class="kw-plotly">Plotly</span> para visualización
                        y <span class="kw-streamlit">Streamlit</span> para la creación y despliegue de la aplicación web.
                    </p>
                </main>
                <footer class="cert-footer-simple">
                    <div class="cert-signature-block">
                        <p id="cert-author-signature">Ing. Juancito Peña</p>
                        <span>Autor del Contenido</span>
                    </div>
                    <div class="cert-stats-block">
                        <strong>Puntuación Final:</strong> <span id="cert-score-display"></span><br>
                        <strong>Fecha de Emisión:</strong> <span id="cert-date-display"></span>
                    </div>
                </footer>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
    <script src="script.js"></script>

</body>
```