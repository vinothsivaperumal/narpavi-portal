-- Migration: 001_initial_schema
-- Description: Initial database schema for Tech2High Bootcamp Portal
-- Run: psql -h localhost -U user -d narpavi_db -f 001_initial_schema.sql

-- This migration is equivalent to the base schema.sql
-- See /database/schema.sql for the full schema definition.

-- Migration tracking table
CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO migrations (name) VALUES ('001_initial_schema')
ON CONFLICT DO NOTHING;
