import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import javax.print.Doc;
import java.util.*;

import static spark.Spark.*;

class LoginDto {
  String username;
  String password;

}

class RegisterDto {
  String username;
  String password;
  String password_confirm;
}

class PaymentsDto {
  String username;
  String username2;
  int amount;
  String notes;
  String type;

  public PaymentsDto(String username, String username2, Integer amount, String notes, String type) {
    this.username = username;
    this.username2 = username2;
    this.amount = amount;
    this.notes = notes;
    this.type = type;
  }
}

class PaymentResponseDto{
  Boolean paymentPossible;
  String error;

  public PaymentResponseDto(Boolean paymentPossible, String error){
    this.paymentPossible = paymentPossible;
    this.error = error;
  }
}

class RegisterResponseDto {
  Boolean isRegistered;
  String error;

  public RegisterResponseDto(Boolean isRegistered, String error) {
    this.isRegistered = isRegistered;
    this.error = error;
  }
}

class LoginResponseDto {
  Boolean isLoggedIn;
  String error;

  public LoginResponseDto(Boolean isLoggedIn, String error) {
    this.isLoggedIn = isLoggedIn;
    this.error = error;
  }
}

public class SparkDemo {
  /**
   * Takes in a username and password and checks if it is in the database.
   * True if it is, false if it isn't.
   * @param username Username to check
   * @param password Password to check
   *
   * @return True if the username and password are in the database, false if they aren't
   */
  private static boolean isValidUser(String username, String password, MongoCollection<Document> collection) {
    FindIterable<Document> iterable = collection.find(new Document("username", username));
    MongoCursor<Document> cursor = iterable.iterator();
    if (cursor.hasNext()) {
      Document doc = cursor.next();
      if (doc.getString("password").equals(password)) {
        System.out.println(doc.toJson());
        return true;
      }
    }
    return false;
  }

  /**
   * Checks just the username to see if it is in the database. Used for Payment username2 checks.
   * @param username Username to check
   * @param collection Collection to check in
   * @return
   */
  private static boolean isValidUser(String username, MongoCollection<Document> collection) {
    FindIterable<Document> iterable = collection.find(new Document("username", username));
    MongoCursor<Document> cursor = iterable.iterator();
    if (cursor.hasNext()) {
      return true;
    }
    System.out.println("code here");
    return false;
  }

    public static void main(String[] args) {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      MongoDatabase db = mongoClient.getDatabase("MyDatabase");
      MongoCollection<Document> usersCollection = db.getCollection("UsersCollection");
      MongoCollection<Document> paymentsCollection = db.getCollection("PaymentsCollection");

      port(1234);
      Gson gson = new Gson();

      post("/logIn", (req, res) -> {
        String body = req.body();
        LoginDto loginDto = gson.fromJson(body, LoginDto.class);
        System.out.println(loginDto.username);

        if (isValidUser(loginDto.username, loginDto.password, usersCollection)) {
          usersCollection.insertOne(new Document()
                  .append("username", loginDto.username)
                  .append("password", loginDto.password));
          return gson.toJson(new LoginResponseDto(true, ""));

        }
        else{
          return gson.toJson(new LoginResponseDto(false, "Invalid password"));
        }
      });

      post("/Register", (req, res) -> {
        String body = req.body();
        System.out.println(body);
        RegisterDto registerDto = gson.fromJson(body, RegisterDto.class);
        boolean check = isValidUser(registerDto.username, usersCollection);
        if (check) {
          return gson.toJson(new RegisterResponseDto(false, "Username already exists"));
        }
        System.out.println(registerDto.username);
        System.out.println(registerDto.password);
        System.out.println(registerDto.password_confirm);
        Document document = new Document()
                .append("username", registerDto.username)
                .append("password", registerDto.password)
                .append("passwordConfirm", registerDto.password_confirm);
        usersCollection.insertOne(document);
        return gson.toJson(new RegisterResponseDto(true, "made new user"));
      });


      post("/Payment", (req, res) -> {
        String body = req.body();
        System.out.println(body);
        PaymentsDto paymentsDto = gson.fromJson(body, PaymentsDto.class);
        System.out.println(paymentsDto.username + " is sending $ " + paymentsDto.amount + " to ");
        if (isValidUser(paymentsDto.username, usersCollection) && isValidUser(paymentsDto.username2, usersCollection)) {
          System.out.println(paymentsDto.username2);
          Document document = new Document()
                  .append("userSending", paymentsDto.username)
                  .append("userReceiving", paymentsDto.username2)
                  .append("Amount", paymentsDto.amount)
                  .append("type", paymentsDto.type)
                  .append("notes", paymentsDto.notes);
          paymentsCollection.insertOne(document);


          // Assuming everything other than username has been checked

          return gson.toJson(new PaymentResponseDto(true, null));
        }
        else return gson.toJson(new PaymentResponseDto(false, "One or more users are not valid"));
      });

      get("/getPayments", (req, res) -> {
        List<PaymentsDto> allPayments = new ArrayList<>();
        MongoCursor<Document> cursor = paymentsCollection.find().iterator();
        try {
          while(cursor.hasNext()) {
            Document doc = cursor.next();
            allPayments.add(new PaymentsDto(doc.getString("userSending"),
                    doc.getString("userReceiving"),
                    doc.getInteger("Amount"),
                    doc.getString("notes"),
                    doc.getString("type")));
          }
        }finally {
          cursor.close();
        }
        return gson.toJson(allPayments);
      });

      get("/LogOut", (req, res) -> {
        return gson.toJson(new LoginResponseDto(false, null));
      });

    }
  }
