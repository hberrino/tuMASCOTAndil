package com.buscatumascotandil.find.config;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class DatabaseConfig {

    @Value("${spring.datasource.url:}")
    private String dbUrl;

    @Value("${spring.datasource.username:}")
    private String dbUsername;

    @Value("${spring.datasource.password:}")
    private String dbPassword;

    @PostConstruct
    public void logDatabaseConfig() {
        log.info("========================================");
        log.info("DIAGNÓSTICO: Variables de Base de Datos");
        log.info("========================================");
        log.info("DB_URL (desde env): {}", System.getenv("DB_URL") != null ? "[EXISTE]" : "[NO EXISTE]");
        log.info("DB_USERNAME (desde env): {}", System.getenv("DB_USERNAME") != null ? "[EXISTE]" : "[NO EXISTE]");
        log.info("DB_PASSWORD (desde env): {}", System.getenv("DB_PASSWORD") != null ? "[EXISTE]" : "[NO EXISTE]");
        log.info("");
        log.info("spring.datasource.url: {}", dbUrl != null && !dbUrl.isEmpty() ? maskUrl(dbUrl) : "[VACÍO O NULL]");
        log.info("spring.datasource.username: {}", dbUsername != null && !dbUsername.isEmpty() ? dbUsername : "[VACÍO O NULL]");
        log.info("spring.datasource.password: {}", dbPassword != null && !dbPassword.isEmpty() ? "[CONFIGURADO]" : "[VACÍO O NULL]");
        log.info("========================================");
        
        if (dbUrl == null || dbUrl.isEmpty() || 
            dbUsername == null || dbUsername.isEmpty() || 
            dbPassword == null || dbPassword.isEmpty()) {
            log.error("❌ ERROR: Variables de base de datos no están configuradas correctamente");
            log.error("Verifica en Render que las variables DB_URL, DB_USERNAME y DB_PASSWORD estén configuradas");
        } else {
            log.info("✅ Variables de base de datos detectadas correctamente");
        }
    }
    
    private String maskUrl(String url) {
        if (url == null || url.isEmpty()) {
            return "[VACÍO]";
        }
        if (url.contains("@")) {
            return url.substring(0, url.indexOf("@")) + "@[HOST]";
        }
        return url.length() > 50 ? url.substring(0, 50) + "..." : url;
    }
}
