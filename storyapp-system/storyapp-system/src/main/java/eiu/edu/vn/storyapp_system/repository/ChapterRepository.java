package eiu.edu.vn.storyapp_system.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import eiu.edu.vn.storyapp_system.model.*;

import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter, Long> { 
}
