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
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tb_jogos")
public class Jogo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O título do jogo é obrigatório.")
    @Column(unique = true)
    private String titulo;

    @NotNull(message = "O gênero é obrigatório.")
    @Enumerated(EnumType.STRING)
    private Genero genero;

    @NotNull(message = "As horas jogadas não podem ser nulas.")
    @Min(value = 0, message = "As horas jogadas não podem receber valores negativos.")
    private Integer horasJogadas;

    @NotNull(message = "Informe se o jogo possui multijogador.")
    private Boolean possuiMultijogador;

    // Getters e Setters (Gere-os na sua IDE)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public Genero getGenero() { return genero; }
    public void setGenero(Genero genero) { this.genero = genero; }
    public Integer getHorasJogadas() { return horasJogadas; }
    public void setHorasJogadas(Integer horasJogadas) { this.horasJogadas = horasJogadas; }
    public Boolean getPossuiMultijogador() { return possuiMultijogador; }
    public void setPossuiMultijogador(Boolean possuiMultijogador) { this.possuiMultijogador = possuiMultijogador; }
}