package br.appweb.appWeb.repository;

import br.appweb.appWeb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Standard query derivation
    Optional<User> findByEmail(String email);

    // Boolean check for existence
    boolean existsByEmail(String email);

    // Custom JPQL query example (Senior practice)
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
    Optional<User> findByEmailAndPassword(String email, String password);
}
