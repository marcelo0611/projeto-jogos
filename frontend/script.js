const apiUrl = 'http://localhost:8080/api/jogos';

// Imagens padrão caso o usuário não forneça URL
const imagensPadrao = {
    SANDBOX: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=500&q=80',
    RPG: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80',
    FPS: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80',
    PUZZLE: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=500&q=80'
};

// Alternar entre as abas
function alternarAba(aba) {
    const secaoLista = document.getElementById('secaoLista');
    const secaoCadastro = document.getElementById('secaoCadastro');
    const tabListar = document.getElementById('tabListar');
    const tabCadastrar = document.getElementById('tabCadastrar');

    if (aba === 'lista') {
        secaoLista.classList.remove('hidden');
        secaoCadastro.classList.add('hidden');
        tabListar.classList.add('active');
        tabCadastrar.classList.remove('active');
    } else {
        secaoLista.classList.add('hidden');
        secaoCadastro.classList.remove('hidden');
        tabListar.classList.remove('active');
        tabCadastrar.classList.add('active');
    }
}

// Regra visual automatizada: Se selecionar FPS, ativa o modo multiplayer
document.getElementById('genero').addEventListener('change', function() {
    if (this.value === 'FPS') {
        document.getElementById('multiplayer').checked = true;
    }
});

// Renderizar todos os jogos em formato de CARDS
async function listarJogos() {
    try {
        const resposta = await fetch(apiUrl);
        const jogos = await resposta.json();
        
        const container = document.getElementById('containerJogos');
        container.innerHTML = '';

        if (jogos.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nenhum jogo cadastrado até o momento.</p>';
            return;
        }

        jogos.forEach(jogo => {
            // Busca imagem salva no navegador associada ao ID sem alterar o backend
            const imgSalva = localStorage.getItem(`jogo_img_${jogo.id}`);
            const imgUrl = imgSalva || imagensPadrao[jogo.genero] || imagensPadrao.SANDBOX;

            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <div>
                    <img src="${imgUrl}" alt="${jogo.titulo}" class="game-card-img" onerror="this.src='${imagensPadrao[jogo.genero]}'">
                    <h3 class="game-card-title">${jogo.titulo}</h3>
                    <p class="game-card-info"><strong>Gênero:</strong> ${jogo.genero}</p>
                    <p class="game-card-info"><strong>Horas Jogadas:</strong> ${jogo.horasJogadas}h</p>
                    <p class="game-card-info"><strong>Multiplayer:</strong> ${jogo.possuiMultijogador ? 'Sim' : 'Não'}</p>
                </div>
                
                <div class="game-card-actions">
                    <button class="btn-card btn-editar" onclick="prepararEdicao(${jogo.id}, '${escapeQuotes(jogo.titulo)}', '${jogo.genero}', ${jogo.horasJogadas}, ${jogo.possuiMultijogador})">
                        ✏️ Editar
                    </button>
                    <button class="btn-card btn-excluir" onclick="deletarJogo(${jogo.id})">
                        🗑️ Excluir
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (erro) {
        console.error('Erro ao listar jogos:', erro);
    }
}

// Salvar ou Atualizar Jogo
document.getElementById('formJogo').addEventListener('submit', async function(event) {
    event.preventDefault();

    const id = document.getElementById('jogoId').value;
    const urlImagemInput = document.getElementById('imagemUrl').value;

    const jogoData = {
        titulo: document.getElementById('titulo').value,
        genero: document.getElementById('genero').value,
        horasJogadas: parseInt(document.getElementById('horas').value),
        possuiMultijogador: document.getElementById('multiplayer').checked
    };

    const eEdicao = id !== '';
    const url = eEdicao ? `${apiUrl}/${id}` : apiUrl;
    const metodo = eEdicao ? 'PUT' : 'POST';

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jogoData)
        });

        if (resposta.ok) {
            const jogoSalvo = await resposta.json();
            
            // Salva a imagem localmente associada ao ID
            if (urlImagemInput.trim() !== '') {
                localStorage.setItem(`jogo_img_${jogoSalvo.id}`, urlImagemInput.trim());
            } else if (eEdicao && !urlImagemInput) {
                localStorage.removeItem(`jogo_img_${id}`);
            }

            alert(eEdicao ? 'Jogo atualizado com sucesso!' : 'Jogo cadastrado com sucesso!');
            cancelarEdicao();
            listarJogos();
            alternarAba('lista'); // Muda para a exibição dos cards
        } else {
            const erroMsg = await resposta.text();
            alert('Atenção:\n' + erroMsg);
        }
    } catch (erro) {
        console.error('Erro ao salvar jogo:', erro);
        alert('Erro de conexão com o servidor.');
    }
});

// Prepara o formulário para edição
function prepararEdicao(id, titulo, genero, horas, multiplayer) {
    document.getElementById('jogoId').value = id;
    document.getElementById('titulo').value = titulo;
    document.getElementById('genero').value = genero;
    document.getElementById('horas').value = horas;
    document.getElementById('multiplayer').checked = multiplayer;
    
    const imgSalva = localStorage.getItem(`jogo_img_${id}`) || '';
    document.getElementById('imagemUrl').value = imgSalva;

    document.getElementById('formTitle').innerText = '✏️ Editar Jogo';
    document.getElementById('btnSalvar').querySelector('.btn-text').innerText = 'Atualizar Jogo';
    document.getElementById('btnCancelar').classList.remove('hidden');
    
    alternarAba('cadastro');
}

// Cancela o modo de edição
function cancelarEdicao() {
    document.getElementById('jogoId').value = '';
    document.getElementById('formJogo').reset();
    document.getElementById('formTitle').innerText = '➕ Cadastrar Novo Jogo';
    document.getElementById('btnSalvar').querySelector('.btn-text').innerText = 'Salvar Jogo';
    document.getElementById('btnCancelar').classList.add('hidden');
}

// Deleta um jogo
async function deletarJogo(id) {
    if (confirm(`Tem certeza que deseja remover este jogo?`)) {
        try {
            const resposta = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            
            if (resposta.ok) {
                localStorage.removeItem(`jogo_img_${id}`);
                alert('Jogo removido com sucesso!');
                listarJogos();
            } else {
                alert('Não foi possível remover o jogo.');
            }
        } catch (erro) {
            console.error('Erro ao deletar jogo:', erro);
        }
    }
}

function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Inicialização
listarJogos();