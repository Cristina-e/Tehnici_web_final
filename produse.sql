DROP TABLE produse;
DROP TYPE IF EXISTS culoare_produs;
DROP TYPE IF EXISTS tipuri_produse;

CREATE TYPE culoare_produs AS ENUM( 'roz', 'albastru', 'verde', 'maro', 'negru','transparent','auriu');
CREATE TYPE tipuri_produse AS ENUM('corectare vedere', 'protectie solara', 'fara dioptrii');


CREATE TABLE IF NOT EXISTS produse (
   id serial PRIMARY KEY,
   nume VARCHAR(100) NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   latime_lentila INT NOT NULL CHECK (latime_lentila>=0),   
   tip_produs tipuri_produse DEFAULT 'corectare vedere',
   producator VARCHAR(50) NOT NULL,
   culoare culoare_produs DEFAULT 'transparent',
   disponibil_magazin VARCHAR [], --pot sa nu fie specificare deci nu punem NOT NULL
   pe_stoc BOOLEAN NOT NULL DEFAULT TRUE,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);

INSERT into produse (nume,descriere,pret, latime_lentila, tip_produs,producator,culoare, disponibil_magazin, pe_stoc, imagine) VALUES 
('Ochelari de soare dama', 'Model VO5457S 27644L, rama din plastic in stil fluture', 359 , 53, 'protectie solara','Vogue', 'albastru', '{"Bucuresti Iuliu Maniu","Bucuresti Baneasa","Brasov","Craiova"}', True, 'soare_albastru.jpg'),

('Ochelari de soare barbati', 'Model AK17006 C02, rama din metal in stil rodund', 229 , 51, 'protectie solara', 'Polarizen' ,'auriu', '{"Bucuresti Baneasa","Brasov","Craiova"}', True, 'soare_auriu.jpg'),

('Ochelari de soare dama', 'Model AX4120S 821313, rama din plastic in stil pisica', 350 , 49,  'protectie solara','Armani', 'maro', '{"Constanta","Brasov","Cluj"}', True,'soare_maro.jpg'),

('Ochelari de soare unisex', 'Model GX482W 921, rama din plastic in stil clasic', 500 , 50,  'protectie solara', 'Guess','negru', '{"Bucuresti Iuliu Maniu","Constanta","Brasov","Cluj"}', True,'soare_negru.jpg'),

('Ochelari de soare dama', 'Model AO5457S 67644L, rama din metal in stil rotund', 600 , 55,  'protectie solara','Hawkers', 'roz', NULL, False,'soare_roz.jpg'),


('Ochelari de soare copii', 'Model DX682W 218, rama din plastic in stil clasic', 200 , 47, 'protectie solara','Puma', 'verde', '{"Bucuresti Iuliu Maniu","Bucuresti Baneasa"}', False, 'soare_verde.jpg'),

('Ochelari de vedere copii', 'Model WZ682A 67644L, rama din plastic in stil rotund', 248 , 48, 'corectare vedere','Vupoint', 'albastru', '{"Constanta","Brasov","Cluj"}', True, 'ochelari_albastru.jpg'),

('Ochelari de vedere dama', 'Model A57S 44L, rama din metal in stil rotund',  405,51 , 'corectare vedere','Ana Hickmann', 'auriu', '{"Bucuresti Iuliu Maniu","Cluj","Timisoara"}', False, 'ochelari_auriu.jpg'),

('Ochelari de vedere unisex', 'Model V57AB 94L, rama din plastic in stil dreptunghi',  487,51, 'corectare vedere', 'Guess','negru', '{"Bucuresti Baneasa"}', True, 'ochelari_negru.jpg'),

('Ochelari de vedere dama', 'Model AX4120S 821313, rama din plastic in stil pisica', 378 , 55, 'corectare vedere','Ana Hickmann','roz', '{"Cluj","Timisoara"}', True, 'ochelari_roz.jpg'),

('Ochelari de vedere copii', 'Model CG682A 44F, rama din plastic in stil clasic', 298 , 47, 'corectare vedere','Polarizen','transparent', '{"Timisoara"}', False, 'ochelari_transparent.jpg'),

('Ochelari de vedere unisex', 'Model BG782S 34E, rama din plastic in stil rotund', 426 , 52, 'corectare vedere','Polarizen','verde', '{"Timisoara"}', True, 'ochelari_verde.jpg'),

('Lentile de contact colorate', 'Pentru când te-ai saturat de culoarea ta naturala si vrei sa incerci ceva albastru!', 100 , 14,  'fara dioptrii', 'EyeCool','albastru' ,'{"Bucuresti Iuliu Maniu","Bucuresti Baneasa"}', True, 'lentile_albastre.jpg'),


('Lentile de contact colorate', 'Pentru când te-ai saturat de culoarea ta naturala si vrei sa incerci ceva verde!', 100 , 14,  'fara dioptrii', 'EyeCool','verde' ,'{"Cluj","Bucuresti Baneasa"}', False, 'lentile_verzi.jpg'),

('Lentile de contact vedere', 'Pentru când te-ai saturat de ochelari si vrei sa vezi clar', 97 , 13,  'corectare vedere', 'EyeCool','albastru', '{"Bucuresti Iuliu Maniu"}', True, 'lentile_de_contact.jpg');