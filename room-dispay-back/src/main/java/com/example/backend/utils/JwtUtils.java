package com.example.backend.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtils {
    private static long expire = 604800L;
    private static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public JwtUtils() {
    }

    public static String generateToken(String username) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 1000L * expire);

        return Jwts.builder().setHeaderParam("type", "JWT").setSubject(username).setIssuedAt(now).setExpiration(expiration)
                .signWith(key,SignatureAlgorithm.HS512).compact();
    }

//    public static Claims getClaimsByToken(String token) {
//        return (Claims)Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
//    }
}