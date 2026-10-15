---
name: due.
description: Café de especialidad en lotes de una sola temporada; lujo clásico en una familia de verdes.
colors:
  forest: "#0E2219"
  emerald: "#1F5641"
  olive: "#3F4720"
  moss: "#75863A"
  sage: "#B9C6A6"
  pistachio: "#DCE4B4"
  mint: "#EFF2E8"
  mint-2: "#E3E9DA"
  paper: "#FBFCF7"
  ink: "#14231B"
  ink-soft: "#4A5A4D"
  on-dark: "#F1F4EA"
  on-dark-soft: "#BFCBB6"
  line: "rgba(20, 35, 27, .14)"
  line-dark: "rgba(241, 244, 234, .2)"
  error-blush: "#F2C8B8"
typography:
  display-hero:
    fontFamily: "Gloock, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(3rem, 7.2vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  display:
    fontFamily: "Gloock, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(2.6rem, 6.2vw, 5.6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Gloock, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(2.3rem, 4.6vw, 4.2rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Gloock, Bodoni 72, Didot, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.1
  numeral:
    fontFamily: "Gloock, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(3.6rem, 5vw, 5.2rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  lead:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 600
    lineHeight: 1.6
  button:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    letterSpacing: "0.01em"
rounded:
  hairline: "3px"
  photo: "4px"
  card: "6px"
  pill: "999px"
  round: "50%"
spacing:
  gutter: "clamp(16px, 4.2vw, 64px)"
  section: "clamp(96px, 13vw, 184px)"
  column-gap: "clamp(40px, 7vw, 112px)"
  wrap: "1320px"
components:
  button-forest:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 30px"
    height: "54px"
  button-forest-hover:
    backgroundColor: "{colors.emerald}"
  button-light:
    backgroundColor: "{colors.on-dark}"
    textColor: "{colors.forest}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 30px"
    height: "54px"
  button-light-hover:
    backgroundColor: "{colors.pistachio}"
  button-line-light:
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 30px"
    height: "54px"
  button-sm:
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  segment:
    textColor: "{colors.forest}"
    rounded: "{rounded.card}"
    padding: "8px 16px"
    height: "48px"
  segment-selected:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.on-dark}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "14px 16px"
  status-tag:
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  lot-card:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "26px 26px 22px"
  plate:
    backgroundColor: "{colors.emerald}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.card}"
    padding: "28px"
---

# Design System: due.

## Overview

**Creative North Star: "La Casa Verde"**

due. es lujo clásico sin ironía: una casa de café que viste cada estancia de un verde distinto, cuelga fotografía grande en sus paredes y firma con una serif display imponente. La página no es una tienda con secciones, es un recorrido por campos de color a página completa (bosque, pistacho, menta, esmeralda, oliva) donde cada región pertenece a un solo verde. El listón es el de Hermès y Blue Bottle Coffee: pocas piezas, mucho aire, materiales precisos.

La densidad es baja y generosa: márgenes de sección de hasta 184px, columnas separadas por hasta 112px, titulares que ocupan cuatro o cinco palabras por línea. La estructura la dan filetes de 1px, no cajas; la profundidad aparece solo cuando un objeto flota sobre otro plano (la ficha del lote sobre la foto, la tarjeta de regalo sobre la caja, el carrito sobre la página). Las acciones son píldoras; lo seleccionable y lo que contiene datos tiene esquinas de 6px.

La fotografía es real y pasa siempre por una misma gradación verde, de modo que una cereza roja o una caja de cartón conviven con la paleta en lugar de pelear con ella. Se rechaza explícitamente la plantilla de cafetería: fondo crema, serif cursiva y rejilla de tarjetas.

**Key Characteristics:**
- Campos de color verdes a página completa; cada sección posee un solo verde.
- Gloock en peso 400 con tracking negativo para todo lo que se lee como titular, precio o número.
- Hanken Grotesk para texto e interfaz, en minúsculas de frase, sin versalitas espaciadas.
- Filetes de 1px como estructura; sombras solo para objetos flotantes.
- Fotografía grande con gradación verde común y velos en bosque.
- Movimiento sobrio: curvas de salida largas, presión con escala 0.97, hover solo en punteros finos.

## Colors

Una familia de verdes de bosque a menta, sin un solo neutro gris ni negro puro: hasta el texto y las sombras son verdes.

### Primary
- **Bosque Profundo** (forest): el verde casi negro. Fondo del hero, de la experiencia, del cierre y del pie; botón principal sobre fondos claros; color de los titulares sobre fondos claros; base de todos los velos y sombras (en rgba de 14, 34, 25).
- **Esmeralda** (emerald): campo de la sección de origen, hover del botón bosque, borde de foco de los campos, cifras de existencias y énfasis cálido dentro de la tarjeta de regalo.

### Secondary
- **Oliva del Logotipo** (olive): el verde del wordmark. Campo completo del club y una de las placas del archivo. Es la base de la marca; no se usa como color de texto sobre claro.
- **Musgo** (moss): acento funcional. Anillo de foco global, hover de borde en segmentos, relleno de la barra de existencias, palabra suavizada dentro de un titular (`.soft`) y barra de desplazamiento.

### Tertiary
- **Pistacho** (pistachio): campo luminoso de la sección de Navidad y del plan destacado del club; contador del carrito, iconos de línea y puntos del ciclo sobre fondo oscuro; hover del botón claro; color de selección de texto.
- **Salvia** (sage): placa clara del archivo e inicio del degradado de las barras de perfil de taza.

### Neutral
- **Suelo Menta** (mint): el fondo de página por defecto, del menú móvil, del carrito y de la ficha flotante del lote.
- **Menta Honda** (mint-2): campo de la sección de regalo, pie del carrito y pista vacía de las barras.
- **Papel** (paper): fondo de los campos de formulario y de la tarjeta de regalo; el único blanco del sistema, siempre tintado.
- **Tinta** (ink): texto corrido sobre claros. **Tinta Suave** (ink-soft): descripciones, notas y metadatos.
- **Sobre Oscuro** (on-dark) y **Sobre Oscuro Suave** (on-dark-soft): texto y texto secundario sobre campos oscuros; sobre fotos se usa on-dark al 78-86% de opacidad.
- **Filete** (line) y **Filete Oscuro** (line-dark): las líneas de 1px que estructuran listas, fichas y bordes de controles.
- **Rubor de Error** (error-blush): único color fuera de la familia, reservado al mensaje de error del formulario de correo sobre fondo oscuro (el borde de error usa un tono vecino, #E8B4A0).

### Named Rules
**La Regla del Campo Entero.** Cada sección pinta su fondo de borde a borde con un solo verde (o con una foto velada en bosque) y la siguiente cambia de campo. Nunca dos secciones contiguas comparten campo, y nunca se pinta una tarjeta de color dentro de un campo para simular una sección.

**La Regla Sin Negro.** No existe el negro ni el gris neutro. El texto oscuro es tinta verde (ink o forest), los velos y sombras se construyen sobre rgba(14, 34, 25, …), y los blancos son menta o papel.

**La Regla del Musgo Funcional.** El musgo marca estado (foco, hover, progreso) y suaviza una palabra de un titular; no rellena superficies grandes.

## Typography

**Display Font:** Gloock (con Bodoni 72, Didot, Georgia, serif)
**Body Font:** Hanken Grotesk (con system-ui, -apple-system, Segoe UI, sans-serif)

**Character:** Una didona de alto contraste, grande y de tracking negativo, que da la voz de lujo; frente a ella, una grotesca limpia y amable que hace que comprar sea obvio. La serif habla, la sans atiende.

### Hierarchy
- **Display hero** (400, clamp(3rem, 7.2vw, 6rem), 0.95, -0.03em): solo el titular del primer viewport, partido en líneas que suben al cargar.
- **Display** (400, clamp(2.6rem, 6.2vw, 5.6rem), 0.98, -0.025em): titulares de sección a ancho de campo, con `text-wrap: balance`.
- **Headline** (400, clamp(2.3rem, 4.6vw, 4.2rem), 1.02): titulares de sección que comparten columna con un formulario o una ficha (lote, regalo, archivo).
- **Title** (Gloock 400, 1.6-2.2rem, 1-1.1): nombres de planes, pasos del ritual, orígenes de placas, encabezado del carrito, precios grandes y totales.
- **Numeral** (Gloock 400, clamp(3.6rem, 5vw, 5.2rem), 0.9, -0.03em, cifras tabulares): número del lote en las placas del archivo; la cuenta atrás usa Gloock a 2.2rem.
- **Lead** (400, 1.15rem, 1.6): párrafo de entrada bajo un display, máximo 33-36em.
- **Body** (400, 1.0625rem; 1rem bajo 600px; 1.6): texto corrido; descripciones de producto a 1.1rem en tinta suave.
- **Label** (600, 0.88rem): leyendas de grupos y etiquetas de campos, en bosque, en minúscula de frase.
- **Button** (600, 0.95rem, 0.01em): todos los botones y enlaces de acción.

### Named Rules
**La Regla del Peso Único.** Gloock se usa solo en 400, nunca en negrita ni cursiva (la cursiva del navegador en `em` se anula). La jerarquía la da el tamaño, no el peso.

**La Regla del Precio en Serif.** Precios, totales, cuentas atrás y números de lote van en Gloock con cifras tabulares; la unidad (250 g, por lote) baja a Hanken pequeña en tono suave.

**La Regla de la Minúscula de Frase.** Ningún texto va en mayúsculas con tracking abierto; etiquetas, leyendas y estados se escriben en minúscula de frase con peso 600.

## Layout

Un contenedor de 1320px centrado con margen lateral fluido (gutter) y ritmo vertical de sección fluido (section) de 96 a 184px. Las secciones son bandas a sangre: el fondo llega a los bordes y el contenido se recoge en el contenedor.

La composición dominante es de dos columnas con un hueco amplio (column-gap): foto y texto, o titular y lista. Variantes observadas: 1.15fr/.85fr en Navidad, 1fr/1fr en lote, ritual y regalo, 1.2fr/.8fr en la cabecera del club. La foto del lote es pegajosa (sticky a 100px) mientras se recorre la ficha de compra. El hero alinea el contenido abajo, con la ficha del lote en una columna fija de 340px a la derecha.

Las listas son filas separadas por filetes de 1px (planes del club, pasos del ritual, ciclo, datos del lote), no tarjetas. El archivo es un carril horizontal con snap, columnas de clamp(260px, 26vw, 330px) y separación de 16px, alineado al contenedor desde 1400px.

Puntos de quiebre: 1100px (los planes del club pasan a dos columnas), 960px (todo a una columna, nav a botón de menú), 600px (botones a ancho completo, formularios apilados, campos a 16px de fuente para evitar zoom en iOS).

## Elevation & Depth

Sistema plano con objetos flotantes. Las superficies de sección no tienen sombra; la estructura se dibuja con filetes de 1px y con el cambio de campo. La sombra aparece solo cuando un objeto se posa sobre otro plano, y siempre es larga, difusa y con desplazamiento vertical negativo en el spread, tintada en bosque. La nav fija se vuelve translúcida con desenfoque al desplazarse.

### Shadow Vocabulary
- **Flotante sobre foto** (`box-shadow: 0 30px 50px -18px rgba(14, 34, 25, .4)`): tarjeta de regalo inclinada sobre la foto de la caja.
- **Panel lateral** (`box-shadow: -30px 0 60px -30px rgba(14, 34, 25, .5)`): carrito.
- **Aviso** (`box-shadow: 0 18px 36px -12px rgba(14, 34, 25, .5)`): toast.
- **Persiana** (`box-shadow: 0 24px 40px -24px rgba(14, 34, 25, .4)`): menú móvil desplegado.
- **Filete de nav** (`box-shadow: 0 1px 0` en filete): nav sólida, sobre `rgba(239, 242, 232, .82)` con `blur(18px) saturate(160%)`.

### Named Rules
**La Regla del Objeto Posado.** Solo flota lo que se puede tomar: una ficha, una tarjeta, un panel. Secciones, listas y placas son planas.

**La Regla del Velo Bosque.** Toda foto que lleva texto encima se vela con degradados de rgba(14, 34, 25, …), nunca con negro.

## Shapes

Tres familias de forma con funciones fijas. La **píldora** (999px) es para todo lo que actúa: botones, carrito, selector de cantidad, formulario de correo, etiquetas de estado, pie de foto. La **esquina de 6px** es para lo que se elige o contiene datos: segmentos, campos, ficha del lote, placas del archivo, plan destacado. La **esquina de 4px** enmarca fotografía (y miniaturas del carrito); la tarjeta de regalo y las barras usan 3px. Los botones solo de icono son círculos de 44-48px con filete de 1px.

Iconografía de línea propia en SVG, trazo 1.3-1.6, extremos redondeados, en currentColor o pistacho sobre oscuro. La tarjeta de regalo es el único elemento girado (-2.5deg). El ciclo usa puntos de 11px en pistacho sobre un filete.

## Components

### Buttons
Píldoras firmes y silenciosas: color plano, sin sombra, sin icono decorativo.
- **Shape:** píldora completa (999px), alto mínimo 54px, 44px en la variante pequeña.
- **Bosque:** fondo bosque, texto on-dark, padding horizontal de 30px. Acción principal sobre campos claros.
- **Claro:** fondo on-dark, texto bosque. Acción principal sobre foto o campo oscuro.
- **Filete claro:** transparente con borde on-dark al 50%. Acción secundaria sobre oscuro.
- **Hover / Focus:** solo en punteros finos; bosque pasa a esmeralda, claro a pistacho, filete claro a borde pleno y fondo on-dark al 8%. Transición de color 200ms ease. Presión con `scale(.97)` en 160ms. Foco con anillo musgo de 2px y desplazamiento de 3px.
- **Enlace:** texto 600 subrayado de 1px con desplazamiento de 6px, para acciones terciarias dentro de placas.

### Chips
- **Etiqueta de estado:** píldora con filete de 1px en currentColor, 0.78rem 600, en minúscula de frase ("Agotado", "En camino"). Hereda el color del campo; no tiene relleno.
- **Contador del carrito:** píldora pistacho de 22px con cifra tabular en bosque, que pulsa a escala 1.25 al añadir.

### Segmented Choices
El selector propio de la casa para molienda, presentación y regalo.
- **Style:** esquina de 6px, filete de 1px, fondo blanco al 35%, alto 48px (68px en la variante de tarjeta con nombre y precio).
- **State:** hover con borde musgo; seleccionado con fondo y borde bosque y texto on-dark; foco con anillo musgo de 2px. Presión a 0.98.

### Cards / Containers
- **Ficha del lote:** fondo menta, esquina de 6px, padding 26px, flota sobre la foto del hero; origen en Gloock 2rem, precio en Gloock 1.6rem, fila de precio separada por filete.
- **Tarjeta de regalo:** papel, esquina de 3px, girada -2.5deg, montada sobre la foto; escribe en Gloock la vista previa del mensaje en vivo.
- **Placas del archivo:** esquina de 6px, padding 28px, alto mínimo 400px, cada una en un verde distinto (esmeralda, oliva, salvia, bosque para el próximo lote), numeral gigante arriba y origen abajo.
- **Plan destacado del club:** fila pintada en pistacho con esquina de 6px dentro de la lista de filetes.

### Inputs / Fields
- **Style:** fondo papel, filete de 1px, esquina de 6px, padding 14px 16px, etiqueta en label encima. Placeholder en #66735F.
- **Focus:** borde esmeralda con halo `0 0 0 3px rgba(31, 86, 65, .15)`, sin outline.
- **Formulario de correo (oscuro):** píldora con borde on-dark al 40% y fondo bosque al 40%; al foco el borde pasa a pistacho; en error a rubor.

### Navigation
- **Style:** fija, 76px de alto, rejilla de tres columnas (logo, enlaces centrados, carrito). Transparente con texto on-dark sobre el hero; al desplazarse, menta translúcida con desenfoque, texto bosque y el logo cambia de crema a oliva con fundido de 300ms.
- **Enlaces:** Hanken 500 a 0.95rem, separados 44px; subrayado de 1px que crece desde la izquierda en 300ms.
- **Mobile:** bajo 960px, botón de dos trazos que se cruzan en X; menú en persiana menta con enlaces en Gloock 2rem separados por filetes.

### Cart Drawer
Panel lateral de hasta 440px en menta, con encabezado y total en Gloock 2rem, filas separadas por filetes y pie en menta honda. Abre en 480ms con la curva de cajón y cierra más rápido, en 260ms con la curva de salida, sobre un velo bosque al 50%.

### Motion
- **Curvas:** salida `cubic-bezier(0.23, 1, 0.32, 1)` para casi todo; entrada-salida `cubic-bezier(0.77, 0, 0.175, 1)` para el revelado de imágenes; cajón `cubic-bezier(0.32, 0.72, 0, 1)`.
- **Entrada del hero:** la foto se asienta de escala 1.08 y brillo 0.7 en 2200ms; cada línea del titular sube desde debajo de su máscara en 1100ms con 90ms de desfase; el resto aparece con fundido y 10px de subida.
- **Revelado de fotos:** al entrar en pantalla, recorte de abajo hacia arriba en 1100ms y escala de 1.06 a 1 en 1600ms.
- **Reduced motion:** sin animaciones de entrada ni revelados; el cajón solo funde en 200ms.

## Do's and Don'ts

### Do:
- **Do** dar a cada sección un campo verde entero o una foto velada en bosque, alternando campos entre secciones contiguas.
- **Do** pasar toda fotografía nueva por la gradación verde común (azules y turquesas hacia esmeralda, naranjas desaturados, sombras hacia bosque) y registrar su origen y retoque en el comentario `impeccable:prompt` del JPEG.
- **Do** escribir titulares, precios y números en Gloock 400 con tracking negativo, y todo lo demás en Hanken Grotesk.
- **Do** estructurar listas y fichas con filetes de 1px (line sobre claro, line-dark sobre oscuro).
- **Do** usar píldoras para acciones y 6px para lo seleccionable o lo que contiene datos.
- **Do** limitar el hover a `(hover: hover) and (pointer: fine)` y dar a cada control pulsable una presión de escala 0.97.

### Don't:
- **Don't** construir la plantilla de cafetería: fondo crema, serif cursiva y rejilla de tarjetas.
- **Don't** usar negro puro, gris neutro ni sombras negras; todo oscuro es verde bosque.
- **Don't** poner Gloock en negrita o cursiva.
- **Don't** escribir etiquetas en mayúsculas con tracking abierto ni añadir antetítulos sobre los titulares.
- **Don't** dar sombra a secciones, filas o placas; solo flota lo que se posa sobre otro plano.
- **Don't** usar fotografía sin gradar ni velar foto con texto encima con negro.
