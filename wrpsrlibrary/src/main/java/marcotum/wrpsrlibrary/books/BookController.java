package marcotum.wrpsrlibrary.books;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import marcotum.wrpsrlibrary.users.UserService;

@RestController
@RequestMapping("/books")
public class BookController {

	@Autowired
	BookService bookService;
	@Autowired
	UserService userService;

	@GetMapping("/allbooks")
	public List<Book> getBooks() {
		return bookService.getBooks();

	}

	@GetMapping("/{idLibro}")
	public Book findById(@PathVariable UUID idLibro) {
		return bookService.findById(idLibro);

	}

}
