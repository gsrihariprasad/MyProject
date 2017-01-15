package com.hcl.MAIN;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.hcl.testng.services.GatewayService;
import com.hello.Application;


@SpringBootApplication(scanBasePackages = { "com" })
// @EnableAutoConfiguration
 @EnableScheduling
public class ApplicationTestng implements CommandLineRunner {
	private static final Logger log = LoggerFactory.getLogger(ApplicationTestng.class);

	public static void main(String[] args) throws Exception {
		SpringApplication.run(ApplicationTestng.class);
	}
	@Autowired
	private GatewayService gatewayService;
	@Autowired
	Application application;
	@Override
	
	public void run(String... args) throws Exception {
		application.runstart();
		//gatewayService.startTestSuiteExecution();
		
	}
	

	public static void getex(){
	
	}
}
