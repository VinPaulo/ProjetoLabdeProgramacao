package br.appweb.appWeb.service;

import br.appweb.appWeb.model.Role;
import br.appweb.appWeb.model.User;
import br.appweb.appWeb.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @SuppressWarnings("null")
    void registerUser_Success() {
        User user = new User("Test User", "test@example.com", "Password123");
        user.setRoles(Set.of(Role.ROLE_USER));

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(any())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User savedUser = Objects.requireNonNull(userService.registerUser(user));

        assertNotNull(savedUser);
        assertEquals("test@example.com", Objects.requireNonNull(savedUser).getEmail());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @SuppressWarnings("null")
    void registerUser_DuplicateEmail_ThrowsException() {
        User user = new User("Test User", "test@example.com", "Password123");

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

        assertThrows(RuntimeException.class, () -> userService.registerUser(user));
    }

    @Test
    @SuppressWarnings("null")
    void authenticate_Success() {
        User user = new User("Test User", "test@example.com", "encodedPassword");
        
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "encodedPassword")).thenReturn(true);

        Optional<User> authenticated = userService.authenticate("test@example.com", "password");

        assertTrue(authenticated.isPresent());
        assertEquals("test@example.com", authenticated.get().getEmail());
    }
}
