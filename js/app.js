// Builder for Seguro
class Seguro{
    constructor(marca, anio, tipo){
        this.marca = marca
        this.anio = anio
        this.tipo = tipo
    }

    cotizarSeguro() {
        const AMERICANO = 1.15
        const ASIATICO = 1.05
        const EUROPEO = 1.35
        const BASICO = 1.30
        const COMPLETO = 1.50
        const base = 2000
        let cantidad
        
        switch (this.marca) {
            case '1':
                cantidad = base * AMERICANO
                break;
            case '2':
                cantidad = base * ASIATICO
                break;
            case '3':
                cantidad = base * EUROPEO
                break;
        }
    
        const diferencia = new Date().getFullYear() - this.anio
        cantidad -= ((diferencia * 3) * cantidad) / 100
    
        if(this.tipo === 'basico') {
            cantidad *= BASICO
        } else {
            cantidad *= COMPLETO
        }
        console.log(cantidad)
        return cantidad
    }
}

// Everything shown
class Interfaz{
    mostrarMensaje(mensaje, tipo){
        const div = document.createElement('div')
        const elementBefore = document.querySelector('.form-group')
        if(tipo === 'error') {
            div.classList.add('mensaje', 'error')
        } else {
            div.classList.add('mensaje', 'correcto')
        }
        div.innerHTML = `${mensaje}`
        formulario.insertBefore(div, elementBefore)
    
        setTimeout(()=>{
            document.querySelector('.mensaje').remove()
        }, 3000)
    }

    mostrarResultado(seguro, total){
        const resultado = document.getElementById('resultado')
        let marca
        switch (seguro.marca) {
            case '1':
                marca = 'Americano'
                break;
            case '2':
                marca = 'Asiatico'
                break;
            case '3':
                marca = 'Europeo'
                break;
        }
        const div = document.createElement('div')
        div.innerHTML = `
            <p class="header">Tu Resumen: </p>
            <p>Marca: ${marca}</p>
            <p>Año: ${seguro.anio}</p>
            <p>Tipo: ${seguro.tipo}</p>
            <p> Total: $ ${total}</p>
        `;
        const spinner = document.querySelector('#cargando img')
        spinner.style.display = 'block'
        setTimeout(() => {
            spinner.style.display = 'none'
            resultado.appendChild(div)
        }, 3000);
    }
}

// Event Listeners
const formulario = document.getElementById('cotizar-seguro')

formulario.addEventListener('submit', (e)=>{
    e.preventDefault()
    const marca = document.getElementById('marca')
    const marcaSeleccionada = marca.options[marca.selectedIndex].value
    const anio = document.getElementById('anio')
    const anioSeleccionado = anio.options[anio.selectedIndex].value
    const tipo = document.querySelector('input[name="tipo"]:checked').value
    const interfaz = new Interfaz()

    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
        interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error')
    } else {
        const resultados = document.querySelector('#resultado div')
        if(resultados != null) {
            resultados.remove()
        }

        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo)
        const cantidad = seguro.cotizarSeguro()

        interfaz.mostrarResultado(seguro, cantidad)
        interfaz.mostrarMensaje('Cotizando...', 'correcto')
    }
})

const max = new Date().getFullYear() 
const min = max - 20
const selectAnios = document.getElementById('anio')

for (let i = max; i > min; i--) {
    let option = document.createElement('option')
    option.value = i
    option.innerHTML = i
    selectAnios.appendChild(option)
    
}