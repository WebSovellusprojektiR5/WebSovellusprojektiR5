package com.websovellusprojektiR5.R5_RestAPI.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.User;
import com.websovellusprojektiR5.R5_RestAPI.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class SecurityService {
    @Autowired
    UserService userService;
    @Autowired
    PasswordEncoder pwdEncoder;

    @Value("${jwt.secret}")
    private String jwtSecret;

    public String checkBasicAuthentication(String basicAuthHeader){
        if(!basicAuthHeader.startsWith("Basic") || basicAuthHeader.length() < 6) return null;

        String cred = basicAuthHeader.substring("Basic".length() + 1);
        cred = new String(Base64.getDecoder().decode(cred));

        String[] info = cred.split(":");
        return checkAuthentication(info[0], info[1]);
    }

    public String checkAuthentication(String username, String password) {
        User u = userService.getUserByName(username);
        if (u == null) return null;

        return pwdEncoder.matches(password, u.getPassword()) ? createToken(u) : null;
    }

    public String createToken (User u) {
        Algorithm alg = Algorithm.HMAC256(jwtSecret);
        return JWT.create().withSubject(u.getUsername()).withClaim("role", u.getIdrole()).sign(alg);
    }

    public User validateBearerToken(String bearerHeader){
        if(bearerHeader.startsWith("Bearer") && bearerHeader.length() > 8){
            return this.validateJwt(bearerHeader.substring("Bearer".length() + 1));
        }
        return null;
    }

    public User validateJwt(String jwtToken) {
        Algorithm alg = Algorithm.HMAC256(jwtSecret);
        JWTVerifier verifier = JWT.require(alg).build();

        User u = null;
        try {
            DecodedJWT jwt = verifier.verify(jwtToken);
            u = new User(null, null, null, null, null, null, jwt.getSubject(), null, jwt.getClaim("role").asLong());

        }catch (JWTVerificationException e) {}

        return u;
    }

}
