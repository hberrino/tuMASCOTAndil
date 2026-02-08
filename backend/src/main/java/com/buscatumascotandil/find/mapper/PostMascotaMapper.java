package com.buscatumascotandil.find.mapper;

import com.buscatumascotandil.find.dto.PostMascotaResponse;
import com.buscatumascotandil.find.model.PostMascota;

public class PostMascotaMapper {

    public static PostMascotaResponse toResponse(PostMascota post) {
        if (post == null) {
            return null;
        }

        return PostMascotaResponse.builder()
                .id(post.getId())
                .nombreMascota(post.getNombreMascota())
                .descripcion(post.getDescripcion())
                .zona(post.getZona())
                .imagenUrl(post.getImagenUrl())
                .fechaEvento(post.getFechaEvento())
                .fechaCreacion(post.getFechaCreacion())
                .estado(post.getEstado())
                .tipoPublicacion(post.getTipoPublicacion())
                .montoRecompensa(post.getMontoRecompensa())
                .vistas(post.getVistas() != null ? post.getVistas() : 0)
                .nombreContacto(post.getContacto() != null ? post.getContacto().getNombreContacto() : null)
                .telefono(post.getContacto() != null ? post.getContacto().getTelefono() : null)
                .email(post.getContacto() != null ? post.getContacto().getEmail() : null)
                .whatsapp(post.getContacto() != null ? post.getContacto().getWhatsapp() : null)
                .build();
    }
}
