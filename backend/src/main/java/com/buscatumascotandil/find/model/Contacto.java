package com.buscatumascotandil.find.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class Contacto {

    private String nombreContacto;
    private String telefono;
    private String email;
    private String whatsapp;
}
