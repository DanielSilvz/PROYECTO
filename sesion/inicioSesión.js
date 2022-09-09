const btnSend = document.getElementById("send-petition")

btnSend?.addEventListener("click",async (evt) => {
    console.log("enviando peticion....")
    const emailInput = document.getElementById("email")
    const contraseñaInput = document.getElementById("contraseña")



    if (emailInput.value === "" || contraseñaInput === "" ) {
        alert("Todos los campos tienen que estar llenos")
        return
    }

const dataToSend = {
    "email": emailInput.value,
    "password": contraseñaInput.value
}




try {

    const response = await fetch("https://vg-cine-server.herokuapp.com/login",
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
                
        title: `Inicio de Sesión Completada
                Entrando....`,
        color: '#895737' ,
        background: '#fff url(https://pixeljoint.com/files/icons/full/cavebackground_w.gif',
        backdrop:`
        rgba(129, 95, 63,0.6)
        `

      })
      
    emailInput.value = ""
    contraseñaInput.value= ""
    localStorage.setItem('token',token)

      setTimeout(() => {

          location.href = '/'
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