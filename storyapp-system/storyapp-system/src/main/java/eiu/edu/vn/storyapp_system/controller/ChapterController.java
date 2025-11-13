package eiu.edu.vn.storyapp_system.controller;

import eiu.edu.vn.storyapp_system.model.*;
import eiu.edu.vn.storyapp_system.service.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/chapters")
public class ChapterController {
    private final ChapterService service;
    public ChapterController(ChapterService service) { this.service = service; }

    @GetMapping("/story/{storyId}")
    public List<Chapter> getByStory(@PathVariable Long storyId) {
        return service.getByStory(storyId);
    }
}
