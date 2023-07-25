header on
mode column
timer on
CREATE TABLE movies (
  id INTEGER PRIMARY KEY,
  name TEXT DEFAULT NULL,
  year INTEGER DEFAULT NULL,
  rank REAL DEFAULT NULL
);

CREATE TABLE actors (
  id INTEGER PRIMARY KEY,
  first_name TEXT DEFAULT NULL,
  last_name TEXT DEFAULT NULL,
  gender TEXT DEFAULT NULL
);

CREATE TABLE roles (
  actor_id INTEGER,
  movie_id INTEGER,
  role_name TEXT DEFAULT NULL
);

SELECT *
FROM movies
WHERE year = 1990;

SELECT COUNT ()
FROM movies
WHERE year = 1982;

SELECT
FROM actors
WHERE last_name like 'stack';

SELECT COUNT () AS a, first_name ' 'last_name AS  full_name 
FROM actors
GROUP BY first_name, last_name
ORDER BY a desc 
LIMIT 10;

select actors.first_name ' ' actors.last_name as actor, count() as n_of_roles
from roles inner join actors on roles.actor_id = actors.id
group by roles.actor_id
order by n_of_roles desc
limit 100;


SELECT genre, COUNT (*) as movies
FROM movies_genres inner join movies on movies.id = movies_genres.movie_idGROUP BY genre
ORDER BY movies asc;
SELECT first_name, last_name
FROM movies
INNER JOIN roles ON roles.movie_id = movies.id
INNER JOIN actors ON roles.actor_id = actors.id
WHERE movies.name = 'Braveheart' AND movies.year = 1995
ORDER BY actors.last_name;

SELECT directors.first_name , directors.last_name , movies.name , movies.year
FROM movies_directors
JOIN directors
ON movies_directors.director_id = directors.id
JOIN directors_genres
ON movies_directors.director_id = directors_genres.director_id
JOIN movies
ON movies_directors.movie_id = movies.id
JOIN movies_genres
ON movies_directors.movie_id = movies_genres.movie_id
WHERE movies_genres.genre = 'Film-Noir' AND movies.year%4=0
GROUP BY movies.name
ORDER BY movies.name asc;



SELECT m.name , a.first_name , a.last_name
FROM movies AS m
JOIN roles AS r
ON m.id = r.movie_id
JOIN actors AS a
ON a.id = r.actor_id
JOIN movies_genres AS mg
ON m.id = mg.movie_id
WHERE mg.genre = 'Drama' AND a.first_name = 'Kevin' AND a.last_name = 'Bacon'
ORDER BY m.name ASC;

SELECT m.name, a.first_name  " "  a.last_name AS full_name
FROM actors AS a
INNER JOIN roles AS r 
ON r.actor_id = a.id
INNER JOIN movies AS m 
ON r.movie_id = m.id
INNER JOIN movies_genres AS mg 
ON mg.movie_id = m.id
AND mg.genre = 'Drama'
WHERE m.id IN (
SELECT bacon_m.id
FROM movies AS bacon_m
INNER JOIN roles AS bacon_r 
ON bacon_r.movie_id = bacon_m.id
INNER JOIN actors AS bacon_a 
ON bacon_r.actor_id = bacon_a.id
WHERE bacon_a.first_name = 'Kevin'
AND bacon_a.last_name = 'Bacon'
    )
AND full_name != 'Kevin Bacon'
ORDER BY m.name ASC