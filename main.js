// Alterar o texto do balão
const fields = document.querySelectorAll("[required]")

function ValidateField(field){
  // Lógica para verificação de erros
  function verifyErrors() {
    let foundError = false;

    for(let error in field.validity){
      // Se não for customError, então verificar se tem erro
      if(field.validity[error] && !field.validity.valid){
        foundError = error
      }
    }

    return foundError;
  }

  function customMessage(typeError){
    const messages = {
      text: {
        valueMissing: "Campo Obrigatório"
      },
      email: {
        valueMissing: "Email é Obrigatório",
        typeMismatch: "Preencha com um email válido"
      }
    }

    return messages[field.type][typeError]
  }

  function setCustomMessage( message ){
    const spanError = field.parentNode.querySelector("span.error")
    if (message){
      spanError.classList.add('active')
      spanError.innerHTML = message
    } else {
      spanError.classList.remove('active')
      spanError.innerHTML = ""
    }
  }

  return function(){

    const error = verifyErrors()

    if (verifyErrors()) {
      const message = customMessage(error)

      field.style.borderColor = "red"
      setCustomMessage(message)
    } else {
      field.style.borderColor = "green"
      setCustomMessage()
    }
  }
}

// Estrutura de repetição nos campos inválidos (NÃO PREENCHIDOS)

function customValidation(event){

  const field = event.target
  const validation = ValidateField(field)

  validation()


}

for(field of fields) {
  field.addEventListener("invalid", event => {
    // Eliminar balão
    event.preventDefault()

    customValidation(event)
  })
  field.addEventListener("blur", customValidation)
}

// Pegar oo formulário
document.querySelector('form')
  // Adicionar evento (nome + o que vai ocorrer)
  .addEventListener('submit', event => {
    console.log("Enviar formulário")

    // Para não enviar o formulário
    event.preventDefault()
  })