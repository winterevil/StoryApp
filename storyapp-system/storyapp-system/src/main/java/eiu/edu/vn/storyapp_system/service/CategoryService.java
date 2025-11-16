package eiu.edu.vn.storyapp_system.service;

import eiu.edu.vn.storyapp_system.model.*;
import eiu.edu.vn.storyapp_system.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository repo;
    public CategoryService(CategoryRepository repo) { this.repo = repo; }

    public List<Category> getAll() { return repo.findAll(); }
}
