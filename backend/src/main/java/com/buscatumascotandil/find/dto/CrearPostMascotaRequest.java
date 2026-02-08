package com.buscatumascotandil.find.dto;

import com.buscatumascotandil.find.model.TipoPublicacion;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CrearPostMascotaRequest {

    @NotBlank(message = "El nombre de la mascota es obligatorio")
    private String nombreMascota;

    private String descripcion;

    @NotBlank(message = "La zona es obligatoria")
    private String zona;

    @NotNull(message = "La fecha del evento es obligatoria")
    private LocalDateTime fechaEvento;

    @DecimalMin(value = "0.0", inclusive = true, message = "La recompensa debe ser mayor o igual a 0")
    private BigDecimal montoRecompensa;

    @NotNull(message = "El tipo de publicación es obligatorio")
    private TipoPublicacion tipoPublicacion;

    @NotBlank(message = "El nombre de contacto es obligatorio")
    private String nombreContacto;

    @NotBlank(message = "El teléfono es obligatorio")
    private String telefono;

    @Email(message = "El email debe tener un formato válido")
    private String email;

    private String whatsapp;
}
