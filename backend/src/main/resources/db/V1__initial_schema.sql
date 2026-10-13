$sql = @'
CREATE TABLE users (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          VARCHAR(20)  NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE conversations (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id    BIGINT       NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    title      VARCHAR(200) NOT NULL,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX idx_conversations_user ON conversations (user_id);

CREATE TABLE messages (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    conversation_id BIGINT      NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
    role            VARCHAR(20) NOT NULL CHECK (role IN ('USER', 'ASSISTANT')),
    content         TEXT        NOT NULL,
    language        VARCHAR(10) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_messages_conversation ON messages (conversation_id, created_at);

CREATE TABLE documents (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    file_name     VARCHAR(255) NOT NULL,
    category      VARCHAR(40)  NOT NULL CHECK (category IN (
                      'COOPERATIVE_LAW', 'COOPERATIVE_RULES', 'GOVERNMENT_SCHEME', 'MEMBERSHIP',
                      'FINANCIAL_ASSISTANCE', 'GRIEVANCE', 'FAQ', 'OTHER')),
    source_url    VARCHAR(500),
    description   TEXT,
    is_demo       BOOLEAN      NOT NULL DEFAULT FALSE,
    status        VARCHAR(20)  NOT NULL DEFAULT 'UPLOADED' CHECK (status IN (
                      'UPLOADED', 'PROCESSING', 'PROCESSED', 'FAILED')),
    uploaded_by   BIGINT REFERENCES users (id) ON DELETE SET NULL,
    uploaded_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    processed_at  TIMESTAMPTZ,
    error_message TEXT
);
CREATE INDEX idx_documents_status ON documents (status);

CREATE TABLE feedback (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id    BIGINT      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    message_id BIGINT      NOT NULL REFERENCES messages (id) ON DELETE CASCADE,
    rating     SMALLINT    NOT NULL CHECK (rating IN (-1, 1)),
    comment    TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_feedback_message ON feedback (message_id);
'@
$dir = Join-Path (Get-Location) "src\main\resources\db\migration"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
[System.IO.File]::WriteAllText((Join-Path $dir "V1__initial_schema.sql"), $sql, (New-Object System.Text.UTF8Encoding($false)))
Get-ChildItem $dir | Select-Object Name, Length