CREATE TABLE songs(
  id  SERIAL PRIMARY KEY,
  s3key VARCHAR(255),
  path ltree
);



CREATE TABLE votes (
    song_id INT references songs(song_id),
    user_id INT references users(user_id),
    liked BOOL,
    PRIMARY KEY (song_id, user_id)
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
      name,
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
      ) as total_votes,
      (
        SELECT
            liked
        FROM
            votes
        WHERE
            votes.user_id = 12 AND votes.song_id = songs.song_id     
      ) as liked_by_current_user
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