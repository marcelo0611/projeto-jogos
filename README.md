 GameVault - Gerenciador de Acervo Gamer
O GameVault é uma aplicação Full Stack para gerenciamento de biblioteca de jogos. O projeto conta com uma API REST robusta desenvolvida em Spring Boot e uma interface web moderna com estética Gamer/Cyberpunk em HTML, CSS e JavaScript puro, inspirada na exibição de cards de colecionáveis.

 Funcionalidades
CRUD Completo de Jogos:

 Cadastrar: Adicione novos jogos informando título, gênero, horas jogadas, suporte a multijogador e imagem de capa.

 Listar: Visualize seu acervo em formato de cards visuais organizados.

 Editar: Atualize informações de jogos já cadastrados.

 Excluir: Remova jogos do seu acervo com confirmação.

Interface Estilizada:

Layout escuro com efeitos Glow Neon (Cyan/Purple).

Exibição de capas de jogos no estilo Funko Pop / Cards de Coleção.

Sistema de abas para alternar entre a biblioteca e o formulário.

Inteligência Frontend & Regras de Negócio:

Automação de Form: Ao selecionar o gênero FPS, o modo multijogador é ativado automaticamente.

Persistência de Capas: Suporte a URLs de imagens tratadas via LocalStorage, garantindo capas personalizadas sem a necessidade de alterar a estrutura do banco de dados no backend.

Fallback de Imagens: Caso o jogo não possua imagem cadastrada, uma capa padrão é atribuída com base no gênero.

Tecnologias Utilizadas
Backend
Java 17+

Spring Boot (Spring Web, Spring Data JPA)

MySQL (Persistência de dados)

Maven (Gerenciamento de dependências)

Frontend
HTML5 (Estruturação semântica)

CSS3 (Variáveis CSS, Flexbox, CSS Grid, Animações Neon, Design Responsivo)

JavaScript (ES6+) (Fetch API, Manipulação do DOM, LocalStorage)



 Estrutura do Projeto

gamevault/
│
├── backend/                  # Projeto Spring Boot (Java)
│   ├── src/main/java/
│   │   └── com/seuprojeto/
│   │       ├── controller/   # JogoController (Endpoints REST)
│   │       ├── model/        # Jogo (Entidade) e Enums
│   │       ├── repository/   # JogoRepository (JPA)
│   │       └── service/      # Regras de Negócio
│   └── pom.xml               # Dependências do Maven
│
└── frontend/                 # Interface Web
    ├── index.html            # Estrutura e navegação por abas
    ├── style.css             # Estilização Gamer / Neon
    └── script.js             # Consumo da API e manipulação dos Cards


     Como Executar o Projeto
1. Pré-requisitos
JDK 17 ou superior instalado.

IDE (Eclipse, IntelliJ ou VS Code).

Navegador Web moderno.

2. Rodando o Backend (Spring Boot)
Clone ou baixe o repositório do projeto.

Abra o projeto Java na sua IDE de preferência.

Certifique-se de atualizar as dependências do Maven (Alt + F5 no Eclipse).

Execute a classe principal da aplicação (@SpringBootApplication).

O servidor iniciará na porta 8080 (http://localhost:8080/jogos).

3. Rodando o Frontend
Navegue até a pasta frontend.

Abra o arquivo index.html diretamente no seu navegador (ou utilize uma extensão como o Live Server no VS Code).

Pronto! A interface já estará conectada à sua API.
