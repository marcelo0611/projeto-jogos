const apiUrl = 'http://localhost:8080/api/jogos';

// Regra visual automatizada: Se selecionar FPS, ativa o multiplayer automaticamente
document.getElementById('genero').addEventListener('change', function() {
    if (this.value === 'FPS') {
        document.getElementById('multiplayer').checked = true;
    }
});

async function listarJogos() {
    try {
        const resposta = await fetch(apiUrl);
        const jogos = await resposta.json();
        
        const tabela = document.getElementById('tabelaJogos');
        tabela.innerHTML = '';

        jogos.forEach(jogo => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${jogo.id}</td>
                <td><strong>${jogo.titulo}</strong></td>
                <td>${jogo.genero}</td>
                <td>${jogo.horasJogadas}h</td>
                <td>
                    <span class="badge ${jogo.possuiMultijogador ? 'badge-yes' : 'badge-no'}">
                        ${jogo.possuiMultijogador ? 'Sim' : 'Não'}
                    </span>
                </td>
                <td>
                    <button class="action-btn" title="Editar" onclick="prepararEdicao(${jogo.id}, '${escapeQuotes(jogo.titulo)}', '${jogo.genero}', ${jogo.horasJogadas}, ${jogo.possuiMultijogador})">✏️</button>
                    <button class="action-btn" title="Deletar" onclick="deletarJogo(${jogo.id})">🗑️</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    } catch (erro) {
        console.error('Erro ao listar jogos:', erro);
    }
}

document.getElementById('formJogo').addEventListener('submit', async function(event) {
    event.preventDefault();

    const id = document.getElementById('jogoId').value;
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
            alert(eEdicao ? 'Jogo atualizado com sucesso!' : 'Jogo cadastrado com sucesso!');
            cancelarEdicao();
            listarJogos();
        } else {
            const erroMsg = await resposta.text();
            alert('Atenção:\n' + erroMsg);
        }
    } catch (erro) {
        console.error('Erro ao salvar jogo:', erro);
        alert('Erro ao se comunicar com o servidor.');
    }
});

function prepararEdicao(id, titulo, genero, horas, multiplayer) {
    document.getElementById('jogoId').value = id;
    document.getElementById('titulo').value = titulo;
    document.getElementById('genero').value = genero;
    document.getElementById('horas').value = horas;
    document.getElementById('multiplayer').checked = multiplayer;

    document.getElementById('formTitle').innerText = '✏️ Editar Jogo';
    document.getElementById('btnSalvar').querySelector('.btn-text').innerText = 'Atualizar Jogo';
    document.getElementById('btnCancelar').classList.remove('hidden');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelarEdicao() {
    document.getElementById('jogoId').value = '';
    document.getElementById('formJogo').reset();
    document.getElementById('formTitle').innerText = '🎮 Cadastrar Novo Jogo';
    document.getElementById('btnSalvar').querySelector('.btn-text').innerText = 'Salvar Jogo';
    document.getElementById('btnCancelar').classList.add('hidden');
}

async function deletarJogo(id) {
    if (confirm(`Tem certeza que deseja remover o jogo #${id}?`)) {
        try {
            const resposta = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            
            if (resposta.ok) {
                alert('Jogo removido!');
                listarJogos();
            } else {
                alert('Não foi possível deletar o jogo.');
            }
        } catch (erro) {
            console.error('Erro ao deletar jogo:', erro);
        }
    }
}

function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

listarJogos();