CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,bornAt DATE,img TEXT);
INSERT or IGNORE INTO user VALUES (1, 'Simon', '12-12-1994', 'https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg');
INSERT or IGNORE INTO user VALUES (2, 'Max', '12-12-1994', 'https://pbs.twimg.com/profile_images/953978653624455170/j91_AYfd_400x400.jpg');
INSERT or IGNORE INTO user VALUES (3, 'Ben', '12-12-1994', 'https://pbs.twimg.com/profile_images/1060037170688417792/vZ7iAWXV_400x400.jpg');

CREATE TABLE IF NOT EXISTS etudiant(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,email varchar(100),contact varchar(100),age integer,pdp text,etat integer);
INSERT or IGNORE INTO etudiant VALUES (1, 'Simon', 'simon@ecole.mg','033 43 233 22', 23, 'https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg',1);
INSERT or IGNORE INTO etudiant VALUES (2, 'Max', 'MAx@ecole.mg','033 43 233 24', 24, 'https://pbs.twimg.com/profile_images/953978653624455170/j91_AYfd_400x400.jpg',1);
INSERT or IGNORE INTO etudiant VALUES (3, 'Ben', 'Ben@ecole.mg','033 43 233 25', 25, 'https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg',1);

