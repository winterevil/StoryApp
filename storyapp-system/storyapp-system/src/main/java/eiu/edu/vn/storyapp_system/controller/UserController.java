package eiu.edu.vn.storyapp_system.controller;

import eiu.edu.vn.storyapp_system.model.*;
import eiu.edu.vn.storyapp_system.service.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;
    public UserController(UserService service) { this.service = service; }

    @GetMapping
    public List<User> getAll() { return service.getAll(); }

    @PostMapping
    public User addUser(@RequestBody User user) { return service.save(user); }
}
