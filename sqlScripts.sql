CREATE TABLE songs(
  id  SERIAL PRIMARY KEY,
  s3key VARCHAR(255),
  path ltree
);







 SELECT * FROM songs, users, votes WHERE songs.author = users.user_id and songs.author = votes.song_id;




SELECT * FROM songs, users WHERE songs.author = users.user_id
INNER JOIN votes
ON votes.song_id =  song.song_id;




SELECT *
FROM ((songs
INNER JOIN users ON songs.author = users.user_id)
RIGHT JOIN votes ON songs.song_id = votes.song_id);




SELECT
    *,
    (
        SELECT
            COUNT(*)
        FROM
            votes
        WHERE
            votes.song_id = songs.song_id and votes.liked = true
    ) -
    (
        SELECT
            COUNT(*)
        FROM
            votes
        WHERE
            votes.song_id = songs.song_id and votes.liked = false
    ) as total_votes
FROM
    songs,users
WHERE 
    songs.author = users.user_id
ORDER BY
    (
        SELECT
            COUNT(*)
        FROM
            votes
        WHERE
            votes.song_id = songs.song_id and votes.liked = true
    ) - (
        SELECT
            COUNT(*)
        FROM
            votes
        WHERE
            votes.song_id = songs.song_id and votes.liked = false
    ) DESC;