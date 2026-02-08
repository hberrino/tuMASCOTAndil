package com.buscatumascotandil.find.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.*;

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
            // Si hay variable de entorno, usar esa + localhost para desarrollo
            String[] origins = allowedOrigins.split(",");
            registration.allowedOrigins(origins);
        } else {
            // Por defecto: solo localhost (desarrollo)
            registration.allowedOrigins("http://localhost:5173", "http://localhost:3000");
        }
    }
}
