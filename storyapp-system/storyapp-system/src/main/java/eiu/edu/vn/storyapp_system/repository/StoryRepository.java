package eiu.edu.vn.storyapp_system.repository;

import eiu.edu.vn.storyapp_system.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    // Thêm query để lọc truyện theo category_id
    List<Story> findByCategoryId(Long categoryId);
}
