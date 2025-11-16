package eiu.edu.vn.storyapp_system.service;

import eiu.edu.vn.storyapp_system.model.*;
import eiu.edu.vn.storyapp_system.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChapterService {
    private final ChapterRepository repo;
    private final StoryRepository storyRepo;
    public ChapterService(ChapterRepository repo, StoryRepository storyRepo) { this.repo = repo;
        this.storyRepo = storyRepo;
    }
    public List<Chapter> findByStoryId(Long storyId){
        Story s = storyRepo.getReferenceById(storyId);
        List<Chapter> chapters = s.getChapters();
        return chapters;
    }

    public List<Chapter> getByStory(Long storyId) { return findByStoryId(storyId); }
}
