package com.buscatumascotandil.find.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@Slf4j
@ConditionalOnProperty(name = "cloudinary.enabled", havingValue = "true", matchIfMissing = false)
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret
    ) {
        if (cloudName == null || cloudName.isEmpty() || 
            apiKey == null || apiKey.isEmpty() || 
            apiSecret == null || apiSecret.isEmpty()) {
            throw new IllegalStateException("Cloudinary credentials are required when cloudinary.enabled=true");
        }
        
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
        log.info("CloudinaryService inicializado correctamente");
    }

    /**
     * Sube una imagen a Cloudinary y retorna la URL pública
     * @param file Archivo de imagen a subir
     * @return URL pública de la imagen en Cloudinary
     */
    public String uploadImage(MultipartFile file) {
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
            // Generar nombre único para la imagen
            String nombreOriginal = file.getOriginalFilename();
            if (nombreOriginal == null || nombreOriginal.isEmpty()) {
                nombreOriginal = "imagen_" + System.currentTimeMillis();
            }

            // Subir a Cloudinary
            Map<String, Object> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "tumascotandil", // Organizar imágenes en una carpeta
                            "public_id", "mascota_" + System.currentTimeMillis(),
                            "resource_type", "auto" // Detecta automáticamente el tipo
                    )
            );

            // Obtener la URL segura (HTTPS)
            String imageUrl = (String) uploadResult.get("secure_url");
            log.info("Imagen subida exitosamente a Cloudinary: {}", imageUrl);
            return imageUrl;

        } catch (IOException e) {
            log.error("Error al subir imagen a Cloudinary: {}", e.getMessage());
            throw new RuntimeException("Error al subir imagen: " + e.getMessage());
        }
    }

    /**
     * Elimina una imagen de Cloudinary usando su URL
     * @param imageUrl URL de la imagen a eliminar
     */
    public void deleteImage(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) {
            return;
        }

        try {
            // Extraer el public_id de la URL
            // Formato: https://res.cloudinary.com/cloudname/image/upload/v1234567890/folder/public_id.jpg
            String publicId = extractPublicIdFromUrl(imageUrl);
            
            if (publicId != null && !publicId.isEmpty()) {
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                log.info("Imagen eliminada de Cloudinary: {}", publicId);
            }
        } catch (Exception e) {
            log.error("Error al eliminar imagen de Cloudinary: {}", e.getMessage());
            // No lanzar excepción para no interrumpir el flujo principal
        }
    }

    /**
     * Extrae el public_id de una URL de Cloudinary
     */
    private String extractPublicIdFromUrl(String url) {
        try {
            // Formato: https://res.cloudinary.com/cloudname/image/upload/v1234567890/folder/public_id.jpg
            // O: https://res.cloudinary.com/cloudname/image/upload/folder/public_id.jpg
            if (url.contains("/upload/")) {
                String[] parts = url.split("/upload/");
                if (parts.length > 1) {
                    String path = parts[1];
                    // Remover el número de versión si existe (v1234567890/)
                    if (path.matches("^v\\d+/.*")) {
                        path = path.substring(path.indexOf('/') + 1);
                    }
                    // Remover la extensión del archivo
                    int lastDot = path.lastIndexOf('.');
                    if (lastDot > 0) {
                        path = path.substring(0, lastDot);
                    }
                    return path;
                }
            }
        } catch (Exception e) {
            log.error("Error al extraer public_id de la URL: {}", e.getMessage());
        }
        return null;
    }
}
