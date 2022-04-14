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

		Restaurant respond = restaurantService.addRestaurant(restaurant);
		List<Restaurant> restaurants = restaurantService.getRestaurants();
	}

	@Test
	void restaurantOpeningHours(Long restaurantID){
		List<OpeningHours> openingHours = restaurantService.openingHours(restaurantID);
	}

	@Test
	void updateUser(){
		User user = userService.getUserByID(7L);
		user.setCity("Tampere");
		user.setUsername("joopajoo7");
		String respond = userService.editUser(user);
		List<User> users = userService.getUsers();
	}

	@Test
	void deleteUser(){
		String respond = userService.deleteUser(4L);
		List<User> users = userService.getUsers();
	}
}
