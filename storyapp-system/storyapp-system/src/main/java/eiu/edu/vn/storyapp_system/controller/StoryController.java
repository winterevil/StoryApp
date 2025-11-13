package eiu.edu.vn.storyapp_system.controller;

import eiu.edu.vn.storyapp_system.model.Story;
import eiu.edu.vn.storyapp_system.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stories")
@CrossOrigin(origins = "*")
public class StoryController {

    @Autowired
    private StoryService storyService;

    // ✅ Lấy tất cả truyện
    @GetMapping
    public List<Story> getAllStories() {
        return storyService.getAllStories();
    }

    // ✅ Lấy truyện theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Story> getStoryById(@PathVariable Long id) {
        Story story = storyService.getStoryById(id);
        return story != null ? ResponseEntity.ok(story) : ResponseEntity.notFound().build();
    }

    // ✅ Thêm API lấy truyện theo thể loại
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Story>> getStoriesByCategory(@PathVariable Long categoryId) {
        List<Story> stories = storyService.getStoriesByCategory(categoryId);
        if (stories.isEmpty()) {
            return ResponseEntity.notFound().build(); // Không có truyện nào trong thể loại
        }
        return ResponseEntity.ok(stories);
    }
}
