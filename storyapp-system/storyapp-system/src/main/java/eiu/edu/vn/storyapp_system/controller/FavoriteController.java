package eiu.edu.vn.storyapp_system.controller;

import eiu.edu.vn.storyapp_system.model.Favorite;
import eiu.edu.vn.storyapp_system.model.Story;
import eiu.edu.vn.storyapp_system.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
    @Autowired
    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/add")
    public Map<String, Object> addFavorite(@RequestParam Long userId, @RequestParam Long storyId){
        return favoriteService.addFavorite(userId,storyId);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeFavorite(
            @RequestParam Long userId,
            @RequestParam Long storyId
    ){
        return ResponseEntity.ok(favoriteService.removeFavorite(userId, storyId));
    }

    @Transactional
    @GetMapping("/{userId}")
    public List<Story> getFavorites(@PathVariable Long userId) {
        return favoriteService.getFavorites(userId)
                .stream()
                .map(Favorite::getStory)
                .toList();
    }

}
