package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.utils.JwtUtils;
import com.example.backend.utils.Result;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {


    @Autowired
    private UserMapper userMapper;

    @ApiOperation("获取用户")
    @GetMapping("/{id}")
    public String getUserById(@PathVariable int id) {
        System.out.println(id);
        return "根据ID获取用户信息";
    }

    @PostMapping({"/login"})
    public Result login(@RequestBody User user) {
        String username = user.getUsername();
        String _password = user.getPassword();
        Map<String,Object> map = new HashMap<>();
        map.put("username",username);
        map.put("password",_password);
        List<User> result = userMapper.selectByMap(map);
        if (!result.isEmpty()){
        System.out.println(username);
        String token = JwtUtils.generateToken(username);
        return Result.ok().data("token", token);}
        else{
            return Result.error();
        }
    }


    @ApiOperation("user register")
    @PostMapping("/register")
    public String save(@RequestBody User user) {
        System.out.println(user);
        int sign = userMapper.insert(user);
        if (sign > 0) {
            return "insert successes!";
        } else {
            return "insert failed!";
        }
    }

    @PutMapping("")
    public String update(User user) {
        return "更新用户";
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable int id) {
        System.out.println(id);
        return "根据ID删除用户";
    }
}
