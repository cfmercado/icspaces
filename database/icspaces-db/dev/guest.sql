USE icspaces;

CREATE TABLE guest(
    transaction_id VARCHAR(50) PRIMARY KEY,
    fname VARCHAR(50),
    lname VARCHAR(50)
);

--dummy
INSERT INTO guest(transaction_id, fname, lname) VALUES('e5hkadfhjk', 'Juan', 'Dela Cruz');
INSERT INTO guest(transaction_id, fname, lname) VALUES('efdsa68713', 'Maria', 'Clara');