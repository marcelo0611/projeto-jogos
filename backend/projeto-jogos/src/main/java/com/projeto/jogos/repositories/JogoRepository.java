package com.projeto.jogos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.jogos.entities.Jogo;

@Repository
public interface JogoRepository extends JpaRepository<Jogo, Long> {
    
    boolean existsByTituloIgnoreCase(String titulo);

    boolean existsByTituloIgnoreCaseAndIdNot(String titulo, Long id);
}