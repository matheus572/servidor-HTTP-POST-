import express from "express";


const host = "0.0.0.0";
const porta = 3000;
var listaUsuarios = [];

const server = express();

server.use(express.urlencoded({extended: true}));

server.get("/", (requisicao, resposta) => {
    resposta.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Menu do Sistema</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <div class="container mt-4">
                    <h1 class="mb-3">Menu Principal</h1>
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Cadastros</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/cadastroUsuario">Usuários</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/listarUsuarios">Listar Usuários</a>
                        </li>
                    </ul>
                </div>

                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </body>
        </html>
    `);
});

server.get("/cadastroUsuario", (requisicao,resposta) => {
    resposta.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cadastro de Usuário</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
             <body>
                <div class="container mt-4">
                    <h1 class="text-center">Cadastro de Usuários</h1>
                    
                    <form method="POST" action="/adicionarUsuario" class="border p-4 rounded shadow-sm bg-light" novalidate>
                        
                        <div class="mb-3">
                            <label for="nome" class="form-label">Nome</label>
                            <input type="text" id="nome" name="nome" class="form-control" required>
                        </div>

                        <div class="mb-3">
                            <label for="razao" class="form-label">Razão Social</label>
                            <input type="text" id="razao" name="razao" class="form-control" />
                        </div>

                        <div class="mb-3">
                            <label for="fantasia" class="form-label">Nome Fantasia</label>
                            <input type="text" id="fantasia" name="fantasia" class="form-control" />
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" id="email" name="email" class="form-control" />
                        </div>

                        <div class="mb-3">
                            <label for="cnpj" class="form-label">CNPJ</label>
                            <input type="text" id="cnpj" name="cnpj" class="form-control"/>
                        </div>

                        <div class="mb-3">
                            <label for="telefone" class="form-label">Telefone</label>
                            <input type="tel" id="telefone" name="telefone" class="form-control" />
                        </div>

                        <div class="mb-3">
                            <label for="senha" class="form-label">Senha</label>
                            <input type="password" id="senha" name="senha" class="form-control" required/>
                        </div>
                        
                        <div class="d-flex gap-2">
                             <button class="btn btn-primary" type="submit">Cadastrar</button>
                            <a class="btn btn-secondary" href="/">Voltar</a>
                        </div>
                    </form>
                </div>
            </body>
        </html>
    `);
})

server.post('/adicionarUsuario', (requisicao, resposta) => {
    const nome = requisicao.body.nome;
    const razao = requisicao.body.razao;
    const fantasia = requisicao.body.fantasia;
    const email = requisicao.body.email;
    const cnpj = requisicao.body.cnpj;
    const telefone = requisicao.body.telefone;
    const senha = requisicao.body.senha;

    listaUsuarios.push({nome, razao, fantasia, email, cnpj, telefone, senha});
    resposta.redirect("/listarUsuarios");

    });

server.get("/listarUsuarios", (requisicao, resposta) => {
    let conteudo = `
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Lista de usuários</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <div class="container mt-4">
                    <h1>Lista de Usuários</h1>
                    
                    <table class="table table-striped table-hover table-bordered shadow-sm">
                        <thead class="table-dark">
                            <tr>
                                <th>Nome</th>
                                <th>Razão Social</th>
                                <th>Nome Fantasia</th>
                                <th>E-mail</th>
                                <th>CNPJ</th>
                                <th>Telefone</th>
                                <th>Senha</th>
                            </tr>
                        </thead>
                        <tbody>`;
    for (let i = 0; i < listaUsuarios.length; i++) {
         conteudo += `
            <tr>
                <td>${listaUsuarios[i].nome}</td>
                <td>${listaUsuarios[i].razao}</td>
                <td>${listaUsuarios[i].fantasia}</td>
                <td>${listaUsuarios[i].email}</td>
                <td>${listaUsuarios[i].cnpj}</td>
                <td>${listaUsuarios[i].telefone}</td>
                <td>${listaUsuarios[i].senha}</td>
            </tr>
        `;
    }
    conteudo+=`
                        </tbody>
                    </table>
                    <div class="d-flex gap-2 mt-3">
                        <a href="/cadastroUsuario" class="btn btn-primary">Cadastrar Novo Usuário</a>
                        <a href="/" class="btn btn-secondary">Voltar ao Menu</a>
                    </div>
                </div>
            </body>
        </html>
    `
    resposta.send(conteudo);
});

server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`)
});