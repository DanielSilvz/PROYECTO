const btnSend = document.getElementById("send-petition")

btnSend?.addEventListener("click",async () => {
    console.log("enviando peticion....")
    const nombreInput = document.getElementById("nombre")
    const apellidoInput = document.getElementById("apellido")
    const cedulaInput = document.getElementById("cedula")
    const fechaNInput = document.getElementById("fecha")
    const direccionInput = document.getElementById("direccion")
    const emailInput = document.getElementById("email")
    const contraseñaInput = document.getElementById("contraseña")



    if (nombreInput.value === ""||apellidoInput.value === ""||
        cedulaInput.value === ""||fechaNInput.value === ""||
        direccionInput.value === ""||emailInput.value === ""||
         contraseñaInput.value === "" ) {
        alert("Todos los campos tienen que estar llenos")
        return
    }

const dataToSend = {
firstName: nombreInput.value,
lastName: apellidoInput.value,
id: cedulaInput.value,
address: direccionInput.value,
birthday: fechaNInput.value ,
email: emailInput.value ,
password: contraseñaInput.value
}





try {

    const response = await fetch("https://vg-cine-server.herokuapp.com/register",
        {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(dataToSend)

        })
            
    const data = await response.json()
    console.log(data.answer)

    if (response.status === 200) {
        
        const token = data.token


    Swal.fire({
                
        title: `Registro Completado
                Entrando....`,
        color: '#895737' ,
        background: '#fff url(https://pixeljoint.com/files/icons/full/cavebackground_w.gif',
        backdrop:`
        rgba(129, 95, 63,0.6)
        `
      })
      
    nombreInput.value = "" 
    apellidoInput.value = "" 
    cedulaInput.value = "" 
    fechaNInput.value = "" 
    direccionInput.value = "" 
    emailInput.value = "" 
    contraseñaInput.value = ""
    // localStorage.setItem('token',token)

      setTimeout(() => {

          location.href = "/"
      }, 5000)

} else {
    Swal.fire({
                
        title: data.error,
        color: '#895737' ,
        background: '#fff url(https://pixeljoint.com/files/icons/full/cavebackground_w.gif',
        backdrop:`
        rgba(129, 95, 63,0.6)
        `
        
        
      })
    }
    

} catch(error) {
    alert(error)
}
})
