CREATE TABLE songs(
  id  SERIAL PRIMARY KEY,
  s3key VARCHAR(255),
  path ltree
);
ALTER TABLE links_chatpicmessage 
    ADD COLUMN sender INTEGER 
    REFERENCES auth_user (id);