-- Seed data for Tech2High Bootcamp Portal
-- Run after schema.sql

-- Insert sample batches
INSERT INTO batches (id, name, description, start_date, end_date, max_students, is_active)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'Batch 1', 'Data Analysis Bootcamp - Jan 2024', '2024-01-08', '2024-04-08', 30, FALSE),
    ('22222222-2222-2222-2222-222222222222', 'Batch 2', 'Data Analysis Bootcamp - Apr 2024', '2024-04-15', '2024-07-15', 30, FALSE),
    ('33333333-3333-3333-3333-333333333333', 'Batch 3', 'Data Analysis Bootcamp - Aug 2024', '2024-08-01', '2024-11-01', 30, TRUE)
ON CONFLICT DO NOTHING;

-- Insert sample admin user (password: admin123)
INSERT INTO users (id, first_name, last_name, email, password, role, is_active)
VALUES (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Admin',
    'User',
    'admin@tech2high.com',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'admin',
    TRUE
) ON CONFLICT DO NOTHING;

-- Insert sample student (password: student123)
INSERT INTO users (id, first_name, last_name, email, password, role, is_active, batch_id)
VALUES (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Jane',
    'Smith',
    'jane.smith@example.com',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'student',
    TRUE,
    '33333333-3333-3333-3333-333333333333'
) ON CONFLICT DO NOTHING;

-- Insert sample lessons for Batch 3
INSERT INTO lessons (title, description, "order", batch_id, is_active)
VALUES
    ('Introduction to Data Analysis', 'Foundations of data analysis, types of data, and key tools.', 1, '33333333-3333-3333-3333-333333333333', TRUE),
    ('Python for Data Science', 'Core Python programming for data manipulation and analysis.', 2, '33333333-3333-3333-3333-333333333333', TRUE),
    ('SQL & Database Management', 'Writing SQL queries and managing relational databases.', 3, '33333333-3333-3333-3333-333333333333', TRUE),
    ('Data Visualization with Tableau', 'Creating compelling dashboards and visual stories.', 4, '33333333-3333-3333-3333-333333333333', TRUE),
    ('Machine Learning Basics', 'Introduction to supervised and unsupervised learning.', 5, '33333333-3333-3333-3333-333333333333', TRUE)
ON CONFLICT DO NOTHING;
