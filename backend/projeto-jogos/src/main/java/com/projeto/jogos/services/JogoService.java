package com.projeto.jogos.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.jogos.entities.Jogo;
import com.projeto.jogos.enums.Genero;
import com.projeto.jogos.repositories.JogoRepository;

@Service
public class JogoService {

    @Autowired
    private JogoRepository jogoRepository;

    public Jogo cadastrarJogo(Jogo jogo) {
        if (jogoRepository.existsByTituloIgnoreCase(jogo.getTitulo())) {
            throw new IllegalArgumentException("Já existe um jogo cadastrado com este título!");
        }

        validarRegrasDeNegocio(jogo);

        return jogoRepository.save(jogo);
    }

    public List<Jogo> listarJogos() {
        return jogoRepository.findAll();
    }

    public Jogo buscarPorId(Long id) {
        return jogoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Jogo não encontrado com o ID: " + id));
    }

    public Jogo atualizarJogo(Long id, Jogo jogoAtualizado) {
        Jogo jogoExistente = buscarPorId(id);

        if (jogoRepository.existsByTituloIgnoreCaseAndIdNot(jogoAtualizado.getTitulo(), id)) {
            throw new IllegalArgumentException("Já existe outro jogo cadastrado com este título!");
        }

        validarRegrasDeNegocio(jogoAtualizado);

        jogoExistente.setTitulo(jogoAtualizado.getTitulo());
        jogoExistente.setGenero(jogoAtualizado.getGenero());
        jogoExistente.setHorasJogadas(jogoAtualizado.getHorasJogadas());
        jogoExistente.setMultijogador(jogoAtualizado.getMultijogador());

        return jogoRepository.save(jogoExistente);
    }

    public void deletarJogo(Long id) {
        Jogo jogo = buscarPorId(id);
        jogoRepository.delete(jogo);
    }

    private void validarRegrasDeNegocio(Jogo jogo) {
        if (jogo.getHorasJogadas() < 0) {
            throw new IllegalArgumentException("O campo Horas Jogadas não pode ser negativo.");
        }

        if (jogo.getGenero() == Genero.FPS && (jogo.getMultijogador() == null || !jogo.getMultijogador())) {
            throw new IllegalArgumentException("Jogos do gênero FPS devem obrigatoriamente ter o modo Multijogador ativo.");
        }
    }
}