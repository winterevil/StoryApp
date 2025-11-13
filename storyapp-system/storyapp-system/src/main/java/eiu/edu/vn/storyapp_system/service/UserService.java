package eiu.edu.vn.storyapp_system.service;

import eiu.edu.vn.storyapp_system.model.*;
import eiu.edu.vn.storyapp_system.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    private final UserRepository repo;
    public UserService(UserRepository repo) { this.repo = repo; }

    public List<User> getAll() { return repo.findAll(); }
    public User save(User user) { return repo.save(user); }
}
