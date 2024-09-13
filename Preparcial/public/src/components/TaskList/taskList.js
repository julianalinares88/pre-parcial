import '../TaskItem/taskItem.js'

class TaskList extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
        //Aqui se guardan las tareas
        this.tasks = []
    }

    connectedCallback(){
        this.render()

        const form = this.shadowRoot.querySelector('.task-form')
        form.addEventListener("submit", (e)=>{
            //Para enviar el formulario y que la pagina no se recargueqdf
            e.preventDefault()
        
            //capturar los datos de los inputs y se le agrega el .value para capturar el valor
            const title = this.shadowRoot.querySelector('.input-title').value
            const description = this.shadowRoot.querySelector('.input-description').value

            //Se agregan los datos a la lista, se pone estado falso pq al inicio la tarea no esta hecha 
            this.tasks.push({title, description, state: false})

            //Se llama a la funcion para agregar las tareas pasandole los datos
            this.addTask({title, description, state: false})
            
            //Se resetea los campoes del formulario cuando  se envie 
            form.reset()
        })
    }

    render(){ 
        this.shadowRoot.innerHTML =
        //El required es para que si o si los cmapos deban ser llenados
        `
        <h2>Task List</h2>
        <form class="task-form">
            <input type="text" placeholder="Titulo" class="input-title" required>
            <input type="text" placeholder="Descripcion" class="input-description" required>
            <button>Agregar tarea</button>
        </form>
        <ul class="tasks-container">
        </ul>
        `
        //ul es una lista no ordenada

        //se recorre el arreglo con las tareas que se enviaron para añadirlas al dom 
        this.tasks.forEach(task => this.addTask(task))
    }

    //se crea una funcion para agregar las tareas y mostrarlas en html
    addTask({title, description, state}){
        
        const tasksContainer = this.shadowRoot.querySelector('.tasks-container')
        tasksContainer.innerHTML += `
        <task-item 
            title="${title}" 
            description="${description}" 
            state="${state}"
        ></task-item>
        `
        //Otra forma de agregar las tareas
        // const taskItem = document.createElement('task-item')
        // taskItem.setAttribute('title', title)
        // taskItem.setAttribute('description', description)
        // taskItem.setAttribute('state', state)

        // this.shadowRoot.querySelector('.tasks-container').appendChild(taskItem)

    }
}

customElements.define('task-list', TaskList)
export default TaskList