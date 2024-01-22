package marcotum.wrpsrlibrary.books;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
	Optional<Book> findByTitolo(String titolo);

	boolean existsByTitolo(String nuovoTitolo);

}
