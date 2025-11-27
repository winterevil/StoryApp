package eiu.edu.vn.storyapp_system.repository;

import eiu.edu.vn.storyapp_system.model.Favorite;
import eiu.edu.vn.storyapp_system.model.Story;
import eiu.edu.vn.storyapp_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite,Long> {
    List<Favorite> findByUser(User user);
    boolean existsByUserAndStory(User user, Story story);
    void deleteByUserAndStory(User user, Story story);
}
