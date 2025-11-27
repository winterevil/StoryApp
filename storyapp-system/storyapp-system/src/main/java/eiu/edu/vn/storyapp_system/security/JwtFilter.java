package eiu.edu.vn.storyapp_system.security;
import eiu.edu.vn.storyapp_system.model.User;
import eiu.edu.vn.storyapp_system.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import java.io.IOException;


@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private UserRepository userRepo;

    private final String SECRET_KEY = "NHUNG_CON_CA_SE_PHAI_TRA_GIO_2025";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(SECRET_KEY.getBytes())
                        .parseClaimsJws(token)
                        .getBody();

                String email = claims.getSubject();

                User user = userRepo.findByEmail(email);
                if (user != null) {
                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    user, null, null);

                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
            catch (Exception ex) {
                System.out.println("JWT INVALID: " + ex.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}
