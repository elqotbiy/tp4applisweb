--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: fonctions; Type: TABLE; Schema: public; Owner: reignier
--

CREATE TABLE fonctions (
    nom character varying(100) NOT NULL,
    equation character varying(100) NOT NULL,
    x_min numeric,
    y_min numeric,
    x_max numeric,
    y_max numeric,
    trigo boolean,
    id integer NOT NULL
);


ALTER TABLE fonctions OWNER TO reignier;

--
-- Data for Name: fonctions; Type: TABLE DATA; Schema: public; Owner: reignier
--

COPY fonctions (nom, equation, x_min, y_min, x_max, y_max, trigo, id) FROM stdin;
Cos Sin	Math.cos(x)*Math.sin(x)*Math.cos(y)*Math.sin(y)	0	0	3.1415927	3.1415927	t	1
Quadratic	x*x+y*y	-1	-1	1	1	f	2
Chapeau	Math.sin(x*x+y*y)/(x*x+y*y)	-3	-3	3	3	t	3
Montagnes	(x*x+3*y*y)*Math.exp(-x*x-y*y)	-2	-2	2	2	f	0
\.


--
-- Name: fonctions fonctions_pk; Type: CONSTRAINT; Schema: public; Owner: reignier
--

ALTER TABLE ONLY fonctions
    ADD CONSTRAINT fonctions_pk PRIMARY KEY (id);


--
-- Name: fonctions fonctions_un; Type: CONSTRAINT; Schema: public; Owner: reignier
--

ALTER TABLE ONLY fonctions
    ADD CONSTRAINT fonctions_un UNIQUE (nom);

CREATE SEQUENCE fonctions_seq  start 5


--
-- PostgreSQL database dump complete
--

