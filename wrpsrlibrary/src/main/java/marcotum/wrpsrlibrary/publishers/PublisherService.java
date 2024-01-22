package marcotum.wrpsrlibrary.publishers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import marcotum.wrpsrlibrary.exceptions.BadRequestException;
import marcotum.wrpsrlibrary.exceptions.NotFoundException;
import marcotum.wrpsrlibrary.users.UserService;

@Service
public class PublisherService {

	@Autowired
	PublisherRepository publisherRepository;

	@Autowired
	UserService userService;

	// METODO PER SALVARE I PUBLISHER
	public Publisher save(NewPublisherPayload body) {
		publisherRepository.findByEditore(body.getEditore()).ifPresent(publisher -> {
			throw new BadRequestException("L'editore è già stato registrato");
		});
		Publisher newPublisher = new Publisher(body.getEditore());
		return publisherRepository.save(newPublisher);

	}

	public Publisher findPublisherByName(String editore) {
		return publisherRepository.findByEditore(editore)
				.orElseThrow(() -> new NotFoundException("Editore non trovato con il nome: " + editore));

	}

}
