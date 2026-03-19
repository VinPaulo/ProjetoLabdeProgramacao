package br.appweb.appWeb.repository;

import br.appweb.appWeb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email); // Método que busca o usuário pelo email

    Optional<User> findByNameOrEmail(String name, String email);

    boolean existsByEmail(String email); // Método que verifica se o usuário existe

    @Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
    Optional<User> findByEmailAndPassword(String email, String password); // Método que busca o usuário pelo email e
                                                                          // senha
}
