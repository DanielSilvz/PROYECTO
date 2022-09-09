

const init2 = async() => {

    const iniciarsesion = document.getElementById("nav-login")
    const registrar = document.getElementById("nav-register")
    
registrar.style.display = "none"

    if (localStorage.getItem('token')){
        console.log("Entrando..")
        iniciarsesion.innerHTML = `
        <a style="margin-right: 1rem;" class="nav-link" href="perfil/index.html">Perfil</a>
        `

    }
    else {
        `
        <a style="margin-right: 1rem;" id="nav-register" class="nav-link" href="registro/index.html">Registrarse</a>  
        <a style="margin-right: 1rem;" id="nav-login" class="nav-link" href="sesion/index.html">Iniciar Seccion</a>  
        `
    }
    }
init2()    


const init = async () => {
    try {
        const response = await fetch ("https://vg-cine-server.herokuapp.com/movies?all=false")
        const data = await response.json()
        console.log(data.data)
const posterContainerElement = document.getElementById("img-container")

data.data.forEach( (element)=> {
    posterContainerElement.innerHTML += `
    <a href="infopelicula.html?id=${element.id}">
        <img width="200px" height="300" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
    </a>

    `

} ) 
console.log("init");
} catch(error){
    console.error(error)
}
}
init()

  
