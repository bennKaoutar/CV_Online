package io.takima.demo.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import io.takima.demo.dao.UserDAO;
import io.takima.demo.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserDAO userDAO;

    public UserController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @GetMapping()
    public List<User> getUsers() {
        Iterable<User> it = this.userDAO.findAll();
        List<User> users = new ArrayList<>();
        it.forEach(e -> users.add(e));

        return users;
    }

    @PostMapping("/login")
    public List<User> checkUser(@RequestBody ObjectNode credentials) {
        String email = credentials.get("email").asText();
        String password = credentials.get("password").asText();
        Iterable<User> it = this.userDAO.findAll();
        List<User> users = new ArrayList<>();
        it.forEach(e -> {
            if (Objects.equals(e.getEmail(), email) && Objects.equals(e.getPassword(), password)){
                users.add(e);
            }
        });
        return users;
    }

    @PostMapping()
    public User addUser(@RequestBody User user) {
        return this.userDAO.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        this.userDAO.deleteById(id);
    }

}
