CREATE TABLE IF NOT EXISTS `config_allow_message_creation` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `property` VARCHAR(24) NOT NULL,
    `includes` TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `config_prevent_message_creation` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `property` VARCHAR(24) NOT NULL,
    `includes` TEXT NOT NULL
);