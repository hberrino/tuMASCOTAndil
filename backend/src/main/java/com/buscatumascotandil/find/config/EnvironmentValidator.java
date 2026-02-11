package com.buscatumascotandil.find.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.Environment;

@Slf4j
public class EnvironmentValidator implements ApplicationListener<ApplicationEnvironmentPreparedEvent> {

    @Override
    public void onApplicationEvent(ApplicationEnvironmentPreparedEvent event) {
        Environment env = event.getEnvironment();
        
        String dbUrl = env.getProperty("spring.datasource.url");
        String dbUsername = env.getProperty("spring.datasource.username");
        String dbPassword = env.getProperty("spring.datasource.password");
        
        if (dbUrl == null || dbUrl.isEmpty() || 
            dbUsername == null || dbUsername.isEmpty() || 
            dbPassword == null || dbPassword.isEmpty()) {
            
            log.error("========================================");
            log.error("ERROR: Variables de base de datos no configuradas");
            log.error("========================================");
            log.error("DB_URL: {}", dbUrl != null && !dbUrl.isEmpty() ? "[CONFIGURADO]" : "[FALTANTE]");
            log.error("DB_USERNAME: {}", dbUsername != null && !dbUsername.isEmpty() ? "[CONFIGURADO]" : "[FALTANTE]");
            log.error("DB_PASSWORD: {}", dbPassword != null && !dbPassword.isEmpty() ? "[CONFIGURADO]" : "[FALTANTE]");
            log.error("");
            log.error("En Render, configura estas variables en:");
            log.error("Dashboard -> Tu Servicio -> Environment -> Add Environment Variable");
            log.error("");
            log.error("Variables requeridas:");
            log.error("  DB_URL=jdbc:postgresql://TU_HOST:5432/postgres?sslmode=require");
            log.error("  DB_USERNAME=postgres");
            log.error("  DB_PASSWORD=TU_PASSWORD");
            log.error("========================================");
        } else {
            log.info("✅ Variables de base de datos configuradas correctamente");
            log.info("DB_URL: {}", maskUrl(dbUrl));
            log.info("DB_USERNAME: {}", dbUsername);
        }
    }
    
    private String maskUrl(String url) {
        if (url == null || url.isEmpty()) {
            return "[NO CONFIGURADO]";
        }
        if (url.contains("@")) {
            return url.substring(0, url.indexOf("@")) + "@[HOST]";
        }
        return url;
    }
}
