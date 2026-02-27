package com.buscatumascotandil.find.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AvisoEncuentroRequest {
    @NotBlank(message = "El nombre de la mascota es obligatorio")
    private String nombreMascota;
}
