# Landing · Miguel León

Web personal estática (HTML + CSS + JS, sin build). Bilingüe ES/EN (botón arriba a la derecha; detecta el idioma del navegador y lo recuerda) y con modo claro/oscuro.

```
index.html   contenido en español (y la estructura)
script.js    traducciones al inglés (objeto EN) + animaciones
style.css    estilos
assets/      foto y CVs (ES/EN) que se descargan desde "Contacto"
```

**Editar textos:** el español está en `index.html` y el inglés, con la misma clave `data-i18n`, en `script.js`.
**Proyecto nuevo:** copia un `<li class="prow">` en `index.html` y añade su clave `p.xxx` en `EN`.

## Probar en local

```
python -m http.server 5173
```
y abre http://localhost:5173
