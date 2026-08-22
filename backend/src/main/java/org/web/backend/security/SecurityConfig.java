package org.web.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }


    // =========================================
    // SECURITY FILTER CHAIN
    // =========================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // =========================================
                // CORS
                // =========================================
                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )

                // =========================================
                // CSRF
                // JWT based application
                // =========================================
                .csrf(csrf ->
                        csrf.disable()
                )

                // =========================================
                // SESSION
                // JWT is stateless
                // =========================================
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // =========================================
                // ENDPOINT PERMISSIONS
                // =========================================
                .authorizeHttpRequests(auth -> auth

                        // =====================================
                        // CORS PREFLIGHT
                        // IMPORTANT FOR DELETE / POST / PUT
                        // =====================================
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        // =====================================
                        // REGISTER
                        // =====================================
                        .requestMatchers(
                                "/api/users/register"
                        ).permitAll()

                        // =====================================
                        // LOGIN
                        // =====================================
                        .requestMatchers(
                                "/api/users/login"
                        ).permitAll()

                        // =====================================
                        // PET BROWSING
                        // =====================================
                        .requestMatchers(
                                "/api/pets/**"
                        ).permitAll()

                        // =====================================
                        // UPLOADED PET IMAGES / FILES
                        // =====================================
                        .requestMatchers(
                                "/uploads/**"
                        ).permitAll()

                        // =====================================
                        // WISHLIST
                        // LOGIN REQUIRED
                        // =====================================
                        .requestMatchers(
                                "/api/wishlist/**"
                        ).authenticated()

                        // =====================================
                        // EVERYTHING ELSE
                        // =====================================
                        .anyRequest().authenticated()
                )

                // =========================================
                // JWT FILTER
                // =========================================
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }


    // =========================================
    // PASSWORD ENCODER
    // =========================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }


    // =========================================
    // AUTHENTICATION MANAGER
    // =========================================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();
    }


    // =========================================
    // CORS CONFIGURATION
    // =========================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();


        // =====================================
        // FRONTEND ORIGINS
        // =====================================
        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173",
                        "https://petverse-frontend-8ori.onrender.com"
                )
        );


        // =====================================
        // ALLOWED HTTP METHODS
        // =====================================
        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );


        // =====================================
        // ALLOWED HEADERS
        // =====================================
        configuration.setAllowedHeaders(
                List.of("*")
        );


        // =====================================
        // AUTHORIZATION HEADER / CREDENTIALS
        // =====================================
        configuration.setAllowCredentials(true);


        // =====================================
        // REGISTER CORS CONFIGURATION
        // =====================================
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();


        source.registerCorsConfiguration(
                "/**",
                configuration
        );


        return source;
    }
}