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
        if (createAdminOnStartup) {
            String password = adminPassword;
            if (password == null || password.isEmpty()) {
                password = "admin123";
                System.out.println("ADVERTENCIA: Usando password por defecto. Configura app.admin.password en producción!");
            }

            Usuario admin = usuarioRepository.findByUsername(adminUsername).orElse(null);
            
            if (admin == null) {
                admin = new Usuario();
                admin.setUsername(adminUsername);
                admin.setRol(Rol.ADMIN);
                admin.setActivo(true);
                System.out.println("Usuario ADMIN creado:");
            } else {
                System.out.println("Usuario ADMIN existente - actualizando contraseña:");
            }
            
            admin.setPassword(passwordEncoder.encode(password));
            usuarioRepository.save(admin);
            
            System.out.println("========================================");
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
