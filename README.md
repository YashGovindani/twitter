# twitter
Spenny Assignment Repository   
### Technology : Node.js  
### Framework : Hapi  
### Databse : MySQL  
## Database Schema  
```
CREATE TABLE user (
user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
name varchar(50) NOT NULL,
email varchar(50) NOT NULL UNIQUE,
username varchar(30) NOT NULL UNIQUE,
password varchar(25) NOT NULL
);

CREATE TABLE follow_mapping ( 
follower_user_id INTEGER NOT NULL, 
following_user_id INTEGER NOT NULL, 
FOREIGN KEY (follower_user_id) REFERENCES user(user_id), 
FOREIGN KEY (following_user_id) REFERENCES user(user_id)
);

CREATE TABLE tweet (
tweet_id INTEGER PRIMARY KEY AUTO_INCREMENT,
data varchar(140) NOT NULL,
upload_date DATE NOT NULL,
upload_time TIME NOT NULL,
user_id INTEGER NOT NULL, 
FOREIGN KEY (user_id) REFERENCES user(user_id)
);
```
### It can scale upto wide features
## Limits  
- Time Complexity for searching tweets which can be easily resolved
- Not used JWT which leads to lacks of security

Note : As it is just an assignment, I have not focused on above limitations which can be easily removed by me.
