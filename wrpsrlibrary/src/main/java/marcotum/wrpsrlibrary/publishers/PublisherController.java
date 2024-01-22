package marcotum.wrpsrlibrary.publishers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import marcotum.wrpsrlibrary.users.UserService;

@RestController
@RequestMapping("/publishers")
public class PublisherController {

	@Autowired
	PublisherService publisherService;
	@Autowired
	UserService userService;

	@PostMapping("/upload-publisher")
	public ResponseEntity<String> registerPublisher(@RequestBody NewPublisherPayload payload) {
		publisherService.save(payload);
		return new ResponseEntity<>("Il publisher è stato caricato con successo", HttpStatus.CREATED);

	}

}
