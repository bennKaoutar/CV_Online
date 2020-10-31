package io.takima.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendSimpleMailMessage() {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("mendugamvogo@gmail.com");
        msg.setFrom("onlinecv.epfproject@gmail.com");
        msg.setSubject("Testing from Spring Boot");
        msg.setText("Hello World \n Spring Boot Email");

        javaMailSender.send(msg);

    }
    public void setTo(String s) {
    }

    public void setSubject(String testing_from_spring_boot) {
    }

    public void setText(String s) {
    }
}
