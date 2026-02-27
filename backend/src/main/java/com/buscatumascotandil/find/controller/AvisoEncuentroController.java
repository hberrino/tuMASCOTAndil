package com.buscatumascotandil.find.controller;

import com.buscatumascotandil.find.dto.AvisoEncuentroRequest;
import com.buscatumascotandil.find.dto.AvisoEncuentroResponse;
import com.buscatumascotandil.find.service.AvisoEncuentroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/avisos-encuentro")
@RequiredArgsConstructor
public class AvisoEncuentroController {

    private final AvisoEncuentroService service;

    @PostMapping
    public ResponseEntity<AvisoEncuentroResponse> crear(@Valid @RequestBody AvisoEncuentroRequest request) {
        AvisoEncuentroResponse response = service.crear(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<AvisoEncuentroResponse>> listarTodos() {
        List<AvisoEncuentroResponse> avisos = service.listarTodos();
        return ResponseEntity.ok(avisos);
    }
}
