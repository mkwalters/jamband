CREATE TABLE songs(
  id  SERIAL PRIMARY KEY,
  s3key VARCHAR(255),
  path ltree
);