package com.websovellusprojektiR5.R5_RestAPI;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.OpeningHours;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.Restaurant;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.User;
import com.websovellusprojektiR5.R5_RestAPI.Services.RestaurantService;
import com.websovellusprojektiR5.R5_RestAPI.Services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Time;
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

	}

	@Test
	void addOwner(){
		user = new User("Testi",
				"Käyttäjä",
				"joojoo",
				"",
				"Oulu",
				"555666",
				"username4",
				"password",
				0);
		String respond = userService.addUser(user);
		List<User> users = userService.getUsers();
	}

	@Test
	void login(){
		User testUser = userService.login("username2", "testi");
		testUser = userService.login("username2", "password");
	}

	@Test
	void addRestaurant(){
		user = userService.login("username2", "password");
		restaurant = new Restaurant("testirafla2",
				"kaikkea muuta",
				"aaa",
				"bbb",
				2,
				"testitie 1",
				"",
				"Oulu",
				"792384987",
				user.getId(),
				1L);

		String respond = restaurantService.addRestaurant(restaurant);
		List<Restaurant> restaurants = restaurantService.getRestaurants();
	}

	@Test
	void restaurantOpeningHours(){
		int opening_hours = 11;
		int opening_mins = 0;
		int closing_hours = 14;
		int closing_mins = 30;
		String weekday = "Maanantai";
		String respond = restaurantService.editRestaurantHours(3L, weekday,
				opening_hours, opening_mins, closing_hours, closing_mins);
		opening_hours = 8;
		opening_mins = 0;
		closing_hours = 22;
		closing_mins = 00;
		weekday = "Tiistai";
		respond = restaurantService.editRestaurantHours(3L, weekday,
				opening_hours, opening_mins, closing_hours, closing_mins);
		opening_hours = 8;
		opening_mins = 0;
		closing_hours = 22;
		closing_mins = 00;
		weekday = "Keskiviikko";
		respond = restaurantService.editRestaurantHours(3L, weekday,
				opening_hours, opening_mins, closing_hours, closing_mins);
		opening_hours = 8;
		opening_mins = 0;
		closing_hours = 22;
		closing_mins = 00;
		weekday = "Torstai";
		respond = restaurantService.editRestaurantHours(3L, weekday,
				opening_hours, opening_mins, closing_hours, closing_mins);
		opening_hours = 11;
		opening_mins = 0;
		closing_hours = 4;
		closing_mins = 00;
		weekday = "Perjantai";
		respond = restaurantService.editRestaurantHours(3L, weekday,
				opening_hours, opening_mins, closing_hours, closing_mins);
		opening_hours = 18;
		opening_mins = 0;
		closing_hours = 4;
		closing_mins = 00;
		weekday = "Lauantai";
		respond = restaurantService.editRestaurantHours(3L, weekday,
				opening_hours, opening_mins, closing_hours, closing_mins);
		List<OpeningHours> openingHours = restaurantService.openingHours(3L);
	}
}
