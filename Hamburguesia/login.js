function login(){

    let email = document.getElementById("loginEmail").value;
    let senha = document.getElementById("loginSenha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuario = usuarios.find(user => user.email === email && user.senha === senha);

    if(usuario){
        alert("Login realizado!");

        // salvar usuário logado
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        // redirecionar
        window.location.href = "index.html";
    }else{
        alert("Email ou senha inválidos!");
    }
}