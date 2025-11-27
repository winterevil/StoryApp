package eiu.edu.vn.storyapp_system.service;

import eiu.edu.vn.storyapp_system.model.Favorite;
import eiu.edu.vn.storyapp_system.model.Story;
import eiu.edu.vn.storyapp_system.model.User;
import eiu.edu.vn.storyapp_system.repository.FavoriteRepository;
import eiu.edu.vn.storyapp_system.repository.StoryRepository;
import eiu.edu.vn.storyapp_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private StoryRepository storyRepo;

    public FavoriteService(FavoriteRepository favoriteRepo, UserRepository userRepo, StoryRepository storyRepo) {
        this.favoriteRepo = favoriteRepo;
        this.userRepo = userRepo;
        this.storyRepo = storyRepo;
    }

    public Map<String, Object> addFavorite(Long userId, Long storyId) {

        User user = userRepo.findById(userId).orElse(null);
        Story story = storyRepo.findById(storyId).orElse(null);

        if (user == null || story == null) {
            return Map.of("error", "User or story not found");
        }

        if (favoriteRepo.existsByUserAndStory(user, story)) {
            return Map.of("message", "Already added to favorite");
        }

        Favorite fav = new Favorite();
        fav.setUser(user);
        fav.setStory(story);
        favoriteRepo.save(fav);

        return Map.of("message", "Added to favorite successfully");
    }

    @Transactional
    public Object removeFavorite(Long userId, Long storyId){
        User user = userRepo.findById(userId).orElse(null);
        Story story = storyRepo.findById(storyId).orElse(null);

        if (user == null || story == null) {
            return "User or Story not found";
        }

        favoriteRepo.deleteByUserAndStory(user, story);
        return "Removed from favorite successfully";
    }

    public List<Favorite> getFavorites(Long userId){
        User  user = userRepo.findById(userId).orElse(null);
        if  (user == null) return null;

        return favoriteRepo.findByUser(user);
    }
}
