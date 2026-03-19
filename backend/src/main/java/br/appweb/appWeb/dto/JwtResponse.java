package br.appweb.appWeb.dto;

public class JwtResponse { // DTO para enviar a resposta JWT
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;

    public JwtResponse() { // Construtor padrão
    }

    public JwtResponse(String accessToken, Long id, String username, String email) { // Construtor com campos
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
    }

    public String getToken() { // Getters e Setters manuais
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
