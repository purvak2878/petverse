package org.web.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;


    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService
    ) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {


        // =========================================
        // DEBUG
        // =========================================

        System.out.println(
                "=== JWT REQUEST === " +
                        request.getMethod() +
                        " " +
                        request.getRequestURI()
        );


        final String authHeader =
                request.getHeader("Authorization");


        System.out.println(
                "AUTH HEADER EXISTS: " +
                        (authHeader != null)
        );


        String jwt = null;
        String email = null;


        // =========================================
        // CHECK JWT HEADER
        // =========================================

        if (authHeader != null &&
                authHeader.startsWith("Bearer ")) {

            jwt = authHeader.substring(7);

            try {

                email =
                        jwtService.extractUsername(jwt);


                System.out.println(
                        "JWT EMAIL: " +
                                email
                );


            } catch (Exception e) {

                System.out.println(
                        "Invalid JWT token"
                );

            }
        }


        // =========================================
        // AUTHENTICATE USER
        // =========================================

        if (email != null &&
                SecurityContextHolder
                        .getContext()
                        .getAuthentication() == null) {


            UserDetails userDetails =
                    userDetailsService
                            .loadUserByUsername(email);


            if (jwtService.isTokenValid(
                    jwt,
                    userDetails
            )) {


                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );


                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );


                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);


                // =========================================
                // DEBUG - AUTHENTICATION SUCCESS
                // =========================================

                System.out.println(
                        "AUTHENTICATED AS: " +
                                authentication.getName()
                );

            } else {

                System.out.println(
                        "JWT TOKEN IS NOT VALID"
                );

            }
        }


        // =========================================
        // CONTINUE REQUEST
        // =========================================

        filterChain.doFilter(
                request,
                response
        );
    }
}