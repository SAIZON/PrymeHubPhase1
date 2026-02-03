package com.pryme.loan.config;

import com.pryme.loan.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Enable CORS (uses the bean defined below)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 2. Disable CSRF (Stateless APIs don't need it)
                .csrf(AbstractHttpConfigurer::disable)

                // 3. Security Headers (Protection against Clickjacking, Sniffing, etc.)
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::deny) // Prevents site from being embedded in iframes
                        .xssProtection(HeadersConfigurer.XssConfig::disable) // Modern browsers handle this; disable legacy header
                        .contentSecurityPolicy(csp -> csp.policyDirectives("default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"))
                )

                // 4. Route Authorization
                .authorizeHttpRequests(auth -> auth
                        // Swagger UI
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()

                        // Public Endpoints
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/public/**",
                                "/api/v1/public/**",
                                "/api/v1/calculate/**"
                        ).permitAll()

                        // Admin Endpoints
                        .requestMatchers("/api/admin/**", "/api/v1/admin/**").hasRole("ADMIN")

                        // All other requests require login
                        .anyRequest().authenticated()
                )

                // 5. Session Management (Stateless)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 6. Auth Provider & Filter
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // --- CORS Configuration (The Firewall) ---
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // A. Allowed Origins (Strict List)
        configuration.setAllowedOrigins(List.of(
                "http://localhost:3000",  // Frontend Dev
                "https://pryme.in",       // Production
                "https://www.pryme.in"    // Production (subdomain)
        ));

        // B. Allowed HTTP Methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        // C. Allowed Headers
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));

        // D. Allow Cookies/Auth Tokens
        configuration.setAllowCredentials(true);

        // Apply to all routes
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}