//Creo un objeto js que toma las propiedades de un elemento html
class TaskItem extends HTMLElement {
    //Aquí es donde inicializas propiedades y configuraciones para el objeto.
    constructor(){
        //Asegura que la clase que hereda (poder usarlos) de HTMLElement se inicie bien antes de ejecutar
        super()
        this.attachShadow({mode: 'open'});
    }
    //Atributos que quiero tener u observar y que el return me los de
    static get observedAttributes(){
        return ['title', 'description', 'state']
    }
    //Se conecta en el DOM - etiqueta vacia
    connectedCallback(){
        this.render()
    }

    attributeChangedCallback(propName, oldValue, newValue){
        this.render()
        if (oldValue !== newValue) {
            //cuando el propName sea igual a state entonces el nuevo valor es true, si no se deja el nuevo valor
            this[propName] = propName === 'state' ? newValue === 'true' : newValue
            this.render()
        }
    }
//Cambia el estado de la tarea, cuando el estado llegue, se cambia al estado contrario
    toggleTask(){
        this.state = !this.state
        this.render()
    }

    render(){
        this.shadowRoot.innerHTML = 
        // con el li: tambien se puede usar el ternenario en las clases, cuando el estado sea true la tarea tendra la clase completada 
        //y si no tendra una clase de nombre task
        //Luego se le hace el link al css 
        `
        <link rel="stylesheet" href="./src/components/TaskItem/taskItem.css">
        <li class=${this.state ? "completed" : "task"}>
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <p>${!this.state ? "Pendiente" : "Completada"}</p>
            <input type="checkbox" ${this.state ? "checked" : ""} class="task-checkbox">
        </li>
        `
        //checkbox es un elemento html si el estado es falso no esta check pero si lo esta esta "checked"

        
        //se llama al checkbox y se le agrega un evento de cambio para que visualmente se muestren los cambios
        const checkbox = this.shadowRoot.querySelector('.task-checkbox')
        checkbox.addEventListener('change', () => this.toggleTask())
    }
}

customElements.define('task-item', TaskItem)
export default TaskItem