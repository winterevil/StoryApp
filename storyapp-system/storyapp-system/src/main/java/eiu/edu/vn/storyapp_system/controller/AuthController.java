package eiu.edu.vn.storyapp_system.controller;

import eiu.edu.vn.storyapp_system.model.User;
import eiu.edu.vn.storyapp_system.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService service;
    public AuthController(UserService service) { this.service = service; }

    @PostMapping("/register")
    public Object register(@RequestBody User user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public Object login(@RequestBody Map<String, String> body) {
        return service.login(body.get("email"), body.get("password"));
    }
}
