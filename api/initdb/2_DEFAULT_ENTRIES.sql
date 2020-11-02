## This user is created ONLY to see a CV in the public view. To check SignIn please create through the web site interface a new user.

INSERT INTO defaultdb.users(id, first_name, last_name, age, email, hash, salt, id_cv, id_custom) VALUES (1, 'Paul', 'POIROT', 37, 'paul2135@gmail.com', '6546846584', 'uyfvul565', 1, 1);

INSERT INTO defaultdb.cvs (id, user, education, experience, skills, languages, activities, git) VALUES (1, 'Paul POIROT', 'EPF - Ecole ingenieur generaliste', 'DTU - internship', 'C++, Kotlin', 'Francais, Anglais, Allemand, Italien', 'Swimming', 'https://github.com/bennKaoutar/CV_Online');

INSERT INTO defaultdb.custom(id, banner, titles) VALUES (1, '#96c582', '#3f7a89');
