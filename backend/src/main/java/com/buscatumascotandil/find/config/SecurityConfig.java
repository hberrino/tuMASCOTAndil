package com.buscatumascotandil.find.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.buscatumascotandil.find.model.Usuario;
import com.buscatumascotandil.find.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UsuarioRepository usuarioRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        return username -> {
            Usuario usuario = usuarioRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
            
            if (!usuario.getActivo()) {
                throw new UsernameNotFoundException("Usuario inactivo: " + username);
            }

            return User.builder()
                    .username(usuario.getUsername())
                    .password(usuario.getPassword())
                    .roles(usuario.getRol().name())
                    .build();
        };
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(false);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        // Endpoints públicos (sin login requerido)
                        .requestMatchers(HttpMethod.GET, "/posts").permitAll() // GET /posts (listar publicados)
                        .requestMatchers(HttpMethod.POST, "/posts").permitAll() // POST /posts (crear)
                        .requestMatchers(HttpMethod.GET, "/posts/{id}").permitAll() // GET /posts/{id} (ver detalles)
                        .requestMatchers("/uploads/**").permitAll() // Imágenes
                        .requestMatchers("/h2-console/**").permitAll() // H2 Console
                        // Endpoints de admin (requieren autenticación como ADMIN)
                        .requestMatchers("/posts/pendientes").hasRole("ADMIN")
                        .requestMatchers("/posts/{id}/aprobar").hasRole("ADMIN")
                        .requestMatchers("/posts/{id}/rechazar").hasRole("ADMIN")
                        .requestMatchers("/posts/{id}/encontrado").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/posts/{id}").hasRole("ADMIN") // DELETE /posts/{id} requiere admin
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .anyRequest().denyAll() // Todo lo demás denegado
                )
                .httpBasic(httpBasic -> {}) // Solo para endpoints de admin
                .headers(headers -> headers.frameOptions(frame -> frame.disable())); // Para H2 console

        return http.build();
    }
}
