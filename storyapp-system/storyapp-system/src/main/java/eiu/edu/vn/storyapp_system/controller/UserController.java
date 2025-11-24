package eiu.edu.vn.storyapp_system.controller;

import eiu.edu.vn.storyapp_system.model.*;
import eiu.edu.vn.storyapp_system.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;
    public UserController(UserService service) { this.service = service; }

    @GetMapping
    public List<User> getAll() { return service.getAll(); }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(service.register(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        User user = service.getById(id);

        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
        }

        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        return ResponseEntity.ok(service.updateUser(id, user));
    }

}
