
drop schema if exists irisbisuteria;

create database irisbisuteria;
use irisbisuteria;

create table category (
	idCategory int not null auto_increment,
    categorys varchar(10),
    primary key (idCategory)
);

insert into category (categorys)
	values('Pulceras'),('Chokers'),('Anillos'),('Aretas');
    
create table products(
	idProduct varchar(50) not null unique,
    nameProduct varchar(25) not null,
    description varchar(250) not null,
    price int not null,
    laborPrice int not null,
    image varchar(250) not null,
    idCategory int not null,
    primary key (idProduct),
    foreign key (idCategory) references category(idCategory)
);

