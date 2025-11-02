document.addEventListener('DOMContentLoaded', function() {
    let selectedBase = null;
    let selectedToppings = [];
    

    // ELEMENTOS DINÁMICOS
    const caloriesValue = document.getElementById('calories-value');
    const proteinValue = document.getElementById('protein-value');
    const selectedBaseSpan = document.getElementById('selected-base');
    const selectedToppingsSpan = document.getElementById('selected-toppings');
    const resetBtn = document.getElementById('reset-btn');

    // ----------------- BASES -----------------
    const baseOptions = document.querySelectorAll('.base-option');
    baseOptions.forEach(option => {
        option.addEventListener('click', function() {
            baseOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');

            selectedBase = {
                name: this.querySelector('.base-name').textContent,
                calories: parseFloat(this.getAttribute('data-calories')),
                protein: parseFloat(this.getAttribute('data-protein')),
                icon: this.querySelector('.base-icon').textContent.trim()
            };
            updateNutritionInfo();
        });
    });

    // ----------------- TOPPINGS -----------------
    const toppingItems = document.querySelectorAll('.topping-item');
    toppingItems.forEach(item => {
        item.addEventListener('click', function() {
            const toppingName = this.querySelector('.topping-name').textContent;

            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedToppings = selectedToppings.filter(t => t.name !== toppingName);
            } else if (selectedToppings.length < 12) {
                this.classList.add('selected');
                selectedToppings.push({
                    name: toppingName,
                    calories: parseFloat(this.getAttribute('data-calories')),
                    protein: parseFloat(this.getAttribute('data-protein'))
                });
            } 
            updateNutritionInfo();
        });
    });

    // ----------------- ACTUALIZAR NUTRICIÓN -----------------
    function updateNutritionInfo() {
        let totalCalories = selectedBase ? selectedBase.calories : 0;
        let totalProtein = selectedBase ? selectedBase.protein : 0;

        selectedToppings.forEach(topping => {
            totalCalories += topping.calories;
            totalProtein += topping.protein;
        });

        caloriesValue.textContent = totalCalories.toFixed(1) + ' kcal';

        proteinValue.textContent = totalProtein.toFixed(1) + ' g';

        selectedBaseSpan.textContent = selectedBase ? selectedBase.name : 'Selecciona una base';
        const baseIconDiv = document.getElementById('base-icon');
baseIconDiv.textContent = selectedBase ? selectedBase.icon : '🍧';

        selectedToppingsSpan.textContent = selectedToppings.length > 0 
            ? selectedToppings.map(t => t.name).join(', ') 
            : 'Sin toppings seleccionados';
    }

    // ----------------- BOTÓN REINICIAR -----------------
    resetBtn.addEventListener('click', function() {
        selectedBase = null;
        selectedToppings = [];
        baseOptions.forEach(opt => opt.classList.remove('selected'));
        toppingItems.forEach(item => item.classList.remove('selected'));
        updateNutritionInfo();
    });

    // ----------------- ANIMACIÓN SCROLL -----------------
    const fadeElements = document.querySelectorAll('.fade-in');
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 150) {
                element.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', checkFade);
    checkFade();

    // ----------------- MODAL -----------------
    const botonesDetalles = document.querySelectorAll(".btn-detalles");
    const modal = document.querySelector(".modal");
    const modalTitulo = modal.querySelector("#modal-titulo");
    const modalDescripcion = modal.querySelector("#modal-descripcion");
    const modalCalorias = modal.querySelector("#modal-calorias");
    const modalProteinas = modal.querySelector("#modal-proteinas");
    const modalCarbohidratos = modal.querySelector("#modal-carbohidratos");
    const modalGrasas = modal.querySelector("#modal-grasas");
    const modalBeneficios = modal.querySelector("#modal-beneficios");
    const btnCerrar = modal.querySelector(".btn-cerrar");

    const productosInfo = {
        platano: {
            titulo: "Açaí con Plátano",
            descripcion: "Cremoso açaí con rodajas de plátano fresco para un sabor tropical único.",
            calorias: "350 - 450 kcal.",
            proteinas: "4 - 6 g",
            carbohidratos: "55 - 70 g",
            grasas: "12 - 18 g",
            beneficios: [
                "Fuente natural de potasio",
                "Aporta energía rápida",
                "Mejora la digestión"
            ]
        },
        guayaba: {
            titulo: "Açaí con Nido",
            descripcion: "Dulzura láctea combinada con la potencia antioxidante del açaí.",
            calorias: "400 - 550 kcal",
            proteinas: "8 - 12 g",
            carbohidratos: " 60 - 80 g",
            grasas: "14 - 20 g",
            beneficios: [
                "contenido de proteínas y calcio",
                "Fortalece el sistema inmune",
                "beneficial para huesos y músculos"
            ]
        },
        nutella: {
            titulo: "Açaí con Nutella",
            descripcion: "La indulgencia perfecta: açaí mezclado con deliciosa Nutella.",
            calorias: "500 - 700 kcal (o más)",
            proteinas: " 6 - 9 g",
            carbohidratos: "70 - 100 g",
            grasas: "0 - 35 g",
            beneficios: [
                "muy alta en azúcares refinados y grasas",
                "Energía inmediata",
                "Mejora el estado de ánimo"
            ]
        },
        nestle: {
            titulo: "Açaí con Nestlé",
            descripcion: "Cremoso açaí con trozos de chocolate Nestlé que añaden dulzura y textura crujiente.",
            calorias: "450 - 600 kcal",
            proteinas: "5 - 8 g",
            carbohidratos: "65 - 90 g",
            grasas: " 15 - 25 g",
            beneficios: [
                "calcio y proteínas de la leche",
                "Aporta energía inmediata",
                "Mejora el ánimo",
                "pción más alta en azúcares añadidos",
            ]
        },
        maracuya: {
            titulo: "Bolo de Maracuya",
            descripcion: "Refrescante combinacion, 100% natural .",
            calorias: "250 - 400 kcal",
            proteinas: "3 - 6 g",
            carbohidratos: "45 - 70 g",
            grasas: "5 - 10 g",
            beneficios: [
                "Fuente de Vitamina C ",
                "Fuente de fibra",
                "Mejora la calidad del sueño"
            ]
        },
        fresa: {
            titulo: "Bolo de Fresa",
            descripcion: "Refrescante combinacion con pulpa de fresas frescas, 100% natural .",
            calorias: "200 - 350 kcal",
            proteinas: "3 - 5 g",
            carbohidratos: "40 - 60 g",
            grasas: "4 - 8 g",
            beneficios: [
                "Alto contenido en antioxidantes",
                "Fuente de Vitamina C",
                "Salud cardiovascular",
            ]
        },
        copoazu: {
            titulo: "Bolo de Copoazú",
            descripcion: "Refrescante combinacion con pulpa de Copoazú, 100% natural .",
            calorias: "280 - 430 kcal",
            proteinas: "4 - 7 g",
            carbohidratos: "45 - 65 g",
            grasas: "10 - 18 g",
            beneficios: [
                "Rico en Theobromina",
                "Fuente de Vitamina A",
                " Fuente de ácidos grasos omega-9"
            ]
        }

    };

    botonesDetalles.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card");
            const productoId = card.getAttribute("data-product");
            const info = productosInfo[productoId];

            if (info) {
                modalTitulo.textContent = info.titulo;
                modalDescripcion.textContent = info.descripcion;
                modalCalorias.textContent = info.calorias;
                modalProteinas.textContent = info.proteinas;
                modalCarbohidratos.textContent = info.carbohidratos;
                modalGrasas.textContent = info.grasas;

                modalBeneficios.innerHTML = "";
                info.beneficios.forEach((b) => {
                    const li = document.createElement("li");
                    li.textContent = b;
                    modalBeneficios.appendChild(li);
                });

                modal.style.display = "block";
            }
        });
    });

    const cerrarModal = () => modal.style.display = "none";
    btnCerrar.addEventListener("click", cerrarModal);
   
    window.addEventListener("click", (e) => {
        if (e.target === modal) cerrarModal();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const btnAutodestruir = document.getElementById("btn-autodestruccion");
    const overlay = document.getElementById("contador-overlay");
    const contadorNum = document.getElementById("contador-num");
    const btnCancelar = document.getElementById("cancelar-autodestruccion");

    let cuentaRegresiva;
    let segundos = 10;

    btnAutodestruir.addEventListener("click", () => {
        segundos = 10;
        contadorNum.textContent = segundos;
        overlay.classList.remove("hidden");

        cuentaRegresiva = setInterval(() => {
            segundos--;
            contadorNum.textContent = segundos;

            if (segundos === 0) {
                clearInterval(cuentaRegresiva);
                overlay.classList.add("hidden");

                // Eliminar mitad de elementos visibles del body
                const elementos = Array.from(document.body.children);
                const mitad = Math.floor(elementos.length / 2);

                for (let i = 0; i < mitad; i++) {
                    if (!elementos[i].classList.contains('autodestruct-container') &&
                        !elementos[i].classList.contains('contador-overlay')) {
                        elementos[i].remove();
                    }
                }

                // Desactivar todos los botones restantes
                const botones = document.querySelectorAll("button");
                botones.forEach(b => b.disabled = true);
            }
        }, 1000);
    });

    btnCancelar.addEventListener("click", () => {
        clearInterval(cuentaRegresiva);
        overlay.classList.add("hidden");
    });
});


