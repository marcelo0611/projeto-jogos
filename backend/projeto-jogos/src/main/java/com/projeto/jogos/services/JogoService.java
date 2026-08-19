package com.projeto.jogos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.jogos.entities.Jogo;
import com.projeto.jogos.repositories.JogoRepository;

@Service
public class JogoService {

    @Autowired
    private JogoRepository jogoRepository;

    public List<Jogo> listarTodos() {
        return jogoRepository.findAll();
    }

    public Optional<Jogo> buscarPorId(Long id) {
        return jogoRepository.findById(id);
    }

    public Jogo salvar(Jogo jogo) {
        validarRegrasDeNegocio(jogo, null);
        return jogoRepository.save(jogo);
    }

    public Jogo atualizar(Long id, Jogo jogoAtualizado) {
        return jogoRepository.findById(id).map(jogoExistente -> {
            validarRegrasDeNegocio(jogoAtualizado, id);
            
            jogoExistente.setTitulo(jogoAtualizado.getTitulo());
            jogoExistente.setGenero(jogoAtualizado.getGenero());
            jogoExistente.setHorasJogadas(jogoAtualizado.getHorasJogadas());
            jogoExistente.setPossuiMultijogador(jogoAtualizado.getPossuiMultijogador());
            
            return jogoRepository.save(jogoExistente);
        }).orElseThrow(() -> new IllegalArgumentException("Jogo não encontrado."));
    }

    public void deletar(Long id) {
        jogoRepository.deleteById(id);
    }

    private void validarRegrasDeNegocio(Jogo jogo, Long idAtual) {
        if (jogo.getGenero().name().equals("FPS") && !jogo.getPossuiMultijogador()) {
            throw new IllegalArgumentException("Jogos do gênero FPS devem obrigatoriamente possuir modo multijogador.");
        }

        boolean tituloExiste = jogoRepository.existsByTituloIgnoreCase(jogo.getTitulo());
        if (tituloExiste) {
            if (idAtual == null) {
                throw new IllegalArgumentException("Já existe um jogo cadastrado com este título.");
            } else {
                Jogo jogoExistente = jogoRepository.findAll().stream()
                        .filter(j -> j.getTitulo().equalsIgnoreCase(jogo.getTitulo()))
                        .findFirst().orElse(null);
                        
                if (jogoExistente != null && !jogoExistente.getId().equals(idAtual)) {
                    throw new IllegalArgumentException("Já existe outro jogo cadastrado com este título.");
                }
            }
        }
    }
}