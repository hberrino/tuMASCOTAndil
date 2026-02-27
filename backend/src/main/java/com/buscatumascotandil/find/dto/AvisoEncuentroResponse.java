package com.buscatumascotandil.find.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AvisoEncuentroResponse {
    private Long id;
    private String nombreMascota;
    private LocalDateTime fechaCreacion;
}
