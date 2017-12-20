CREATE TABLE books
(
    id int not NULL PRIMARY key,
    title varchar(255) not null,
    author VARCHAR(100) not null
)

insert into books
values(1, 'MyBook', 'myAuthor'),
(2, 'Childhood', 'Lev Nikolayevich Tolstoy'),
(3, 'Life On The Mississippi', 'Mark Twain'),
(4, 'The Wind in the Willows', 'Kenneth Grahame'),
(5, 'The Dark World', 'Henry Kuttner'),
(6, 'A Journey into the Center of the Earth', 'Jules Verne')