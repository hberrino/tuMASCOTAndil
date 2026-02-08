package com.buscatumascotandil.find.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts_mascotas")
@Getter
@Setter
public class PostMascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreMascota;

    @Column(length = 1000)
    private String descripcion;

    @Enumerated(EnumType.STRING)
    private EstadoPublicacion estado;

    @Enumerated(EnumType.STRING)
    private TipoPublicacion tipoPublicacion;

    private String zona;

    private LocalDateTime fechaEvento;

    private LocalDateTime fechaCreacion;

    private String imagenUrl;

    private String hashImagen;

    private String ipPublicacion;

    private Integer vistas = 0;

    private Boolean activo = true;

    // recompensa opcional
    private BigDecimal montoRecompensa;

    @Embedded
    private Contacto contacto;

    @PrePersist
    public void prePersist() {
        this.fechaCreacion = LocalDateTime.now();
        if (this.estado == null) {
            this.estado = EstadoPublicacion.PENDIENTE;
        }
    }
}
