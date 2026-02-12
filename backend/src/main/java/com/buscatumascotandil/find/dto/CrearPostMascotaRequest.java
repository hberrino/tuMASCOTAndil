package com.buscatumascotandil.find.dto;

import com.buscatumascotandil.find.model.TipoPublicacion;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CrearPostMascotaRequest {

    @NotBlank(message = "El nombre de la mascota es obligatorio")
    @Size(max = 100, message = "El nombre de la mascota no puede exceder 100 caracteres")
    private String nombreMascota;

    @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
    private String descripcion;

    @NotBlank(message = "La zona es obligatoria")
    @Size(max = 200, message = "La zona no puede exceder 200 caracteres")
    private String zona;

    @NotNull(message = "La fecha del evento es obligatoria")
    private LocalDateTime fechaEvento;

    @DecimalMin(value = "0.0", inclusive = true, message = "La recompensa debe ser mayor o igual a 0")
    private BigDecimal montoRecompensa;

    @NotNull(message = "El tipo de publicación es obligatorio")
    private TipoPublicacion tipoPublicacion;

    @NotBlank(message = "El nombre de contacto es obligatorio")
    @Size(max = 100, message = "El nombre de contacto no puede exceder 100 caracteres")
    private String nombreContacto;

    @NotBlank(message = "El teléfono es obligatorio")
    @Size(max = 20, message = "El teléfono no puede exceder 20 caracteres")
    private String telefono;

    @Email(message = "El email debe tener un formato válido")
    @Size(max = 100, message = "El email no puede exceder 100 caracteres")
    private String email;

    @Size(max = 20, message = "El WhatsApp no puede exceder 20 caracteres")
    private String whatsapp;
}
