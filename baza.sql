--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_products (
    cart_id bigint NOT NULL,
    product_id bigint NOT NULL
);


ALTER TABLE public.cart_products OWNER TO postgres;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id bigint NOT NULL,
    total_amount numeric(10,2),
    user_id bigint
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_id_seq OWNER TO postgres;

--
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- Name: contact_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_details (
    id bigint NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    mobile_phone character varying(255),
    order_id bigint
);


ALTER TABLE public.contact_details OWNER TO postgres;

--
-- Name: contact_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_details_id_seq OWNER TO postgres;

--
-- Name: contact_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_details_id_seq OWNED BY public.contact_details.id;


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    id bigint NOT NULL,
    product_id bigint,
    user_id bigint
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorites_id_seq OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorites_id_seq OWNED BY public.favorites.id;


--
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    id bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genres_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genres_id_seq OWNER TO postgres;

--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id bigint NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric(10,2),
    order_id bigint,
    product_id bigint
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_items_id_seq OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id bigint NOT NULL,
    order_date timestamp(6) without time zone,
    status character varying(255),
    total_amount numeric(10,2),
    contact_details_id bigint,
    user_id bigint,
    CONSTRAINT orders_status_check CHECK (((status)::text = ANY ((ARRAY['PENDING_PAYMENT'::character varying, 'PAID'::character varying, 'SHIPPED'::character varying, 'CANCELLED'::character varying])::text[])))
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: orders_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_seq OWNER TO postgres;

--
-- Name: password_reset_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_reset_token (
    id bigint NOT NULL,
    expiry_date timestamp(6) without time zone,
    token character varying(255),
    user_id bigint NOT NULL
);


ALTER TABLE public.password_reset_token OWNER TO postgres;

--
-- Name: password_reset_token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.password_reset_token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.password_reset_token_id_seq OWNER TO postgres;

--
-- Name: password_reset_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.password_reset_token_id_seq OWNED BY public.password_reset_token.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id bigint NOT NULL,
    amount_total double precision,
    created timestamp(6) without time zone,
    currency character varying(255),
    customer_email character varying(255),
    customer_name character varying(255),
    payment_status character varying(255),
    status character varying(255),
    order_id bigint
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payments_id_seq OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: platforms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.platforms (
    id bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE public.platforms OWNER TO postgres;

--
-- Name: platforms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.platforms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.platforms_id_seq OWNER TO postgres;

--
-- Name: platforms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.platforms_id_seq OWNED BY public.platforms.id;


--
-- Name: product_platforms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_platforms (
    product_id bigint NOT NULL,
    platform_id bigint NOT NULL
);


ALTER TABLE public.product_platforms OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    description character varying(1000),
    image character varying(255),
    name character varying(255),
    price numeric(10,2),
    quantity integer DEFAULT 0 NOT NULL,
    genre_id bigint,
    status character varying(255),
    CONSTRAINT products_status_check CHECK (((status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'INACTIVE'::character varying])::text[])))
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id bigint NOT NULL,
    comment character varying(255)
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(20),
    CONSTRAINT roles_name_check CHECK (((name)::text = ANY ((ARRAY['ROLE_USER'::character varying, 'ROLE_MODERATOR'::character varying, 'ROLE_ADMIN'::character varying])::text[])))
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id bigint NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    email character varying(255),
    password character varying(255),
    username character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- Name: contact_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_details ALTER COLUMN id SET DEFAULT nextval('public.contact_details_id_seq'::regclass);


--
-- Name: favorites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites ALTER COLUMN id SET DEFAULT nextval('public.favorites_id_seq'::regclass);


--
-- Name: genres id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: password_reset_token id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_token ALTER COLUMN id SET DEFAULT nextval('public.password_reset_token_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: platforms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platforms ALTER COLUMN id SET DEFAULT nextval('public.platforms_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cart_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_products (cart_id, product_id) FROM stdin;
11	37
11	25
11	34
4	25
9	28
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, total_amount, user_id) FROM stdin;
4	169.99	1
5	0.00	3
8	0.00	6
9	89.99	7
10	0.00	8
6	0.00	2
7	0.00	5
11	679.00	9
\.


--
-- Data for Name: contact_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact_details (id, first_name, last_name, mobile_phone, order_id) FROM stdin;
1	Olaf	Konefal	123123123	1
3	test	test	123123123	2
5	Test	test	123123123	3
6	Olaf	Konefal	123123123	4
7	Test	test	123123123	5
8	Olaf	Konefal	123456789	6
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (id, product_id, user_id) FROM stdin;
23	34	1
24	35	1
25	28	1
26	25	6
27	33	9
29	33	9
30	37	9
31	34	9
\.


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genres (id, name) FROM stdin;
2	RPG
3	FPS
5	Horror
6	Puzzle
1	Action
10	Simulator
9	Strategy
4	Adventure
8	Racing
12	Test
13	Roguelike
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, quantity, unit_price, order_id, product_id) FROM stdin;
1	1	150.00	1	25
2	1	309.00	2	37
3	1	309.00	3	37
4	1	309.00	4	37
5	1	309.00	5	37
6	1	150.00	6	25
7	1	220.00	6	34
8	1	309.00	6	37
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, order_date, status, total_amount, contact_details_id, user_id) FROM stdin;
1	2024-03-17 22:16:12.006578	PENDING_PAYMENT	150.00	1	9
2	2024-03-17 22:25:29.803864	PENDING_PAYMENT	309.00	3	9
3	2024-03-17 23:03:18.303329	PENDING_PAYMENT	309.00	5	9
4	\N	PAID	\N	\N	\N
5	2024-03-17 23:21:09.599501	PAID	309.00	7	9
6	2024-03-17 23:23:59.858241	PAID	679.00	8	9
\.


--
-- Data for Name: password_reset_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.password_reset_token (id, expiry_date, token, user_id) FROM stdin;
9	2024-02-06 01:35:59.846	03bdc745-18cc-48ec-9d5a-047e1654e763	1
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, amount_total, created, currency, customer_email, customer_name, payment_status, status, order_id) FROM stdin;
1	309	2024-03-17 22:12:31	usd	test@test.pl	Olaf Konefal	paid	complete	4
2	309	2024-03-17 22:21:12	usd	test@test.pl	Test	paid	complete	5
3	679	2024-03-17 22:24:01	usd	test@test.pl	Olaf Konefal	paid	complete	6
\.


--
-- Data for Name: platforms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.platforms (id, name) FROM stdin;
2	Xbox One
3	XBOX 360
4	Xbox Series X
5	Xbox Series S
6	PS3
7	PS4
8	PS5
9	Nintento Switch
1	PC
\.


--
-- Data for Name: product_platforms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_platforms (product_id, platform_id) FROM stdin;
28	8
28	3
28	2
28	7
28	1
28	6
35	7
35	1
35	9
39	2
39	1
39	4
27	5
27	8
27	7
27	1
27	4
24	1
29	7
29	1
30	1
31	2
31	7
31	1
32	2
32	7
32	1
32	9
33	2
33	4
34	8
34	1
34	4
36	2
36	7
36	1
37	8
37	2
37	7
37	1
37	4
25	1
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, description, image, name, price, quantity, genre_id, status) FROM stdin;
37	Pierwszoosobowa strzelanka będąca kontynuacją Call of Duty: Modern Warfare 2 z 2022 roku i zarazem rebootem CoD: Modern Warfare 3 z roku 2011. Gra oferuje kampanię fabularną, tryby multiplayer i zombie.	https://scroll.morele.net/wp-content/uploads/2023/10/Modern-warfare-III.jpg	Call of Duty: Modern Warfare III	309.00	1	3	ACTIVE
25	Taktyczna strzelanka FPP pozwalająca graczowi na wcielenie się w członka legendarnej jednostki policyjnej SWAT. W trakcie zabawy w Ready or Not wykonujemy specjalne zadania, których realizacja wymaga szybkich, profesjonalnie skoordynowanych i starannie przygotowanych działań.	https://gaming-cdn.com/images/products/2075/orig/ready-or-not-pc-game-steam-cover.jpg?v=1703176792	Ready or Not	150.00	1	1	ACTIVE
33	Odświeżona i poprawiona wersja Age of Empires II – drugiej odsłony bestsellerowego cyklu gier strategicznych czasu rzeczywistego. Za jej opracowanie odpowiada zespół Forgotten Empires	https://www.pjsgames.com/cdn/shop/products/Age-of-Empires-II-Definitive-Edition-Windows-PC-Digital-Download.jpg?v=1588810409	Age of Empires II: Definitive Edition	55.00	0	9	ACTIVE
34	Cities: Skylines II to druga odsłona cyklu strategii ekonomicznych typu city builder. Dzieło studia Colossal Order skupia się na budowie i zarządzaniu miastem, a do naszych zadań należy tworzenie dzielnic, wytyczanie dróg czy ustalanie podatków.	https://cdn.akamai.steamstatic.com/steam/apps/949230/capsule_616x353.jpg?t=1701874564	Cities: Skylines II	220.00	1	9	ACTIVE
35	Przygodowa gra akcji w konwencji survival horroru. Tytuł jest debiutancką produkcją niezależnego studia Red Barrels, utworzonego przez branżowych weteranów: Davida Chateauneufa, Philippe'a Morina i Hugo Dallaire'a.	https://image.api.playstation.com/cdn/EP4467/CUSA00409_00/VJme7DCUmNN9lCMLv6eTpjjaUvNxh141.png	Outlast	90.00	0	5	ACTIVE
28	GTA 5 to piąta pełnoprawna odsłona niezwykle popularnej serii gier akcji, nad której rozwojem pieczę sprawuje studio Rockstar North we współpracy z koncernem Take Two Interactive. Miejscem akcji Grand Theft Auto V jest fikcyjne miasto Los Santos wzorowane na Los Angeles.	https://www.gry-online.pl/galeria/galeria_topki/bp1215555469.jpg	Grand Theft Auto V	89.99	1	1	ACTIVE
27	Osadzona w otwartym świecie w klimacie science fiction gra RPG oparta na papierowym systemie fabularnym Cyberpunk. Cyberpunk 2077 został opracowany przez studio CD Projekt RED, które wsławiło się kultową serią o Wiedźminie.	https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7	Cyberpunk 2077	185.00	99	2	ACTIVE
29	Kolejna odsłona popularnego cyklu gier akcji z elementami RPG, rozwijanego przez firmę Capcom głównie na konsolach i handheldach firm Nintendo oraz Sony.	https://lowcygier.pl/wp-content/uploads/2019/12/monster-hunter-world-e1577363549937.jpg	Monster Hunter: World	120.00	100	2	ACTIVE
31	Przygodowa gra akcji od studia FromSoftware, która przenosi nas do alternatywnej wersji XVI-wiecznej Japonii. Sekiro: Shadows Die Twice stawia na eksplorację rozbudowanych poziomów oraz skradanie się zamiennie z toczeniem walk przypominających serię Dark Souls.	https://image.api.playstation.com/vulcan/img/rnd/202010/2723/knxU5uU5aKvQChKX5OvWtSGC.png	Sekiro: Shadows Die Twice	148.00	0	1	ACTIVE
36	Dwudziesta pierwsza główna odsłona popularnej serii gier wyścigowych Need for Speed. W Need for Speed: Heat trafiamy do Palm City, gdzie za dnia bierzemy udział w mistrzostwach Speedhunters Showdown, z kolei nocą walczymy o zwycięstwo w nielegalnych wyścigach ulicznych.	https://lowcygier.pl/wp-content/uploads/2019/11/nfs-heat-button-fin-15658064459731-1-e1575021440351-scaled.jpg	Need for Speed: Heat	197.00	0	8	ACTIVE
39	Test	https://duledo.pl/wp-content/uploads/woocommerce-placeholder.png	Test	100.00	100	3	ACTIVE
30	Osadzona w realiach postapokaliptycznych, sandboksowa produkcja z gatunku FPS, opracowana przez debiutujące, niezależne studio The Fun Pimps. Akcja gry przenosi nas w niedaleką przyszłość, kiedy to w następstwie wojny atomowej świat został opanowany przez groźnego wirusa.	https://image.api.playstation.com/cdn/EP2026/CUSA03455_00/za1BnrppUa2c9qVX4GBtkzM0vdaddYDZ.png	7 Days to Die	22.00	0	1	ACTIVE
24	Gra action RPG, stanowiąca trzecią część przygód Geralta z Rivii. Podobnie jak we wcześniejszych odsłonach cyklu, Wiedźmin 3: Dziki Gon bazuje na motywach twórczości literackiej Andrzeja Sapkowskiego, jednak nie jest bezpośrednią adaptacją żadnej z jego książek.	https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/jG4MZ1Q29AfmRBMToBEbfBN5.png	Wiedźmin 3: Dziki Gon	99.99	0	2	ACTIVE
32	Szósta odsłona legendarnego cyklu turowych strategii, pozwalających na pokierowanie wybraną cywilizacją na przestrzeni kilku tysięcy lat jej rozwoju. Za powstanie gry odpowiada tradycyjnie studio Firaxis Games, a patronat nad produkcją objął sam twórca serii, Sid Meier.	https://www.gry-online.pl/i/h/17/340989427.jpg	Sid Meier's Civilization VI	250.00	100	9	ACTIVE
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, comment) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1	ROLE_USER
2	ROLE_ADMIN
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (user_id, role_id) FROM stdin;
1	1
2	1
3	1
4	1
5	1
6	1
7	1
8	2
9	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, created_at, email, password, username) FROM stdin;
2	\N	test22@test.pl	$2a$10$n7DWun8gLeu9oT91mkXgreaKECjBJJvbBst9tXScWU9yCHIUQAXVe	Test22
3	\N	test33@test.pl	$2a$10$lPDJg7xaT1X14HrzroqjT.6mJQK4p7Qg8qkCMEKvDMUieg5N3PMzG	Test33
4	\N	test44@test.pl	$2a$10$4V0c5O4jeXXE1SHY9/XJhe17m3CKUXw.ltww4a/sIV4iKTdT6MrUe	Test44
5	2024-01-26 22:18:39.057106	test123@test.pl	$2a$10$W3L.OQw95LAJVjD2OMs5vu497hfgDD6Mxy616CpG9zY1yIu3dntmu	Testowe
1	\N	test@test2.pl	$2a$10$Hcu79uSZ/K9SSx54Vi.FlewQOSel4rIyLwNcsIe7XJqQWWQL.rv2C	Test11
6	2024-02-10 16:08:00.030586	Test111@test.pl	$2a$10$jUWWT0MoN8t/4JJMEioKLuRWMlY/50hz.S63JNkWulWW.J7yl/L9.	Test111
7	2024-03-06 18:49:05.115949	olaf123@test.pl	$2a$10$dEBL3jnj0QfCqwAZx.IiH.vYUFhtikOpR12zbCSBL2ViAwfdfbV26	olaf123
8	2024-03-10 16:38:54.708643	Admin@admin.pl	$2a$10$s7a2hDozD1AgAwnZXDSc4.vR2zI.y48GJJrd9pSeR5QE6wbXEgFeu	Admin
9	2024-03-10 16:48:52.468773	Test@test.pl	$2a$10$IwpDjuvmw8CPu9RBc9bzbueLU.AnfglZIbk9kTwyd9UCM2IqPEZzi	Test
\.


--
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 11, true);


--
-- Name: contact_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_details_id_seq', 8, true);


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_id_seq', 32, true);


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_id_seq', 14, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 8, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 6, true);


--
-- Name: orders_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_seq', 51, true);


--
-- Name: password_reset_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.password_reset_token_id_seq', 9, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 3, true);


--
-- Name: platforms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.platforms_id_seq', 13, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 39, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: contact_details contact_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_details
    ADD CONSTRAINT contact_details_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: password_reset_token password_reset_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_token
    ADD CONSTRAINT password_reset_token_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: platforms platforms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platforms
    ADD CONSTRAINT platforms_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: users uk6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- Name: carts uk_64t7ox312pqal3p7fg9o503c2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT uk_64t7ox312pqal3p7fg9o503c2 UNIQUE (user_id);


--
-- Name: contact_details uk_6x3rayxll628tvksfxa44tsvo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_details
    ADD CONSTRAINT uk_6x3rayxll628tvksfxa44tsvo UNIQUE (order_id);


--
-- Name: payments uk_8vo36cen604as7etdfwmyjsxt; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT uk_8vo36cen604as7etdfwmyjsxt UNIQUE (order_id);


--
-- Name: password_reset_token uk_f90ivichjaokvmovxpnlm5nin; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_token
    ADD CONSTRAINT uk_f90ivichjaokvmovxpnlm5nin UNIQUE (user_id);


--
-- Name: orders uk_t1ivju9qgv5dey7bym9vilms7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT uk_t1ivju9qgv5dey7bym9vilms7 UNIQUE (contact_details_id);


--
-- Name: users ukr43af9ap4edm43mmtq01oddj6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT ukr43af9ap4edm43mmtq01oddj6 UNIQUE (username);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: products fk1w6wsbg6w189oop2bl38v0hjk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk1w6wsbg6w189oop2bl38v0hjk FOREIGN KEY (genre_id) REFERENCES public.genres(id);


--
-- Name: orders fk32ql8ubntj5uh44ph9659tiih; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk32ql8ubntj5uh44ph9659tiih FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: orders fk5ca3d72j8rhxm24wnwg9m05pt; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk5ca3d72j8rhxm24wnwg9m05pt FOREIGN KEY (contact_details_id) REFERENCES public.contact_details(id);


--
-- Name: favorites fk6sgu5npe8ug4o42bf9j71x20c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT fk6sgu5npe8ug4o42bf9j71x20c FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: payments fk81gagumt0r8y3rmudcgpbk42l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk81gagumt0r8y3rmudcgpbk42l FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: password_reset_token fk83nsrttkwkb6ym0anu051mtxn; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_token
    ADD CONSTRAINT fk83nsrttkwkb6ym0anu051mtxn FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: carts fkb5o626f86h46m4s7ms6ginnop; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT fkb5o626f86h46m4s7ms6ginnop FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: cart_products fkbilp3o9irlsvmbot68kfpthom; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_products
    ADD CONSTRAINT fkbilp3o9irlsvmbot68kfpthom FOREIGN KEY (cart_id) REFERENCES public.carts(id);


--
-- Name: order_items fkbioxgbv59vetrxe0ejfubep1w; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fkbioxgbv59vetrxe0ejfubep1w FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: cart_products fkdayy17at10up1qqwlri9cocb3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_products
    ADD CONSTRAINT fkdayy17at10up1qqwlri9cocb3 FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: user_roles fkh8ciramu9cc9q3qcqiv4ue8a6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkh8ciramu9cc9q3qcqiv4ue8a6 FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: user_roles fkhfh9dx7w3ubf1co1vdev94g3f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkhfh9dx7w3ubf1co1vdev94g3f FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: favorites fkk7du8b8ewipawnnpg76d55fus; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT fkk7du8b8ewipawnnpg76d55fus FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: product_platforms fklt1bsy6h7wt6sw13ichvrup20; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_platforms
    ADD CONSTRAINT fklt1bsy6h7wt6sw13ichvrup20 FOREIGN KEY (platform_id) REFERENCES public.platforms(id);


--
-- Name: contact_details fkoag8yfu1wratcgay5q0vo8wr0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_details
    ADD CONSTRAINT fkoag8yfu1wratcgay5q0vo8wr0 FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: order_items fkocimc7dtr037rh4ls4l95nlfi; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fkocimc7dtr037rh4ls4l95nlfi FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: product_platforms fksq2nqfuavkcj6yy6y5wc0jph2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_platforms
    ADD CONSTRAINT fksq2nqfuavkcj6yy6y5wc0jph2 FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- PostgreSQL database dump complete
--

