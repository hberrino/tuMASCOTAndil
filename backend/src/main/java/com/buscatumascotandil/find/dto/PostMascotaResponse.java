package com.buscatumascotandil.find.dto;

import com.buscatumascotandil.find.model.EstadoPublicacion;
import com.buscatumascotandil.find.model.TipoPublicacion;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class PostMascotaResponse {

    private Long id;
    private String nombreMascota;
    private String descripcion;
    private String zona;
    private LocalDateTime fechaEvento;
    private LocalDateTime fechaCreacion;
    private String imagenUrl;

    private String nombreContacto;
    private String telefono;
    private String email;
    private String whatsapp;

    private BigDecimal montoRecompensa;

    private EstadoPublicacion estado;
    private TipoPublicacion tipoPublicacion;
    
    private Integer vistas;
}
