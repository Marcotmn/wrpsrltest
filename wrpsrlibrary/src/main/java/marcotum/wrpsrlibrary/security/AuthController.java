package marcotum.wrpsrlibrary.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import marcotum.wrpsrlibrary.exceptions.UnauthorizedException;
import marcotum.wrpsrlibrary.users.LoginSuccessfullPayload;
import marcotum.wrpsrlibrary.users.NewUserPayload;
import marcotum.wrpsrlibrary.users.Role;
import marcotum.wrpsrlibrary.users.User;
import marcotum.wrpsrlibrary.users.UserLoginPayload;
import marcotum.wrpsrlibrary.users.UserService;

@RestController
@RequestMapping("/auth")

public class AuthController {

	@Autowired
	UserService userService;

	@Autowired
	JWTTools jwtTools;

	@Autowired
	PasswordEncoder bcrypt;

	// ENDPOINT REGISTRAZIONE USER
	@PostMapping("/register-user")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<String> saveUser(@RequestBody NewUserPayload body) {
		body.setPassword(bcrypt.encode(body.getPassword()));
		userService.save(body, Role.USER);
		System.out.println("Account user registrato");
		return new ResponseEntity<>("L'account 'USER' è stato registrato con successo", HttpStatus.CREATED);

	}

	// ENDPOINT REGISTRAZIONE ADMIN
	@PostMapping("/register-admin")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<String> saveAdmin(@RequestBody NewUserPayload body) {
		body.setPassword(bcrypt.encode(body.getPassword()));
		userService.save(body, Role.ADMIN);
		System.out.println("Account admin registrato");
		return new ResponseEntity<>("L'account 'ADMIN' è stato registrato con successo", HttpStatus.CREATED);

	}

	// ENDPOINT LOGIN
	@PostMapping("/login")
	public LoginSuccessfullPayload login(@RequestBody UserLoginPayload body) {
		User user = userService.findByEmail(body.getEmail());
		if (bcrypt.matches(body.getPassword(), user.getPassword())) {
			String token = jwtTools.createToken(user);
			return new LoginSuccessfullPayload(token);

		} else {
			throw new UnauthorizedException("Credenziali non valide!"); // --> 401
		}

	}

	// ENDPOINT LOGOUT
	@PostMapping("/logout")
	public ResponseEntity<String> logout() {
		return ResponseEntity.ok("Logout effettuato con successo");

	}

}