// table creare script
const BOOK_TABLE_SCRIPT = `
CREATE TABLE books (
	bookid serial4 NOT NULL,
	title varchar(100) NOT NULL,
	author varchar(100) NOT NULL,
	isbn varchar NULL,
	publisher varchar(100) NOT NULL,
	pages int4 NULL,
	desciption text NOT NULL,
	releasedate int4 NULL,
	storesid int4 NOT NULL,
	CONSTRAINT books_pkey PRIMARY KEY (bookid)
);
`;

const STORE_TABLE_SCRIPT = `
CREATE TABLE stores (
	storeid serial4 NOT NULL,
	"name" text NULL,
	address text NULL,
	CONSTRAINT stores_pkey PRIMARY KEY (storeid)
);
`;

const AUDIT_TABLE_SCRIPT = `
CREATE TABLE IF NOT EXISTS audit (
    audit_id serial PRIMARY KEY,
    audit_action VARCHAR ( 50 ) NOT NULL,
    audit_data json NOT NULL,
    audit_status INTEGER NOT NULL,
    audit_error json,
    audit_by VARCHAR ( 50 ),
    audit_on TIMESTAMP NOT NULL
)
`;
