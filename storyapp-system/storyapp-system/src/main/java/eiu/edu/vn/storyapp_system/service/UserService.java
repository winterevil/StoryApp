package eiu.edu.vn.storyapp_system.service;

import eiu.edu.vn.storyapp_system.model.User;
import eiu.edu.vn.storyapp_system.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private final String SECRET_KEY = "NHUNG_CON_CA_SE_PHAI_TRA_GIO_2025";

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getAll() {
        return repo.findAll();
    }

    public User save(User user) {
        return repo.save(user);
    }

    public Object register(User user) {

        // Check email tồn tại
        if (repo.existsByEmail(user.getEmail())) {
            return Map.of("error", "Email already exists");
        }

        // Set username = email
        user.setUsername(user.getEmail());

        // Hash password
        user.setPassword(encoder.encode(user.getPassword()));

        // Lưu user
        repo.save(user);

        return Map.of(
                "message", "User registered successfully",
                "email", user.getEmail(),
                "full_name", user.getFull_name()
        );
    }


    public Object login(String email, String rawPassword) {

        User user = repo.findByEmail(email);

        if (user == null) {
            return Map.of("error", "Email not found");
        }

        if (!encoder.matches(rawPassword, user.getPassword())) {
            return Map.of("error", "Incorrect password");
        }

        String token = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))  // 1 day
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())
                .compact();

        return Map.of(
                "id", user.getId(),
                "token", token,
                "email", user.getEmail(),
                "username", user.getUsername(),
                "full_name", user.getFull_name()
        );
    }

    public User getById(Long id) {
        return repo.findById(id)
                .orElse(null);
    }

    public Map<String, Object> updateUser(Long id, Map<String, Object> body) {

        Optional<User> optional = repo.findById(id);
        if (optional.isEmpty()) {
            return Map.of("error", "User not found");
        }

        User user = optional.get();

        user.setFull_name((String) body.get("full_name"));
        user.setEmail((String) body.get("email"));
        user.setUsername((String) body.get("email"));

        if (body.containsKey("old_password")) {

            String oldPassword = (String) body.get("old_password");
            String newPassword = (String) body.get("new_password");

            if (!encoder.matches(oldPassword, user.getPassword())) {
                return Map.of("error", "Old password is incorrect");
            }

            user.setPassword(encoder.encode(newPassword));
            repo.save(user);

            return Map.of(
                    "message", "Password updated",
                    "logout", true
            );
        }

        repo.save(user);

        return Map.of(
                "message", "Profile updated successfully",
                "logout", false
        );
    }

}
