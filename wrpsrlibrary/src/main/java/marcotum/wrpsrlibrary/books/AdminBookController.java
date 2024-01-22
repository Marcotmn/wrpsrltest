package marcotum.wrpsrlibrary.books;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import marcotum.wrpsrlibrary.users.UserService;

@RestController
@RequestMapping("/admin")
public class AdminBookController {

	@Autowired
	BookService bookService;
	@Autowired
	UserService userService;

	@PostMapping("/upload-libro")
	public ResponseEntity<String> registerBook(@RequestBody NewBookPayload payload) {
		bookService.save(payload);
		return new ResponseEntity<>("Il libro è stato caricato con successo", HttpStatus.CREATED);
	}

	@DeleteMapping("/cancella-libro/{idLibro}")
	@ResponseStatus(HttpStatus.OK) // --> 200 OK
	public ResponseEntity<String> deleteBook(@PathVariable UUID idLibro) {
		bookService.findByIdAndDelete(idLibro);
		return new ResponseEntity<String>("Il Libro è stato eliminato con successo!", HttpStatus.OK);
	}

	@PutMapping("/modifica-libro/{idLibro}")
	@ResponseStatus(HttpStatus.OK) // --> 200 OK
	public ResponseEntity<String> updateBook(@PathVariable UUID idLibro, @RequestBody NewBookPayload body) {
		bookService.findByIdAndUpdate(idLibro, body);
		return new ResponseEntity<>("Il Libro è stato modificato con successo!", HttpStatus.OK);

	}

}
