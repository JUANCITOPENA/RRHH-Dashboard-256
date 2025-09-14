# rrhh_dashboard.py

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import datetime     


# --- CONFIGURACIÓN DE LA PÁGINA ---
st.set_page_config(
    page_title="Dashboard de Recursos Humanos",
    page_icon="📊",
    layout="wide"
)

# --- DATOS DEL AUTOR Y ENLACES ---
FOTO_URL = "https://avatars.githubusercontent.com/u/38921558?v=4"
# ENLACES ACTUALIZADOS
LINKEDIN_URL = "https://www.linkedin.com/in/juancitopeña/"
GITHUB_URL = "https://github.com/JUANCITOPENA"
YOUTUBE_URL = "https://www.youtube.com/channel/UCSob-3E5z4IHtMF5B4bN-FA" # Puedes actualizar esta URL si es diferente

# --- URLs DE LOS ICONOS (SVGs blancos para mejor visibilidad) ---
LINKEDIN_ICON_URL = "https://images.icon-icons.com/805/PNG/512/linkedin_icon-icons.com_65929.png"
GITHUB_ICON_URL = "https://cdn-icons-png.flaticon.com/512/25/25231.png" # Usamos uno que se vea bien en fondos oscuros
YOUTUBE_ICON_URL = "https://images.icon-icons.com/1211/PNG/512/1491580651-yumminkysocialmedia28_83061.png"

# --- COMPONENTE HTML PARA LA IMAGEN (SOLO VISUAL) ---
componente_imagen_autor = f"""
<style>
    .avatar-image {{
        width: 100px; height: 100px; border-radius: 50%;
        border: 4px solid #76ff03;
        box-shadow: 0 0 15px #76ff03, 0 0 25px #ffeb3b, inset 0 0 5px rgba(0,0,0,0.5);
        transition: transform 0.3s ease-in-out;
    }}
    .avatar-image:hover {{
        transform: scale(1.1);
    }}
</style>
<div style="display: flex; justify-content: center; align-items: center; padding-top: 10px;">
    <img src="{FOTO_URL}" class="avatar-image">
</div>
"""

# --- COMPONENTE HTML PARA EL SUBTÍTULO CON ICONOS REALES ---
componente_subtitulo = f"""
<style>
    .subtitle-container {{
        text-align: center;
        margin-top: -15px;
    }}
    .subtitle-container h4 {{
        color: #76ff03; /* Color verde lumínico */
        font-weight: 300; /* Fuente más fina */
    }}
    .social-icon {{
        width: 28px; /* Tamaño del icono */
        height: 28px;
        vertical-align: middle; /* Alineación con el texto */
        margin: 0 8px; /* Espaciado entre iconos */
        transition: transform 0.2s ease-in-out;
    }}
    .social-icon:hover {{
        transform: scale(1.3); /* Efecto al pasar el ratón */
    }}
</style>
<div class="subtitle-container">
    <h4>
        Creado por: Ing. Juancito Peña con Python Streamlit y CSS
        <a href="{LINKEDIN_URL}" target="_blank">
            <img src="{LINKEDIN_ICON_URL}" class="social-icon">
        </a>
        <a href="{YOUTUBE_URL}" target="_blank">
            <img src="{YOUTUBE_ICON_URL}" class="social-icon">
        </a>
        <a href="{GITHUB_URL}" target="_blank">
            <img src="{GITHUB_ICON_URL}" class="social-icon" style="filter: invert(1);">
        </a>
    </h4>
</div>
"""

# --- ESTRUCTURA DE LA CABECERA ---
col1, col2 = st.columns([1, 5], gap="medium")
with col1:
    st.markdown(componente_imagen_autor, unsafe_allow_html=True)
with col2:
    # El título ahora está centrado para alinearse con el nuevo subtítulo
    st.markdown("<h1 style='text-align: center; padding-top: 25px;'>Dashboard de Recursos Humanos 📊</h1>", unsafe_allow_html=True)
    st.markdown(componente_subtitulo, unsafe_allow_html=True)

st.markdown("---")

# --- (EL RESTO DEL CÓDIGO PERMANECE EXACTAMENTE IGUAL) ---

# --- CARGA Y CACHÉ DE DATOS ---
@st.cache_data
def cargar_datos(ruta_archivo: str) -> pd.DataFrame:
    try:
        df = pd.read_excel(ruta_archivo)
    except FileNotFoundError:
        st.error(f"Error: No se encontró el archivo '{ruta_archivo}'.")
        return pd.DataFrame()
    df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
    df = df.rename(columns={'bonificación': 'bonificacion', 'edad_en_años': 'edad_calculada', 'nombre_completo': 'nombre_completo'})
    for col in ["sueldo", "bonificacion", "total_ingresos"]:
        if col in df.columns and df[col].dtype == 'object':
             df[col] = df[col].replace(r'[\$,]', '', regex=True).astype(float)
    for col in ['fecha_nacimiento', 'fecha_ingreso', 'fecha_salida']:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors='coerce')
    hoy = pd.Timestamp.now()
    if 'fecha_nacimiento' in df.columns: df['edad_en_años'] = (hoy - df['fecha_nacimiento']).dt.days / 365.25
    else: df['edad_en_años'] = np.nan
    if 'fecha_ingreso' in df.columns: df["antiguedad_num"] = ((hoy - df["fecha_ingreso"]).dt.days / 365.25).fillna(0)
    else: df["antiguedad_num"] = 0
    return df

df_original = cargar_datos("RRHH.xlsx")
if df_original.empty: st.stop()

with st.sidebar:
    st.header("🔍 Filtros")
    if st.button("♻️ Borrar / Restablecer Filtros"): st.session_state.clear(); st.rerun()
    default_deps = df_original["departamento"].dropna().unique().tolist()
    departamentos = st.multiselect("Departamento", options=default_deps, default=st.session_state.get("departamentos", default_deps))
    st.session_state.departamentos = departamentos
    default_generos = df_original["genero"].dropna().unique().tolist()
    generos = st.multiselect("Género", options=default_generos, default=st.session_state.get("generos", default_generos))
    st.session_state.generos = generos
    default_cargos = df_original["cargo"].dropna().unique().tolist()
    cargos = st.multiselect("Cargo", options=default_cargos, default=st.session_state.get("cargos", default_cargos))
    st.session_state.cargos = cargos
    edad_min, edad_max = int(df_original["edad_en_años"].min()), int(df_original["edad_en_años"].max())
    rango_edad = st.slider("Rango de Edad (años)", min_value=edad_min, max_value=edad_max, value=st.session_state.get("rango_edad", (edad_min, edad_max)))
    st.session_state.rango_edad = rango_edad
    antiguedad_min, antiguedad_max = int(df_original["antiguedad_num"].min()), int(df_original["antiguedad_num"].max())
    rango_antiguedad = st.slider("Rango de Antigüedad (años)", min_value=antiguedad_min, max_value=antiguedad_max, value=st.session_state.get("rango_antiguedad", (antiguedad_min, antiguedad_max)))
    st.session_state.rango_antiguedad = rango_antiguedad

query_parts = [
    "departamento in @departamentos", "genero in @generos", "cargo in @cargos",
    "edad_en_años >= @rango_edad[0] and edad_en_años <= @rango_edad[1]",
    "antiguedad_num >= @rango_antiguedad[0] and antiguedad_num <= @rango_antiguedad[1]"
]
df_filtrado = df_original.query(" and ".join(query_parts))

if df_filtrado.empty:
    st.warning("No hay datos que coincidan con los filtros seleccionados.")
else:
    st.markdown("""<style>[data-testid="stMetricValue"]{font-size: 24px;}[data-testid="stMetricLabel"]{font-size: 18px;}</style>""", unsafe_allow_html=True)
    kpi_cols = st.columns(7)
    total_empleados, activos = len(df_filtrado), df_filtrado["estado"].str.lower().eq("activo").sum()
    inactivos = total_empleados - activos
    tasa_rotacion = (inactivos / total_empleados * 100) if total_empleados > 0 else 0
    kpi_cols[0].metric("👥 Total Empleados", f"{total_empleados:,}")
    kpi_cols[1].metric("✅ Activos", f"{activos:,}")
    kpi_cols[2].metric("❌ Inactivos", f"{inactivos:,}")
    kpi_cols[3].metric("🏢 Departamentos", f"{df_filtrado['departamento'].nunique():,}")
    kpi_cols[4].metric("💰 Sueldo Total", f"${df_filtrado['sueldo'].sum():,.0f}")
    kpi_cols[5].metric("🎂 Edad Promedio", f"{df_filtrado['edad_en_años'].mean():.1f} años")
    kpi_cols[6].metric("🔁 Tasa Rotación", f"{tasa_rotacion:.1f}%")
    st.markdown("---")
    col_graf1, col_graf2 = st.columns(2)
    with col_graf1:
        st.plotly_chart(px.histogram(df_filtrado, x="departamento", color="estado", title="Distribución por Departamento y Estado"), use_container_width=True)
        st.plotly_chart(px.box(df_filtrado, x="departamento", y="sueldo", title="Distribución de Sueldo por Departamento"), use_container_width=True)
    with col_graf2:
        st.plotly_chart(px.pie(df_filtrado, names="genero", title="Distribución por Género", hole=0.4), use_container_width=True)
        st.plotly_chart(px.violin(df_filtrado, y="edad_en_años", x="departamento", box=True, title="Distribución de Edad por Departamento"), use_container_width=True)
    st.subheader("🔁 Análisis de Rotación")
    def calcular_rotacion_anual(df: pd.DataFrame) -> pd.DataFrame:
        df_salidas = df.dropna(subset=['fecha_salida']).copy()
        if df_salidas.empty: return pd.DataFrame()
        df_salidas['año_salida'] = df_salidas['fecha_salida'].dt.year; separaciones_anuales = df_salidas.groupby('año_salida').size()
        promedio_empleados_anual = {year: ((df[df['fecha_ingreso'].dt.year < year].shape[0]) + (df[(df['fecha_ingreso'].dt.year <= year) & ((df['fecha_salida'].dt.year > year) | (df['fecha_salida'].isnull()))].shape[0])) / 2 for year in separaciones_anuales.index}
        rotacion_df = pd.DataFrame({'separaciones': separaciones_anuales, 'promedio_empleados': pd.Series(promedio_empleados_anual)})
        rotacion_df['tasa_rotacion'] = (rotacion_df['separaciones'] / rotacion_df['promedio_empleados']) * 100
        return rotacion_df.reset_index().rename(columns={'index': 'Año'})
    def calcular_rotacion_departamento(df: pd.DataFrame) -> pd.DataFrame:
        rotacion = df.groupby('departamento')['estado'].apply(lambda x: (x.str.lower() == 'inactivo').sum() / len(x) * 100 if len(x) > 0 else 0)
        return rotacion.reset_index(name='Tasa de Rotación (%)').sort_values('Tasa de Rotación (%)', ascending=False)
    col_rot1, col_rot2 = st.columns(2)
    with col_rot1:
        rotacion_depto_df = calcular_rotacion_departamento(df_filtrado)
        if not rotacion_depto_df.empty: st.plotly_chart(px.bar(rotacion_depto_df, x='departamento', y='Tasa de Rotación (%)', title='Tasa de Rotación por Departamento (%)'), use_container_width=True)
        else: st.info("No hay datos para mostrar la rotación por departamento.")
    with col_rot2:
        rotacion_anual_df = calcular_rotacion_anual(df_original)
        if not rotacion_anual_df.empty: st.plotly_chart(px.line(rotacion_anual_df, x='Año', y='tasa_rotacion', title='Tasa de Rotación Anual Histórica (%)', markers=True), use_container_width=True)
        else: st.info("No hay datos históricos de salidas para calcular la rotación anual.")
    st.subheader("📑 Detalle de Empleados")
    def calcular_antiguedad_texto(row):
        final_date = row["fecha_salida"] if pd.notna(row["fecha_salida"]) else pd.Timestamp.now()
        delta = final_date - row["fecha_ingreso"]
        años, meses = delta.days // 365, (delta.days % 365) // 30
        return f"{años} años, {meses} meses" if pd.notna(row["fecha_ingreso"]) else "N/A"
    df_tabla = df_filtrado.copy()
    df_tabla["antigüedad"] = df_tabla.apply(calcular_antiguedad_texto, axis=1)
    df_tabla["estado_emoji"] = df_tabla["estado"].apply(lambda x: "🟢 Activo" if str(x).lower() == "activo" else "🔴 Inactivo")
    columnas_a_mostrar = {'nombre_completo': 'Nombre', 'genero': 'Género', 'departamento': 'Departamento', 'cargo': 'Cargo', 'estado_emoji': 'Estado', 'fecha_ingreso': 'Ingreso', 'fecha_salida': 'Salida', 'antigüedad': 'Antigüedad', 'edad_en_años': 'Edad', 'sueldo': 'Sueldo'}
    for col in columnas_a_mostrar:
        if 'fecha' in col: df_tabla[col] = df_tabla[col].dt.strftime('%d/%m/%Y').fillna('N/A')
        elif col == 'sueldo': df_tabla[col] = df_tabla[col].apply(lambda x: f"${x:,.2f}" if pd.notnull(x) else "N/A")
        elif col == 'edad_en_años': df_tabla[col] = df_tabla[col].apply(lambda x: f"{int(x)}" if pd.notnull(x) else 'N/A')
    st.dataframe(df_tabla[list(columnas_a_mostrar.keys())].rename(columns=columnas_a_mostrar), use_container_width=True)