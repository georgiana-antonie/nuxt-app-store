# Optimizari Lighthouse pentru Performanta si Accesibilitate

---

## Accesibilitate – Scor crescut de la 74 la 96

### Adaugarea elementului `<title>`
- Elementul `<title>` lipsea, ceea ce afecteaza cititoarele de ecran si SEO. 
- A fost adaugat in fisierele `app.vue`, `index.vue` si `checkout.vue`.

### Asocierea unui `<label>` cu elementul `<select>`
- Dropdown-ul pentru sortare nu avea un label asociat, asadar am adaugat un element `<label>` legat de `id`-ul `<select>`.

### Setarea atributului `lang` pe elementul `<html>`
- Atributul `lang` pe elementul `<html>` lipsea, asadar am setat atributul `lang="en"` in fisierul `nuxt.config.ts`

### Marirea zonei de interactiune pentru slider
- Slider-ul pentru pret avea o zona de interactiune prea mica pentru utilizator, asa ca am modificat in componenta `ProductList.vue` dimensiunea acestuia sa fie mai mare. 

---

## Performance - Scor 97
Am obtinut un scor de 97 la Performance fara optimizari suplimentare, datorita:

### Code Splitting si Lazy Loading
- Componentele mari sunt incarcate asincron cu `defineAsyncComponent`.
- Pagina `/checkout` este incarcata doar cand este accesata.

### Optimizare imagini
- Imaginile produselor folosesc `<img>` cu clasa `object-cover` si dimensiuni fixe pentru a evita layout shift

### Caching prin Nuxt
- `useFetch` utilizeaza caching intern, reducand timpul de raspuns pentru datele din API

---

## Rezultate finale in Lighthouse

- Performance:  97
- Accessibility: 96 (de la 74)
- Best Practices:  96
- SEO:  91