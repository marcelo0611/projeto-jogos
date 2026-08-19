const apiUrl = 'http://localhost:8080/api/jogos';

document.getElementById('form-jogo').addEventListener('submit', function(e) {
    e.preventDefault();
    salvarJogo();
});

async function carregarJogos() {
    try {
        const response = await fetch(apiUrl);
        const jogos = await response.json();
        const tbody = document.querySelector('#tabela-jogos tbody');
        tbody.innerHTML = '';

        jogos.forEach(jogo => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${jogo.id}</td>
                <td>${jogo.titulo}</td>
                <td>${jogo.genero}</td>
                <td>${jogo.horasJogadas}</td>
                <td>${jogo.multijogador ? 'Sim' : 'Não'}</td>
                <td>
                    <button class="btn-editar" onclick="carregarParaEdicao(${jogo.id}, '${jogo.titulo}', '${jogo.genero}', ${jogo.horasJogadas}, ${jogo.multijogador})">Editar</button>
                    <button class="btn-excluir" onclick="deletarJogo(${jogo.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao buscar jogos:', error);
    }
}

async function salvarJogo() {
    const id = document.getElementById('jogo-id').value;
    const titulo = document.getElementById('titulo').value;
    const genero = document.getElementById('genero').value;
    const horasJogadas = document.getElementById('horas').value;
    const multijogador = document.getElementById('multijogador').checked;

    if (horasJogadas < 0) {
        alert("O campo Horas Jogadas não pode ser negativo.");
        return;
    }

    if (genero === 'FPS' && !multijogador) {
        alert("Jogos do gênero FPS devem obrigatoriamente ter o modo Multijogador ativo.");
        return;
    }

    const jogo = { titulo, genero, horasJogadas, multijogador };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jogo)
        });

        if (response.ok) {
            resetarFormulario();
            carregarJogos();
        } else {
            const errorText = await response.text();
            alert(`Erro: ${errorText}`);
        }
    } catch (error) {
        console.error('Erro ao salvar:', error);
    }
}

function carregarParaEdicao(id, titulo, genero, horasJogadas, multijogador) {
    document.getElementById('jogo-id').value = id;
    document.getElementById('titulo').value = titulo;
    document.getElementById('genero').value = genero;
    document.getElementById('horas').value = horasJogadas;
    document.getElementById('multijogador').checked = multijogador;

    document.getElementById('btn-salvar').textContent = 'Atualizar Jogo';
    document.getElementById('btn-cancelar').style.display = 'inline-block';
}

function resetarFormulario() {
    document.getElementById('form-jogo').reset();
    document.getElementById('jogo-id').value = '';
    document.getElementById('btn-salvar').textContent = 'Salvar Jogo';
    document.getElementById('btn-cancelar').style.display = 'none';
}

async function deletarJogo(id) {
    if (confirm('Tem certeza que deseja excluir este jogo?')) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                carregarJogos();
            } else {
                alert('Erro ao excluir jogo.');
            }
        } catch (error) {
            console.error('Erro ao excluir:', error);
        }
    }
}

carregarJogos();