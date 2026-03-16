package com.travel_mate_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.List;

@Configuration
public class CorsConfig { //Cross-Origin resource Sharing, allows frontend :5173 to call backend API at :8080 (different port so different origin)


    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(List.of("http://localhost:5173"));  //only requests coming from here (frontend) are allowed
        config.addAllowedMethod("*"); //GET, POST, PUT, DELETE ETC
        config.addAllowedHeader("*"); //ex: Content-Type
        source.registerCorsConfiguration("/**", config); //apply to all endpoints (ex: /api/users, /api/trips ...)
        return new CorsFilter(source);
    }
}
