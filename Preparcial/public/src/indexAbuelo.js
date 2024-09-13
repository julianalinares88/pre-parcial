import * as components from './components/indexPadre.js'
//Se crea una nueva etiqueta para usar en html
class AppContainer extends HTMLElement {
//Se inicializa las propiedades y configuraciones de la etiqueta
    constructor(){
//Asegura que la clase que hereda (poder usarlos) de HTMLElement se inicie bien antes de ejecutar - programacion orientada a objetos
        super()//usar elementos de html
        //Encapsular y agregar al DOM (estructura html que se ve en la pagina)
        this.attachShadow({mode: 'open'});
    }
//Ejecutar lo que se le indique
    connectedCallback(){
        this.render()
    }

    render(){
        this.shadowRoot.innerHTML = `
        <h1>App Container</h1>
        <task-list></task-list>
        `
    }
}
//Exporta el componente "container-web" para que pueda ser usado como etiqueta html
customElements.define('app-container', AppContainer)