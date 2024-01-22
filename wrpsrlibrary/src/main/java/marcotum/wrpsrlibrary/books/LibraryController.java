package marcotum.wrpsrlibrary.books;

import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mylibrary")
public class LibraryController {

	@Autowired
	BookService bookService;

	// ENDPOINT PER VISUALIZZARE LA LIBRERIA PERSONALE
	@GetMapping("/elenco")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Set<Book>> getMyLibrary() {
		Set<Book> userLibrary = bookService.getLibrary();
		return ResponseEntity.ok(userLibrary);

	}

	// ENDPOINT PER AGGIUNGERE UN LIBRO ALLA LIBRERIA PERSONALE
	@PostMapping("/aggiungi/{idLibro}")
	@ResponseStatus(HttpStatus.CREATED) // --> 201
	public ResponseEntity<String> addBookToMyLibrary(@PathVariable UUID idLibro) {
		bookService.addBookToMyLibrary(idLibro);
		return new ResponseEntity<>("Il libro è stato aggiunto alla tua lista", HttpStatus.CREATED);

	}

	// ENDPOINT PER RIMUOVERE UN LIBRO DALLA LIBRERIA PERSONALE
	@DeleteMapping("/cancella/{idLibro}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<String> removeBookFromMyLibrary(@PathVariable UUID idLibro) {
		bookService.removeBookFromMyLibrary(idLibro);
		return new ResponseEntity<>("Il libro è stato rimosso correttamente", HttpStatus.OK);

	}

}
