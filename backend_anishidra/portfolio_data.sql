--
-- PostgreSQL database dump
--

\restrict EhWN2puIEAX4e3S7eQNCqt9pggi3mOh3YpDUul7nf0s1CJ0Vtc2ySzdLlIvL9i6

-- Dumped from database version 18.4 (Ubuntu 18.4-0ubuntu0.26.04.1)
-- Dumped by pg_dump version 18.4 (Ubuntu 18.4-0ubuntu0.26.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: about_aboutcontent; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.about_aboutcontent VALUES (1, 'anisDevImage_Lgurnjf.png', 'Hello! I''m Anis Hidra, a highly skilled Full-Stuck Developer passionate about engeneering robust, scalable, and modern web applications from conception to deployment. Bridging the gap between intuitive user interface (UI/UX) design and high-performance backend architecture. I specialize in crafting seamless digital experiences tailored to business goals. With strong expertise in frontend frameworks, backend systems, and database optimization, i focus on delivering clean, secure, and maintainable code that drives results and enhances user engagement.');


--
-- Data for Name: achievements_achievementcard; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.achievements_achievementcard VALUES (1, 'LeetCode', 'https://leetcode.com/u/anishidra76', 'fa-solid fa-leetcode', 'Problem solving  -  Algorithms
Data Structures  -  Coding Interviews', 'Rating', 'AAA', 'Global Rank', 'BBB', 'Achievements', 'CCC');
INSERT INTO public.achievements_achievementcard VALUES (5, 'Code Forces', 'https://codeforces.com/profile/anishidra76', 'fa-solid fa-chart-simple', 'Problem solving  -  Algorithms
Competitive Programming  -  Mathematics', 'Rating', 'AAA', 'Global Rank', 'BBB', 'Achievements', 'CCC');


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: anishidra76
--



--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.django_content_type VALUES (1, 'admin', 'logentry');
INSERT INTO public.django_content_type VALUES (2, 'auth', 'group');
INSERT INTO public.django_content_type VALUES (3, 'auth', 'permission');
INSERT INTO public.django_content_type VALUES (4, 'auth', 'user');
INSERT INTO public.django_content_type VALUES (5, 'contenttypes', 'contenttype');
INSERT INTO public.django_content_type VALUES (6, 'sessions', 'session');
INSERT INTO public.django_content_type VALUES (7, 'authtoken', 'token');
INSERT INTO public.django_content_type VALUES (8, 'authtoken', 'tokenproxy');
INSERT INTO public.django_content_type VALUES (9, 'home', 'homestatic');
INSERT INTO public.django_content_type VALUES (10, 'about', 'aboutcontent');
INSERT INTO public.django_content_type VALUES (11, 'services', 'servicecard');
INSERT INTO public.django_content_type VALUES (12, 'achievements', 'achievementcard');
INSERT INTO public.django_content_type VALUES (13, 'projects', 'projectcard');
INSERT INTO public.django_content_type VALUES (14, 'qualifications', 'certificatecard');
INSERT INTO public.django_content_type VALUES (15, 'qualifications', 'educationcard');
INSERT INTO public.django_content_type VALUES (16, 'skills', 'domain');
INSERT INTO public.django_content_type VALUES (17, 'skills', 'section');
INSERT INTO public.django_content_type VALUES (18, 'skills', 'sector');
INSERT INTO public.django_content_type VALUES (19, 'skills', 'skill');
INSERT INTO public.django_content_type VALUES (20, 'contact', 'contactmessage');
INSERT INTO public.django_content_type VALUES (21, 'management', 'client');
INSERT INTO public.django_content_type VALUES (22, 'management', 'externalexpense');
INSERT INTO public.django_content_type VALUES (23, 'management', 'externalincome');
INSERT INTO public.django_content_type VALUES (24, 'visitors', 'visitor');


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.auth_permission VALUES (1, 'Can add log entry', 1, 'add_logentry');
INSERT INTO public.auth_permission VALUES (2, 'Can change log entry', 1, 'change_logentry');
INSERT INTO public.auth_permission VALUES (3, 'Can delete log entry', 1, 'delete_logentry');
INSERT INTO public.auth_permission VALUES (4, 'Can view log entry', 1, 'view_logentry');
INSERT INTO public.auth_permission VALUES (5, 'Can add permission', 3, 'add_permission');
INSERT INTO public.auth_permission VALUES (6, 'Can change permission', 3, 'change_permission');
INSERT INTO public.auth_permission VALUES (7, 'Can delete permission', 3, 'delete_permission');
INSERT INTO public.auth_permission VALUES (8, 'Can view permission', 3, 'view_permission');
INSERT INTO public.auth_permission VALUES (9, 'Can add group', 2, 'add_group');
INSERT INTO public.auth_permission VALUES (10, 'Can change group', 2, 'change_group');
INSERT INTO public.auth_permission VALUES (11, 'Can delete group', 2, 'delete_group');
INSERT INTO public.auth_permission VALUES (12, 'Can view group', 2, 'view_group');
INSERT INTO public.auth_permission VALUES (13, 'Can add user', 4, 'add_user');
INSERT INTO public.auth_permission VALUES (14, 'Can change user', 4, 'change_user');
INSERT INTO public.auth_permission VALUES (15, 'Can delete user', 4, 'delete_user');
INSERT INTO public.auth_permission VALUES (16, 'Can view user', 4, 'view_user');
INSERT INTO public.auth_permission VALUES (17, 'Can add content type', 5, 'add_contenttype');
INSERT INTO public.auth_permission VALUES (18, 'Can change content type', 5, 'change_contenttype');
INSERT INTO public.auth_permission VALUES (19, 'Can delete content type', 5, 'delete_contenttype');
INSERT INTO public.auth_permission VALUES (20, 'Can view content type', 5, 'view_contenttype');
INSERT INTO public.auth_permission VALUES (21, 'Can add session', 6, 'add_session');
INSERT INTO public.auth_permission VALUES (22, 'Can change session', 6, 'change_session');
INSERT INTO public.auth_permission VALUES (23, 'Can delete session', 6, 'delete_session');
INSERT INTO public.auth_permission VALUES (24, 'Can view session', 6, 'view_session');
INSERT INTO public.auth_permission VALUES (25, 'Can add Token', 7, 'add_token');
INSERT INTO public.auth_permission VALUES (26, 'Can change Token', 7, 'change_token');
INSERT INTO public.auth_permission VALUES (27, 'Can delete Token', 7, 'delete_token');
INSERT INTO public.auth_permission VALUES (28, 'Can view Token', 7, 'view_token');
INSERT INTO public.auth_permission VALUES (29, 'Can add Token', 8, 'add_tokenproxy');
INSERT INTO public.auth_permission VALUES (30, 'Can change Token', 8, 'change_tokenproxy');
INSERT INTO public.auth_permission VALUES (31, 'Can delete Token', 8, 'delete_tokenproxy');
INSERT INTO public.auth_permission VALUES (32, 'Can view Token', 8, 'view_tokenproxy');
INSERT INTO public.auth_permission VALUES (33, 'Can add home static', 9, 'add_homestatic');
INSERT INTO public.auth_permission VALUES (34, 'Can change home static', 9, 'change_homestatic');
INSERT INTO public.auth_permission VALUES (35, 'Can delete home static', 9, 'delete_homestatic');
INSERT INTO public.auth_permission VALUES (36, 'Can view home static', 9, 'view_homestatic');
INSERT INTO public.auth_permission VALUES (37, 'Can add about content', 10, 'add_aboutcontent');
INSERT INTO public.auth_permission VALUES (38, 'Can change about content', 10, 'change_aboutcontent');
INSERT INTO public.auth_permission VALUES (39, 'Can delete about content', 10, 'delete_aboutcontent');
INSERT INTO public.auth_permission VALUES (40, 'Can view about content', 10, 'view_aboutcontent');
INSERT INTO public.auth_permission VALUES (41, 'Can add service card', 11, 'add_servicecard');
INSERT INTO public.auth_permission VALUES (42, 'Can change service card', 11, 'change_servicecard');
INSERT INTO public.auth_permission VALUES (43, 'Can delete service card', 11, 'delete_servicecard');
INSERT INTO public.auth_permission VALUES (44, 'Can view service card', 11, 'view_servicecard');
INSERT INTO public.auth_permission VALUES (45, 'Can add achievement card', 12, 'add_achievementcard');
INSERT INTO public.auth_permission VALUES (46, 'Can change achievement card', 12, 'change_achievementcard');
INSERT INTO public.auth_permission VALUES (47, 'Can delete achievement card', 12, 'delete_achievementcard');
INSERT INTO public.auth_permission VALUES (48, 'Can view achievement card', 12, 'view_achievementcard');
INSERT INTO public.auth_permission VALUES (49, 'Can add project card', 13, 'add_projectcard');
INSERT INTO public.auth_permission VALUES (50, 'Can change project card', 13, 'change_projectcard');
INSERT INTO public.auth_permission VALUES (51, 'Can delete project card', 13, 'delete_projectcard');
INSERT INTO public.auth_permission VALUES (52, 'Can view project card', 13, 'view_projectcard');
INSERT INTO public.auth_permission VALUES (53, 'Can add certificate card', 14, 'add_certificatecard');
INSERT INTO public.auth_permission VALUES (54, 'Can change certificate card', 14, 'change_certificatecard');
INSERT INTO public.auth_permission VALUES (55, 'Can delete certificate card', 14, 'delete_certificatecard');
INSERT INTO public.auth_permission VALUES (56, 'Can view certificate card', 14, 'view_certificatecard');
INSERT INTO public.auth_permission VALUES (57, 'Can add education card', 15, 'add_educationcard');
INSERT INTO public.auth_permission VALUES (58, 'Can change education card', 15, 'change_educationcard');
INSERT INTO public.auth_permission VALUES (59, 'Can delete education card', 15, 'delete_educationcard');
INSERT INTO public.auth_permission VALUES (60, 'Can view education card', 15, 'view_educationcard');
INSERT INTO public.auth_permission VALUES (61, 'Can add domain', 16, 'add_domain');
INSERT INTO public.auth_permission VALUES (62, 'Can change domain', 16, 'change_domain');
INSERT INTO public.auth_permission VALUES (63, 'Can delete domain', 16, 'delete_domain');
INSERT INTO public.auth_permission VALUES (64, 'Can view domain', 16, 'view_domain');
INSERT INTO public.auth_permission VALUES (65, 'Can add sector', 18, 'add_sector');
INSERT INTO public.auth_permission VALUES (66, 'Can change sector', 18, 'change_sector');
INSERT INTO public.auth_permission VALUES (67, 'Can delete sector', 18, 'delete_sector');
INSERT INTO public.auth_permission VALUES (68, 'Can view sector', 18, 'view_sector');
INSERT INTO public.auth_permission VALUES (69, 'Can add section', 17, 'add_section');
INSERT INTO public.auth_permission VALUES (70, 'Can change section', 17, 'change_section');
INSERT INTO public.auth_permission VALUES (71, 'Can delete section', 17, 'delete_section');
INSERT INTO public.auth_permission VALUES (72, 'Can view section', 17, 'view_section');
INSERT INTO public.auth_permission VALUES (73, 'Can add skill', 19, 'add_skill');
INSERT INTO public.auth_permission VALUES (74, 'Can change skill', 19, 'change_skill');
INSERT INTO public.auth_permission VALUES (75, 'Can delete skill', 19, 'delete_skill');
INSERT INTO public.auth_permission VALUES (76, 'Can view skill', 19, 'view_skill');
INSERT INTO public.auth_permission VALUES (77, 'Can add contact message', 20, 'add_contactmessage');
INSERT INTO public.auth_permission VALUES (78, 'Can change contact message', 20, 'change_contactmessage');
INSERT INTO public.auth_permission VALUES (79, 'Can delete contact message', 20, 'delete_contactmessage');
INSERT INTO public.auth_permission VALUES (80, 'Can view contact message', 20, 'view_contactmessage');
INSERT INTO public.auth_permission VALUES (81, 'Can add client', 21, 'add_client');
INSERT INTO public.auth_permission VALUES (82, 'Can change client', 21, 'change_client');
INSERT INTO public.auth_permission VALUES (83, 'Can delete client', 21, 'delete_client');
INSERT INTO public.auth_permission VALUES (84, 'Can view client', 21, 'view_client');
INSERT INTO public.auth_permission VALUES (85, 'Can add external expense', 22, 'add_externalexpense');
INSERT INTO public.auth_permission VALUES (86, 'Can change external expense', 22, 'change_externalexpense');
INSERT INTO public.auth_permission VALUES (87, 'Can delete external expense', 22, 'delete_externalexpense');
INSERT INTO public.auth_permission VALUES (88, 'Can view external expense', 22, 'view_externalexpense');
INSERT INTO public.auth_permission VALUES (89, 'Can add external income', 23, 'add_externalincome');
INSERT INTO public.auth_permission VALUES (90, 'Can change external income', 23, 'change_externalincome');
INSERT INTO public.auth_permission VALUES (91, 'Can delete external income', 23, 'delete_externalincome');
INSERT INTO public.auth_permission VALUES (92, 'Can view external income', 23, 'view_externalincome');
INSERT INTO public.auth_permission VALUES (93, 'Can add visitor', 24, 'add_visitor');
INSERT INTO public.auth_permission VALUES (94, 'Can change visitor', 24, 'change_visitor');
INSERT INTO public.auth_permission VALUES (95, 'Can delete visitor', 24, 'delete_visitor');
INSERT INTO public.auth_permission VALUES (96, 'Can view visitor', 24, 'view_visitor');


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: anishidra76
--



--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.auth_user VALUES (2, 'pbkdf2_sha256$1500000$I1FKFpOaXd9ZFWcAnBVxAh$XM4Axmv/VPaYPW/1Jh2duueqX+7PndhjAahd8EmzBo4=', '2026-09-09 19:51:27.102+01', true, 'anishidra76', 'Anis', 'Hidra', 'anishidradeveloper76@gmail.com', true, true, '2026-09-08 21:09:50+01');


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: anishidra76
--



--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: anishidra76
--



--
-- Data for Name: authtoken_token; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.authtoken_token VALUES ('855307df23b3b4a6fa49ee9afaca7a4230c78156', '2026-09-08 21:22:29.71+01', 2);


--
-- Data for Name: contact_contactmessage; Type: TABLE DATA; Schema: public; Owner: anishidra76
--



--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.django_admin_log VALUES (11, '2026-09-08 21:12:44.781+01', '1', 'admin', 3, '', 4, 2);
INSERT INTO public.django_admin_log VALUES (12, '2026-09-08 21:13:37.448+01', '2', 'anishidra76', 2, '[{"changed": {"fields": ["First name", "Last name", "Email address"]}}]', 4, 2);


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.django_migrations VALUES (1, 'about', '0001_initial', '2026-09-11 19:59:09.173549+01');
INSERT INTO public.django_migrations VALUES (2, 'achievements', '0001_initial', '2026-09-11 19:59:09.183634+01');
INSERT INTO public.django_migrations VALUES (3, 'achievements', '0002_rename_name_achievementcard_title', '2026-09-11 19:59:09.190278+01');
INSERT INTO public.django_migrations VALUES (4, 'contenttypes', '0001_initial', '2026-09-11 19:59:09.201256+01');
INSERT INTO public.django_migrations VALUES (5, 'auth', '0001_initial', '2026-09-11 19:59:09.280153+01');
INSERT INTO public.django_migrations VALUES (6, 'admin', '0001_initial', '2026-09-11 19:59:09.304202+01');
INSERT INTO public.django_migrations VALUES (7, 'admin', '0002_logentry_remove_auto_add', '2026-09-11 19:59:09.34447+01');
INSERT INTO public.django_migrations VALUES (8, 'admin', '0003_logentry_add_action_flag_choices', '2026-09-11 19:59:09.361928+01');
INSERT INTO public.django_migrations VALUES (9, 'contenttypes', '0002_remove_content_type_name', '2026-09-11 19:59:09.401805+01');
INSERT INTO public.django_migrations VALUES (10, 'auth', '0002_alter_permission_name_max_length', '2026-09-11 19:59:09.416894+01');
INSERT INTO public.django_migrations VALUES (11, 'auth', '0003_alter_user_email_max_length', '2026-09-11 19:59:09.434078+01');
INSERT INTO public.django_migrations VALUES (12, 'auth', '0004_alter_user_username_opts', '2026-09-11 19:59:09.451383+01');
INSERT INTO public.django_migrations VALUES (13, 'auth', '0005_alter_user_last_login_null', '2026-09-11 19:59:09.466069+01');
INSERT INTO public.django_migrations VALUES (14, 'auth', '0006_require_contenttypes_0002', '2026-09-11 19:59:09.468354+01');
INSERT INTO public.django_migrations VALUES (15, 'auth', '0007_alter_validators_add_error_messages', '2026-09-11 19:59:09.482693+01');
INSERT INTO public.django_migrations VALUES (16, 'auth', '0008_alter_user_username_max_length', '2026-09-11 19:59:09.502705+01');
INSERT INTO public.django_migrations VALUES (17, 'auth', '0009_alter_user_last_name_max_length', '2026-09-11 19:59:09.521173+01');
INSERT INTO public.django_migrations VALUES (18, 'auth', '0010_alter_group_name_max_length', '2026-09-11 19:59:09.538241+01');
INSERT INTO public.django_migrations VALUES (19, 'auth', '0011_update_proxy_permissions', '2026-09-11 19:59:09.556913+01');
INSERT INTO public.django_migrations VALUES (20, 'auth', '0012_alter_user_first_name_max_length', '2026-09-11 19:59:09.57308+01');
INSERT INTO public.django_migrations VALUES (21, 'authtoken', '0001_initial', '2026-09-11 19:59:09.597194+01');
INSERT INTO public.django_migrations VALUES (22, 'authtoken', '0002_auto_20160226_1747', '2026-09-11 19:59:09.650279+01');
INSERT INTO public.django_migrations VALUES (23, 'authtoken', '0003_tokenproxy', '2026-09-11 19:59:09.656062+01');
INSERT INTO public.django_migrations VALUES (24, 'authtoken', '0004_alter_tokenproxy_options', '2026-09-11 19:59:09.664791+01');
INSERT INTO public.django_migrations VALUES (25, 'contact', '0001_initial', '2026-09-11 19:59:09.673724+01');
INSERT INTO public.django_migrations VALUES (26, 'home', '0001_initial', '2026-09-11 19:59:09.68151+01');
INSERT INTO public.django_migrations VALUES (27, 'home', '0002_alter_homestatic_projectscompleted_and_more', '2026-09-11 19:59:09.689202+01');
INSERT INTO public.django_migrations VALUES (28, 'management', '0001_initial', '2026-09-11 19:59:09.712152+01');
INSERT INTO public.django_migrations VALUES (29, 'management', '0002_externalexpense_date_alter_client_end_and_more', '2026-09-11 19:59:09.734219+01');
INSERT INTO public.django_migrations VALUES (30, 'projects', '0001_initial', '2026-09-11 19:59:09.743503+01');
INSERT INTO public.django_migrations VALUES (31, 'projects', '0002_projectcard_image', '2026-09-11 19:59:09.750319+01');
INSERT INTO public.django_migrations VALUES (32, 'qualifications', '0001_initial', '2026-09-11 19:59:09.763688+01');
INSERT INTO public.django_migrations VALUES (33, 'services', '0001_initial', '2026-09-11 19:59:09.772504+01');
INSERT INTO public.django_migrations VALUES (34, 'sessions', '0001_initial', '2026-09-11 19:59:09.787656+01');
INSERT INTO public.django_migrations VALUES (35, 'skills', '0001_initial', '2026-09-11 19:59:09.830082+01');
INSERT INTO public.django_migrations VALUES (36, 'skills', '0002_alter_skill_name', '2026-09-11 19:59:09.83979+01');
INSERT INTO public.django_migrations VALUES (37, 'skills', '0003_alter_section_name_alter_sector_name', '2026-09-11 19:59:09.856085+01');
INSERT INTO public.django_migrations VALUES (38, 'visitors', '0001_initial', '2026-09-11 19:59:09.865814+01');
INSERT INTO public.django_migrations VALUES (39, 'visitors', '0002_rename_ip_adress_visitor_ip_address', '2026-09-11 19:59:09.873052+01');


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.django_session VALUES ('0qiqrih7yxyjb2d4d7bblsz0e265hund', '.eJxVjMsOwiAQRf-FtSFARx4u3fcbCMwMUjU0Ke3K-O_apAvd3nPOfYmYtrXGrfMSJxIXYcTpd8sJH9x2QPfUbrPEua3LlOWuyIN2Oc7Ez-vh_h3U1Ou31ozEQTETYAAwFoxDSueAxiU3OALrsrfaW1UCsS8ZcshQjGYzYFDi_QH0qTgY:1x4NOJ:oUu_jLwMkbN7GZL2m7vSgcLVfuGyYhKGrGkY8mySulc', '2026-09-23 19:51:27.106+01');


--
-- Data for Name: home_homestatic; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.home_homestatic VALUES (1, 1, 2);


--
-- Data for Name: management_client; Type: TABLE DATA; Schema: public; Owner: anishidra76
--



--
-- Data for Name: management_externalexpense; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.management_externalexpense VALUES (3, 'Name Cheap', 'Buy a domain', 6.99, '2026-09-11');


--
-- Data for Name: management_externalincome; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.management_externalincome VALUES (1, 'My Self', 'Saving', 21.56, 12.92, 8.64, '2026-07-02');


--
-- Data for Name: projects_projectcard; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.projects_projectcard VALUES (1, 'Portfolio Website', 'Anis Hidra', 'test', 'https://google.com', 'https://anishidra.com', 'https://google.com', 'unnamed_JK2VaM7.png');


--
-- Data for Name: qualifications_certificatecard; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.qualifications_certificatecard VALUES (2, 'Web Development Fundamentals', 'https://www.credly.com/badges/83ca0d97-fd40-468b-93ec-3d70cada206c/public_url', 'web-development-fundamentals.png');


--
-- Data for Name: qualifications_educationcard; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.qualifications_educationcard VALUES (3, 'DataBases', 'Computer Science', 'Institute of Bejaia', '2025 - 2028', 'In Progress');
INSERT INTO public.qualifications_educationcard VALUES (4, 'Web Development', 'Computer Science', 'IBM ( SkillBuild )', '2026', 'Degree Credential');


--
-- Data for Name: services_servicecard; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.services_servicecard VALUES (1, 'WebSites Develpements', 'Portfolio', 'my own Portfolio business');
INSERT INTO public.services_servicecard VALUES (3, 'anis', 'hidra', 'hello');


--
-- Data for Name: skills_domain; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.skills_domain VALUES (1, 'Full Stuck Web Developments');


--
-- Data for Name: skills_sector; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.skills_sector VALUES (1, 'Front End', 1);
INSERT INTO public.skills_sector VALUES (2, 'Back End', 1);
INSERT INTO public.skills_sector VALUES (3, 'Data Base', 1);
INSERT INTO public.skills_sector VALUES (5, 'DevOps & Infrastructure', 1);
INSERT INTO public.skills_sector VALUES (6, 'Development & Design', 1);


--
-- Data for Name: skills_section; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.skills_section VALUES (1, 'Language', 1);
INSERT INTO public.skills_section VALUES (2, 'Frameworks & Libraries', 1);
INSERT INTO public.skills_section VALUES (3, 'Language', 2);
INSERT INTO public.skills_section VALUES (5, 'Frameworks & Libraries', 2);
INSERT INTO public.skills_section VALUES (6, 'Language', 3);
INSERT INTO public.skills_section VALUES (7, 'DBMS SQL', 3);
INSERT INTO public.skills_section VALUES (8, 'DBMS NoSQL', 3);
INSERT INTO public.skills_section VALUES (12, 'Deployments', 5);
INSERT INTO public.skills_section VALUES (14, 'Operating Systems', 5);
INSERT INTO public.skills_section VALUES (17, 'Developments Tools', 6);
INSERT INTO public.skills_section VALUES (18, 'Architecture & Desing', 6);


--
-- Data for Name: skills_skill; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.skills_skill VALUES (1, 'HTML', 90, 1);
INSERT INTO public.skills_skill VALUES (5, 'CSS', 90, 1);
INSERT INTO public.skills_skill VALUES (8, 'JavaScript', 75, 1);
INSERT INTO public.skills_skill VALUES (3, 'React', 75, 2);
INSERT INTO public.skills_skill VALUES (4, 'Python', 95, 3);
INSERT INTO public.skills_skill VALUES (7, 'Java', 70, 3);
INSERT INTO public.skills_skill VALUES (13, 'Django + Django REST', 90, 5);
INSERT INTO public.skills_skill VALUES (15, 'SQL', 50, 6);
INSERT INTO public.skills_skill VALUES (16, 'SQLite', 50, 7);
INSERT INTO public.skills_skill VALUES (17, 'MySQL', 50, 7);
INSERT INTO public.skills_skill VALUES (18, 'PostgreSQL', 50, 7);
INSERT INTO public.skills_skill VALUES (19, 'Redis', 50, 8);
INSERT INTO public.skills_skill VALUES (23, 'Git + GitHub', 50, 12);
INSERT INTO public.skills_skill VALUES (24, 'Name Cheap', 50, 12);
INSERT INTO public.skills_skill VALUES (35, 'Render', 50, 12);
INSERT INTO public.skills_skill VALUES (36, 'Cloud Flare', 50, 12);
INSERT INTO public.skills_skill VALUES (37, 'Oracle', 50, 12);
INSERT INTO public.skills_skill VALUES (55, 'Nginx + Gunicorn', 50, 12);
INSERT INTO public.skills_skill VALUES (56, 'Docker', 50, 12);
INSERT INTO public.skills_skill VALUES (27, 'Linux', 90, 14);
INSERT INTO public.skills_skill VALUES (28, 'Windows', 80, 14);
INSERT INTO public.skills_skill VALUES (44, 'Terminal', 50, 17);
INSERT INTO public.skills_skill VALUES (45, 'VS Code', 50, 17);
INSERT INTO public.skills_skill VALUES (46, 'DBeaver', 50, 17);
INSERT INTO public.skills_skill VALUES (50, 'Postman', 50, 17);
INSERT INTO public.skills_skill VALUES (47, 'Draw.io + UML', 50, 18);
INSERT INTO public.skills_skill VALUES (48, 'System Design', 50, 18);
INSERT INTO public.skills_skill VALUES (49, 'UI/UX Desing', 50, 18);
INSERT INTO public.skills_skill VALUES (51, 'Responsive Design', 50, 18);
INSERT INTO public.skills_skill VALUES (52, 'Figma + Canva', 50, 18);
INSERT INTO public.skills_skill VALUES (53, 'GIMP + Inkscape', 50, 18);


--
-- Data for Name: visitors_visitor; Type: TABLE DATA; Schema: public; Owner: anishidra76
--

INSERT INTO public.visitors_visitor VALUES (1, '127.0.0.1', '', '2026-09-09 12:40:39.625+01');
INSERT INTO public.visitors_visitor VALUES (2, '127.0.0.1', '', '2026-09-09 12:41:25.269+01');
INSERT INTO public.visitors_visitor VALUES (3, '127.0.0.1', '', '2026-09-09 12:55:38.69+01');
INSERT INTO public.visitors_visitor VALUES (4, '127.0.0.1', '', '2026-09-09 12:59:14.38+01');


--
-- Name: about_aboutcontent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.about_aboutcontent_id_seq', 1, true);


--
-- Name: achievements_achievementcard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.achievements_achievementcard_id_seq', 5, true);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 96, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 2, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: contact_contactmessage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.contact_contactmessage_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 12, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 24, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 39, true);


--
-- Name: home_homestatic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.home_homestatic_id_seq', 1, true);


--
-- Name: management_client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.management_client_id_seq', 1, false);


--
-- Name: management_externalexpense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.management_externalexpense_id_seq', 3, true);


--
-- Name: management_externalincome_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.management_externalincome_id_seq', 1, true);


--
-- Name: projects_projectcard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.projects_projectcard_id_seq', 2, true);


--
-- Name: qualifications_certificatecard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.qualifications_certificatecard_id_seq', 2, true);


--
-- Name: qualifications_educationcard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.qualifications_educationcard_id_seq', 5, true);


--
-- Name: services_servicecard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.services_servicecard_id_seq', 3, true);


--
-- Name: skills_domain_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.skills_domain_id_seq', 1, true);


--
-- Name: skills_section_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.skills_section_id_seq', 18, true);


--
-- Name: skills_sector_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.skills_sector_id_seq', 6, true);


--
-- Name: skills_skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.skills_skill_id_seq', 57, true);


--
-- Name: visitors_visitor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anishidra76
--

SELECT pg_catalog.setval('public.visitors_visitor_id_seq', 4, true);


--
-- PostgreSQL database dump complete
--

\unrestrict EhWN2puIEAX4e3S7eQNCqt9pggi3mOh3YpDUul7nf0s1CJ0Vtc2ySzdLlIvL9i6

