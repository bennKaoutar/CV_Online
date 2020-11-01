package io.takima.demo.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.takima.demo.dao.UserDAO;
import io.takima.demo.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicBoolean;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserDAO userDAO;

    Logger log = LoggerFactory.getLogger(UserController.class);

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

    @GetMapping("/fromcv/{id_cv}")
    public List<User> getUserFromCv(@PathVariable Long id_cv){
        Iterable<User> it = this.userDAO.findAll();
        List<User> users = new ArrayList<>();
        it.forEach(e -> {
            if(Objects.equals(e.getIdCv(), id_cv)){
                users.add(e);
            }
        });
        return users;
    }

    @PostMapping("/login")
    public List<User> checkUser(@RequestBody ObjectNode credentials) {
        String email = credentials.get("email").asText();
        String password = credentials.get("password").asText();

        Iterable<User> it = this.userDAO.findAll();
        List<User> users = new ArrayList<>();
        it.forEach(e -> {
            if (Objects.equals(e.getEmail(), email)){
                byte[] salt = e.getSalt();

                if (salt != null){
                    KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
                    SecretKeyFactory factory = null;
                    try {
                        factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
                        byte[] hash = factory.generateSecret(spec).getEncoded();
                        if (Arrays.equals(e.getHash(), hash)){
                            users.add(e);
                        }
                    } catch (NoSuchAlgorithmException | InvalidKeySpecException noSuchAlgorithmException) {
                        noSuchAlgorithmException.printStackTrace();
                    }
                }
            }
        });
        return users;
    }

    @PostMapping("/signup")
    public ObjectNode createCredentials(@RequestBody ObjectNode credentials) throws NoSuchAlgorithmException, InvalidKeySpecException {
        String email = credentials.get("email").asText();
        String password = credentials.get("password").asText();

        Iterable<User> it = this.userDAO.findAll();
        AtomicBoolean emailExist = new AtomicBoolean(false);
        it.forEach(e -> {
            if (Objects.equals(e.getEmail(), email)){
                emailExist.set(true);
            }
        });

        if (!emailExist.get()){
            SecureRandom random = new SecureRandom();
            byte[] salt = new byte[16];
            random.nextBytes(salt);

            KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            byte[] hash = factory.generateSecret(spec).getEncoded();

            final ObjectMapper mapper = new ObjectMapper();
            final ObjectNode dbCredentials = mapper.createObjectNode();
            dbCredentials.set("hash", mapper.convertValue(hash, JsonNode.class));
            dbCredentials.set("salt", mapper.convertValue(salt, JsonNode.class));

            return dbCredentials;
        } else {
            return null;
        }
    }

    @PostMapping()
    public User addUser(@RequestBody User user) {
        return this.userDAO.save(user);
    }

    @PostMapping("/setpicture/{id}")
    public User setPicture(@RequestBody Long idUser, @PathVariable Long id){
        User userModified = this.userDAO.findById(idUser).get();
        userModified.setIdImage(id);
        return this.userDAO.save(userModified);
    }

    @PostMapping("/setcustom/{id}")
    public User setCustom(@RequestBody Long idUser, @PathVariable Long id){
        User userModified = this.userDAO.findById(idUser).get();
        userModified.setIdCustom(id);
        return this.userDAO.save(userModified);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        this.userDAO.deleteById(id);
    }

}
