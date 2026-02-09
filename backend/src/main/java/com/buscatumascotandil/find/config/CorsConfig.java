package com.buscatumascotandil.find.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.*;

@Slf4j
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${cors.allowed.origins:}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        CorsRegistration registration = registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);

        // En desarrollo: localhost
        // En producción: desde variable de entorno
        if (StringUtils.hasText(allowedOrigins)) {
            // Si hay variable de entorno, usar esa
            String[] origins = allowedOrigins.split(",");
            // Limpiar espacios en blanco
            for (int i = 0; i < origins.length; i++) {
                origins[i] = origins[i].trim();
            }
            registration.allowedOrigins(origins);
            log.info("CORS configurado con orígenes permitidos: {}", String.join(", ", origins));
        } else {
            // Por defecto: solo localhost (desarrollo)
            registration.allowedOrigins("http://localhost:5173", "http://localhost:3000");
            log.info("CORS usando configuración por defecto (localhost) - Variable CORS_ALLOWED_ORIGINS no configurada");
        }
    }
}
