package org.web.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry
    ) {

        Path uploadPath = Paths
                .get("uploads", "pets")
                .toAbsolutePath()
                .normalize();

        try {
            Files.createDirectories(uploadPath);
        } catch (Exception e) {
            throw new RuntimeException(
                    "Unable to create uploads/pets directory",
                    e
            );
        }

        registry
                .addResourceHandler("/uploads/pets/**")
                .addResourceLocations(
                        uploadPath.toUri().toString()
                );
    }
}