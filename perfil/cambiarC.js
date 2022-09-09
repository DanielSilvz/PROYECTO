const btnSend = document.getElementById("send-petition")

btnSend?.addEventListener("click",async () => {
    console.log("Enviando peticion....")
    const contraseñaInput = document.getElementById("contraseña")
    const cContraseñaInput = document.getElementById("cContraseña")



    if (contraseñaInput.value === "" || cContraseñaInput.value === "" ) {
        alert("Todos los campos tienen que estar llenos")
        return
    }

const dataToSend = {
password: contraseñaInput.value,
confirmPassword: cContraseñaInput.value


}





try {

    const response = await fetch("https://vg-cine-server.herokuapp.com/change-password",
        {
        method: "PUT",
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
                
        title: `Contraseña Cambiada`,
        color: '#895737' ,
        background: '#fff url(https://pixeljoint.com/files/icons/full/cavebackground_w.gif',
        backdrop:`
        rgba(129, 95, 63,0.6)
        `
      })
      
    cContraseñaInput.value = ""
    contraseñaInput.value = ""
    localStorage.setItem('token',token)

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