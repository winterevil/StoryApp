package eiu.edu.vn.storyapp_system.service;

import eiu.edu.vn.storyapp_system.model.Story;
import eiu.edu.vn.storyapp_system.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoryService {

    @Autowired
    private StoryRepository storyRepository;

    public List<Story> getAllStories() {
        return storyRepository.findAll();
    }

    public Story getStoryById(Long id) {
        return storyRepository.findById(id).orElse(null);
    }

    // Lấy danh sách truyện theo category_id
    public List<Story> getStoriesByCategory(Long categoryId) {
        return storyRepository.findByCategoryId(categoryId);
    }
}
