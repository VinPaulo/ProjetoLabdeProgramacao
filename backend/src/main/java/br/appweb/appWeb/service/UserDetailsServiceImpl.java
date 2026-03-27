package br.appweb.appWeb.service;

import br.appweb.appWeb.model.User;
import br.appweb.appWeb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired // Injeção de dependência
    UserRepository userRepository;

    @Override
    @Transactional // Transação de banco de dados
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException { // Método que busca o
                                                                                                // usuário pelo email ou
                                                                                                // nome
        User user = userRepository.findByNameOrEmail(identifier, identifier)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Usuario nao encontrado com o email ou nome: " + identifier));

        return user;
    }
}
