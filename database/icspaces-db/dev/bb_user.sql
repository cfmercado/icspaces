USE icspaces;

CREATE TABLE user(
    email VARCHAR(50) NOT NULL PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    usertype INT NOT NULL, -- 0 for student, 1 for faculty, 2 for oic, 3 for director
    profilePicUrl VARCHAR(255) DEFAULT NULL,
    isFirstTimeLogin BOOLEAN DEFAULT TRUE
);

-- Dummy data
INSERT INTO user(email, fname, lname, usertype, profilePicUrl, isFirstTimeLogin) VALUES('ajsantiago@up.edu.ph', 'Aini Jimielle', 'Santiago' , 0, NULL, TRUE);
INSERT INTO user(email, fname, lname, usertype, profilePicUrl, isFirstTimeLogin) VALUES('arigor@up.edu.ph', 'Aira' , 'Rigor' , 0 ,NULL,TRUE);
INSERT INTO user(email, fname, lname, usertype, profilePicUrl, isFirstTimeLogin) VALUES('asilva@up.edu.ph', 'Alex' , 'Silva',0,NULL,TRUE);
INSERT INTO user(email, fname, lname, usertype, profilePicUrl, isFirstTimeLogin) VALUES('ddoffemaria@up.edu.ph','Dominique Denise','Offemaria',1,NULL,TRUE);
INSERT INTO user(email, fname, lname, usertype, profilePicUrl, isFirstTimeLogin) VALUES('dabutardo@up.edu.ph','Dennise April','Butardo',1,NULL,TRUE);
INSERT INTO user(email, fname, lname, usertype, profilePicUrl, isFirstTimeLogin) VALUES('hyang@up.edu.ph','Heewon','Yang',1,NULL,TRUE);
INSERT INTO user(email, fname, lname, usertype, profilePicUrl, isFirstTimeLogin) VALUES('jjkuya@up.edu.ph', 'Kuya', 'Jj', 2, NULL, TRUE);
INSERT INTO user(email, fname, lname, usertype, profilePicUrl, isFirstTimeLogin) VALUES('maandoc@up.edu.ph', 'Doc', 'Maan', 3, NULL, TRUE);