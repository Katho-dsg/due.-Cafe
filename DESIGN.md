---
name: due.
description: Café de especialidad colombiano en ediciones de cien piezas, vestido con los modales de una casa relojera.
colors:
  amber: "#C08A3E"
  amber-bright: "#D49B4A"
  olive: "#799733"
  black: "#0E0E0C"
  green: "#161D10"
  green-2: "#1D2715"
  beige: "#E6DAC3"
  paper: "#ECE8E1"
  bone: "#F3EEE4"
  white: "#FFFFFF"
  muted-on-dark: "#B8AE9C"
  muted-on-light: "#4F4A40"
  placeholder-on-dark: "#8C8476"
typography:
  display:
    fontFamily: "League Spartan, Montserrat, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 8.2vw, 8.5rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "League Spartan, Montserrat, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "League Spartan, Montserrat, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.1vw, 2rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "League Spartan, Montserrat, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.1vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.1
    fontFeature: "tnum"
  index:
    fontFamily: "League Spartan, Montserrat, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.1vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  statement:
    fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.375rem, 2.1vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.25
  lead:
    fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
  name-line:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.3
  handwriting:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: "0"
  focus: "2px"
  pill: "999px"
spacing:
  margin: "clamp(16px, 2.2vw, 32px)"
  gutter: "24px"
  section: "clamp(120px, 14vw, 200px)"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.black}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.amber-bright}"
  button-quiet:
    backgroundColor: "{colors.black}"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-quiet-hover:
    backgroundColor: "{colors.green}"
  button-small:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.black}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  bag-pill:
    backgroundColor: "{colors.green}"
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "0 6px 0 18px"
    height: "44px"
  input-underline:
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "8px 0"
  choice-row:
    textColor: "{colors.black}"
    rounded: "{rounded.pill}"
    padding: "16px 18px"
  choice-row-selected:
    backgroundColor: "{colors.paper}"
  letter-slip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.black}"
    typography: "{typography.handwriting}"
    rounded: "{rounded.none}"
    padding: "22px 20px 40px"
  letter-slip-live:
    backgroundColor: "{colors.white}"
  contact-row:
    backgroundColor: "{colors.green}"
    textColor: "{colors.bone}"
    typography: "{typography.headline}"
    padding: "0 20px 26px"
    height: "150px"
---

# Design System: due.

## Overview

**Creative North Star: "La casa relojera"**

due. se presenta como una casa relojera presenta una pieza: el objeto al centro sobre negro, cifras grandes, muy pocas palabras. La página no es una tienda de café; es una secuencia de capítulos, y cada capítulo es un campo de color plano (negro, beige, verde bosque, blanco) que cambia de golpe, sin degradado ni línea que lo anuncie. El nombre, «dos» en italiano, ordena la composición en pares: dos caminos a los lados del objeto, «Para» y «De» en la carta, dos acciones con el mismo peso al cierre.

La densidad es baja y el ritmo es lento: secciones altas, márgenes generosos, titulares enormes y apretados en League Spartan, texto corto en Montserrat. El ámbar es el único color que se mueve: marca lo que se puede pulsar y lo que cuesta. La fotografía es de archivo y llega en duotono negro–hueso, nunca a color; la única pieza a todo color es el objeto mismo.

Lo que esta casa rechaza, por compromiso de marca: la plantilla de cafetería (lienzo crema de punta a punta, serif cursiva en titulares, granos, fincas, plantas, postales de cosecha) y las tarjetas con borde y sombra.

**Key Characteristics:**
- Campos planos de color por capítulo; sin degradados, sin sombras en reposo.
- Titulares y cifras en League Spartan 700, interlineado por debajo de 1 y tracking negativo.
- Ámbar solo para acciones, precios y las piezas de la edición.
- Una sola forma interactiva: la píldora completa.
- Fotografía de archivo en duotono negro–hueso; el objeto es la única imagen a color.
- Composición en pares, siguiendo el nombre.

## Colors

Una paleta sobria de campos oscuros y claros cálidos, con un solo acento metálico (ámbar) y un verde oliva que vive en la marca.

### Primary
- **Ámbar de lacre** (amber): botones primarios, el contador de la bolsa, el foco de teclado, la selección de texto, las cien piezas del diagrama de la edición y el punto del wordmark construido en el pie. Es el color del dinero y de la acción.
- **Ámbar encendido** (amber-bright): solo como estado hover del ámbar; nunca en reposo.

### Tertiary
- **Oliva de la marca** (olive): el color del logotipo y de la bolsa. Vive en las piezas raster de la marca (logo, fotografía del objeto); no se usa como relleno de interfaz.

### Neutral
- **Negro de estuche** (black): campo del inicio, la edición, el pie y la barra al bajar; también el texto sobre campos claros y sobre ámbar.
- **Verde bosque** (green): campo de «Para cada conexión» y de Empresas; fondo de la píldora de la bolsa y hover del botón silencioso.
- **Verde bosque alterno** (green-2): franjas pares en las filas de Empresas, para separar sin líneas.
- **Beige de papel fino** (beige): campo de la introducción y del cierre; bloques del wordmark del pie.
- **Papel de algodón** (paper): las tarjetas escritas y la opción de estuche seleccionada.
- **Hueso** (bone): el «blanco» del texto sobre oscuro; nunca se usa blanco puro para texto.
- **Blanco** (white): el campo del estuche y la tarjeta viva que el visitante escribe.
- **Gris cálido sobre oscuro** (muted-on-dark): texto secundario, etiquetas de campo, subrayado de inputs, filas inactivas de la tabla (8.8:1 sobre negro).
- **Gris cálido sobre claro** (muted-on-light): firmas de las tarjetas, mensajes de estado, filas atenuadas del estuche (6.4:1 sobre beige).
- **Marcador** (placeholder-on-dark): solo para placeholders de los campos sobre oscuro (5.2:1 sobre negro).

### Named Rules
**The Chapter Field Rule.** Cada sección es un solo campo plano de black, beige, green o white. El cambio de capítulo es el cambio de color; no hay degradados, bordes ni divisores entre secciones.

**The Amber Is Money Rule.** El ámbar marca solo lo que se pulsa, lo que cuesta y las piezas de la edición. Si un ámbar no se puede pulsar ni contar, sobra (la única excepción es el punto del wordmark construido).

**The Olive In The Mark Rule.** El oliva pertenece al logotipo y al objeto. No se usa en fondos, botones ni texto de interfaz.

## Typography

**Display Font:** League Spartan (con Montserrat, system-ui)
**Body Font:** Montserrat (con system-ui, -apple-system, Segoe UI)
**Serif Font:** Bodoni Moda cursiva (con Didot, Bodoni 72, Georgia)

**Character:** Una sans geométrica pesada y comprimida para lo que se lee desde lejos (titulares, cifras, la lista de momentos), una sans neutra para explicar, y una Didona cursiva reservada a dos voces humanas: el significado del nombre y la letra escrita a mano.

### Hierarchy
- **Display** (700, clamp(3.25rem, 8.2vw, 8.5rem), 0.88): el titular del inicio y el de la introducción. Una o dos líneas, centrado o alineado al margen.
- **Headline** (700, clamp(2.25rem, 4.6vw, 4.75rem), 0.95): titulares de capítulo, los nombres de lo que trae el estuche y las filas de Empresas.
- **Title** (700, clamp(1.375rem, 2.1vw, 2rem), 1): «Para usted», «Para alguien»; los pasos de la edición en su tamaño menor (1.1875rem).
- **Figure** (500, clamp(1.375rem, 2.1vw, 2rem), 1.1, cifras tabulares): precios. La moneda «COP» baja a Montserrat 500 de cuerpo y gris.
- **Index** (400, clamp(1.375rem, 2.1vw, 2rem), 1.5): la tabla de momentos, donde la fila activa sube a hueso y las demás quedan en gris.
- **Statement** (Montserrat 500, clamp(1.375rem, 2.1vw, 2rem), 1.25, máx. 30ch): la frase que explica la marca.
- **Lead** (Montserrat 400, 1.1875rem, 1.55, máx. 44ch): párrafos de apertura de capítulo.
- **Body** (Montserrat 400, 1rem, 1.55): texto corriente, descripciones de estuche, pie.
- **Label** (Montserrat 600, 1rem, 1): botones y nombres de estuche.
- **Name line** (Bodoni Moda cursiva 400, 1.1875rem, 1.3): «due. — del italiano, dos».
- **Handwriting** (Bodoni Moda cursiva 400, 1.1875rem, 1.4): el mensaje de cada tarjeta.

### Named Rules
**The Three Voices Rule.** League Spartan habla en titulares y cifras, Montserrat explica, Bodoni Moda cursiva solo dice el nombre y escribe las cartas. La serif nunca titula.

**The Tight Display Rule.** Todo texto en League Spartan 700 a tamaño de titular lleva interlineado por debajo de 1 (0.88 a 0.95) y tracking negativo (-0.02em a -0.04em).

## Layout

Rejilla de 12 columnas con gutter de 24px y margen lateral fluido (clamp(16px, 2.2vw, 32px)). Las secciones respiran con un relleno vertical de clamp(120px, 14vw, 200px) y suelen ocupar casi toda la pantalla (90svh a 100svh). El texto se ancla a la izquierda en columnas de 5 a 8; la otra mitad la ocupan objeto, foto o aire.

El inicio es un tríptico: dos columnas laterales iguales y el objeto en el centro (minmax(220px, 21vw)), cortado por el borde inferior. Por debajo de 760px el tríptico se desarma: el objeto pasa a ocupar el 62% del ancho centrado y los dos caminos quedan lado a lado debajo, en dos columnas, con botones a todo el ancho. Por debajo de 1000px la tarjeta de la carta se pega al margen y se ocultan las tarjetas quinta y sexta.

**The Pairs Rule.** Cuando una decisión admite dos caminos, se presentan juntos y con el mismo peso: dos lados del objeto, «Para» y «De», «Regalar due.» y «Comprar para mí».

## Elevation & Depth

El sistema es plano. La profundidad viene del cambio de campo de color y del recorte: el objeto se sale por el borde inferior del inicio y del cierre, las tarjetas sobresalen por debajo de la foto de la carta. La única pieza que flota, el aviso (toast), proyecta sombra porque está por encima de la página. Sobre la pintura de la carta, el texto se apoya en un velo negro al 84% (rgba(14, 14, 12, 0.84)) sin borde ni sombra.

### Shadow Vocabulary
- **Aviso flotante** (`box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35)`): solo el toast que confirma una acción.

### Named Rules
**The Flat At Rest Rule.** Nada proyecta sombra en reposo. La sombra pertenece solo a lo que flota sobre la página.

## Shapes

Dos geometrías, sin término medio. Todo lo que se pulsa es una píldora completa (999px): botones, la bolsa, su contador, las opciones de estuche, el enlace del pie, el círculo de la flecha en Empresas. Todo lo demás es rectángulo de esquina viva (0): fotografías, tarjetas escritas, el clip de video, los bloques del wordmark. Las tarjetas se inclinan levemente (entre -1.5deg y 1.2deg) y varían de altura, como papeles dejados sobre una mesa. Las únicas líneas del sistema son el subrayado de 1px de los campos de escritura, porque ahí se escribe sobre un renglón.

**The Pill Or Square Rule.** Si se pulsa, es píldora (o círculo); si se mira, es rectángulo. No hay radios intermedios.

## Components

### Buttons
Sólidos, sin borde, con presión física.
- **Shape:** píldora completa (999px), alto 52px.
- **Primary:** ámbar con texto negro, Montserrat 600, relleno lateral 28px.
- **Hover / Focus:** hover a ámbar encendido en 180ms; al pulsar escala a 0.97 en 140ms; foco con contorno ámbar de 2px separado 3px.
- **Quiet:** negro con texto hueso; hover a verde bosque. Acompaña al primario cuando hay dos acciones.
- **Small:** 44px de alto y 20px de relleno, para el pie y el aviso del próximo lote.

### Inputs / Fields
- **Style:** sin caja: solo un subrayado de 1px en gris cálido, fondo transparente, texto hueso a 1.1875rem, esquina viva. Etiqueta encima en gris cálido, con contador tabular a la derecha cuando hay límite.
- **Focus:** el subrayado cambia a ámbar; no hay contorno.

### Choice rows (estuche)
- **Style:** filas píldora con un radio propio de 18px (borde negro de 1.5px, punto interior que aparece escalando), nombre en Montserrat 600 y precio en League Spartan 500 tabular.
- **State:** la fila seleccionada toma fondo papel; las demás quedan sin fondo.

### Navigation
- **Style:** barra fija de tres columnas: logotipo a la izquierda, tres enlaces centrados en Montserrat 500, píldora de la bolsa a la derecha. Transparente sobre el inicio, negra al bajar (300ms).
- **States:** los enlaces revelan su subrayado en hover. El contador de la bolsa salta (escala 1.25) al añadir.
- **Mobile:** desaparece el primer enlace y la palabra «Bolsa»; queda solo el contador.

### Letter slip (signature)
La tarjeta escrita: papel de algodón, esquina viva, nombre del destinatario en Montserrat 600, mensaje en Bodoni cursiva, firma al pie en gris. La primera tarjeta es blanca y se reescribe al instante mientras el visitante teclea en el formulario.

### Moments index (signature)
Una tabla tipográfica en League Spartan 400 sin líneas: cada fila es un momento con su estuche y su precio alineado a la derecha. La fila activa sube a hueso y cambia la foto fija de la izquierda con un fundido de 260ms.

### Contact rows
Filas de 150px de alto en League Spartan 700 a tamaño headline, alineadas abajo, alternando verde y verde alterno en lugar de usar divisores. La última termina en un círculo ámbar con flecha; en móvil la fila entera se vuelve ámbar.

### Built wordmark
En el pie, «due.» se construye en bloques de altura desigual (beige, hueso, beige y un punto ámbar más estrecho) con las letras en negro, cortadas por el borde del bloque.

## Do's and Don'ts

### Do:
- **Do** cambiar de capítulo cambiando de campo de color plano (black, beige, green, white).
- **Do** reservar el ámbar para botones, precios, el contador y las piezas de la edición.
- **Do** componer los titulares en League Spartan 700 con interlineado entre 0.88 y 0.95 y tracking negativo.
- **Do** usar Bodoni Moda cursiva solo para la línea del nombre y el texto de las cartas.
- **Do** hacer píldora (999px) todo lo pulsable y de esquina viva todo lo demás.
- **Do** tratar la fotografía de archivo en duotono negro–hueso y acreditarla en el pie.
- **Do** presentar las dos acciones (regalar y comprar) juntas y con el mismo peso.
- **Do** escribir precios con cifras tabulares y la moneda «COP» en tamaño menor.

### Don't:
- **Don't** usar imágenes de naturaleza: granos, plantas, cafetales, fincas ni cosechas.
- **Don't** usar la plantilla de cafetería: titulares en serif cursiva, tarjetas con borde y sombra, o el beige como lienzo de toda la página (el beige es un capítulo entre campos oscuros).
- **Don't** poner sombras, degradados ni divisores en elementos en reposo.
- **Don't** usar el oliva como color de interfaz; pertenece al logotipo.
- **Don't** usar radios intermedios (8px, 12px, 16px); solo píldora, círculo o esquina viva.
- **Don't** usar blanco puro para texto sobre oscuro; el texto claro es hueso.
