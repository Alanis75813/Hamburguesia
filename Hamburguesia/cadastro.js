<script>
function cadastrar(){

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    if(nome === "" || email === "" || senha === ""){
        alert("Preencha todos os campos!");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // verificar se já existe
    let existe = usuarios.find(user => user.email === email);

    if(existe){
        alert("Email já cadastrado!");
        return;
    }

    usuarios.push({ nome, email, senha });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

    // limpar campos
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
}
</s