package com.websovellusprojektiR5.R5_RestAPI;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.Restaurant;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.User;
import com.websovellusprojektiR5.R5_RestAPI.Services.RestaurantService;
import com.websovellusprojektiR5.R5_RestAPI.Services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class R5RestApiApplicationTests {

	@Autowired
	UserService userService;
	User user;
	@Autowired
	RestaurantService restaurantService;
	Restaurant restaurant;

	@Test
	void contextLoads() {

		user = new User("Testi",
				"Käyttäjä",
				"joojoo",
				"",
				"Oulu",
				"555666",
				"username4",
				"password",
				1);
		String respond = userService.addRestaurantOwner(user);

		List<User> users = userService.getUsers();

		User testUser = userService.login("username2", "testi");
		testUser = userService.login("username2", "password");

		restaurant = new Restaurant("testirafla",
				"kaikkea kivaa",
				"aaa",
				"bbb",
				2,
				"testitie 1",
				"",
				"Oulu",
				"792384987",
				testUser.getId(),
				1L);

		respond = restaurantService.addRestaurant(restaurant);
		List<Restaurant> restaurants = restaurantService.getRestaurants();

	}
}
