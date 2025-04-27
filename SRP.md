# Aplicarea principiului SRP (Single Responsibility Principle)

In componenta `CartSidebar.vue` am aplicat principiul SRP prin separarea responsabilitatilor:

- Componenta `CartSidebar.vue` se ocupa doar cu partea de UI si interactiunile vizuale
- Composable-ul `useCartLogic.js` gestioneaza logica

Astfel, acest lucru face codul:
- mai usor de intretinut
- mai usor de testat (logica poate fi testata separat de UI)
- mai scalabil (poate fi reutilizata in alte componente)