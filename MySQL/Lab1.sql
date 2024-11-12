-- 1. Display all the records from the ACTOR table.
select * from actor;
-- 2. Display the first name and last name of all actors.
SELECT first_name, last_name FROM actor;
-- 3. Display the total number of actors in the ACTOR table.
SELECT COUNT(*) as total_actors FROM actor;
-- 4. Display the first name of actors whose last name is 'GUINESS'.
SELECT first_name from actor
WHERE last_name = 'GUINESS';
-- 5. Display the first name and last name of actors, sorted by first name in ascending order.
SELECT first_name, last_name from actor
ORDER BY first_name ASC;
-- 6. Display the first name and last name of actors, sorted by last name in descending order.
SELECT first_name, last_name from actor
ORDER BY last_name DESC;
-- 7. Display the first name and last name of actors whose first name starts with 'A'.
SELECT first_name, last_name from actor
WHERE first_name LIKE 'A%';
-- 8. Display the first name and last name of actors whose first name is 4 characters long.
select first_name, last_name from actor
where LENGTH(first_name) = 4;
-- 9. Display the first name and last name of actors whose last name ends with 'y' and is 5 characters long.
SELECT first_name, last_name from actor
WHERE last_name LIKE '%y' AND LENGTH(last_name) = 5;
-- 10. Display the first name and last name of actors whose first name is 'KENNETH' and actor_id is less than 100.
SELECT first_name, last_name from actor
WHERE first_name = 'KENNETH' AND actor_id < 100;
-- 11. Display the first name and last name of actors whose last name is the same as the first name of actor 'CUBA'.
SELECT first_name, last_name FROM actor
WHERE last_name IN (SELECT last_name FROM actor WHERE first_name = 'CUBA');
-- 12. Display the first name and last name of actors whose actor_id is in the set (5, 15, 23, 32, 45).
SELECT first_name, last_name FROM actor
WHERE actor_id IN (5, 15, 23, 32, 45);
-- 13. Display the first name and last name of actors whose actor_id is not in the set (1, 3, 7, 4).
SELECT first_name, last_name FROM actor
WHERE actor_id NOT IN (1, 3, 7, 4);
-- 14. Display the first name and last name of actors whose last name is 'OLIVIER', 'ALLEN', or 'BIRCH', sorted by actor_id in ascending order.
SELECT first_name, last_name FROM actor
WHERE last_name IN ('OLIVIER', 'ALLEN', 'BIRCH') ORDER BY actor_id ASC;
-- 15. Display the first name and last name of actors whose first name is 'KENNETH' and actor_id is less than 100 and last name ends with 'I' or 'W'.
SELECT first_name, last_name FROM actor
WHERE first_name = 'KENNETH' AND actor_id < 100 AND (last_name LIKE '%I' OR last_name LIKE '%w');
-- 16. Display the total number of distinct first names in the ACTOR table.
SELECT COUNT(DISTINCT first_name) FROM actor;
-- 17. Display the total number of actors whose first name is 'NICK'.
SELECT COUNT(*) FROM actor
WHERE first_name = 'NICK';
-- 18. Display the total number of actors whose actor_id is between 1 and 5.
SELECT COUNT(*) FROM actor
WHERE actor_id BETWEEN 1 AND 5;
-- 19. Display the total number of actors whose actor_id is not between 1 and 5.
SELECT COUNT(*) FROM actor
WHERE actor_id NOT BETWEEN 1 AND 5;
-- 20. Display the total number of actors whose first name starts with 'A'.
SELECT COUNT(*) FROM actor
WHERE first_name like('A%');
-- 21. Display the first name and last name of actors, with the first name in uppercase.
SELECT UPPER(first_name), last_name FROM actor;
-- 22. Display the first name and last name of actors, with the last name in lowercase.
SELECT first_name, LOWER(last_name) FROM actor;
-- 23. Display the first name and last name of actors, with the first two characters of the first name.
SELECT LEFT(first_name, 2), last_name FROM actor;
-- 24. Display the first name and last name of actors, with the first name reversed.
SELECT REVERSE(first_name), last_name FROM actor;
-- 25. Display the first name and last name of actors, with the full name in the format 'LAST_NAME, FIRST_NAME'.
SELECT CONCAT(first_name, ',' , last_name) FROM actor;
