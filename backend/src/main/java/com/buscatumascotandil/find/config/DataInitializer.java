package com.buscatumascotandil.find.config;

import com.buscatumascotandil.find.model.Rol;
import com.buscatumascotandil.find.model.Usuario;
import com.buscatumascotandil.find.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.username:admin}")
    private String adminUsername;

    @Value("${app.admin.password:}")
    private String adminPassword;

    @Value("${app.admin.create-on-startup:true}")
    private boolean createAdminOnStartup;

    @Override
    public void run(String... args) {
        // Solo crear admin si está habilitado y no existe
        if (createAdminOnStartup && !usuarioRepository.existsByUsername(adminUsername)) {
            // Si no se proporciona password, usar uno por defecto solo en desarrollo
            String password = adminPassword;
            if (password == null || password.isEmpty()) {
                password = "admin123"; // Solo para desarrollo
                System.out.println("⚠️  ADVERTENCIA: Usando password por defecto. Configura app.admin.password en producción!");
            }

            Usuario admin = new Usuario();
            admin.setUsername(adminUsername);
            admin.setPassword(passwordEncoder.encode(password));
            admin.setRol(Rol.ADMIN);
            admin.setActivo(true);
            usuarioRepository.save(admin);
            
            System.out.println("========================================");
            System.out.println("Usuario ADMIN creado:");
            System.out.println("Username: " + adminUsername);
            if (adminPassword == null || adminPassword.isEmpty()) {
                System.out.println("Password: admin123 (CAMBIAR EN PRODUCCIÓN)");
            } else {
                System.out.println("Password: [configurado desde variables de entorno]");
            }
            System.out.println("========================================");
        }
    }
}
