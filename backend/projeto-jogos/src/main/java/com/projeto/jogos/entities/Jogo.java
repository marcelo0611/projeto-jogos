package com.projeto.jogos.entities;

import com.projeto.jogos.enums.Genero;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tb_jogos")
public class Jogo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // O MySQL vai gerar o ID auto-incrementado
    private Long id;

    @NotBlank
    @Column(name = "tb_titulo", nullable = false, unique = true)
    private String titulo;

    @Enumerated(EnumType.STRING) 
    private Genero genero;

    @Column(name = "tb_horasjogadas", nullable = false)
    private int horasJogadas;

    @NotNull
    @Column(name = "tb_multijogador", nullable = false)
    private Boolean multijogador;

    public Jogo() {
    }

    public Jogo(Long id, String titulo, Genero genero, Integer horasJogadas, Boolean multijogador) {
        this.id = id;
        this.titulo = titulo;
        this.genero = genero;
        this.horasJogadas = horasJogadas;
        this.multijogador = multijogador;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Genero getGenero() {
        return genero;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public Integer getHorasJogadas() {
        return horasJogadas;
    }

    public void setHorasJogadas(Integer horasJogadas) {
        this.horasJogadas = horasJogadas;
    }

    public Boolean getMultijogador() {
        return multijogador;
    }

    public void setMultijogador(Boolean multijogador) {
        this.multijogador = multijogador;
    }
}