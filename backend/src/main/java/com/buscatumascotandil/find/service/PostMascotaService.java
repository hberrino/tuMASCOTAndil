package com.buscatumascotandil.find.service;

import com.buscatumascotandil.find.dto.CrearPostMascotaRequest;
import com.buscatumascotandil.find.exception.NotFoundException;
import com.buscatumascotandil.find.model.*;
import com.buscatumascotandil.find.repository.PostMascotaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostMascotaService {

    private final PostMascotaRepository repository;
    
    @Autowired(required = false)
    private CloudinaryService cloudinaryService;
    
    @Value("${cloudinary.enabled:false}")
    private boolean cloudinaryEnabled;

    public PostMascota crearDesdeRequest(
            CrearPostMascotaRequest request,
            MultipartFile imagen,
            String ip
    ) {

        PostMascota post = new PostMascota();

        post.setNombreMascota(request.getNombreMascota());
        post.setDescripcion(request.getDescripcion());
        post.setZona(request.getZona());
        post.setFechaEvento(request.getFechaEvento());
        post.setMontoRecompensa(request.getMontoRecompensa());

        Contacto contacto = new Contacto();
        contacto.setNombreContacto(request.getNombreContacto());
        contacto.setTelefono(request.getTelefono());
        contacto.setEmail(request.getEmail());
        contacto.setWhatsapp(request.getWhatsapp());

        post.setContacto(contacto);
        post.setTipoPublicacion(request.getTipoPublicacion());
        post.setEstado(EstadoPublicacion.PENDIENTE);
        post.setIpPublicacion(ip);

        // Usar Cloudinary si está habilitado y disponible, sino guardar localmente
        String imageUrl = (cloudinaryEnabled && cloudinaryService != null)
                ? cloudinaryService.uploadImage(imagen)
                : guardarImagenLocal(imagen);
        post.setImagenUrl(imageUrl);

        return repository.save(post);
    }

    public List<PostMascota> listarPublicados() {
        return repository.findByEstadoAndActivoTrueOrderByFechaCreacionDesc(EstadoPublicacion.PUBLICADO);
    }

    public List<PostMascota> listarPendientes() {
        return repository.findByEstadoAndActivoTrue(EstadoPublicacion.PENDIENTE);
    }

    public PostMascota aprobar(Long id) {
        PostMascota post = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Post no encontrado con id: " + id));
        post.setEstado(EstadoPublicacion.PUBLICADO);
        return repository.save(post);
    }

    public PostMascota rechazar(Long id) {
        PostMascota post = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Post no encontrado con id: " + id));
        post.setEstado(EstadoPublicacion.RECHAZADO);
        return repository.save(post);
    }

    public PostMascota marcarEncontrado(Long id) {
        PostMascota post = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Post no encontrado con id: " + id));
        post.setEstado(EstadoPublicacion.ENCONTRADO);
        post.setActivo(false);
        return repository.save(post);
    }

    public PostMascota obtenerPorId(Long id) {
        PostMascota post = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Post no encontrado con id: " + id));
        
        // Incrementar vistas solo si está publicado
        if (post.getEstado() == EstadoPublicacion.PUBLICADO && post.getActivo()) {
            post.setVistas((post.getVistas() == null ? 0 : post.getVistas()) + 1);
            repository.save(post);
        }
        
        return post;
    }

    public void eliminar(Long id) {
        PostMascota post = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Post no encontrado con id: " + id));
        
        // Soft delete: marcar como inactivo
        post.setActivo(false);
        repository.save(post);
        
        // Eliminar la imagen: Cloudinary o local
        if (post.getImagenUrl() != null && !post.getImagenUrl().isEmpty()) {
            if (cloudinaryEnabled && cloudinaryService != null && post.getImagenUrl().startsWith("http")) {
                // Eliminar de Cloudinary
                cloudinaryService.deleteImage(post.getImagenUrl());
            } else {
                // Eliminar archivo local
                try {
                    String rutaImagen = post.getImagenUrl().replaceFirst("/uploads/", "");
                    Path rutaArchivo = Paths.get("uploads", rutaImagen);
                    if (Files.exists(rutaArchivo)) {
                        Files.delete(rutaArchivo);
                    }
                } catch (IOException e) {
                    // Log el error pero no fallar la eliminación
                    System.err.println("Error al eliminar imagen: " + e.getMessage());
                }
            }
        }
    }

    private String guardarImagenLocal(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("La imagen es obligatoria");
        }

        // Validar tipo de archivo
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new RuntimeException("El archivo debe ser una imagen válida");
        }

        // Validar tamaño (máximo 5MB)
        long maxSize = 5 * 1024 * 1024; // 5MB
        if (file.getSize() > maxSize) {
            throw new RuntimeException("La imagen no puede superar los 5MB");
        }

        try {
            String nombreOriginal = file.getOriginalFilename();
            if (nombreOriginal == null || nombreOriginal.isEmpty()) {
                throw new RuntimeException("El nombre del archivo no es válido");
            }

            // Obtener extensión
            String extension = "";
            int lastDot = nombreOriginal.lastIndexOf('.');
            if (lastDot > 0) {
                extension = nombreOriginal.substring(lastDot);
            }

            // Generar nombre único
            String nombreArchivo = System.currentTimeMillis() + "_" + 
                    nombreOriginal.replaceAll("[^a-zA-Z0-9._-]", "_") + extension;

            Path ruta = Paths.get("uploads");
            Files.createDirectories(ruta);

            Path destino = ruta.resolve(nombreArchivo);
            Files.copy(file.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + nombreArchivo;

        } catch (IOException e) {
            throw new RuntimeException("Error guardando imagen: " + e.getMessage());
        }
    }
}
