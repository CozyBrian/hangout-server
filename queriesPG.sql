-- Table: public.messages

-- DROP TABLE IF EXISTS public.messages;

CREATE TABLE IF NOT EXISTS public.messages
(
    msg_id character varying COLLATE pg_catalog."default" NOT NULL,
    incoming_id character varying COLLATE pg_catalog."default" NOT NULL,
    outgoing_id character varying COLLATE pg_catalog."default" NOT NULL,
    msg character varying COLLATE pg_catalog."default" NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    CONSTRAINT messages_pkey PRIMARY KEY (msg_id),
    CONSTRAINT "incoming messages" FOREIGN KEY (incoming_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "outgoing messages" FOREIGN KEY (outgoing_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.messages
    OWNER to postgres;

-- Table: public.tokenStore

-- DROP TABLE IF EXISTS public."tokenStore";

CREATE TABLE IF NOT EXISTS public."tokenStore"
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    refresh_token character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "tokenStore_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."tokenStore"
    OWNER to postgres;

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    username text COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default" NOT NULL,
    passkey character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.friends
(
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    following_id character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT friends_pkey PRIMARY KEY (user_id, following_id),
    CONSTRAINT "FOLLOWINGID_FK" FOREIGN KEY (following_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "USERID_FK" FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)