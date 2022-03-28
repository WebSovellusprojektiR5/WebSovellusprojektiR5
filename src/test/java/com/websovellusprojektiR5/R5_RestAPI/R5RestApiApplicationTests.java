package com.websovellusprojektiR5.R5_RestAPI;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.User;
import com.websovellusprojektiR5.R5_RestAPI.Services.UserService;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONString;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class R5RestApiApplicationTests {

	@Autowired
	UserService userService;
	User user;

	@Test
	void contextLoads() {

		user = new User("Testi",
						"Käyttäjä",
						"joojoo",
						"",
						"Oulu",
						"555666",
						"username2",
						"password",
						0);
		String respond = userService.addRestaurantOwner(user);

		List<User> users= userService.getUsers();

		User testUser = userService.login("username2", "testi");
		testUser = userService.login("username2", "password");
	}

}
