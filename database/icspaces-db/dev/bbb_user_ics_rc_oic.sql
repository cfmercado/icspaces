USE icspaces;

CREATE TABLE ics_rc_oic(
    email VARCHAR(50) PRIMARY KEY,
    CONSTRAINT ics_rc_oic_email_fk FOREIGN KEY(email) REFERENCES user(email)
);

--dummy
INSERT INTO ics_rc_oic(email) VALUES('jjkuya@up.edu.ph');