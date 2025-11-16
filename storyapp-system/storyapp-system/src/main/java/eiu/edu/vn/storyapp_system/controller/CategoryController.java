package eiu.edu.vn.storyapp_system.controller;

import eiu.edu.vn.storyapp_system.model.*;
import eiu.edu.vn.storyapp_system.service.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService service;
    public CategoryController(CategoryService service) { this.service = service; }

    @GetMapping
    public List<Category> getAll() { return service.getAll(); }
}
