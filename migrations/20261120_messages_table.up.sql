CREATE TABLE IF NOT EXISTS `messages` (
    `id`            INTEGER PRIMARY KEY AUTOINCREMENT,
    `platform`      VARCHAR(20) NOT NULL,
    `sender`        VARCHAR(100) NOT NULL,
    `content`       TEXT NOT NULL,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);