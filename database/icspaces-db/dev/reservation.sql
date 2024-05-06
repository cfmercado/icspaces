USE icspaces;

CREATE TABLE reservation(
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    activity_name VARCHAR(50) NOT NULL,
    room_id INT,
    user_id VARCHAR(50) NOT NULL,
    date_created DATETIME DEFAULT NOW(),
    start_datetime DATETIME DEFAULT NOW(),
    end_datetime DATETIME DEFAULT NOW(),
    discount DECIMAL(10,2) NOT NULL,
    additional_fee DECIMAL(10,2) NOT NULL,
    total_amount_due DECIMAL(10,2) NOT NULL,
    status_code INT DEFAULT 0, -- 0 for pending, 1 for payment, 2 for approved, 3 for rejected, 4 for cancelled
    CONSTRAINT reservation_room_id_fk FOREIGN KEY(room_id) REFERENCES room(room_id),
    CONSTRAINT reservation_user_id_fk FOREIGN KEY(user_id) REFERENCES user(email)
);

CREATE TABLE file(
    file_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT,
    file_path VARCHAR(255) NOT NULL,
    date_created DATETIME DEFAULT NOW(),
    UNIQUE(file_path), -- to prevent duplicate files
    CONSTRAINT file_reservation_id_fk FOREIGN KEY(reservation_id) REFERENCES reservation(reservation_id)
);

CREATE TABLE comment(
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT,
    user_id VARCHAR(50) NOT NULL,
    comment_text VARCHAR(255) NOT NULL,
    date_created DATETIME DEFAULT NOW(),
    CONSTRAINT comment_reservation_id_fk FOREIGN KEY(reservation_id) REFERENCES reservation(reservation_id),
    CONSTRAINT comment_user_id_fk FOREIGN KEY(user_id) REFERENCES user(email)
);

--dummy
INSERT INTO reservation(activity_name, room_id, user_id, start_datetime, end_datetime, discount, additional_fee, total_amount_due, status_code) VALUES('ICS 123', 1, 'ajsantiago@up.edu.ph', '2020-12-01 08:00:00', '2020-12-01 10:00:00', 0.00, 0.00, 5000.00, 0);
INSERT INTO reservation(activity_name, room_id, user_id, start_datetime, end_datetime, discount, additional_fee, total_amount_due, status_code) VALUES('ICS 124', 2, 'ddoffemaria@up.edu.ph', '2020-12-01 08:00:00', '2020-12-01 10:00:00', 0.00, 0.00, 3000.00, 0);