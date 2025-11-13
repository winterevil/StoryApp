package eiu.edu.vn.storyapp_system.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import eiu.edu.vn.storyapp_system.model.*;

public interface UserRepository extends JpaRepository<User, Long> { }