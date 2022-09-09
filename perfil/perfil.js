const btnSend = document.getElementById("send-petition")

btnSend?.addEventListener("click",async () => {
    console.log("enviando peticion....")
    const nombreInput = document.getElementById("nombre")
    const apellidoInput = document.getElementById("apellido")
    const cedulaInput = document.getElementById("cedula")
    const fechaNInput = document.getElementById("fecha")
    const direccionInput = document.getElementById("direccion")
    const emailInput = document.getElementById("email")




    if (nombreInput.value === ""||apellidoInput.value === ""||
        cedulaInput.value === ""||fechaNInput.value === ""||
        direccionInput.value === "") {
        alert("Todos los campos tienen que estar llenos")
        return
    }

    const dataToSend = {
    firstName: nombreInput.value,
    lastName: apellidoInput.value,
    id: cedulaInput.value,
    address: direccionInput.value,
    birthday: fechaNInput.value 
    }

})

const init = async () => {
    console.log("llamando")
    
    const token = localStorage.getItem("token")

    const response = await fetch("https://vg-cine-server.herokuapp.com/profile",
        {
        method: "GET",
        headers:{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        },

        })
            
    const data = await response.json()

    console.log(data.data)
    const nombreInput = document.getElementById("nombre")
    const apellidoInput = document.getElementById("apellido")
    const cedulaInput = document.getElementById("cedula")
    const fechaNInput = document.getElementById("fecha")
    const direccionInput = document.getElementById("direccion")
    const emailInput = document.getElementById("email")


    nombreInput.value = data.data.firstName
    apellidoInput.value = data.data.lastName
    cedulaInput.value = data.data.id
    direccionInput.value =data.data.address
    emailInput.value = data.data.email

    
    
}


init()