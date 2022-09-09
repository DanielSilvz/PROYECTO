const btnComprar = document.getElementById("btn-comprar")
console.log(btnComprar);

btnComprar.addEventListener("click",async () => {


    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const response = await fetch (`https://vg-cine-server.herokuapp.com/movie-detail/${params.id}`,
    {
       method: "GET",
       headers:{
       "Content-Type" : "application/json",
       }     
    })    
    const data = await response.json()
    const { value: formValues } = await Swal.fire({
    title: 'Comprando..',
    html:`
      <label for="">Cuantos tiquet comprara?</label>
      <input id="ticket-cant" class="swal2-input"></input> 
      <br>
      <label for="">Metodo de Pago</label>
      <input id="pago" class="swal2-input"></input>
      <br>
      <label for="">Numero de cedula</label>
      <input id="cedula" class="swal2-input"></input>
      <br>
      <label for="">Numero de telefono</label>
      <input id="numero-ref" class="swal2-input"></input>
      `,
    focusConfirm: false,
    preConfirm: async () => {
      return {
        ticketCount: document.getElementById("ticket-cant").value,
        id: document.getElementById("cedula").value,
        movieTitle: data.data.title,
        referenceNumber: document.getElementById("numero-ref").value,
        
    }
    
    }
  })

  console.log(formValues)

  if (formValues) {
    if (formValues.ticketCount === "" || formValues.id === ""  ||
        formValues.movieTitle === "" || formValues.referenceNumber=== "") {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'No llenaste todos los campos',
              })
        return
    }

    const token = localStorage.getItem("token")

    const response = await fetch(`https://vg-cine-server.herokuapp.com/ticket`, {
        method: "POST",
        headers:{
        "Content-Type" : "application/json",
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formValues)
    })
    if(response.status===200){
        console.log("Complete")
        Swal.fire(
            'Transacion Completa!',
            'Su compra se a realizado sin problemas',
            'success'
          )

  }
}
})


const init = async() => {
  
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const portada = document.getElementById("portada")
    const containerinfo = document.getElementById("info-container")
    console.log(params.id)

 const response = await fetch (`https://vg-cine-server.herokuapp.com/movie-detail/${params.id}`,
 {
    method: "GET",
    headers:{
    "Content-Type" : "application/json",
    //"Authorization": "Bearer ${token}"
    }     
 })
  
 const data = await response.json()
 console.log(data)

 const background = document.getElementById("peli-banner")
 background.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${data.data.backdrop_path})`
 background.style.height = "400px"
 background.style.backgroundSize="cover"

 portada.innerHTML = `
 <img src="https://image.tmdb.org/t/p/w500${data.data.poster_path}" alt="">
 <p id="title" class="title-container">
    ${data.data.title}
    </p>
    `
    containerinfo.innerHTML = data.data.overview

}
init()

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