
// This file contains the code for the stored procedures (RPC functions)
// These functions are used to retrieve trading ideas from the database

/*
-- Function to select trading ideas with profiles ordered by date (latest)
CREATE OR REPLACE FUNCTION select_trading_ideas_by_date()
RETURNS SETOF json AS $$
BEGIN
  RETURN QUERY
  SELECT json_build_object(
    'id', ti.id,
    'title', ti.title,
    'description', ti.description,
    'image_url', ti.image_url,
    'slug', ti.slug,
    'created_at', ti.created_at,
    'likes', ti.likes,
    'comments', ti.comments,
    'profiles', (
      SELECT json_build_object('email', p.email)
      FROM profiles p
      WHERE p.id = ti.author_id
    )
  )
  FROM trading_ideas ti
  WHERE ti.published = true
  ORDER BY ti.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to select trading ideas with profiles ordered by likes
CREATE OR REPLACE FUNCTION select_trading_ideas_by_likes()
RETURNS SETOF json AS $$
BEGIN
  RETURN QUERY
  SELECT json_build_object(
    'id', ti.id,
    'title', ti.title,
    'description', ti.description,
    'image_url', ti.image_url,
    'slug', ti.slug,
    'created_at', ti.created_at,
    'likes', ti.likes,
    'comments', ti.comments,
    'profiles', (
      SELECT json_build_object('email', p.email)
      FROM profiles p
      WHERE p.id = ti.author_id
    )
  )
  FROM trading_ideas ti
  WHERE ti.published = true
  ORDER BY ti.likes DESC, ti.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to select trending trading ideas (combination of recency and popularity)
CREATE OR REPLACE FUNCTION select_trading_ideas_trending()
RETURNS SETOF json AS $$
BEGIN
  RETURN QUERY
  SELECT json_build_object(
    'id', ti.id,
    'title', ti.title,
    'description', ti.description,
    'image_url', ti.image_url,
    'slug', ti.slug,
    'created_at', ti.created_at,
    'likes', ti.likes,
    'comments', ti.comments,
    'profiles', (
      SELECT json_build_object('email', p.email)
      FROM profiles p
      WHERE p.id = ti.author_id
    )
  )
  FROM trading_ideas ti
  WHERE ti.published = true
  ORDER BY (ti.likes * 0.7) + (ti.comments * 0.3) DESC, ti.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Default function to select all trading ideas with profiles
CREATE OR REPLACE FUNCTION select_trading_ideas()
RETURNS SETOF json AS $$
BEGIN
  RETURN QUERY
  SELECT json_build_object(
    'id', ti.id,
    'title', ti.title,
    'description', ti.description,
    'image_url', ti.image_url,
    'slug', ti.slug,
    'created_at', ti.created_at,
    'likes', ti.likes,
    'comments', ti.comments,
    'profiles', (
      SELECT json_build_object('email', p.email)
      FROM profiles p
      WHERE p.id = ti.author_id
    )
  )
  FROM trading_ideas ti
  WHERE ti.published = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get a specific trading idea by slug
CREATE OR REPLACE FUNCTION get_trading_idea_by_slug(slug_param TEXT)
RETURNS json AS $$
DECLARE
  idea_json json;
BEGIN
  SELECT json_build_object(
    'id', ti.id,
    'title', ti.title,
    'description', ti.description,
    'image_url', ti.image_url,
    'slug', ti.slug,
    'created_at', ti.created_at,
    'likes', ti.likes,
    'comments', ti.comments,
    'profiles', (
      SELECT json_build_object('email', p.email)
      FROM profiles p
      WHERE p.id = ti.author_id
    )
  ) INTO idea_json
  FROM trading_ideas ti
  WHERE ti.slug = slug_param AND ti.published = true;
  
  RETURN idea_json;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
*/
