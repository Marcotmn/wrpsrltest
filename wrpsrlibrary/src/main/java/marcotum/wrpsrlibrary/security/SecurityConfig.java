package marcotum.wrpsrlibrary.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	JWTAuthFilter jwtFilter;

	@Autowired
	MyCorsFilter corsFilter;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(c -> c.disable());

		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		http.addFilterBefore(corsFilter, JWTAuthFilter.class);

		http.authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**").permitAll());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/admin/**").hasRole("ADMIN"));
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/users/**").authenticated());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/publishers/**").hasRole("ADMIN"));
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/books/**").authenticated());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/mylibrary/**").authenticated());

		return http.build();

	}

	// BCRYPT PER L'HASHING DELLE PASSWORD
	@Bean
	PasswordEncoder encoder() {
		return new BCryptPasswordEncoder(11); // 11 è IL NUMERO DI ROUNDS, QUANTE VOLTE VIENE ESEGUITO L'ALGORITMO;
	}

}