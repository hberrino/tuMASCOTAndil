package com.buscatumascotandil.find.service;

import com.buscatumascotandil.find.dto.AvisoEncuentroRequest;
import com.buscatumascotandil.find.dto.AvisoEncuentroResponse;
import com.buscatumascotandil.find.model.AvisoEncuentro;
import com.buscatumascotandil.find.repository.AvisoEncuentroRepository;
import com.buscatumascotandil.find.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AvisoEncuentroService {

    private final AvisoEncuentroRepository repository;

    public AvisoEncuentroResponse crear(AvisoEncuentroRequest request) {
        AvisoEncuentro aviso = new AvisoEncuentro();
        aviso.setNombreMascota(SecurityUtils.sanitizeInput(request.getNombreMascota()));
        AvisoEncuentro saved = repository.save(aviso);
        return toResponse(saved);
    }

    public List<AvisoEncuentroResponse> listarTodos() {
        return repository.findAllByOrderByFechaCreacionDesc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private AvisoEncuentroResponse toResponse(AvisoEncuentro aviso) {
        return AvisoEncuentroResponse.builder()
                .id(aviso.getId())
                .nombreMascota(aviso.getNombreMascota())
                .fechaCreacion(aviso.getFechaCreacion())
                .build();
    }
}
