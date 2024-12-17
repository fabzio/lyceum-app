--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.4

-- Started on 2024-12-17 17:43:08

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 16437)
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: bugbusters
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO bugbusters;

--
-- TOC entry 7 (class 2615 OID 55089)
-- Name: production; Type: SCHEMA; Schema: -; Owner: bugbusters
--

CREATE SCHEMA production;


ALTER SCHEMA production OWNER TO bugbusters;

--
-- TOC entry 988 (class 1247 OID 55934)
-- Name: account_status; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.account_status AS ENUM (
    'active',
    'inactive',
    'deleted'
);


ALTER TYPE production.account_status OWNER TO bugbusters;

--
-- TOC entry 991 (class 1247 OID 55942)
-- Name: course_step; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.course_step AS ENUM (
    'phase1',
    'phase2'
);


ALTER TYPE production.course_step OWNER TO bugbusters;

--
-- TOC entry 994 (class 1247 OID 55948)
-- Name: enrollment_modification_status; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.enrollment_modification_status AS ENUM (
    'requested',
    'approved',
    'denied'
);


ALTER TYPE production.enrollment_modification_status OWNER TO bugbusters;

--
-- TOC entry 997 (class 1247 OID 55956)
-- Name: enrollment_proposal_status; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.enrollment_proposal_status AS ENUM (
    'requested',
    'sended',
    'aproved',
    'assigned'
);


ALTER TYPE production.enrollment_proposal_status OWNER TO bugbusters;

--
-- TOC entry 1000 (class 1247 OID 55966)
-- Name: enrollment_request_type; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.enrollment_request_type AS ENUM (
    'aditional',
    'withdrawal'
);


ALTER TYPE production.enrollment_request_type OWNER TO bugbusters;

--
-- TOC entry 1003 (class 1247 OID 55972)
-- Name: hiring_status; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.hiring_status AS ENUM (
    'receiving',
    'evaluating',
    'finished'
);


ALTER TYPE production.hiring_status OWNER TO bugbusters;

--
-- TOC entry 1006 (class 1247 OID 55980)
-- Name: hiring_type; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.hiring_type AS ENUM (
    'candidate',
    'reviewer',
    'evaluator',
    'selector'
);


ALTER TYPE production.hiring_type OWNER TO bugbusters;

--
-- TOC entry 1009 (class 1247 OID 55990)
-- Name: identity_type; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.identity_type AS ENUM (
    'national',
    'foreign'
);


ALTER TYPE production.identity_type OWNER TO bugbusters;

--
-- TOC entry 1012 (class 1247 OID 55996)
-- Name: job_request_state; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.job_request_state AS ENUM (
    'sent',
    'rejected',
    'to_evaluate',
    'evaluated',
    'selected'
);


ALTER TYPE production.job_request_state OWNER TO bugbusters;

--
-- TOC entry 1015 (class 1247 OID 56008)
-- Name: presentation_letter_status; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.presentation_letter_status AS ENUM (
    'sent',
    'accepted',
    'rejected',
    'succeeded'
);


ALTER TYPE production.presentation_letter_status OWNER TO bugbusters;

--
-- TOC entry 1018 (class 1247 OID 56018)
-- Name: schedule_status; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.schedule_status AS ENUM (
    'saved',
    'editing'
);


ALTER TYPE production.schedule_status OWNER TO bugbusters;

--
-- TOC entry 1021 (class 1247 OID 56024)
-- Name: study_plan_status; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.study_plan_status AS ENUM (
    'editing',
    'saved'
);


ALTER TYPE production.study_plan_status OWNER TO bugbusters;

--
-- TOC entry 1024 (class 1247 OID 56030)
-- Name: survey_question_type; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.survey_question_type AS ENUM (
    'boolean',
    'multiple',
    'text'
);


ALTER TYPE production.survey_question_type OWNER TO bugbusters;

--
-- TOC entry 1027 (class 1247 OID 56038)
-- Name: survey_type; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.survey_type AS ENUM (
    'midterm',
    'annual'
);


ALTER TYPE production.survey_type OWNER TO bugbusters;

--
-- TOC entry 1030 (class 1247 OID 56044)
-- Name: thesis_jury_status; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.thesis_jury_status AS ENUM (
    'unassigned',
    'requested',
    'assigned'
);


ALTER TYPE production.thesis_jury_status OWNER TO bugbusters;

--
-- TOC entry 1037 (class 1247 OID 56052)
-- Name: thesis_request_step; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.thesis_request_step AS ENUM (
    'sended',
    'denied',
    'approved'
);


ALTER TYPE production.thesis_request_step OWNER TO bugbusters;

--
-- TOC entry 1040 (class 1247 OID 56060)
-- Name: unit_type; Type: TYPE; Schema: production; Owner: bugbusters
--

CREATE TYPE production.unit_type AS ENUM (
    'university',
    'faculty',
    'department',
    'speciality',
    'section',
    'area'
);


ALTER TYPE production.unit_type OWNER TO bugbusters;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16439)
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: bugbusters
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO bugbusters;

--
-- TOC entry 217 (class 1259 OID 16438)
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: bugbusters
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO bugbusters;

--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 217
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: bugbusters
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- TOC entry 290 (class 1259 OID 56073)
-- Name: account_roles; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.account_roles (
    account_id uuid NOT NULL,
    role_id integer NOT NULL,
    unit_id integer NOT NULL
);


ALTER TABLE production.account_roles OWNER TO bugbusters;

--
-- TOC entry 291 (class 1259 OID 56078)
-- Name: account_surveys; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.account_surveys (
    subject_account_id uuid NOT NULL,
    evaluator_account_id uuid NOT NULL,
    survey_id integer NOT NULL,
    schedule_id integer NOT NULL
);


ALTER TABLE production.account_surveys OWNER TO bugbusters;

--
-- TOC entry 292 (class 1259 OID 56083)
-- Name: accounts; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.accounts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(60) NOT NULL,
    first_surname character varying(60) NOT NULL,
    second_surname character varying(60) NOT NULL,
    code character(8) NOT NULL,
    google_id character varying(60),
    email character varying(60) NOT NULL,
    password character varying(200),
    state production.account_status DEFAULT 'active'::production.account_status NOT NULL,
    unit_id integer NOT NULL
);


ALTER TABLE production.accounts OWNER TO bugbusters;

--
-- TOC entry 293 (class 1259 OID 56096)
-- Name: accounts_per_hiring; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.accounts_per_hiring (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    account_id uuid,
    course_hiring_id uuid,
    hiring_type production.hiring_type
);


ALTER TABLE production.accounts_per_hiring OWNER TO bugbusters;

--
-- TOC entry 295 (class 1259 OID 56103)
-- Name: audits; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.audits (
    id integer NOT NULL,
    user_id uuid NOT NULL,
    action character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE production.audits OWNER TO bugbusters;

--
-- TOC entry 294 (class 1259 OID 56102)
-- Name: audits_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.audits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.audits_id_seq OWNER TO bugbusters;

--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 294
-- Name: audits_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.audits_id_seq OWNED BY production.audits.id;


--
-- TOC entry 297 (class 1259 OID 56111)
-- Name: contacts_info; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.contacts_info (
    id integer NOT NULL,
    account_id uuid,
    phone character varying(15),
    secondary_phone character varying(15),
    identity_type production.identity_type,
    "CUI" character varying(20)
);


ALTER TABLE production.contacts_info OWNER TO bugbusters;

--
-- TOC entry 296 (class 1259 OID 56110)
-- Name: contacts_info_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.contacts_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.contacts_info_id_seq OWNER TO bugbusters;

--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 296
-- Name: contacts_info_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.contacts_info_id_seq OWNED BY production.contacts_info.id;


--
-- TOC entry 298 (class 1259 OID 56117)
-- Name: course_hiring_requirements; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.course_hiring_requirements (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    course_hiring_id uuid NOT NULL,
    detail text NOT NULL,
    step production.course_step
);


ALTER TABLE production.course_hiring_requirements OWNER TO bugbusters;

--
-- TOC entry 299 (class 1259 OID 56125)
-- Name: course_hirings; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.course_hirings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    course_id integer,
    hiring_id integer,
    detail text
);


ALTER TABLE production.course_hirings OWNER TO bugbusters;

--
-- TOC entry 301 (class 1259 OID 56134)
-- Name: courses; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.courses (
    id integer NOT NULL,
    code character(6) NOT NULL,
    name character varying(100) NOT NULL,
    credits numeric(3,2) NOT NULL,
    unit_id integer NOT NULL,
    state boolean DEFAULT true NOT NULL
);


ALTER TABLE production.courses OWNER TO bugbusters;

--
-- TOC entry 300 (class 1259 OID 56133)
-- Name: courses_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.courses_id_seq OWNER TO bugbusters;

--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 300
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.courses_id_seq OWNED BY production.courses.id;


--
-- TOC entry 303 (class 1259 OID 56142)
-- Name: enrollment_modifications; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.enrollment_modifications (
    id integer NOT NULL,
    student_id uuid NOT NULL,
    schedule_id integer NOT NULL,
    request_number integer,
    state production.enrollment_modification_status DEFAULT 'requested'::production.enrollment_modification_status NOT NULL,
    request_type production.enrollment_request_type NOT NULL,
    reason character varying(255) NOT NULL,
    observation character varying(255),
    date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.enrollment_modifications OWNER TO bugbusters;

--
-- TOC entry 302 (class 1259 OID 56141)
-- Name: enrollment_modifications_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.enrollment_modifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.enrollment_modifications_id_seq OWNER TO bugbusters;

--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 302
-- Name: enrollment_modifications_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.enrollment_modifications_id_seq OWNED BY production.enrollment_modifications.id;


--
-- TOC entry 305 (class 1259 OID 56155)
-- Name: enrollment_proposal; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.enrollment_proposal (
    id integer NOT NULL,
    speciality_id integer NOT NULL,
    account_id uuid NOT NULL,
    term_id integer NOT NULL,
    state production.enrollment_proposal_status DEFAULT 'requested'::production.enrollment_proposal_status NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE production.enrollment_proposal OWNER TO bugbusters;

--
-- TOC entry 307 (class 1259 OID 56164)
-- Name: enrollment_proposal_courses; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.enrollment_proposal_courses (
    id integer NOT NULL,
    enrollment_proposal_id integer NOT NULL,
    course_id integer NOT NULL,
    vacancies_per_schema smallint NOT NULL,
    visible_schedules smallint NOT NULL,
    hidden_schedules smallint NOT NULL
);


ALTER TABLE production.enrollment_proposal_courses OWNER TO bugbusters;

--
-- TOC entry 306 (class 1259 OID 56163)
-- Name: enrollment_proposal_courses_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.enrollment_proposal_courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.enrollment_proposal_courses_id_seq OWNER TO bugbusters;

--
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 306
-- Name: enrollment_proposal_courses_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.enrollment_proposal_courses_id_seq OWNED BY production.enrollment_proposal_courses.id;


--
-- TOC entry 304 (class 1259 OID 56154)
-- Name: enrollment_proposal_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.enrollment_proposal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.enrollment_proposal_id_seq OWNER TO bugbusters;

--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 304
-- Name: enrollment_proposal_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.enrollment_proposal_id_seq OWNED BY production.enrollment_proposal.id;


--
-- TOC entry 309 (class 1259 OID 56171)
-- Name: evaluations; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.evaluations (
    id integer NOT NULL,
    job_request_id integer,
    evaluator_id uuid,
    requirement_per_course_id uuid,
    score numeric,
    evaluation_date date DEFAULT now()
);


ALTER TABLE production.evaluations OWNER TO bugbusters;

--
-- TOC entry 308 (class 1259 OID 56170)
-- Name: evaluations_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.evaluations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.evaluations_id_seq OWNER TO bugbusters;

--
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 308
-- Name: evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.evaluations_id_seq OWNED BY production.evaluations.id;


--
-- TOC entry 311 (class 1259 OID 56181)
-- Name: faq_categories; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.faq_categories (
    id integer NOT NULL,
    name character varying(60) NOT NULL
);


ALTER TABLE production.faq_categories OWNER TO bugbusters;

--
-- TOC entry 310 (class 1259 OID 56180)
-- Name: faq_categories_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.faq_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.faq_categories_id_seq OWNER TO bugbusters;

--
-- TOC entry 5037 (class 0 OID 0)
-- Dependencies: 310
-- Name: faq_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.faq_categories_id_seq OWNED BY production.faq_categories.id;


--
-- TOC entry 313 (class 1259 OID 56190)
-- Name: faqs; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.faqs (
    id integer NOT NULL,
    question character varying(255) NOT NULL,
    answer character varying(255) NOT NULL,
    faq_category_id integer NOT NULL,
    speciality_id integer
);


ALTER TABLE production.faqs OWNER TO bugbusters;

--
-- TOC entry 312 (class 1259 OID 56189)
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.faqs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.faqs_id_seq OWNER TO bugbusters;

--
-- TOC entry 5038 (class 0 OID 0)
-- Dependencies: 312
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.faqs_id_seq OWNED BY production.faqs.id;


--
-- TOC entry 315 (class 1259 OID 56199)
-- Name: hirings; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.hirings (
    id integer NOT NULL,
    description text NOT NULL,
    unit_id integer NOT NULL,
    status production.hiring_status DEFAULT 'receiving'::production.hiring_status NOT NULL,
    start_date date NOT NULL,
    end_receiving_date date NOT NULL,
    results_publication_date date NOT NULL,
    end_date date NOT NULL,
    created_in timestamp without time zone DEFAULT now()
);


ALTER TABLE production.hirings OWNER TO bugbusters;

--
-- TOC entry 314 (class 1259 OID 56198)
-- Name: hirings_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.hirings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.hirings_id_seq OWNER TO bugbusters;

--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 314
-- Name: hirings_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.hirings_id_seq OWNED BY production.hirings.id;


--
-- TOC entry 317 (class 1259 OID 56210)
-- Name: job_requests; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.job_requests (
    id integer NOT NULL,
    account_id uuid,
    requirement_url text,
    motivation text,
    state production.job_request_state DEFAULT 'sent'::production.job_request_state NOT NULL,
    observation text,
    course_hiring_id uuid
);


ALTER TABLE production.job_requests OWNER TO bugbusters;

--
-- TOC entry 316 (class 1259 OID 56209)
-- Name: job_requests_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.job_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.job_requests_id_seq OWNER TO bugbusters;

--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 316
-- Name: job_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.job_requests_id_seq OWNED BY production.job_requests.id;


--
-- TOC entry 319 (class 1259 OID 56220)
-- Name: modules; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.modules (
    id integer NOT NULL,
    name character varying(60) NOT NULL,
    code character varying(30) NOT NULL
);


ALTER TABLE production.modules OWNER TO bugbusters;

--
-- TOC entry 318 (class 1259 OID 56219)
-- Name: modules_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.modules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.modules_id_seq OWNER TO bugbusters;

--
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 318
-- Name: modules_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.modules_id_seq OWNED BY production.modules.id;


--
-- TOC entry 321 (class 1259 OID 56231)
-- Name: permissions; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.permissions (
    id integer NOT NULL,
    description character varying NOT NULL,
    name character varying NOT NULL,
    module_id integer NOT NULL
);


ALTER TABLE production.permissions OWNER TO bugbusters;

--
-- TOC entry 320 (class 1259 OID 56230)
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.permissions_id_seq OWNER TO bugbusters;

--
-- TOC entry 5042 (class 0 OID 0)
-- Dependencies: 320
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.permissions_id_seq OWNED BY production.permissions.id;


--
-- TOC entry 322 (class 1259 OID 56239)
-- Name: presentation_letter_accounts; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.presentation_letter_accounts (
    presentation_letter_id integer NOT NULL,
    account_id uuid NOT NULL,
    role_id integer NOT NULL,
    lead boolean DEFAULT false NOT NULL
);


ALTER TABLE production.presentation_letter_accounts OWNER TO bugbusters;

--
-- TOC entry 324 (class 1259 OID 56244)
-- Name: presentation_letters; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.presentation_letters (
    id integer NOT NULL,
    schedule_id integer NOT NULL,
    unit_id integer,
    status production.presentation_letter_status DEFAULT 'sent'::production.presentation_letter_status NOT NULL,
    request_code character(10),
    company_name character varying(255) NOT NULL,
    detail text,
    observation text,
    submission_date timestamp without time zone,
    acceptance_date timestamp without time zone,
    completion_date timestamp without time zone,
    content character varying(1024)
);


ALTER TABLE production.presentation_letters OWNER TO bugbusters;

--
-- TOC entry 323 (class 1259 OID 56243)
-- Name: presentation_letters_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.presentation_letters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.presentation_letters_id_seq OWNER TO bugbusters;

--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 323
-- Name: presentation_letters_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.presentation_letters_id_seq OWNED BY production.presentation_letters.id;


--
-- TOC entry 326 (class 1259 OID 56254)
-- Name: risk_reasons; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.risk_reasons (
    id integer NOT NULL,
    description character varying(100) NOT NULL
);


ALTER TABLE production.risk_reasons OWNER TO bugbusters;

--
-- TOC entry 325 (class 1259 OID 56253)
-- Name: risk_reasons_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.risk_reasons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.risk_reasons_id_seq OWNER TO bugbusters;

--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 325
-- Name: risk_reasons_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.risk_reasons_id_seq OWNED BY production.risk_reasons.id;


--
-- TOC entry 328 (class 1259 OID 56263)
-- Name: risk_student_reports; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.risk_student_reports (
    id integer NOT NULL,
    score smallint NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL,
    observation character varying(512),
    student_id uuid NOT NULL,
    schedule_id integer NOT NULL
);


ALTER TABLE production.risk_student_reports OWNER TO bugbusters;

--
-- TOC entry 327 (class 1259 OID 56262)
-- Name: risk_student_reports_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.risk_student_reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.risk_student_reports_id_seq OWNER TO bugbusters;

--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 327
-- Name: risk_student_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.risk_student_reports_id_seq OWNED BY production.risk_student_reports.id;


--
-- TOC entry 329 (class 1259 OID 56272)
-- Name: risk_students; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.risk_students (
    student_id uuid NOT NULL,
    schedule_id integer NOT NULL,
    reason_id integer NOT NULL,
    score smallint,
    updated boolean DEFAULT true NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE production.risk_students OWNER TO bugbusters;

--
-- TOC entry 330 (class 1259 OID 56279)
-- Name: role_permissions; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.role_permissions (
    role_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE production.role_permissions OWNER TO bugbusters;

--
-- TOC entry 332 (class 1259 OID 56285)
-- Name: roles; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.roles (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    unit_type production.unit_type NOT NULL,
    editable boolean DEFAULT true
);


ALTER TABLE production.roles OWNER TO bugbusters;

--
-- TOC entry 331 (class 1259 OID 56284)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.roles_id_seq OWNER TO bugbusters;

--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 331
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.roles_id_seq OWNED BY production.roles.id;


--
-- TOC entry 334 (class 1259 OID 56293)
-- Name: schedule_accounts; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.schedule_accounts (
    schedule_id integer NOT NULL,
    account_id uuid NOT NULL,
    role_id integer,
    lead boolean DEFAULT false
);


ALTER TABLE production.schedule_accounts OWNER TO bugbusters;

--
-- TOC entry 333 (class 1259 OID 56292)
-- Name: schedule_accounts_schedule_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.schedule_accounts_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.schedule_accounts_schedule_id_seq OWNER TO bugbusters;

--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 333
-- Name: schedule_accounts_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.schedule_accounts_schedule_id_seq OWNED BY production.schedule_accounts.schedule_id;


--
-- TOC entry 336 (class 1259 OID 56301)
-- Name: schedules; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.schedules (
    id integer NOT NULL,
    code character varying(8) NOT NULL,
    course_id integer NOT NULL,
    term_id integer NOT NULL,
    state production.schedule_status DEFAULT 'editing'::production.schedule_status NOT NULL,
    vacancies smallint NOT NULL,
    visibility boolean NOT NULL
);


ALTER TABLE production.schedules OWNER TO bugbusters;

--
-- TOC entry 335 (class 1259 OID 56300)
-- Name: schedules_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.schedules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.schedules_id_seq OWNER TO bugbusters;

--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 335
-- Name: schedules_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.schedules_id_seq OWNED BY production.schedules.id;


--
-- TOC entry 337 (class 1259 OID 56308)
-- Name: speciality_study_plans; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.speciality_study_plans (
    speciality_id integer NOT NULL,
    study_plan_id integer NOT NULL,
    current boolean DEFAULT false NOT NULL,
    state production.study_plan_status DEFAULT 'editing'::production.study_plan_status NOT NULL
);


ALTER TABLE production.speciality_study_plans OWNER TO bugbusters;

--
-- TOC entry 338 (class 1259 OID 56315)
-- Name: study_plan_courses; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.study_plan_courses (
    study_plan_id integer NOT NULL,
    course_id integer NOT NULL,
    level smallint NOT NULL,
    requirements text[]
);


ALTER TABLE production.study_plan_courses OWNER TO bugbusters;

--
-- TOC entry 340 (class 1259 OID 56323)
-- Name: study_plans; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.study_plans (
    id integer NOT NULL,
    init_term integer,
    end_term integer,
    start_level integer NOT NULL,
    levels_count integer NOT NULL,
    description character varying(100)
);


ALTER TABLE production.study_plans OWNER TO bugbusters;

--
-- TOC entry 339 (class 1259 OID 56322)
-- Name: study_plans_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.study_plans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.study_plans_id_seq OWNER TO bugbusters;

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 339
-- Name: study_plans_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.study_plans_id_seq OWNED BY production.study_plans.id;


--
-- TOC entry 342 (class 1259 OID 56330)
-- Name: survey_answers; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.survey_answers (
    id integer NOT NULL,
    question_id integer NOT NULL,
    subject_account_id uuid NOT NULL,
    schedule_id integer NOT NULL,
    answer_raw_text character varying NOT NULL
);


ALTER TABLE production.survey_answers OWNER TO bugbusters;

--
-- TOC entry 341 (class 1259 OID 56329)
-- Name: survey_answers_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.survey_answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.survey_answers_id_seq OWNER TO bugbusters;

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 341
-- Name: survey_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.survey_answers_id_seq OWNED BY production.survey_answers.id;


--
-- TOC entry 344 (class 1259 OID 56339)
-- Name: survey_questions; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.survey_questions (
    id integer NOT NULL,
    type production.survey_question_type NOT NULL,
    question_text character varying NOT NULL,
    survey_id integer NOT NULL
);


ALTER TABLE production.survey_questions OWNER TO bugbusters;

--
-- TOC entry 343 (class 1259 OID 56338)
-- Name: survey_questions_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.survey_questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.survey_questions_id_seq OWNER TO bugbusters;

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 343
-- Name: survey_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.survey_questions_id_seq OWNED BY production.survey_questions.id;


--
-- TOC entry 346 (class 1259 OID 56348)
-- Name: surveys; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.surveys (
    id integer NOT NULL,
    name character varying NOT NULL,
    creator_id uuid NOT NULL,
    unit_id integer NOT NULL,
    creation_date date DEFAULT now(),
    end_date date NOT NULL,
    survey_type production.survey_type NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE production.surveys OWNER TO bugbusters;

--
-- TOC entry 345 (class 1259 OID 56347)
-- Name: surveys_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.surveys_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.surveys_id_seq OWNER TO bugbusters;

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 345
-- Name: surveys_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.surveys_id_seq OWNED BY production.surveys.id;


--
-- TOC entry 348 (class 1259 OID 56359)
-- Name: terms; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.terms (
    id integer NOT NULL,
    name character(6) NOT NULL,
    current boolean DEFAULT true NOT NULL
);


ALTER TABLE production.terms OWNER TO bugbusters;

--
-- TOC entry 347 (class 1259 OID 56358)
-- Name: terms_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.terms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.terms_id_seq OWNER TO bugbusters;

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 347
-- Name: terms_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.terms_id_seq OWNED BY production.terms.id;


--
-- TOC entry 350 (class 1259 OID 56367)
-- Name: thesis; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.thesis (
    id integer NOT NULL,
    request_code character(10) NOT NULL,
    title character varying(255) NOT NULL,
    area_id integer NOT NULL,
    applicant_id uuid NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL,
    last_action_id integer,
    aprovation_phase smallint DEFAULT 1 NOT NULL,
    aproved boolean DEFAULT false NOT NULL,
    jury_state production.thesis_jury_status DEFAULT 'unassigned'::production.thesis_jury_status NOT NULL
);


ALTER TABLE production.thesis OWNER TO bugbusters;

--
-- TOC entry 352 (class 1259 OID 56378)
-- Name: thesis_accounts; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.thesis_accounts (
    thesis_request_id integer NOT NULL,
    account_id uuid NOT NULL,
    role_id integer NOT NULL,
    lead boolean DEFAULT false NOT NULL
);


ALTER TABLE production.thesis_accounts OWNER TO bugbusters;

--
-- TOC entry 351 (class 1259 OID 56377)
-- Name: thesis_accounts_thesis_request_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.thesis_accounts_thesis_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.thesis_accounts_thesis_request_id_seq OWNER TO bugbusters;

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 351
-- Name: thesis_accounts_thesis_request_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.thesis_accounts_thesis_request_id_seq OWNED BY production.thesis_accounts.thesis_request_id;


--
-- TOC entry 354 (class 1259 OID 56384)
-- Name: thesis_actions; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.thesis_actions (
    id integer NOT NULL,
    request_id integer NOT NULL,
    content character varying(1024) NOT NULL,
    is_file boolean DEFAULT false NOT NULL,
    action production.thesis_request_step NOT NULL,
    account_id uuid NOT NULL,
    role_id integer NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE production.thesis_actions OWNER TO bugbusters;

--
-- TOC entry 353 (class 1259 OID 56383)
-- Name: thesis_actions_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.thesis_actions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.thesis_actions_id_seq OWNER TO bugbusters;

--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 353
-- Name: thesis_actions_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.thesis_actions_id_seq OWNED BY production.thesis_actions.id;


--
-- TOC entry 349 (class 1259 OID 56366)
-- Name: thesis_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.thesis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.thesis_id_seq OWNER TO bugbusters;

--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 349
-- Name: thesis_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.thesis_id_seq OWNED BY production.thesis.id;


--
-- TOC entry 356 (class 1259 OID 56395)
-- Name: thesis_juries; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.thesis_juries (
    thesis_id integer NOT NULL,
    account_id uuid NOT NULL,
    confirmed boolean DEFAULT true NOT NULL
);


ALTER TABLE production.thesis_juries OWNER TO bugbusters;

--
-- TOC entry 355 (class 1259 OID 56394)
-- Name: thesis_juries_thesis_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.thesis_juries_thesis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.thesis_juries_thesis_id_seq OWNER TO bugbusters;

--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 355
-- Name: thesis_juries_thesis_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.thesis_juries_thesis_id_seq OWNED BY production.thesis_juries.thesis_id;


--
-- TOC entry 358 (class 1259 OID 56401)
-- Name: units; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.units (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(500),
    details character varying(1000),
    parent_id integer,
    type production.unit_type NOT NULL,
    active boolean DEFAULT true
);


ALTER TABLE production.units OWNER TO bugbusters;

--
-- TOC entry 357 (class 1259 OID 56400)
-- Name: units_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.units_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.units_id_seq OWNER TO bugbusters;

--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 357
-- Name: units_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.units_id_seq OWNED BY production.units.id;


--
-- TOC entry 360 (class 1259 OID 56411)
-- Name: units_supports; Type: TABLE; Schema: production; Owner: bugbusters
--

CREATE TABLE production.units_supports (
    id integer NOT NULL,
    supporting_unit_id integer NOT NULL,
    supported_unit_id integer NOT NULL
);


ALTER TABLE production.units_supports OWNER TO bugbusters;

--
-- TOC entry 359 (class 1259 OID 56410)
-- Name: units_supports_id_seq; Type: SEQUENCE; Schema: production; Owner: bugbusters
--

CREATE SEQUENCE production.units_supports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE production.units_supports_id_seq OWNER TO bugbusters;

--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 359
-- Name: units_supports_id_seq; Type: SEQUENCE OWNED BY; Schema: production; Owner: bugbusters
--

ALTER SEQUENCE production.units_supports_id_seq OWNED BY production.units_supports.id;


--
-- TOC entry 4574 (class 2604 OID 16442)
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: bugbusters
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- TOC entry 4578 (class 2604 OID 56106)
-- Name: audits id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.audits ALTER COLUMN id SET DEFAULT nextval('production.audits_id_seq'::regclass);


--
-- TOC entry 4580 (class 2604 OID 56114)
-- Name: contacts_info id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.contacts_info ALTER COLUMN id SET DEFAULT nextval('production.contacts_info_id_seq'::regclass);


--
-- TOC entry 4583 (class 2604 OID 56137)
-- Name: courses id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.courses ALTER COLUMN id SET DEFAULT nextval('production.courses_id_seq'::regclass);


--
-- TOC entry 4585 (class 2604 OID 56145)
-- Name: enrollment_modifications id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_modifications ALTER COLUMN id SET DEFAULT nextval('production.enrollment_modifications_id_seq'::regclass);


--
-- TOC entry 4588 (class 2604 OID 56158)
-- Name: enrollment_proposal id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_proposal ALTER COLUMN id SET DEFAULT nextval('production.enrollment_proposal_id_seq'::regclass);


--
-- TOC entry 4591 (class 2604 OID 56167)
-- Name: enrollment_proposal_courses id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_proposal_courses ALTER COLUMN id SET DEFAULT nextval('production.enrollment_proposal_courses_id_seq'::regclass);


--
-- TOC entry 4592 (class 2604 OID 56174)
-- Name: evaluations id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.evaluations ALTER COLUMN id SET DEFAULT nextval('production.evaluations_id_seq'::regclass);


--
-- TOC entry 4594 (class 2604 OID 56184)
-- Name: faq_categories id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.faq_categories ALTER COLUMN id SET DEFAULT nextval('production.faq_categories_id_seq'::regclass);


--
-- TOC entry 4595 (class 2604 OID 56193)
-- Name: faqs id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.faqs ALTER COLUMN id SET DEFAULT nextval('production.faqs_id_seq'::regclass);


--
-- TOC entry 4596 (class 2604 OID 56202)
-- Name: hirings id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.hirings ALTER COLUMN id SET DEFAULT nextval('production.hirings_id_seq'::regclass);


--
-- TOC entry 4599 (class 2604 OID 56213)
-- Name: job_requests id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.job_requests ALTER COLUMN id SET DEFAULT nextval('production.job_requests_id_seq'::regclass);


--
-- TOC entry 4601 (class 2604 OID 56223)
-- Name: modules id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.modules ALTER COLUMN id SET DEFAULT nextval('production.modules_id_seq'::regclass);


--
-- TOC entry 4602 (class 2604 OID 56234)
-- Name: permissions id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.permissions ALTER COLUMN id SET DEFAULT nextval('production.permissions_id_seq'::regclass);


--
-- TOC entry 4604 (class 2604 OID 56247)
-- Name: presentation_letters id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.presentation_letters ALTER COLUMN id SET DEFAULT nextval('production.presentation_letters_id_seq'::regclass);


--
-- TOC entry 4606 (class 2604 OID 56257)
-- Name: risk_reasons id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.risk_reasons ALTER COLUMN id SET DEFAULT nextval('production.risk_reasons_id_seq'::regclass);


--
-- TOC entry 4607 (class 2604 OID 56266)
-- Name: risk_student_reports id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.risk_student_reports ALTER COLUMN id SET DEFAULT nextval('production.risk_student_reports_id_seq'::regclass);


--
-- TOC entry 4611 (class 2604 OID 56288)
-- Name: roles id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.roles ALTER COLUMN id SET DEFAULT nextval('production.roles_id_seq'::regclass);


--
-- TOC entry 4613 (class 2604 OID 56296)
-- Name: schedule_accounts schedule_id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.schedule_accounts ALTER COLUMN schedule_id SET DEFAULT nextval('production.schedule_accounts_schedule_id_seq'::regclass);


--
-- TOC entry 4615 (class 2604 OID 56304)
-- Name: schedules id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.schedules ALTER COLUMN id SET DEFAULT nextval('production.schedules_id_seq'::regclass);


--
-- TOC entry 4619 (class 2604 OID 56326)
-- Name: study_plans id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.study_plans ALTER COLUMN id SET DEFAULT nextval('production.study_plans_id_seq'::regclass);


--
-- TOC entry 4620 (class 2604 OID 56333)
-- Name: survey_answers id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.survey_answers ALTER COLUMN id SET DEFAULT nextval('production.survey_answers_id_seq'::regclass);


--
-- TOC entry 4621 (class 2604 OID 56342)
-- Name: survey_questions id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.survey_questions ALTER COLUMN id SET DEFAULT nextval('production.survey_questions_id_seq'::regclass);


--
-- TOC entry 4622 (class 2604 OID 56351)
-- Name: surveys id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.surveys ALTER COLUMN id SET DEFAULT nextval('production.surveys_id_seq'::regclass);


--
-- TOC entry 4625 (class 2604 OID 56362)
-- Name: terms id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.terms ALTER COLUMN id SET DEFAULT nextval('production.terms_id_seq'::regclass);


--
-- TOC entry 4627 (class 2604 OID 56370)
-- Name: thesis id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis ALTER COLUMN id SET DEFAULT nextval('production.thesis_id_seq'::regclass);


--
-- TOC entry 4632 (class 2604 OID 56381)
-- Name: thesis_accounts thesis_request_id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis_accounts ALTER COLUMN thesis_request_id SET DEFAULT nextval('production.thesis_accounts_thesis_request_id_seq'::regclass);


--
-- TOC entry 4634 (class 2604 OID 56387)
-- Name: thesis_actions id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis_actions ALTER COLUMN id SET DEFAULT nextval('production.thesis_actions_id_seq'::regclass);


--
-- TOC entry 4637 (class 2604 OID 56398)
-- Name: thesis_juries thesis_id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis_juries ALTER COLUMN thesis_id SET DEFAULT nextval('production.thesis_juries_thesis_id_seq'::regclass);


--
-- TOC entry 4639 (class 2604 OID 56404)
-- Name: units id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.units ALTER COLUMN id SET DEFAULT nextval('production.units_id_seq'::regclass);


--
-- TOC entry 4641 (class 2604 OID 56414)
-- Name: units_supports id; Type: DEFAULT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.units_supports ALTER COLUMN id SET DEFAULT nextval('production.units_supports_id_seq'::regclass);


--
-- TOC entry 4952 (class 0 OID 16439)
-- Dependencies: 218
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: bugbusters
--

INSERT INTO drizzle.__drizzle_migrations VALUES (1, '84398f9d51324a03a92c8e625ec8a033f06bfd347fe20ab6d70b75e04ce225bd', 1731005515536);
INSERT INTO drizzle.__drizzle_migrations VALUES (2, '84398f9d51324a03a92c8e625ec8a033f06bfd347fe20ab6d70b75e04ce225bd', 1731005682329);
INSERT INTO drizzle.__drizzle_migrations VALUES (3, 'c4584b8c37b6a8351cc0773680d60c758ca9331852d200f70017969a1cac8ac9', 1731077621488);
INSERT INTO drizzle.__drizzle_migrations VALUES (4, 'c4584b8c37b6a8351cc0773680d60c758ca9331852d200f70017969a1cac8ac9', 1731077825452);
INSERT INTO drizzle.__drizzle_migrations VALUES (5, 'c7f3cc651edc88ea26561df3df6e500f3fc58903c6fe07791c687e47480f3aea', 1731274907661);
INSERT INTO drizzle.__drizzle_migrations VALUES (6, 'c7f3cc651edc88ea26561df3df6e500f3fc58903c6fe07791c687e47480f3aea', 1731275334610);
INSERT INTO drizzle.__drizzle_migrations VALUES (7, 'c7f3cc651edc88ea26561df3df6e500f3fc58903c6fe07791c687e47480f3aea', 1731275574157);
INSERT INTO drizzle.__drizzle_migrations VALUES (8, 'd7e741ca9ec6b4e1901998971f181b6e6f710e9d7f777ae130b60c9cb52a4070', 1731380143845);
INSERT INTO drizzle.__drizzle_migrations VALUES (9, '95916e3c98bcedb8a62beb3b26fe08641c560c8ebc5e365f4bc14cddc3c9afb9', 1731394264327);
INSERT INTO drizzle.__drizzle_migrations VALUES (10, '95916e3c98bcedb8a62beb3b26fe08641c560c8ebc5e365f4bc14cddc3c9afb9', 1731394490341);
INSERT INTO drizzle.__drizzle_migrations VALUES (11, '95916e3c98bcedb8a62beb3b26fe08641c560c8ebc5e365f4bc14cddc3c9afb9', 1731422502672);
INSERT INTO drizzle.__drizzle_migrations VALUES (12, '95916e3c98bcedb8a62beb3b26fe08641c560c8ebc5e365f4bc14cddc3c9afb9', 1731423868658);
INSERT INTO drizzle.__drizzle_migrations VALUES (13, '0c2b9c7cf7cb96f3c39c96c6760dfc87d8c0066a8a3edbdbe35aeae490cc2a6f', 1731517699286);
INSERT INTO drizzle.__drizzle_migrations VALUES (14, '36bd3cd3a1d879bfd7ae1d1b4fd33e7f25b92b10988fbf60ab1ad88f552b041a', 1731560939377);
INSERT INTO drizzle.__drizzle_migrations VALUES (15, '7430ace692a422ea0a582113f5818b95eebcc192fa9a4c5243a78157d922b90b', 1731606834850);
INSERT INTO drizzle.__drizzle_migrations VALUES (16, '7430ace692a422ea0a582113f5818b95eebcc192fa9a4c5243a78157d922b90b', 1731609745860);
INSERT INTO drizzle.__drizzle_migrations VALUES (17, 'fbab28fad2935e956148c74bb73eca24d988e39eac6504704899d6236c0835e8', 1731698408630);
INSERT INTO drizzle.__drizzle_migrations VALUES (18, '7430ace692a422ea0a582113f5818b95eebcc192fa9a4c5243a78157d922b90b', 1731700074104);
INSERT INTO drizzle.__drizzle_migrations VALUES (19, 'fbab28fad2935e956148c74bb73eca24d988e39eac6504704899d6236c0835e8', 1731704710435);
INSERT INTO drizzle.__drizzle_migrations VALUES (20, '0e343e5628a7b954200c80f331ee1e585555dbabc8c4341758a63f25d1560c04', 1731716269815);
INSERT INTO drizzle.__drizzle_migrations VALUES (21, '0e343e5628a7b954200c80f331ee1e585555dbabc8c4341758a63f25d1560c04', 1731717344589);
INSERT INTO drizzle.__drizzle_migrations VALUES (22, '0e343e5628a7b954200c80f331ee1e585555dbabc8c4341758a63f25d1560c04', 1731717883179);
INSERT INTO drizzle.__drizzle_migrations VALUES (23, 'fbab28fad2935e956148c74bb73eca24d988e39eac6504704899d6236c0835e8', 1732504230874);
INSERT INTO drizzle.__drizzle_migrations VALUES (24, 'eb03d27316cd037f56af166c4778d985309e363a146a8209c769a539078d6c08', 1733624626199);
INSERT INTO drizzle.__drizzle_migrations VALUES (25, '4a30085ec0b1b478eb8c02de4aa5c0c94dece32c68d4074b70af056d5a7de65c', 1733687838065);
INSERT INTO drizzle.__drizzle_migrations VALUES (26, 'a17d297755f7100888b2c0986bbf06456c3920c7064893d1df94f3aecf375fc4', 1733689403605);
INSERT INTO drizzle.__drizzle_migrations VALUES (27, '4a30a22a3870ad264b357480d3ceb34ad8864a5053d6fc8b91d83e2f4d458542', 1733874730608);
INSERT INTO drizzle.__drizzle_migrations VALUES (28, '4a30a22a3870ad264b357480d3ceb34ad8864a5053d6fc8b91d83e2f4d458542', 1733887029144);
INSERT INTO drizzle.__drizzle_migrations VALUES (29, '4a30a22a3870ad264b357480d3ceb34ad8864a5053d6fc8b91d83e2f4d458542', 1733888827122);
INSERT INTO drizzle.__drizzle_migrations VALUES (30, '4a30a22a3870ad264b357480d3ceb34ad8864a5053d6fc8b91d83e2f4d458542', 1733889382552);
INSERT INTO drizzle.__drizzle_migrations VALUES (31, '4a30a22a3870ad264b357480d3ceb34ad8864a5053d6fc8b91d83e2f4d458542', 1733892464146);
INSERT INTO drizzle.__drizzle_migrations VALUES (32, '4a30a22a3870ad264b357480d3ceb34ad8864a5053d6fc8b91d83e2f4d458542', 1733892646903);
INSERT INTO drizzle.__drizzle_migrations VALUES (33, '4a30a22a3870ad264b357480d3ceb34ad8864a5053d6fc8b91d83e2f4d458542', 1733893177482);
INSERT INTO drizzle.__drizzle_migrations VALUES (34, '4a30a22a3870ad264b357480d3ceb34ad8864a5053d6fc8b91d83e2f4d458542', 1733894947326);
INSERT INTO drizzle.__drizzle_migrations VALUES (35, '4a30a22a3870ad264b357480d3ceb34ad8864a5053d6fc8b91d83e2f4d458542', 1733895158960);
INSERT INTO drizzle.__drizzle_migrations VALUES (36, '4a30a22a3870ad264b357480d3ceb34ad8864a5053d6fc8b91d83e2f4d458542', 1733895335754);
INSERT INTO drizzle.__drizzle_migrations VALUES (37, 'c438eec2dda562cffb9fe02760a524d725d5f6f27cbcdd8c881083eb50da7fc0', 1734306946413);
INSERT INTO drizzle.__drizzle_migrations VALUES (38, '7a38b2e941d5944db7f5747006468a7079e17ffc32d2a39dfed02d6ca1a7f660', 1734355368626);
INSERT INTO drizzle.__drizzle_migrations VALUES (39, '7a38b2e941d5944db7f5747006468a7079e17ffc32d2a39dfed02d6ca1a7f660', 1734363748458);
INSERT INTO drizzle.__drizzle_migrations VALUES (40, '7a38b2e941d5944db7f5747006468a7079e17ffc32d2a39dfed02d6ca1a7f660', 1734363860802);
INSERT INTO drizzle.__drizzle_migrations VALUES (41, '7a38b2e941d5944db7f5747006468a7079e17ffc32d2a39dfed02d6ca1a7f660', 1734441459108);
INSERT INTO drizzle.__drizzle_migrations VALUES (42, '7a38b2e941d5944db7f5747006468a7079e17ffc32d2a39dfed02d6ca1a7f660', 1734451373367);
INSERT INTO drizzle.__drizzle_migrations VALUES (43, '7a38b2e941d5944db7f5747006468a7079e17ffc32d2a39dfed02d6ca1a7f660', 1734451570812);
INSERT INTO drizzle.__drizzle_migrations VALUES (44, '7a38b2e941d5944db7f5747006468a7079e17ffc32d2a39dfed02d6ca1a7f660', 1734452099777);
INSERT INTO drizzle.__drizzle_migrations VALUES (45, '7a38b2e941d5944db7f5747006468a7079e17ffc32d2a39dfed02d6ca1a7f660', 1734454605265);
INSERT INTO drizzle.__drizzle_migrations VALUES (46, '7a38b2e941d5944db7f5747006468a7079e17ffc32d2a39dfed02d6ca1a7f660', 1734457906264);
INSERT INTO drizzle.__drizzle_migrations VALUES (47, '7a38b2e941d5944db7f5747006468a7079e17ffc32d2a39dfed02d6ca1a7f660', 1734460792739);
INSERT INTO drizzle.__drizzle_migrations VALUES (48, '7a38b2e941d5944db7f5747006468a7079e17ffc32d2a39dfed02d6ca1a7f660', 1734469145608);
INSERT INTO drizzle.__drizzle_migrations VALUES (49, '7a38b2e941d5944db7f5747006468a7079e17ffc32d2a39dfed02d6ca1a7f660', 1734474231947);


--
-- TOC entry 4953 (class 0 OID 56073)
-- Dependencies: 290
-- Data for Name: account_roles; Type: TABLE DATA; Schema: production; Owner: bugbusters
--

INSERT INTO production.account_roles VALUES ('3c562018-b90c-448c-848c-402c18acc73f', 3, 1);
INSERT INTO production.account_roles VALUES ('887c4e4e-da25-4cfe-9d98-df5d6d054f99', 3, 1);
INSERT INTO production.account_roles VALUES ('63cb1786-77bd-4a5b-93c4-cb556f5e8ea5', 3, 1);
INSERT INTO production.account_roles VALUES ('b202c3cc-2331-431b-a2ab-756d4de69f22', 3, 1);
INSERT INTO production.account_roles VALUES ('6d27c9c9-1e91-40f4-ae55-111a03d585e7', 3, 1);
INSERT INTO production.account_roles VALUES ('3c924f70-fc27-45b9-be74-9e1ae725f3e9', 3, 1);
INSERT INTO production.account_roles VALUES ('8804a16a-3195-463e-960e-ef90bba92eb3', 3, 1);
INSERT INTO production.account_roles VALUES ('83b59d94-6874-4a81-b081-79e9d04afd9d', 3, 1);
INSERT INTO production.account_roles VALUES ('016d1e7b-b471-4080-a989-80f968b2ce36', 3, 1);
INSERT INTO production.account_roles VALUES ('bca9224d-c93a-4254-b5ff-03b2b5fd837c', 3, 1);
INSERT INTO production.account_roles VALUES ('3c562018-b90c-448c-848c-402c18acc73f', 5, 1);
INSERT INTO production.account_roles VALUES ('887c4e4e-da25-4cfe-9d98-df5d6d054f99', 5, 1);
INSERT INTO production.account_roles VALUES ('63cb1786-77bd-4a5b-93c4-cb556f5e8ea5', 5, 1);
INSERT INTO production.account_roles VALUES ('b202c3cc-2331-431b-a2ab-756d4de69f22', 5, 1);
INSERT INTO production.account_roles VALUES ('6d27c9c9-1e91-40f4-ae55-111a03d585e7', 5, 1);
INSERT INTO production.account_roles VALUES ('3c924f70-fc27-45b9-be74-9e1ae725f3e9', 5, 1);
INSERT INTO production.account_roles VALUES ('8804a16a-3195-463e-960e-ef90bba92eb3', 5, 1);
INSERT INTO production.account_roles VALUES ('83b59d94-6874-4a81-b081-79e9d04afd9d', 5, 1);
INSERT INTO production.account_roles VALUES ('016d1e7b-b471-4080-a989-80f968b2ce36', 5, 1);
INSERT INTO production.account_roles VALUES ('bca9224d-c93a-4254-b5ff-03b2b5fd837c', 5, 1);


--
-- TOC entry 4954 (class 0 OID 56078)
-- Dependencies: 291
-- Data for Name: account_surveys; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4955 (class 0 OID 56083)
-- Dependencies: 292
-- Data for Name: accounts; Type: TABLE DATA; Schema: production; Owner: bugbusters
--

INSERT INTO production.accounts VALUES ('3c562018-b90c-448c-848c-402c18acc73f', 'Fabrizio Randall', 'Montoya', 'Pinto', '20212486', NULL, 'fmontoya@pucp.edu.pe', NULL, 'active', 1);
INSERT INTO production.accounts VALUES ('887c4e4e-da25-4cfe-9d98-df5d6d054f99', 'Ricardo Bartra', 'Smith', 'Bartra', '20176243', NULL, 'ricardo.bartra@pucp.edu.pe', NULL, 'active', 1);
INSERT INTO production.accounts VALUES ('63cb1786-77bd-4a5b-93c4-cb556f5e8ea5', 'Leonardo Vega', 'Grijalva', 'Vega', '20240102', NULL, 'a20197102@pucp.edu.pe', NULL, 'active', 1);
INSERT INTO production.accounts VALUES ('b202c3cc-2331-431b-a2ab-756d4de69f22', 'Sebastian Castillejo', 'Franco', 'Castillejo', '20190948', NULL, 'a20190948@pucp.edu.pe', NULL, 'active', 1);
INSERT INTO production.accounts VALUES ('6d27c9c9-1e91-40f4-ae55-111a03d585e7', 'Piero Alvarez', 'Castillo', 'Alvarez', '20195903', NULL, 'alvarez.piero@pucp.edu.pe', NULL, 'active', 1);
INSERT INTO production.accounts VALUES ('3c924f70-fc27-45b9-be74-9e1ae725f3e9', 'Diego Ancajima', 'Diaz', 'Ancajima', '20202308', NULL, 'a20202308@pucp.edu.pe', NULL, 'active', 1);
INSERT INTO production.accounts VALUES ('8804a16a-3195-463e-960e-ef90bba92eb3', 'Jhoyfer Melendez', 'Torres', 'Melendez', '20203823', NULL, 'jmelendezt@pucp.edu.pe', NULL, 'active', 1);
INSERT INTO production.accounts VALUES ('83b59d94-6874-4a81-b081-79e9d04afd9d', 'Alonso Alvarado', 'Eslava', 'Alvarado', '20180731', NULL, 'aalvaradoe@pucp.edu.pe', NULL, 'active', 1);
INSERT INTO production.accounts VALUES ('016d1e7b-b471-4080-a989-80f968b2ce36', 'Paul Espettia', 'Rodríguez', 'Espettia', '20181395', NULL, 'paul.espettia@pucp.edu.pe', NULL, 'active', 1);
INSERT INTO production.accounts VALUES ('bca9224d-c93a-4254-b5ff-03b2b5fd837c', 'Alvaro Espinoza', 'Esparza', 'Larranaga', '20195925', NULL, 'aesparzal@pucp.edu.pe', NULL, 'active', 1);


--
-- TOC entry 4956 (class 0 OID 56096)
-- Dependencies: 293
-- Data for Name: accounts_per_hiring; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4958 (class 0 OID 56103)
-- Dependencies: 295
-- Data for Name: audits; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4960 (class 0 OID 56111)
-- Dependencies: 297
-- Data for Name: contacts_info; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4961 (class 0 OID 56117)
-- Dependencies: 298
-- Data for Name: course_hiring_requirements; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4962 (class 0 OID 56125)
-- Dependencies: 299
-- Data for Name: course_hirings; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4964 (class 0 OID 56134)
-- Dependencies: 301
-- Data for Name: courses; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4966 (class 0 OID 56142)
-- Dependencies: 303
-- Data for Name: enrollment_modifications; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4968 (class 0 OID 56155)
-- Dependencies: 305
-- Data for Name: enrollment_proposal; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4970 (class 0 OID 56164)
-- Dependencies: 307
-- Data for Name: enrollment_proposal_courses; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4972 (class 0 OID 56171)
-- Dependencies: 309
-- Data for Name: evaluations; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4974 (class 0 OID 56181)
-- Dependencies: 311
-- Data for Name: faq_categories; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4976 (class 0 OID 56190)
-- Dependencies: 313
-- Data for Name: faqs; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4978 (class 0 OID 56199)
-- Dependencies: 315
-- Data for Name: hirings; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4980 (class 0 OID 56210)
-- Dependencies: 317
-- Data for Name: job_requests; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4982 (class 0 OID 56220)
-- Dependencies: 319
-- Data for Name: modules; Type: TABLE DATA; Schema: production; Owner: bugbusters
--

INSERT INTO production.modules VALUES (1, 'Tesis', 'THESIS');
INSERT INTO production.modules VALUES (2, 'Procesos de estudiantes', 'STUDY_PROCESS');
INSERT INTO production.modules VALUES (3, 'Planes de estudio', 'STUDY_PLAN');
INSERT INTO production.modules VALUES (4, 'Matrícula', 'ENROLLMENT');
INSERT INTO production.modules VALUES (5, 'Usuarios', 'USERS');
INSERT INTO production.modules VALUES (6, 'Seguridad', 'SECURITY');
INSERT INTO production.modules VALUES (7, 'Preguntas frecuentes', 'FAQ');
INSERT INTO production.modules VALUES (8, 'Contratación', 'HIRING');
INSERT INTO production.modules VALUES (9, 'Unidades', 'UNITS');
INSERT INTO production.modules VALUES (10, 'Encuestas', 'SURVEYS');


--
-- TOC entry 4984 (class 0 OID 56231)
-- Dependencies: 321
-- Data for Name: permissions; Type: TABLE DATA; Schema: production; Owner: bugbusters
--

INSERT INTO production.permissions VALUES (1, 'Crear tesis', 'CREATE_THESIS', 1);
INSERT INTO production.permissions VALUES (2, 'Ver tesis de alumnos', 'READ_THESIS', 1);
INSERT INTO production.permissions VALUES (3, '1ra Aprobación de tesis', 'APROVE_THESIS_PHASE_1', 1);
INSERT INTO production.permissions VALUES (4, '2da Aprobación de tesis', 'APROVE_THESIS_PHASE_2', 1);
INSERT INTO production.permissions VALUES (5, '3ra Aprobación de tesis', 'APROVE_THESIS_PHASE_3', 1);
INSERT INTO production.permissions VALUES (6, 'Solicitar jurado para tesis', 'REQUEST_THESIS_JURY', 1);
INSERT INTO production.permissions VALUES (7, 'Asignar jurados a tesis', 'ASSIGN_THESIS_JURY', 1);
INSERT INTO production.permissions VALUES (8, 'Descargar reporte de tesis', 'DOWNLOAD_THESIS_REPORT', 1);
INSERT INTO production.permissions VALUES (9, 'Leer jurados de tesis', 'READ_THESIS_JURY', 1);
INSERT INTO production.permissions VALUES (10, 'Ver estudiantes en riesgo', 'READ_RISK_STUDENTS', 2);
INSERT INTO production.permissions VALUES (11, 'Cargar estudiantes en riesgo', 'LOAD_RISK_STUDENTS', 2);
INSERT INTO production.permissions VALUES (12, 'Solicitar reporte de estudiantes en riesgo', 'REQUEST_RISK_STUDENT_REPORT', 2);
INSERT INTO production.permissions VALUES (13, 'Actualizar reporte de estudiantes en riesgo', 'UPDATE_RISK_STUDENT_REPORT', 2);
INSERT INTO production.permissions VALUES (14, 'Crear carta de presentación', 'CREATE_PRESENTATION_LETTER', 2);
INSERT INTO production.permissions VALUES (15, 'Revisar carta de presentación', 'REVIEW_PRESENTATION_LETTER', 2);
INSERT INTO production.permissions VALUES (16, 'Aprobar carta de presentación', 'APPROVE_PRESENTATION_LETTER', 2);
INSERT INTO production.permissions VALUES (17, 'Administrar JP', 'MANAGE_JP', 2);
INSERT INTO production.permissions VALUES (18, 'Administrar delegados', 'MANAGE_DELEGATE', 2);
INSERT INTO production.permissions VALUES (19, 'Ver planes de estudio', 'READ_STUDY_PLAN', 3);
INSERT INTO production.permissions VALUES (20, 'Administrar planes de estudio', 'MANAGE_STUDY_PLAN', 3);
INSERT INTO production.permissions VALUES (21, 'Administrar cursos', 'MANAGE_COURSES', 3);
INSERT INTO production.permissions VALUES (22, 'Ver cursos', 'READ_COURSES', 3);
INSERT INTO production.permissions VALUES (23, 'Solicitar matrícula adicional', 'REQUEST_ADITIONAL_ENROLLMENT', 4);
INSERT INTO production.permissions VALUES (24, 'Revisar solicitudes de matrícula adicional', 'REVIEW_ADDITIONAL_ENROLLMENT', 4);
INSERT INTO production.permissions VALUES (25, 'Solicitar propuesta de horarios', 'REQUEST_SCHEDULE_PROPOSAL', 4);
INSERT INTO production.permissions VALUES (26, 'Gestionar propuestas de horarios', 'MANAGE_SCHEDULE_PROPOSAL', 4);
INSERT INTO production.permissions VALUES (27, 'Revisar propuestas de horarios', 'REVIEW_SCHEDULE_PROPOSAL', 4);
INSERT INTO production.permissions VALUES (28, 'Asignar profesores a horarios', 'ASSIGN_SCHEDULE_PROFESORS', 4);
INSERT INTO production.permissions VALUES (29, 'Leer profesores de horarios', 'READ_SCHEDULE_PROFESORS', 4);
INSERT INTO production.permissions VALUES (30, 'Ver estudiantes', 'READ_STUDENTS', 5);
INSERT INTO production.permissions VALUES (31, 'Crear estudiantes', 'WRITE_STUDENTS', 5);
INSERT INTO production.permissions VALUES (32, 'Ver profesores', 'READ_PROFESSORS', 5);
INSERT INTO production.permissions VALUES (33, 'Crear profesores', 'WRITE_PROFESSORS', 5);
INSERT INTO production.permissions VALUES (34, 'Ver administrativos', 'READ_ADMINISTRIVES', 5);
INSERT INTO production.permissions VALUES (35, 'Crear administrativos', 'WRITE_ADMINISTRIVES', 5);
INSERT INTO production.permissions VALUES (36, 'Ver externos', 'READ_EXTERNALS', 5);
INSERT INTO production.permissions VALUES (37, 'Crear externos', 'WRITE_EXTERNALS', 5);
INSERT INTO production.permissions VALUES (38, 'Ver permisos del sistema', 'READ_PERMISSIONS', 6);
INSERT INTO production.permissions VALUES (39, 'Crear roles del sistema', 'CREATE_ROLES', 6);
INSERT INTO production.permissions VALUES (40, 'Ver roles del sistema', 'READ_ROLES', 6);
INSERT INTO production.permissions VALUES (41, 'Asignar roles a usuarios', 'ASSING_ROLES', 6);
INSERT INTO production.permissions VALUES (42, 'Ver roles asignados a usuarios', 'READ_ASSIGN_ROLES', 6);
INSERT INTO production.permissions VALUES (43, 'Ver preguntas frecuentes', 'READ_FAQ', 7);
INSERT INTO production.permissions VALUES (44, 'Administrar preguntas frecuentes', 'MAGANE_FAQ', 7);
INSERT INTO production.permissions VALUES (45, 'Sugerir preguntas frecuentes', 'SUGGEST_FAQ', 7);
INSERT INTO production.permissions VALUES (46, 'Ver sugerencias de preguntas frecuentes', 'VIEW_FAQ_SUGGESTIONS', 7);
INSERT INTO production.permissions VALUES (47, 'Crear cuenta', 'CREATE_ACCOUNT', 8);
INSERT INTO production.permissions VALUES (48, 'Leer información de la propia cuenta', 'READ_OWN_ACCOUNT_INFORMATION', 8);
INSERT INTO production.permissions VALUES (49, 'Crear información de contacto propia', 'CREATE_OWN_CONTACT_INFO', 8);
INSERT INTO production.permissions VALUES (50, 'Leer información de contacto propia', 'READ_OWN_CONTACT_INFO', 8);
INSERT INTO production.permissions VALUES (51, 'Actualizar información de contacto propia', 'UPDATE_OWN_CONTACT_INFO', 8);
INSERT INTO production.permissions VALUES (52, 'Crear solicitud de empleo: (Aplicar para una posición en la contratación de cursos)', 'CREATE_JOB_REQUEST', 8);
INSERT INTO production.permissions VALUES (53, 'Leer solicitudes de empleo propias', 'READ_OWN_JOB_REQUESTS', 8);
INSERT INTO production.permissions VALUES (54, 'Eliminar solicitudes de empleo', 'TAKE_DOWN_JOB_REQUESTS', 8);
INSERT INTO production.permissions VALUES (55, 'Ver lista de contrataciones abiertas', 'VIEW_LIST_OF_OPEN_HIRINGS', 8);
INSERT INTO production.permissions VALUES (56, 'Ver cursos en contratación', 'VIEW_COURSES_IN_HIRING', 8);
INSERT INTO production.permissions VALUES (57, 'Ver estado de las propias solicitudes de empleo', 'VIEW_STATUS_OF_OWN_JOB_REQUEST_APPLICATIONS', 8);
INSERT INTO production.permissions VALUES (58, 'Ver todos los candidatos en la fase 1 del proceso de contratación de un curso', 'VIEW_ALL_CANDIDATES_PHASE_1', 8);
INSERT INTO production.permissions VALUES (59, 'Ver todos los candidatos en la fase 2 del proceso de contratación de un curso', 'VIEW_ALL_CANDIDATES_PHASE_2', 8);
INSERT INTO production.permissions VALUES (60, 'Cambiar el estado de todos los candidatos en la fase 1 del proceso de contratación de un curso', 'CHANGE_STATUS_ALL_CANDIDATES_PHASE_1', 8);
INSERT INTO production.permissions VALUES (61, 'Evaluar a todos los candidatos en la fase 2 del proceso de contratación de un curso', 'EVALUATE_ALL_CANDIDATES_PHASE_2', 8);
INSERT INTO production.permissions VALUES (62, 'Seleccionar un candidato en la fase 2 del proceso de contratación de un curso', 'SELECT_CANDIDATE_PHASE_2', 8);
INSERT INTO production.permissions VALUES (63, 'Crear un proceso de contratación', 'CREATE_HIRING_PROCESS', 8);
INSERT INTO production.permissions VALUES (64, 'Asignar cursos a un proceso de contratación', 'ASSIGN_COURSES_TO_HIRING_PROCESS', 8);
INSERT INTO production.permissions VALUES (65, 'Crear requisito para un proceso de contratación de curso', 'CREATE_REQUIREMENT_TO_COURSE_HIRING_PROCESS', 8);
INSERT INTO production.permissions VALUES (66, 'Abrir contratación', 'OPEN_HIRING', 8);
INSERT INTO production.permissions VALUES (67, 'Cerrar contratación', 'CLOSE_HIRING', 8);
INSERT INTO production.permissions VALUES (68, 'Mostrar resultados', 'SHOW_RESULTS', 8);
INSERT INTO production.permissions VALUES (69, 'Ver resultados del proceso de contratación de curso en la fase 1', 'VIEW_RESULTS_PHASE_1', 8);
INSERT INTO production.permissions VALUES (70, 'Ver resultados del proceso de contratación de curso en la fase 2', 'VIEW_RESULTS_PHASE_2', 8);
INSERT INTO production.permissions VALUES (71, 'Ver todas las solicitudes actualizadas en la fase 1', 'VIEW_ALL_UPDATED_REQUEST_PHASE_1', 8);
INSERT INTO production.permissions VALUES (72, 'Ver las propias solicitudes actualizadas en la fase 1 (candidato)', 'VIEW_OWN_UPDATED_REQUEST_PHASE_1', 8);
INSERT INTO production.permissions VALUES (73, 'Asignar revisor, selector y evaluador para un proceso de contratación de curso a nivel de curso', 'ASSIGN_REVIEWER_SELECTOR_EVALUATOR', 8);
INSERT INTO production.permissions VALUES (74, 'Ver información de universidad', 'READ_UNIVERSITY', 9);
INSERT INTO production.permissions VALUES (75, 'Editar información de universidad', 'WRITE_UNIVERSITY', 9);
INSERT INTO production.permissions VALUES (76, 'Ver información de facultad', 'READ_FACULTY', 9);
INSERT INTO production.permissions VALUES (77, 'Editar información de facultad', 'WRITE_FACULTY', 9);
INSERT INTO production.permissions VALUES (78, 'Ver información de departamento', 'READ_DEPARTMENT', 9);
INSERT INTO production.permissions VALUES (79, 'Editar información de departamento', 'WRITE_DEPARTMENT', 9);
INSERT INTO production.permissions VALUES (80, 'Ver información de sección', 'READ_SECTION', 9);
INSERT INTO production.permissions VALUES (81, 'Editar información de sección', 'WRITE_SECTION', 9);
INSERT INTO production.permissions VALUES (82, 'Ver información de áreas', 'READ_AREAS', 9);
INSERT INTO production.permissions VALUES (83, 'Ver información de especialidades', 'READ_SPECIALTIES', 9);
INSERT INTO production.permissions VALUES (84, 'Crear encuesta', 'CREATE_SURVEY', 10);
INSERT INTO production.permissions VALUES (85, 'Ver encuestas', 'READ_SURVEY', 10);
INSERT INTO production.permissions VALUES (86, 'Ver resultados de encuestas', 'READ_SURVEY_RESULTS', 10);
INSERT INTO production.permissions VALUES (87, 'Responder encuestas', 'ANSWER_SURVEY', 10);


--
-- TOC entry 4985 (class 0 OID 56239)
-- Dependencies: 322
-- Data for Name: presentation_letter_accounts; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4987 (class 0 OID 56244)
-- Dependencies: 324
-- Data for Name: presentation_letters; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4989 (class 0 OID 56254)
-- Dependencies: 326
-- Data for Name: risk_reasons; Type: TABLE DATA; Schema: production; Owner: bugbusters
--

INSERT INTO production.risk_reasons VALUES (1, 'Curso por segunda');
INSERT INTO production.risk_reasons VALUES (2, 'Curso por tercera');
INSERT INTO production.risk_reasons VALUES (3, 'Salud mental');
INSERT INTO production.risk_reasons VALUES (4, 'Otro');


--
-- TOC entry 4991 (class 0 OID 56263)
-- Dependencies: 328
-- Data for Name: risk_student_reports; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4992 (class 0 OID 56272)
-- Dependencies: 329
-- Data for Name: risk_students; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4993 (class 0 OID 56279)
-- Dependencies: 330
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: production; Owner: bugbusters
--

INSERT INTO production.role_permissions VALUES (5, 30);
INSERT INTO production.role_permissions VALUES (5, 31);
INSERT INTO production.role_permissions VALUES (5, 32);
INSERT INTO production.role_permissions VALUES (5, 33);
INSERT INTO production.role_permissions VALUES (5, 34);
INSERT INTO production.role_permissions VALUES (5, 35);
INSERT INTO production.role_permissions VALUES (5, 36);
INSERT INTO production.role_permissions VALUES (5, 37);
INSERT INTO production.role_permissions VALUES (5, 38);
INSERT INTO production.role_permissions VALUES (5, 39);
INSERT INTO production.role_permissions VALUES (5, 40);
INSERT INTO production.role_permissions VALUES (5, 41);
INSERT INTO production.role_permissions VALUES (5, 42);
INSERT INTO production.role_permissions VALUES (5, 74);
INSERT INTO production.role_permissions VALUES (5, 75);
INSERT INTO production.role_permissions VALUES (5, 76);
INSERT INTO production.role_permissions VALUES (5, 77);
INSERT INTO production.role_permissions VALUES (5, 78);
INSERT INTO production.role_permissions VALUES (5, 79);
INSERT INTO production.role_permissions VALUES (5, 80);
INSERT INTO production.role_permissions VALUES (5, 81);
INSERT INTO production.role_permissions VALUES (5, 82);
INSERT INTO production.role_permissions VALUES (5, 83);
INSERT INTO production.role_permissions VALUES (1, 1);
INSERT INTO production.role_permissions VALUES (1, 14);
INSERT INTO production.role_permissions VALUES (2, 2);
INSERT INTO production.role_permissions VALUES (1, 87);
INSERT INTO production.role_permissions VALUES (2, 3);
INSERT INTO production.role_permissions VALUES (2, 13);
INSERT INTO production.role_permissions VALUES (2, 48);
INSERT INTO production.role_permissions VALUES (2, 49);
INSERT INTO production.role_permissions VALUES (2, 51);
INSERT INTO production.role_permissions VALUES (2, 52);
INSERT INTO production.role_permissions VALUES (2, 53);
INSERT INTO production.role_permissions VALUES (2, 55);
INSERT INTO production.role_permissions VALUES (2, 57);
INSERT INTO production.role_permissions VALUES (2, 71);
INSERT INTO production.role_permissions VALUES (1, 23);
INSERT INTO production.role_permissions VALUES (1, 43);
INSERT INTO production.role_permissions VALUES (4, 48);
INSERT INTO production.role_permissions VALUES (4, 49);
INSERT INTO production.role_permissions VALUES (4, 51);
INSERT INTO production.role_permissions VALUES (4, 52);
INSERT INTO production.role_permissions VALUES (4, 53);
INSERT INTO production.role_permissions VALUES (4, 55);
INSERT INTO production.role_permissions VALUES (4, 57);
INSERT INTO production.role_permissions VALUES (4, 71);
INSERT INTO production.role_permissions VALUES (6, 5);
INSERT INTO production.role_permissions VALUES (6, 7);
INSERT INTO production.role_permissions VALUES (6, 22);
INSERT INTO production.role_permissions VALUES (6, 19);
INSERT INTO production.role_permissions VALUES (6, 21);
INSERT INTO production.role_permissions VALUES (6, 20);
INSERT INTO production.role_permissions VALUES (6, 24);
INSERT INTO production.role_permissions VALUES (6, 26);
INSERT INTO production.role_permissions VALUES (6, 29);
INSERT INTO production.role_permissions VALUES (6, 44);
INSERT INTO production.role_permissions VALUES (6, 43);
INSERT INTO production.role_permissions VALUES (6, 46);
INSERT INTO production.role_permissions VALUES (6, 10);
INSERT INTO production.role_permissions VALUES (6, 11);
INSERT INTO production.role_permissions VALUES (6, 12);
INSERT INTO production.role_permissions VALUES (6, 85);
INSERT INTO production.role_permissions VALUES (6, 86);
INSERT INTO production.role_permissions VALUES (6, 8);
INSERT INTO production.role_permissions VALUES (6, 9);
INSERT INTO production.role_permissions VALUES (6, 17);
INSERT INTO production.role_permissions VALUES (6, 18);
INSERT INTO production.role_permissions VALUES (7, 6);
INSERT INTO production.role_permissions VALUES (7, 25);
INSERT INTO production.role_permissions VALUES (7, 27);
INSERT INTO production.role_permissions VALUES (7, 9);
INSERT INTO production.role_permissions VALUES (8, 28);
INSERT INTO production.role_permissions VALUES (8, 64);
INSERT INTO production.role_permissions VALUES (8, 73);
INSERT INTO production.role_permissions VALUES (8, 67);
INSERT INTO production.role_permissions VALUES (8, 62);
INSERT INTO production.role_permissions VALUES (8, 55);
INSERT INTO production.role_permissions VALUES (8, 68);
INSERT INTO production.role_permissions VALUES (8, 56);
INSERT INTO production.role_permissions VALUES (8, 71);
INSERT INTO production.role_permissions VALUES (8, 69);
INSERT INTO production.role_permissions VALUES (8, 70);
INSERT INTO production.role_permissions VALUES (8, 58);
INSERT INTO production.role_permissions VALUES (8, 60);
INSERT INTO production.role_permissions VALUES (8, 17);
INSERT INTO production.role_permissions VALUES (9, 4);
INSERT INTO production.role_permissions VALUES (10, 28);
INSERT INTO production.role_permissions VALUES (10, 84);
INSERT INTO production.role_permissions VALUES (10, 85);
INSERT INTO production.role_permissions VALUES (10, 86);
INSERT INTO production.role_permissions VALUES (10, 55);
INSERT INTO production.role_permissions VALUES (10, 56);
INSERT INTO production.role_permissions VALUES (10, 71);
INSERT INTO production.role_permissions VALUES (10, 59);
INSERT INTO production.role_permissions VALUES (10, 63);
INSERT INTO production.role_permissions VALUES (10, 64);
INSERT INTO production.role_permissions VALUES (10, 65);
INSERT INTO production.role_permissions VALUES (10, 66);
INSERT INTO production.role_permissions VALUES (10, 67);
INSERT INTO production.role_permissions VALUES (10, 68);
INSERT INTO production.role_permissions VALUES (10, 73);
INSERT INTO production.role_permissions VALUES (11, 16);
INSERT INTO production.role_permissions VALUES (11, 15);
INSERT INTO production.role_permissions VALUES (12, 69);
INSERT INTO production.role_permissions VALUES (12, 70);
INSERT INTO production.role_permissions VALUES (12, 61);
INSERT INTO production.role_permissions VALUES (12, 58);
INSERT INTO production.role_permissions VALUES (12, 59);
INSERT INTO production.role_permissions VALUES (12, 60);


--
-- TOC entry 4995 (class 0 OID 56285)
-- Dependencies: 332
-- Data for Name: roles; Type: TABLE DATA; Schema: production; Owner: bugbusters
--

INSERT INTO production.roles VALUES (1, 'Estudiante', 'speciality', false);
INSERT INTO production.roles VALUES (2, 'Profesor', 'section', false);
INSERT INTO production.roles VALUES (3, 'Administrativo', 'university', false);
INSERT INTO production.roles VALUES (4, 'Externo', 'university', false);
INSERT INTO production.roles VALUES (5, 'Administrador', 'university', true);
INSERT INTO production.roles VALUES (6, 'Director de carrera', 'speciality', true);
INSERT INTO production.roles VALUES (7, 'Secretario académico', 'faculty', true);
INSERT INTO production.roles VALUES (8, 'Coordinador de sección', 'section', true);
INSERT INTO production.roles VALUES (9, 'Coordinador de área', 'area', true);
INSERT INTO production.roles VALUES (10, 'Asistente de sección', 'section', true);
INSERT INTO production.roles VALUES (11, 'Asistente de especialidad', 'speciality', true);
INSERT INTO production.roles VALUES (12, 'Comité de selección', 'university', true);


--
-- TOC entry 4997 (class 0 OID 56293)
-- Dependencies: 334
-- Data for Name: schedule_accounts; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 4999 (class 0 OID 56301)
-- Dependencies: 336
-- Data for Name: schedules; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 5000 (class 0 OID 56308)
-- Dependencies: 337
-- Data for Name: speciality_study_plans; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 5001 (class 0 OID 56315)
-- Dependencies: 338
-- Data for Name: study_plan_courses; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 5003 (class 0 OID 56323)
-- Dependencies: 340
-- Data for Name: study_plans; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 5005 (class 0 OID 56330)
-- Dependencies: 342
-- Data for Name: survey_answers; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 5007 (class 0 OID 56339)
-- Dependencies: 344
-- Data for Name: survey_questions; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 5009 (class 0 OID 56348)
-- Dependencies: 346
-- Data for Name: surveys; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 5011 (class 0 OID 56359)
-- Dependencies: 348
-- Data for Name: terms; Type: TABLE DATA; Schema: production; Owner: bugbusters
--

INSERT INTO production.terms VALUES (1, '2024-1', false);
INSERT INTO production.terms VALUES (2, '2024-2', true);
INSERT INTO production.terms VALUES (3, '2025-0', false);
INSERT INTO production.terms VALUES (4, '2025-1', false);
INSERT INTO production.terms VALUES (5, '2025-2', false);
INSERT INTO production.terms VALUES (6, '2026-0', false);
INSERT INTO production.terms VALUES (7, '2026-1', false);
INSERT INTO production.terms VALUES (8, '2026-2', false);
INSERT INTO production.terms VALUES (9, '2027-0', false);
INSERT INTO production.terms VALUES (10, '2027-1', false);
INSERT INTO production.terms VALUES (11, '2027-2', false);
INSERT INTO production.terms VALUES (12, '2028-0', false);
INSERT INTO production.terms VALUES (13, '2028-1', false);
INSERT INTO production.terms VALUES (14, '2028-2', false);
INSERT INTO production.terms VALUES (15, '2029-0', false);
INSERT INTO production.terms VALUES (16, '2029-1', false);
INSERT INTO production.terms VALUES (17, '2029-2', false);
INSERT INTO production.terms VALUES (18, '2030-0', false);
INSERT INTO production.terms VALUES (19, '2030-1', false);
INSERT INTO production.terms VALUES (20, '2030-2', false);


--
-- TOC entry 5013 (class 0 OID 56367)
-- Dependencies: 350
-- Data for Name: thesis; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 5015 (class 0 OID 56378)
-- Dependencies: 352
-- Data for Name: thesis_accounts; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 5017 (class 0 OID 56384)
-- Dependencies: 354
-- Data for Name: thesis_actions; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 5019 (class 0 OID 56395)
-- Dependencies: 356
-- Data for Name: thesis_juries; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 5021 (class 0 OID 56401)
-- Dependencies: 358
-- Data for Name: units; Type: TABLE DATA; Schema: production; Owner: bugbusters
--

INSERT INTO production.units VALUES (1, 'PUCP', NULL, NULL, NULL, 'university', true);


--
-- TOC entry 5023 (class 0 OID 56411)
-- Dependencies: 360
-- Data for Name: units_supports; Type: TABLE DATA; Schema: production; Owner: bugbusters
--



--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 217
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: bugbusters
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 49, true);


--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 294
-- Name: audits_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.audits_id_seq', 1, false);


--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 296
-- Name: contacts_info_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.contacts_info_id_seq', 1, false);


--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 300
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.courses_id_seq', 1, false);


--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 302
-- Name: enrollment_modifications_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.enrollment_modifications_id_seq', 1, false);


--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 306
-- Name: enrollment_proposal_courses_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.enrollment_proposal_courses_id_seq', 1, false);


--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 304
-- Name: enrollment_proposal_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.enrollment_proposal_id_seq', 1, false);


--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 308
-- Name: evaluations_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.evaluations_id_seq', 1, false);


--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 310
-- Name: faq_categories_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.faq_categories_id_seq', 1, false);


--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 312
-- Name: faqs_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.faqs_id_seq', 1, false);


--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 314
-- Name: hirings_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.hirings_id_seq', 1, false);


--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 316
-- Name: job_requests_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.job_requests_id_seq', 1, false);


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 318
-- Name: modules_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.modules_id_seq', 10, true);


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 320
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.permissions_id_seq', 87, true);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 323
-- Name: presentation_letters_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.presentation_letters_id_seq', 1, false);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 325
-- Name: risk_reasons_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.risk_reasons_id_seq', 4, true);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 327
-- Name: risk_student_reports_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.risk_student_reports_id_seq', 1, false);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 331
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.roles_id_seq', 12, true);


--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 333
-- Name: schedule_accounts_schedule_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.schedule_accounts_schedule_id_seq', 1, false);


--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 335
-- Name: schedules_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.schedules_id_seq', 1, false);


--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 339
-- Name: study_plans_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.study_plans_id_seq', 1, false);


--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 341
-- Name: survey_answers_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.survey_answers_id_seq', 1, false);


--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 343
-- Name: survey_questions_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.survey_questions_id_seq', 1, false);


--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 345
-- Name: surveys_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.surveys_id_seq', 1, false);


--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 347
-- Name: terms_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.terms_id_seq', 20, true);


--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 351
-- Name: thesis_accounts_thesis_request_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.thesis_accounts_thesis_request_id_seq', 1, false);


--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 353
-- Name: thesis_actions_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.thesis_actions_id_seq', 1, false);


--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 349
-- Name: thesis_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.thesis_id_seq', 1, false);


--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 355
-- Name: thesis_juries_thesis_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.thesis_juries_thesis_id_seq', 1, false);


--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 357
-- Name: units_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.units_id_seq', 1, true);


--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 359
-- Name: units_supports_id_seq; Type: SEQUENCE SET; Schema: production; Owner: bugbusters
--

SELECT pg_catalog.setval('production.units_supports_id_seq', 1, false);


--
-- TOC entry 4643 (class 2606 OID 16446)
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: bugbusters
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4650 (class 2606 OID 56093)
-- Name: accounts account_email_unique; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.accounts
    ADD CONSTRAINT account_email_unique UNIQUE (email);


--
-- TOC entry 4652 (class 2606 OID 56095)
-- Name: accounts account_google_id_unique; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.accounts
    ADD CONSTRAINT account_google_id_unique UNIQUE (google_id);


--
-- TOC entry 4645 (class 2606 OID 56077)
-- Name: account_roles account_roles_pk; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.account_roles
    ADD CONSTRAINT account_roles_pk PRIMARY KEY (account_id, role_id, unit_id);


--
-- TOC entry 4647 (class 2606 OID 56082)
-- Name: account_surveys account_survey_pk; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.account_surveys
    ADD CONSTRAINT account_survey_pk PRIMARY KEY (subject_account_id, evaluator_account_id, survey_id, schedule_id);


--
-- TOC entry 4656 (class 2606 OID 56101)
-- Name: accounts_per_hiring accounts_per_hiring_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.accounts_per_hiring
    ADD CONSTRAINT accounts_per_hiring_pkey PRIMARY KEY (id);


--
-- TOC entry 4654 (class 2606 OID 56091)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 4658 (class 2606 OID 56109)
-- Name: audits audits_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.audits
    ADD CONSTRAINT audits_pkey PRIMARY KEY (id);


--
-- TOC entry 4660 (class 2606 OID 56116)
-- Name: contacts_info contacts_info_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.contacts_info
    ADD CONSTRAINT contacts_info_pkey PRIMARY KEY (id);


--
-- TOC entry 4662 (class 2606 OID 56124)
-- Name: course_hiring_requirements course_hiring_requirements_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.course_hiring_requirements
    ADD CONSTRAINT course_hiring_requirements_pkey PRIMARY KEY (id);


--
-- TOC entry 4664 (class 2606 OID 56132)
-- Name: course_hirings course_hirings_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.course_hirings
    ADD CONSTRAINT course_hirings_pkey PRIMARY KEY (id);


--
-- TOC entry 4667 (class 2606 OID 56140)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 4669 (class 2606 OID 56151)
-- Name: enrollment_modifications enrollment_modifications_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_modifications
    ADD CONSTRAINT enrollment_modifications_pkey PRIMARY KEY (id);


--
-- TOC entry 4671 (class 2606 OID 56153)
-- Name: enrollment_modifications enrollment_modifications_request_number_unique; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_modifications
    ADD CONSTRAINT enrollment_modifications_request_number_unique UNIQUE (request_number);


--
-- TOC entry 4675 (class 2606 OID 56169)
-- Name: enrollment_proposal_courses enrollment_proposal_courses_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_proposal_courses
    ADD CONSTRAINT enrollment_proposal_courses_pkey PRIMARY KEY (id);


--
-- TOC entry 4673 (class 2606 OID 56162)
-- Name: enrollment_proposal enrollment_proposal_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_proposal
    ADD CONSTRAINT enrollment_proposal_pkey PRIMARY KEY (id);


--
-- TOC entry 4677 (class 2606 OID 56179)
-- Name: evaluations evaluations_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.evaluations
    ADD CONSTRAINT evaluations_pkey PRIMARY KEY (id);


--
-- TOC entry 4679 (class 2606 OID 56186)
-- Name: faq_categories faq_categories_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.faq_categories
    ADD CONSTRAINT faq_categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4681 (class 2606 OID 56188)
-- Name: faq_categories faq_categories_unique; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.faq_categories
    ADD CONSTRAINT faq_categories_unique UNIQUE (name);


--
-- TOC entry 4683 (class 2606 OID 56197)
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- TOC entry 4685 (class 2606 OID 56208)
-- Name: hirings hirings_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.hirings
    ADD CONSTRAINT hirings_pkey PRIMARY KEY (id);


--
-- TOC entry 4687 (class 2606 OID 56218)
-- Name: job_requests job_requests_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.job_requests
    ADD CONSTRAINT job_requests_pkey PRIMARY KEY (id);


--
-- TOC entry 4689 (class 2606 OID 56229)
-- Name: modules modules_code_unique; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.modules
    ADD CONSTRAINT modules_code_unique UNIQUE (code);


--
-- TOC entry 4691 (class 2606 OID 56225)
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (id);


--
-- TOC entry 4693 (class 2606 OID 56227)
-- Name: modules modules_unique; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.modules
    ADD CONSTRAINT modules_unique UNIQUE (name);


--
-- TOC entry 4695 (class 2606 OID 56238)
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 4697 (class 2606 OID 56252)
-- Name: presentation_letters presentation_letters_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.presentation_letters
    ADD CONSTRAINT presentation_letters_pkey PRIMARY KEY (id);


--
-- TOC entry 4699 (class 2606 OID 56259)
-- Name: risk_reasons risk_reasons_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.risk_reasons
    ADD CONSTRAINT risk_reasons_pkey PRIMARY KEY (id);


--
-- TOC entry 4701 (class 2606 OID 56261)
-- Name: risk_reasons risk_reasons_unique; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.risk_reasons
    ADD CONSTRAINT risk_reasons_unique UNIQUE (description);


--
-- TOC entry 4703 (class 2606 OID 56271)
-- Name: risk_student_reports risk_student_reports_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.risk_student_reports
    ADD CONSTRAINT risk_student_reports_pkey PRIMARY KEY (id);


--
-- TOC entry 4705 (class 2606 OID 56278)
-- Name: risk_students risk_students_pk; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.risk_students
    ADD CONSTRAINT risk_students_pk PRIMARY KEY (student_id, schedule_id);


--
-- TOC entry 4707 (class 2606 OID 56283)
-- Name: role_permissions role_permissions_pk; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.role_permissions
    ADD CONSTRAINT role_permissions_pk PRIMARY KEY (role_id, permission_id);


--
-- TOC entry 4709 (class 2606 OID 56291)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4711 (class 2606 OID 56299)
-- Name: schedule_accounts schedule_accounts_pk; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.schedule_accounts
    ADD CONSTRAINT schedule_accounts_pk PRIMARY KEY (schedule_id, account_id);


--
-- TOC entry 4713 (class 2606 OID 56307)
-- Name: schedules schedules_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.schedules
    ADD CONSTRAINT schedules_pkey PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 56314)
-- Name: speciality_study_plans speciality_study_plans_pk; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.speciality_study_plans
    ADD CONSTRAINT speciality_study_plans_pk PRIMARY KEY (speciality_id, study_plan_id);


--
-- TOC entry 4717 (class 2606 OID 56321)
-- Name: study_plan_courses study_plan_courses_pk; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.study_plan_courses
    ADD CONSTRAINT study_plan_courses_pk PRIMARY KEY (study_plan_id, course_id);


--
-- TOC entry 4719 (class 2606 OID 56328)
-- Name: study_plans study_plans_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.study_plans
    ADD CONSTRAINT study_plans_pkey PRIMARY KEY (id);


--
-- TOC entry 4721 (class 2606 OID 56337)
-- Name: survey_answers survey_answers_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.survey_answers
    ADD CONSTRAINT survey_answers_pkey PRIMARY KEY (id);


--
-- TOC entry 4723 (class 2606 OID 56346)
-- Name: survey_questions survey_questions_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.survey_questions
    ADD CONSTRAINT survey_questions_pkey PRIMARY KEY (id);


--
-- TOC entry 4725 (class 2606 OID 56357)
-- Name: surveys surveys_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.surveys
    ADD CONSTRAINT surveys_pkey PRIMARY KEY (id);


--
-- TOC entry 4727 (class 2606 OID 56365)
-- Name: terms terms_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.terms
    ADD CONSTRAINT terms_pkey PRIMARY KEY (id);


--
-- TOC entry 4733 (class 2606 OID 56393)
-- Name: thesis_actions thesis_actions_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis_actions
    ADD CONSTRAINT thesis_actions_pkey PRIMARY KEY (id);


--
-- TOC entry 4731 (class 2606 OID 56376)
-- Name: thesis thesis_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis
    ADD CONSTRAINT thesis_pkey PRIMARY KEY (id);


--
-- TOC entry 4735 (class 2606 OID 56409)
-- Name: units units_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.units
    ADD CONSTRAINT units_pkey PRIMARY KEY (id);


--
-- TOC entry 4737 (class 2606 OID 56416)
-- Name: units_supports units_supports_pkey; Type: CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.units_supports
    ADD CONSTRAINT units_supports_pkey PRIMARY KEY (id);


--
-- TOC entry 4648 (class 1259 OID 56767)
-- Name: account_code_unique; Type: INDEX; Schema: production; Owner: bugbusters
--

CREATE UNIQUE INDEX account_code_unique ON production.accounts USING btree (code);


--
-- TOC entry 4665 (class 1259 OID 56768)
-- Name: course_unique; Type: INDEX; Schema: production; Owner: bugbusters
--

CREATE UNIQUE INDEX course_unique ON production.courses USING btree (code);


--
-- TOC entry 4728 (class 1259 OID 56769)
-- Name: request_code_unique; Type: INDEX; Schema: production; Owner: bugbusters
--

CREATE UNIQUE INDEX request_code_unique ON production.thesis USING btree (request_code);


--
-- TOC entry 4729 (class 1259 OID 56770)
-- Name: student_code_index; Type: INDEX; Schema: production; Owner: bugbusters
--

CREATE INDEX student_code_index ON production.thesis USING btree (applicant_id);


--
-- TOC entry 4800 (class 2606 OID 56732)
-- Name: thesis_actions account_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis_actions
    ADD CONSTRAINT account_fk FOREIGN KEY (account_id) REFERENCES production.accounts(id) ON DELETE CASCADE;


--
-- TOC entry 4738 (class 2606 OID 56427)
-- Name: account_roles account_roles_account_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.account_roles
    ADD CONSTRAINT account_roles_account_fk FOREIGN KEY (account_id) REFERENCES production.accounts(id) ON DELETE CASCADE;


--
-- TOC entry 4739 (class 2606 OID 56417)
-- Name: account_roles account_roles_roles_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.account_roles
    ADD CONSTRAINT account_roles_roles_fk FOREIGN KEY (role_id) REFERENCES production.roles(id) ON DELETE CASCADE;


--
-- TOC entry 4740 (class 2606 OID 56422)
-- Name: account_roles account_roles_unit_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.account_roles
    ADD CONSTRAINT account_roles_unit_fk FOREIGN KEY (unit_id) REFERENCES production.units(id) ON DELETE CASCADE;


--
-- TOC entry 4741 (class 2606 OID 56437)
-- Name: account_surveys account_survey_evaluator_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.account_surveys
    ADD CONSTRAINT account_survey_evaluator_fk FOREIGN KEY (evaluator_account_id) REFERENCES production.accounts(id);


--
-- TOC entry 4742 (class 2606 OID 56447)
-- Name: account_surveys account_survey_schedule_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.account_surveys
    ADD CONSTRAINT account_survey_schedule_fk FOREIGN KEY (schedule_id) REFERENCES production.schedules(id);


--
-- TOC entry 4743 (class 2606 OID 56432)
-- Name: account_surveys account_survey_subject_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.account_surveys
    ADD CONSTRAINT account_survey_subject_fk FOREIGN KEY (subject_account_id) REFERENCES production.accounts(id);


--
-- TOC entry 4744 (class 2606 OID 56442)
-- Name: account_surveys account_survey_survey_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.account_surveys
    ADD CONSTRAINT account_survey_survey_fk FOREIGN KEY (survey_id) REFERENCES production.surveys(id);


--
-- TOC entry 4746 (class 2606 OID 56457)
-- Name: accounts_per_hiring accounts_per_hiring_account_id_accounts_id_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.accounts_per_hiring
    ADD CONSTRAINT accounts_per_hiring_account_id_accounts_id_fk FOREIGN KEY (account_id) REFERENCES production.accounts(id);


--
-- TOC entry 4747 (class 2606 OID 56462)
-- Name: accounts_per_hiring accounts_per_hiring_course_hiring_id_course_hirings_id_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.accounts_per_hiring
    ADD CONSTRAINT accounts_per_hiring_course_hiring_id_course_hirings_id_fk FOREIGN KEY (course_hiring_id) REFERENCES production.course_hirings(id);


--
-- TOC entry 4745 (class 2606 OID 56452)
-- Name: accounts accounts_unit_id_fkey; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.accounts
    ADD CONSTRAINT accounts_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES production.units(id);


--
-- TOC entry 4748 (class 2606 OID 56467)
-- Name: audits audit_user_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.audits
    ADD CONSTRAINT audit_user_fk FOREIGN KEY (user_id) REFERENCES production.accounts(id);


--
-- TOC entry 4749 (class 2606 OID 56472)
-- Name: contacts_info contacts_info_account_id_accounts_id_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.contacts_info
    ADD CONSTRAINT contacts_info_account_id_accounts_id_fk FOREIGN KEY (account_id) REFERENCES production.accounts(id);


--
-- TOC entry 4750 (class 2606 OID 56477)
-- Name: course_hiring_requirements course_hiring_requirements_course_hiring_id_course_hirings_id_f; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.course_hiring_requirements
    ADD CONSTRAINT course_hiring_requirements_course_hiring_id_course_hirings_id_f FOREIGN KEY (course_hiring_id) REFERENCES production.course_hirings(id);


--
-- TOC entry 4751 (class 2606 OID 56482)
-- Name: course_hirings course_hirings_course_id_courses_id_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.course_hirings
    ADD CONSTRAINT course_hirings_course_id_courses_id_fk FOREIGN KEY (course_id) REFERENCES production.courses(id);


--
-- TOC entry 4752 (class 2606 OID 56487)
-- Name: course_hirings course_hirings_hiring_id_hirings_id_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.course_hirings
    ADD CONSTRAINT course_hirings_hiring_id_hirings_id_fk FOREIGN KEY (hiring_id) REFERENCES production.hirings(id);


--
-- TOC entry 4753 (class 2606 OID 56492)
-- Name: courses courses_unit_id_units_id_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.courses
    ADD CONSTRAINT courses_unit_id_units_id_fk FOREIGN KEY (unit_id) REFERENCES production.units(id);


--
-- TOC entry 4756 (class 2606 OID 56512)
-- Name: enrollment_proposal enrollment_proposal_account_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_proposal
    ADD CONSTRAINT enrollment_proposal_account_fk FOREIGN KEY (account_id) REFERENCES production.accounts(id);


--
-- TOC entry 4759 (class 2606 OID 56522)
-- Name: enrollment_proposal_courses enrollment_proposal_courses_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_proposal_courses
    ADD CONSTRAINT enrollment_proposal_courses_fk FOREIGN KEY (course_id) REFERENCES production.courses(id);


--
-- TOC entry 4757 (class 2606 OID 56507)
-- Name: enrollment_proposal enrollment_proposal_speciality_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_proposal
    ADD CONSTRAINT enrollment_proposal_speciality_fk FOREIGN KEY (speciality_id) REFERENCES production.units(id);


--
-- TOC entry 4758 (class 2606 OID 56517)
-- Name: enrollment_proposal enrollment_proposal_term_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_proposal
    ADD CONSTRAINT enrollment_proposal_term_fk FOREIGN KEY (term_id) REFERENCES production.terms(id);


--
-- TOC entry 4754 (class 2606 OID 56502)
-- Name: enrollment_modifications enrollments_schedule_id_fkey; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_modifications
    ADD CONSTRAINT enrollments_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES production.schedules(id);


--
-- TOC entry 4755 (class 2606 OID 56497)
-- Name: enrollment_modifications enrollments_student_id_fkey; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.enrollment_modifications
    ADD CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES production.accounts(id);


--
-- TOC entry 4760 (class 2606 OID 56532)
-- Name: evaluations evaluations_evaluator_id_accounts_id_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.evaluations
    ADD CONSTRAINT evaluations_evaluator_id_accounts_id_fk FOREIGN KEY (evaluator_id) REFERENCES production.accounts(id);


--
-- TOC entry 4761 (class 2606 OID 56527)
-- Name: evaluations evaluations_job_request_id_job_requests_id_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.evaluations
    ADD CONSTRAINT evaluations_job_request_id_job_requests_id_fk FOREIGN KEY (job_request_id) REFERENCES production.job_requests(id);


--
-- TOC entry 4762 (class 2606 OID 56537)
-- Name: evaluations evaluations_requirement_per_course_id_course_hiring_requirement; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.evaluations
    ADD CONSTRAINT evaluations_requirement_per_course_id_course_hiring_requirement FOREIGN KEY (requirement_per_course_id) REFERENCES production.course_hiring_requirements(id);


--
-- TOC entry 4763 (class 2606 OID 56542)
-- Name: faqs faq_faq_categories_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.faqs
    ADD CONSTRAINT faq_faq_categories_fk FOREIGN KEY (faq_category_id) REFERENCES production.faq_categories(id) ON DELETE CASCADE;


--
-- TOC entry 4764 (class 2606 OID 56547)
-- Name: faqs faq_speciality_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.faqs
    ADD CONSTRAINT faq_speciality_fk FOREIGN KEY (speciality_id) REFERENCES production.units(id) ON DELETE CASCADE;


--
-- TOC entry 4765 (class 2606 OID 56552)
-- Name: hirings hirings_unit_id_units_id_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.hirings
    ADD CONSTRAINT hirings_unit_id_units_id_fk FOREIGN KEY (unit_id) REFERENCES production.units(id);


--
-- TOC entry 4766 (class 2606 OID 56557)
-- Name: job_requests job_requests_account_id_accounts_id_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.job_requests
    ADD CONSTRAINT job_requests_account_id_accounts_id_fk FOREIGN KEY (account_id) REFERENCES production.accounts(id);


--
-- TOC entry 4767 (class 2606 OID 56562)
-- Name: job_requests job_requests_course_hiring_id_course_hirings_id_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.job_requests
    ADD CONSTRAINT job_requests_course_hiring_id_course_hirings_id_fk FOREIGN KEY (course_hiring_id) REFERENCES production.course_hirings(id);


--
-- TOC entry 4768 (class 2606 OID 56567)
-- Name: permissions permissions_module_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.permissions
    ADD CONSTRAINT permissions_module_fk FOREIGN KEY (module_id) REFERENCES production.modules(id);


--
-- TOC entry 4769 (class 2606 OID 56577)
-- Name: presentation_letter_accounts presentation_letter_accounts_account_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.presentation_letter_accounts
    ADD CONSTRAINT presentation_letter_accounts_account_fk FOREIGN KEY (account_id) REFERENCES production.accounts(id) ON DELETE CASCADE;


--
-- TOC entry 4770 (class 2606 OID 56572)
-- Name: presentation_letter_accounts presentation_letter_accounts_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.presentation_letter_accounts
    ADD CONSTRAINT presentation_letter_accounts_fk FOREIGN KEY (presentation_letter_id) REFERENCES production.presentation_letters(id) ON DELETE CASCADE;


--
-- TOC entry 4771 (class 2606 OID 56582)
-- Name: presentation_letter_accounts presentation_letter_accounts_role_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.presentation_letter_accounts
    ADD CONSTRAINT presentation_letter_accounts_role_fk FOREIGN KEY (role_id) REFERENCES production.roles(id) ON DELETE CASCADE;


--
-- TOC entry 4772 (class 2606 OID 56587)
-- Name: presentation_letters presentation_letters_schedule_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.presentation_letters
    ADD CONSTRAINT presentation_letters_schedule_fk FOREIGN KEY (schedule_id) REFERENCES production.schedules(id) ON DELETE CASCADE;


--
-- TOC entry 4773 (class 2606 OID 56592)
-- Name: presentation_letters presentation_letters_unit_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.presentation_letters
    ADD CONSTRAINT presentation_letters_unit_fk FOREIGN KEY (unit_id) REFERENCES production.units(id);


--
-- TOC entry 4795 (class 2606 OID 56702)
-- Name: thesis request_applicant_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis
    ADD CONSTRAINT request_applicant_fk FOREIGN KEY (applicant_id) REFERENCES production.accounts(id) ON DELETE CASCADE;


--
-- TOC entry 4796 (class 2606 OID 56707)
-- Name: thesis request_area_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis
    ADD CONSTRAINT request_area_fk FOREIGN KEY (area_id) REFERENCES production.units(id);


--
-- TOC entry 4801 (class 2606 OID 56727)
-- Name: thesis_actions request_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis_actions
    ADD CONSTRAINT request_fk FOREIGN KEY (request_id) REFERENCES production.thesis(id) ON DELETE CASCADE;


--
-- TOC entry 4774 (class 2606 OID 56597)
-- Name: risk_student_reports risk_student_reports_student_id_schedule_id_risk_students_stude; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.risk_student_reports
    ADD CONSTRAINT risk_student_reports_student_id_schedule_id_risk_students_stude FOREIGN KEY (student_id, schedule_id) REFERENCES production.risk_students(student_id, schedule_id);


--
-- TOC entry 4775 (class 2606 OID 56612)
-- Name: risk_students risk_students_course_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.risk_students
    ADD CONSTRAINT risk_students_course_fk FOREIGN KEY (schedule_id) REFERENCES production.schedules(id) ON DELETE CASCADE;


--
-- TOC entry 4776 (class 2606 OID 56607)
-- Name: risk_students risk_students_reason_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.risk_students
    ADD CONSTRAINT risk_students_reason_fk FOREIGN KEY (reason_id) REFERENCES production.risk_reasons(id) ON DELETE CASCADE;


--
-- TOC entry 4777 (class 2606 OID 56602)
-- Name: risk_students risk_students_student_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.risk_students
    ADD CONSTRAINT risk_students_student_fk FOREIGN KEY (student_id) REFERENCES production.accounts(id) ON DELETE CASCADE;


--
-- TOC entry 4802 (class 2606 OID 56737)
-- Name: thesis_actions role_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis_actions
    ADD CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES production.roles(id) ON DELETE CASCADE;


--
-- TOC entry 4778 (class 2606 OID 56617)
-- Name: role_permissions role_permissions_permissions_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.role_permissions
    ADD CONSTRAINT role_permissions_permissions_fk FOREIGN KEY (permission_id) REFERENCES production.permissions(id) ON DELETE CASCADE;


--
-- TOC entry 4779 (class 2606 OID 56622)
-- Name: role_permissions role_permissions_roles_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.role_permissions
    ADD CONSTRAINT role_permissions_roles_fk FOREIGN KEY (role_id) REFERENCES production.roles(id) ON DELETE CASCADE;


--
-- TOC entry 4780 (class 2606 OID 56632)
-- Name: schedule_accounts schedule_accounts_account_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.schedule_accounts
    ADD CONSTRAINT schedule_accounts_account_fk FOREIGN KEY (account_id) REFERENCES production.accounts(id) ON DELETE CASCADE;


--
-- TOC entry 4781 (class 2606 OID 56637)
-- Name: schedule_accounts schedule_accounts_role_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.schedule_accounts
    ADD CONSTRAINT schedule_accounts_role_fk FOREIGN KEY (role_id) REFERENCES production.roles(id) ON DELETE CASCADE;


--
-- TOC entry 4782 (class 2606 OID 56627)
-- Name: schedule_accounts schedule_accounts_schedule_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.schedule_accounts
    ADD CONSTRAINT schedule_accounts_schedule_fk FOREIGN KEY (schedule_id) REFERENCES production.schedules(id) ON DELETE CASCADE;


--
-- TOC entry 4783 (class 2606 OID 56642)
-- Name: schedules schedule_course_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.schedules
    ADD CONSTRAINT schedule_course_fk FOREIGN KEY (course_id) REFERENCES production.courses(id) ON DELETE CASCADE;


--
-- TOC entry 4784 (class 2606 OID 56647)
-- Name: schedules schedule_term_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.schedules
    ADD CONSTRAINT schedule_term_fk FOREIGN KEY (term_id) REFERENCES production.terms(id) ON DELETE CASCADE;


--
-- TOC entry 4785 (class 2606 OID 56652)
-- Name: speciality_study_plans speciality_study_plans_study_plan_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.speciality_study_plans
    ADD CONSTRAINT speciality_study_plans_study_plan_fk FOREIGN KEY (study_plan_id) REFERENCES production.study_plans(id) ON DELETE CASCADE;


--
-- TOC entry 4786 (class 2606 OID 56657)
-- Name: speciality_study_plans speciality_study_plans_unit_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.speciality_study_plans
    ADD CONSTRAINT speciality_study_plans_unit_fk FOREIGN KEY (speciality_id) REFERENCES production.units(id) ON DELETE CASCADE;


--
-- TOC entry 4787 (class 2606 OID 56662)
-- Name: study_plan_courses study_plan_courses_courses_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.study_plan_courses
    ADD CONSTRAINT study_plan_courses_courses_fk FOREIGN KEY (course_id) REFERENCES production.courses(id) ON DELETE CASCADE;


--
-- TOC entry 4788 (class 2606 OID 56667)
-- Name: study_plan_courses study_plan_courses_study_plans_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.study_plan_courses
    ADD CONSTRAINT study_plan_courses_study_plans_fk FOREIGN KEY (study_plan_id) REFERENCES production.study_plans(id) ON DELETE CASCADE;


--
-- TOC entry 4789 (class 2606 OID 56672)
-- Name: study_plans study_plans_terms_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.study_plans
    ADD CONSTRAINT study_plans_terms_fk FOREIGN KEY (init_term) REFERENCES production.terms(id) ON DELETE CASCADE;


--
-- TOC entry 4790 (class 2606 OID 56677)
-- Name: study_plans study_plans_terms_fk_1; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.study_plans
    ADD CONSTRAINT study_plans_terms_fk_1 FOREIGN KEY (end_term) REFERENCES production.terms(id) ON DELETE CASCADE;


--
-- TOC entry 4791 (class 2606 OID 56682)
-- Name: survey_answers survey_answers_question_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.survey_answers
    ADD CONSTRAINT survey_answers_question_fk FOREIGN KEY (question_id) REFERENCES production.survey_questions(id);


--
-- TOC entry 4793 (class 2606 OID 56692)
-- Name: surveys survey_creator_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.surveys
    ADD CONSTRAINT survey_creator_fk FOREIGN KEY (creator_id) REFERENCES production.accounts(id);


--
-- TOC entry 4792 (class 2606 OID 56687)
-- Name: survey_questions survey_questions_survey_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.survey_questions
    ADD CONSTRAINT survey_questions_survey_fk FOREIGN KEY (survey_id) REFERENCES production.surveys(id);


--
-- TOC entry 4794 (class 2606 OID 56697)
-- Name: surveys survey_unit_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.surveys
    ADD CONSTRAINT survey_unit_fk FOREIGN KEY (unit_id) REFERENCES production.units(id);


--
-- TOC entry 4797 (class 2606 OID 56717)
-- Name: thesis_accounts thesis_accounts_account_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis_accounts
    ADD CONSTRAINT thesis_accounts_account_fk FOREIGN KEY (account_id) REFERENCES production.accounts(id) ON DELETE CASCADE;


--
-- TOC entry 4798 (class 2606 OID 56712)
-- Name: thesis_accounts thesis_accounts_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis_accounts
    ADD CONSTRAINT thesis_accounts_fk FOREIGN KEY (thesis_request_id) REFERENCES production.thesis(id) ON DELETE CASCADE;


--
-- TOC entry 4799 (class 2606 OID 56722)
-- Name: thesis_accounts thesis_accounts_role_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis_accounts
    ADD CONSTRAINT thesis_accounts_role_fk FOREIGN KEY (role_id) REFERENCES production.roles(id) ON DELETE CASCADE;


--
-- TOC entry 4803 (class 2606 OID 56747)
-- Name: thesis_juries thesis_juries_account_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis_juries
    ADD CONSTRAINT thesis_juries_account_fk FOREIGN KEY (account_id) REFERENCES production.accounts(id) ON DELETE CASCADE;


--
-- TOC entry 4804 (class 2606 OID 56742)
-- Name: thesis_juries thesis_juries_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.thesis_juries
    ADD CONSTRAINT thesis_juries_fk FOREIGN KEY (thesis_id) REFERENCES production.thesis(id) ON DELETE CASCADE;


--
-- TOC entry 4805 (class 2606 OID 56752)
-- Name: units unit_unit_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.units
    ADD CONSTRAINT unit_unit_fk FOREIGN KEY (parent_id) REFERENCES production.units(id) ON DELETE SET NULL;


--
-- TOC entry 4806 (class 2606 OID 56762)
-- Name: units_supports units_supports_support_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.units_supports
    ADD CONSTRAINT units_supports_support_fk FOREIGN KEY (supporting_unit_id) REFERENCES production.units(id);


--
-- TOC entry 4807 (class 2606 OID 56757)
-- Name: units_supports units_supports_unit_fk; Type: FK CONSTRAINT; Schema: production; Owner: bugbusters
--

ALTER TABLE ONLY production.units_supports
    ADD CONSTRAINT units_supports_unit_fk FOREIGN KEY (supported_unit_id) REFERENCES production.units(id);


-- Completed on 2024-12-17 17:44:04

--
-- PostgreSQL database dump complete
--

