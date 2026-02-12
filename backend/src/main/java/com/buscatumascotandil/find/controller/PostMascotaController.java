package com.buscatumascotandil.find.controller;

import com.buscatumascotandil.find.dto.CrearPostMascotaRequest;
import com.buscatumascotandil.find.dto.PostMascotaResponse;
import com.buscatumascotandil.find.mapper.PostMascotaMapper;
import com.buscatumascotandil.find.model.PostMascota;
import com.buscatumascotandil.find.service.PostMascotaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostMascotaController {

    private final PostMascotaService service;
    private final ObjectMapper objectMapper;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostMascotaResponse> crearPost(
            @RequestParam("data") String dataJson,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen,
            @RequestParam(value = "image", required = false) MultipartFile image,
            HttpServletRequest httpRequest
    ) {
        MultipartFile archivoImagen = imagen != null ? imagen : image;
        
        if (archivoImagen == null || archivoImagen.isEmpty()) {
            throw new RuntimeException("El campo 'imagen' o 'image' es obligatorio");
        }
        
        CrearPostMascotaRequest request;
        try {
            request = objectMapper.readValue(dataJson, CrearPostMascotaRequest.class);
        } catch (Exception e) {
            throw new RuntimeException("Error al procesar los datos enviados");
        }

        PostMascota post = service.crearDesdeRequest(
                request,
                archivoImagen,
                httpRequest.getRemoteAddr()
        );
        return ResponseEntity.ok(PostMascotaMapper.toResponse(post));
    }

    @GetMapping
    public ResponseEntity<List<PostMascotaResponse>> listarPublicados() {
        List<PostMascotaResponse> response = service.listarPublicados().stream()
                .map(PostMascotaMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostMascotaResponse> obtenerPorId(@PathVariable Long id) {
        PostMascota post = service.obtenerPorId(id);
        return ResponseEntity.ok(PostMascotaMapper.toResponse(post));
    }

    @GetMapping("/pendientes")
    public ResponseEntity<List<PostMascotaResponse>> listarPendientes() {
        List<PostMascotaResponse> response = service.listarPendientes().stream()
                .map(PostMascotaMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/aprobar")
    public ResponseEntity<PostMascotaResponse> aprobar(@PathVariable Long id) {
        PostMascota post = service.aprobar(id);
        return ResponseEntity.ok(PostMascotaMapper.toResponse(post));
    }

    @PatchMapping("/{id}/rechazar")
    public ResponseEntity<PostMascotaResponse> rechazar(@PathVariable Long id) {
        PostMascota post = service.rechazar(id);
        return ResponseEntity.ok(PostMascotaMapper.toResponse(post));
    }
    
    @GetMapping("/admin/pendientes")
    public ResponseEntity<List<PostMascotaResponse>> listarPendientesAdmin() {
        return listarPendientes();
    }

    @PatchMapping("/admin/{id}/aprobar")
    public ResponseEntity<PostMascotaResponse> aprobarAdmin(@PathVariable Long id) {
        return aprobar(id);
    }

    @PatchMapping("/admin/{id}/rechazar")
    public ResponseEntity<PostMascotaResponse> rechazarAdmin(@PathVariable Long id) {
        return rechazar(id);
    }

    @PatchMapping("/{id}/encontrado")
    public ResponseEntity<PostMascotaResponse> encontrado(@PathVariable Long id) {
        PostMascota post = service.marcarEncontrado(id);
        return ResponseEntity.ok(PostMascotaMapper.toResponse(post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
