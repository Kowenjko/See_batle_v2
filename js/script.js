// клас для створення кораблів
class Ship {
  constructor(start, desk, direction) {
    this.start = start;
    this.desk = desk;
    this.direction = direction;
  }
  // будуємо корабель
  creatShip(class_ship, class_generic, class_put) {
    let step = this.direction == "v" ? 10 : 1; // Шаг залежить від направлення
    let direct = this.direction == "v" ? this.desk * 10 : this.desk; // закінчення корабля
    for (let i = this.start; i < this.start + direct; i += step) {
      //Добавляємо класс основного корабля
      document.querySelector(`.d-${i}`).classList.add(class_ship);
      document.querySelector(`.d-${i}`).classList.add(class_generic);
      document.querySelector(`.d-${i}`).classList.add(class_put);
    }
  }
  creatShipComp(class_ship, class_generic, class_put) {
    let step = this.direction == "v" ? 10 : 1; // Шаг залежить від направлення
    let direct = this.direction == "v" ? this.desk * 10 : this.desk; // закінчення корабля
    for (let i = this.start; i < this.start + direct; i += step) {
      //Добавляємо класс основного корабля
      document.querySelector(`.d-comp-${i}`).classList.add(class_ship);
      document.querySelector(`.d-comp-${i}`).classList.add(class_generic);
      document.querySelector(`.d-comp-${i}`).classList.add(class_put);
    }
  }
  removeShip() {
    let step = this.direction == "v" ? 10 : 1; // Шаг залежить від направлення
    let direct = this.direction == "v" ? this.desk * 10 : this.desk; // закінчення корабля
    for (let i = this.start; i < this.start + direct; i += step) {
      //Добавляємо класс основного корабля
      if (document.querySelector(`.d-${i}`).classList.contains(`ship`)) {
        document.querySelector(`.d-${i}`).classList.remove(`ship`);
      }
    }
  }
  // будуємо межі горозонтальні
  createBound_x(class_chip, class_bound, bound_ship) {
    let end_b =
      this.direction == "v" ? this.start - 8 : this.start + this.desk - 9; // закынчення межі
    let end_x = end_b % 10 == 1 ? end_b - 1 : end_b; // перевіряємо чи ми знаходимось на правому краю
    // console.log((end_b % 10))
    let step_x = this.direction == "v" ? 10 * (this.desk + 1) : 20; //межа яка знизу
    let start_x = this.start % 10 ? 11 : 10; // перевіряємо чи знаходимось на крає з ліва
    for (let i = this.start - start_x; i < end_x; i += 1) {
      //Добавляємо межі по х
      if (i >= 0) {
        document
          .querySelector(`.${class_chip}-${i}`)
          .classList.add(class_bound); // верхня межа
        document.querySelector(`.${class_chip}-${i}`).classList.add(bound_ship); // верхня межа
        // arr.push(i);
      }
      if (i + step_x <= 99) {
        document
          .querySelector(`.${class_chip}-${i + step_x}`)
          .classList.add(class_bound); // нижня межа
        document
          .querySelector(`.${class_chip}-${i + step_x}`)
          .classList.add(bound_ship); // нижня межа
        // arr.push(i + step_x);
      }
    }
  }
  // будуємо межі вертикальні
  createBound_y(class_chip, class_bound, bound_ship) {
    let step = this.direction == "v" ? 10 : 1; // Шаг залежить від направлення
    let direct_y = this.direction == "v" ? this.desk * 10 : 1; // закінчення межі
    let end_y = this.direction == "v" ? 1 : this.desk; // початок правої межі
    for (let i = this.start; i < this.start + direct_y; i += step) {
      //Добавляємо межі по у
      if (i % 10) {
        document
          .querySelector(`.${class_chip}-${i - 1}`)
          .classList.add(class_bound); // ліва межа
        document
          .querySelector(`.${class_chip}-${i - 1}`)
          .classList.add(bound_ship); // ліва межа
      }
      if ((i % 10) - 9 != 0) {
        document
          .querySelector(`.${class_chip}-${i + end_y}`)
          .classList.add(class_bound); // права межа
        document
          .querySelector(`.${class_chip}-${i + end_y}`)
          .classList.add(bound_ship); // права межа
      }
    }
  }
}
// ---------------------------------------------
let wrap = document.querySelector(".wrap");
let res_user = document.querySelector(".res-user");
let res_comp = document.querySelector(".res-comp");
let $comp = document.querySelector(".comp");
let number_user = document.querySelector(".number-user");
let number_comp = document.querySelector(".number-comp");
let wraper = document.querySelector(".wrapper");
let wrapper_comp = document.querySelector(".wrapper-comp");
let wrapper_melting = document.querySelector(".wrapper-melting");
let ship_sample = document.querySelector(".ship-sample");
let place = document.querySelector(".place");
let start_games = document.querySelector(".start-games");
let avto = document.querySelector(".avto");
let manual = document.querySelector(".manual");

let informat = document.querySelector(".informat p");
let info_user = document.querySelector(".info-user p");
let info_comp = document.querySelector(".info-comp p");

let games_start_user = false;
let games_start_comp = false;
let arr_user_bound = [];
let shot_games = true;
let avto_local = 0;
let win_user = false;
let win_comp = false;
// ----------------Я-------------------------------
for (let i = 0; i < 100; i++) {
  let div_x = document.createElement("div");
  div_x.classList.add(`d-${i}`);
  // div_x.innerHTML = i;
  wraper.append(div_x);
}
// -----------------comp------------------------------
for (let i = 0; i < 100; i++) {
  let div_x = document.createElement("div");
  div_x.classList.add(`d-comp-${i}`);
  // div_x.innerHTML = i;
  wrapper_comp.append(div_x);
}
// -----------------------------------------------
let posit = ["v", "h"];
let index_direct = 0;
let arr_horiz = ["Р", "Е", "С", "П", "У", "Б", "Л", "І", "К", "А"];
let arr_vertic = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
// let ship_desk = 2;
// -----------------Створення надпису над клетками------------------------------
function createInscription(name, where, class_name) {
  let name_ins = document.createElement("div");
  name_ins.classList.add(`${class_name}`);
  for (let i = 0; i < name.length; i++) {
    let name_x = document.createElement("span");

    name_x.innerHTML = name[i];
    name_ins.append(name_x);
  }
  where.append(name_ins);
}
createInscription(arr_horiz, res_user, "h-user");
createInscription(arr_horiz, res_comp, "h-comp");
createInscription(arr_vertic, number_user, "v-user");
createInscription(arr_vertic, number_comp, "v-comp");

// -----------------Створення зразка корабля з ниизу------------------------------
function createSample(end) {
  for (let i = 0; i < end; i++) {
    let div_x = document.createElement("div");
    div_x.classList.add(`ship-samp`);
    // div_x.innerHTML = i;
    ship_sample.append(div_x);
  }
}
// -----------------Видаленнязразка корабля з ниизу------------------------------
function ContainerRemove(obj) {
  while (obj.firstChild) {
    obj.removeChild(obj.firstChild);
  }
}
// ----------------0 чи 90 градусів--------------------------------------
ship_sample.addEventListener("click", function () {
  console.log(this);
  if (index_direct == 1) {
    this.style.flexDirection = "column";
    index_direct = 0;
  } else {
    this.style.flexDirection = "row";
    index_direct++;
  }
});
// ------------------------------------------------------
let cletka = document.querySelectorAll(".wrapper div");
let cletka_comp = document.querySelectorAll(".wrapper-comp div");
let arr_desk = [0, 1, 2, 3];
let arr_ships = [4, 3, 2, 1];
let arr_count = new Array(10).fill(0); //створюю масив з 0
let arr_count_comp = new Array(10).fill(0); //створюю масив з 0
// ------------------------------------------------------
let numReserve = [];
let numReserve_comp = [];
// ------------------------------------------------------
// -----------Формування рандом масиву ---------------
function createPut() {
  let num = [];
  while (num.length < 100) {
    let randomNumber = getRandom(0, 100);
    let found = false;
    for (let it = 0; it < num.length; it++) {
      if (num[it] === randomNumber) {
        found = true;
        break;
      }
    }
    if (!found) {
      num[num.length] = randomNumber;
    }
  }
  return num;
}
numReserve = createPut(); // масив для пострілу
// ------------------------------------------------------
let arr_puch = [];
let arr_board_puch = [];
// -----функція для видалення всіх класів------
function removeClass(where, class_add) {
  where.forEach((item, i) => {
    //удаляємо всі класи для повторної розтановки
    item.className = "";
    item.classList.add(`${class_add}-${i}`);
  });
}
// --------------------------------------------
function avtoCreate(where, choice) {
  // console.log(where)
  if (choice == "avto_comp") {
    removeClass(where, "d-comp");
  } else {
    removeClass(where, "d");
  }
  //якщо є удаляємо зразок корабля
  let ship_sample = document.querySelector(".ship-sample");
  if (ship_sample && choice != "avto_comp") {
    ContainerRemove(ship_sample);
  }
  let index = 0;
  let index_melting = 0;
  let create_ship = false;
  let restart_avto = false;
  let arr_bord = [];
  numReserve_comp = createPut(); // масив для ротановки кораблів
  for (let i = 3; i >= 0; i--) {
    // роставляємо кораблі компютера
    // console.log('---------------------------')
    for (let j = 0; j < arr_ships[i]; j++) {
      console.log(`палуба ${i + 1} кораблів ${j + 1}`);
      console.log("start=" + numReserve_comp[j]);
      let rand_pos = getRandom(0, 2);

      // перевіряємо чи 2-палубний розмущується в зоні
      if (
        i == 1 &&
        ((numReserve_comp[j] > 79 && rand_pos == 0) ||
          (numReserve_comp[j] % 10 > 7 && rand_pos == 1))
      ) {
        numReserve_comp.push(numReserve_comp.shift());
        console.log("remove 2");
        create_ship = false;
      }
      // перевіряємо чи 3-палубний розмущується в зоні
      else if (
        i == 2 &&
        ((numReserve_comp[j] > 69 && rand_pos == 0) ||
          (numReserve_comp[j] % 10 > 6 && rand_pos == 1))
      ) {
        numReserve_comp.push(numReserve_comp.shift());
        console.log("remove 3");
        create_ship = false;
      }
      // перевіряємо чи 4-палубний розмущується в зоні
      else if (
        i == 3 &&
        ((numReserve_comp[j] > 59 && rand_pos == 0) ||
          (numReserve_comp[j] % 10 > 5 && rand_pos == 1))
      ) {
        numReserve_comp.push(numReserve_comp.shift());
        console.log("remove 4");
        create_ship = false;
      }
      //перевіряємо чи частина корабля не попадає в зону

      // Якщо все вірно будуємо корабль
      else {
        let arr = [];
        let cros = [];
        cros = putBound(numReserve_comp[j], i + 1, posit[rand_pos]); //записуємо розмір корабля в масив
        console.log(cros);
        cros.forEach((item) => {
          arr.push(arr_bord.indexOf(item));
        });
        console.log(arr);
        console.log("arr=" + arr.some((elem) => elem > 0)); //перевіряємо чи частина корабля не песікається з ішим
        // arr.some(elem => elem == false) ? create_ship = true : create_ship = false;
        arr.some((elem) => elem > 0)
          ? (create_ship = false)
          : (create_ship = true); //перевіряємо чи частина корабля не песікається з ішим
      }
      if (create_ship) {
        console.log("end=" + numReserve_comp[j]);

        if (choice == "avto_comp") {
          index_melting++;
          let cor = new Ship(numReserve_comp[j], i + 1, posit[rand_pos]);
          cor.creatShipComp(
            `desk-${i + 1}-ship-${j + 1}`,
            "ship-put-comp",
            "put"
          );
          cor.createBound_x("d-comp", `bound`, `bound-${i + 1}-${j + 1}`);
          cor.createBound_y("d-comp", `bound`, `bound-${i + 1}-${j + 1}`);
        } else {
          index_melting++;
          let ship = new Ship(numReserve_comp[j], i + 1, posit[rand_pos]);
          // cor.creatShip(`desk-${i + 1}-ship-${j}`);
          ship.creatShip(`desk-${i + 1}-ship-${j + 1}`, `ship-put`, "put");
          ship.createBound_x("d", `bound`, `bound-${i + 1}-${j + 1}`);
          ship.createBound_y("d", `bound`, `bound-${i + 1}-${j + 1}`);
        }
        create_ship = false;
      } else {
        j--;
        create_ship = false;
        index++;
      }

      console.log("index=" + index);
      console.log("index_melting=" + index_melting);
      if (index_melting > 9) {
        console.log("Розтановка закінчена");
        if (choice == "avto_comp") {
          games_start_comp = true;
        }
        if (choice == "avto_user") {
          games_start_user = true;
        }
      }
      if (index > 20) {
        console.log("Розтановка не получилась");
        avtoCreate(where, choice);
      }
      // else { console.log('Розтановка закінчена'); }

      where.forEach((item, i) => {
        if (
          item.classList.contains("bound") ||
          item.classList.contains("bound") ||
          item.classList.contains("ship-put") ||
          item.classList.contains("ship-put-comp")
        ) {
          arr_bord.push(i);
        }
      });
      numReserve_comp = numReserve_comp.filter((e) => !~arr_bord.indexOf(e)); // удаляємо із масива занітий участок
    }
  }
}
//записуємо номера корабля в масив
function putBound(start, desk, direction) {
  let arr_lend = [];
  let step = direction == "v" ? 10 : 1; // Шаг залежить від направлення
  let direct = direction == "v" ? desk * 10 : desk; // закінчення корабля
  for (let i = start; i < start + direct; i += step) {
    //Добавляємо класс основного корабля
    arr_lend.push(i);
  }
  return arr_lend;
}
// ----рандомна функція-------------
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
// --------------------стрільба користувача----------------------------------
// function shotAnswer(id) {
//     shipHit("wrapper-comp", item, id);
// }
let copyFunc = null;
let start = true;
let index_shot = 0;
function shotUser(id) {
  cletka_comp.forEach((item) => {
    // copyFunc = shipHit.bind(null, "wrapper-comp", item, id);
    item.addEventListener("click", () => {
      start ? shipHit("wrapper-comp", item, id) : console.log("Нельзя");
    });
  });
}
// ---------------постріли компютера і користувача--------------------

function shot() {
  index_shot = 0;
  if (games_start_comp && games_start_user) {
    let id_shot = setInterval(() => {
      if (index_shot > 99) {
        // всі постріли
        clearInterval(id_shot);
      } else {
        if (shot_games) {
          informat.style.color = "#000";
          informat.textContent = "Ваш постріл";
          shotUser(id_shot);
        } else {
          informat.style.color = "#000";
          informat.textContent = "Cтріляє компютер";
          console.log(numReserve);
          shipHit("wrapper", cletka[numReserve[index_shot]], id_shot);

          numReserve.shift(); //удаляємо стріляний елемент
          cletka.forEach((item, i) => {
            if (item.classList.contains("border-intact")) {
              arr_board_puch.push(i);
            }
          });
          console.log(arr_board_puch);

          arr_board_puch = arr_board_puch.filter(function (item, pos) {
            return arr_board_puch.indexOf(item) == pos; // удаляємо дубликати із масива
          });

          console.log(arr_board_puch);
          numReserve = numReserve.filter((e) => !~arr_board_puch.indexOf(e)); // удаляємо із масива занітий участок
        }
      }
    }, 1000);
  }
}
let arr_ship_user = [];
let arr_ship_comp = [];

// ---------------функція выдображення попадання в корабел------------------------------
function fireShip(class_field, where) {
  if (class_field == "wrapper") {
    info_user.textContent = "Ранив";
    info_user.style.color = "rgb(33, 145, 37)";
    shot_games = false;

    where.classList.add("fire");
    setTimeout(() => where.classList.remove("fire"), 430);
    where.classList.add("got");
  } else {
    info_comp.textContent = "Ранив";
    info_comp.style.color = "rgb(33, 145, 37)";
    shot_games = true;

    where.classList.add("fire");
    setTimeout(() => where.classList.remove("fire"), 430);
    where.classList.add("got");
  }

  console.log("Ранив");
}
// ----------------функція информування подбиття корабля--------------------------------------
function putShip(where, number, class_name, class_field, number_ship) {
  if (class_field == "wrapper") {
    if (where.length == 0 && arr_count[number] == 0) {
      console.log("я зайшов туди", +where.length);
      // console.log('я зайшов туди', +where)
      info_user.style.color = "rgb(33, 145, 37)";
      info_user.textContent = `${number_ship} палубний підбитий`;
      arr_count[number] = 1;
      borderIntact(class_name);
    }
  } else {
    if (where.length == 0 && arr_count_comp[number] == 0) {
      console.log("я зайшов сюди", +where.length);
      info_comp.style.color = "rgb(33, 145, 37)";
      info_comp.textContent = `${number_ship} палубний підбитий`;
      arr_count_comp[number] = 1;
      borderIntact(class_name);
    }
  }
}

// ----------------функція розтановки зони покругу корабля--------------------------------------
function borderIntact(where) {
  let bound = document.querySelectorAll(where);
  // console.log(bound)
  bound.forEach((item) => {
    if (!item.classList.contains("miss")) {
      item.classList.add("border-intact");
    }
  });
}
// ----------------функція попадання в корабель--------------------------------------
function shipHit(class_field, index, id_shot) {
  let desk_1_ship_1 = document.querySelectorAll(
    `.${class_field} .desk-1-ship-1`
  );
  let desk_1_ship_2 = document.querySelectorAll(
    `.${class_field} .desk-1-ship-2`
  );
  let desk_1_ship_3 = document.querySelectorAll(
    `.${class_field} .desk-1-ship-3`
  );
  let desk_1_ship_4 = document.querySelectorAll(
    `.${class_field} .desk-1-ship-4`
  );
  let desk_2_ship_1 = document.querySelectorAll(
    `.${class_field} .desk-2-ship-1`
  );
  let desk_2_ship_2 = document.querySelectorAll(
    `.${class_field} .desk-2-ship-2`
  );
  let desk_2_ship_3 = document.querySelectorAll(
    `.${class_field} .desk-2-ship-3`
  );
  let desk_3_ship_1 = document.querySelectorAll(
    `.${class_field} .desk-3-ship-1`
  );
  let desk_3_ship_2 = document.querySelectorAll(
    `.${class_field} .desk-3-ship-2`
  );
  let desk_4_ship_1 = document.querySelectorAll(
    `.${class_field} .desk-4-ship-1`
  );
  let put = document.querySelectorAll(`.${class_field} .put`);
  //   ------------------------------------------------------------
  if (put.length == 0) {
    // якщо підбиті всі кораблі
    if (class_field == "wrapper") {
      console.log("Переміг комп");
      informat.style.color = "red";
      informat.textContent = "Ви проиграли!!";
      shot_games = true;
      arr_ship_user = [];
      arr_ship_comp = [];
      arr_puch = [];
      arr_board_puch = [];
      numReserve = createPut();
    }
    if (class_field == "wrapper-comp") {
      console.log("Переміг Я");
      informat.style.color = "green";
      informat.textContent = "Ви виграли!!!";
      arr_ship_user = [];
      arr_ship_comp = [];
      arr_puch = [];
      arr_board_puch = [];
      shot_games = true;
      numReserve = createPut();
    }
    console.log("Game over");
    clearInterval(id_shot);
    // index_shot = 100;
  } else {
    if (index.classList.contains("desk-1-ship-1")) {
      index.classList.remove("desk-1-ship-1");
      fireShip(class_field, index);
    } else if (index.classList.contains("desk-1-ship-2")) {
      index.classList.remove("desk-1-ship-2");
      fireShip(class_field, index);
    } else if (index.classList.contains("desk-1-ship-3")) {
      index.classList.remove("desk-1-ship-3");
      fireShip(class_field, index);
    } else if (index.classList.contains("desk-1-ship-4")) {
      index.classList.remove("desk-1-ship-4");
      fireShip(class_field, index);
    } else if (index.classList.contains("desk-2-ship-1")) {
      index.classList.remove("desk-2-ship-1");
      fireShip(class_field, index);
    } else if (index.classList.contains("desk-2-ship-2")) {
      index.classList.remove("desk-2-ship-2");
      fireShip(class_field, index);
    } else if (index.classList.contains("desk-2-ship-3")) {
      index.classList.remove("desk-2-ship-3");
      fireShip(class_field, index);
    } else if (index.classList.contains("desk-3-ship-1")) {
      index.classList.remove("desk-3-ship-1");
      fireShip(class_field, index);
    } else if (index.classList.contains("desk-3-ship-2")) {
      index.classList.remove("desk-3-ship-2");
      fireShip(class_field, index);
    } else if (index.classList.contains("desk-4-ship-1")) {
      index.classList.remove("desk-4-ship-1");
      fireShip(class_field, index);
    }
    if (index.classList.contains("ship-put-comp")) {
      index.classList.remove("put");
    } else if (index.classList.contains("ship-put")) {
      index.classList.remove("put");
    } else {
      if (class_field == "wrapper") {
        info_user.textContent = "Мімо";
        info_user.style.color = "rgb(234, 15, 15)";
        shot_games = true;
      } else {
        info_comp.textContent = "Мімо";
        info_comp.style.color = "rgb(234, 15, 15)";
        shot_games = false;
      }
      index.classList.add("fire");
      setTimeout(() => index.classList.remove("fire"), 430);
      index.classList.add("miss");

      if (class_field == "wrapper") {
        shot_games = true;
        start = true;
      }
      if (class_field == "wrapper-comp") {
        shot_games = false;
        start = false;
      }
    }
    putShip(desk_1_ship_1, 0, `.${class_field} .bound-1-1`, class_field, 1);
    putShip(desk_1_ship_2, 1, `.${class_field} .bound-1-2`, class_field, 1);
    putShip(desk_1_ship_3, 2, `.${class_field} .bound-1-3`, class_field, 1);
    putShip(desk_1_ship_4, 3, `.${class_field} .bound-1-4`, class_field, 1);

    putShip(desk_2_ship_1, 4, `.${class_field} .bound-2-1`, class_field, 2);
    putShip(desk_2_ship_2, 5, `.${class_field} .bound-2-2`, class_field, 2);
    putShip(desk_2_ship_3, 6, `.${class_field} .bound-2-3`, class_field, 2);

    putShip(desk_3_ship_1, 7, `.${class_field} .bound-3-1`, class_field, 3);
    putShip(desk_3_ship_2, 8, `.${class_field} .bound-3-2`, class_field, 3);

    putShip(desk_4_ship_1, 9, `.${class_field} .bound-4-1`, class_field, 4);
  }
  // shot_games ? (start = true) : (start = false);
}
// ---------------Розтановка кораблів я --------------------------
// ---------------ручна установка кораблів-------------------
function createManual() {
  removeClass(cletka, "d");
  let j = 0;
  let ship_desk = 0;
  createSample(ship_desk + 1);
  //ручна установка кораблів
  cletka.forEach((item, n) => {
    // при наведенні показуємо корабель
    item.addEventListener("mouseover", (event) => {
      if (ship_desk < 4) {
        new Ship(n, ship_desk + 1, posit[index_direct]).creatShip("ship");
      }
    });
    // при відведенні удаляємо корабль
    item.addEventListener("mouseout", (event) => {
      if (ship_desk < 4) {
        new Ship(n, ship_desk + 1, posit[index_direct]).removeShip();
      }
    });
    // -------------установка кораблів-----------------------------------------
    item.addEventListener("click", (event) => {
      if (arr_desk[ship_desk] == ship_desk) {
        j++;
        let ship = new Ship(n, ship_desk + 1, posit[index_direct]);
        let fg = [];
        ship.creatShip(`desk-${ship_desk + 1}-ship-${j}`, "ship-put", "put");

        ship.createBound_x("d", `bound`, `bound-${ship_desk + 1}-${j}`, fg);
        ship.createBound_y("d", `bound`, `bound-${ship_desk + 1}-${j}`, fg);

        console.log("--------------");
        console.log(`Палуб ${ship_desk + 1} корабель=${j}`);
        console.log("--------------");

        if (j == arr_ships[ship_desk]) {
          let ship_sample = document.querySelector(".ship-sample");
          if (ship_sample) {
            ContainerRemove(ship_sample);
          }
          ship_desk++;
          if (ship_desk < 4) {
            createSample(ship_desk + 1);
          }
          j = 0;
          if (ship_desk == 4) {
            games_start_user = true;
            console.log("END");
          }
        }
      }
    });
    // ------------------------------------------------------
  });
}
// ------------------------------------------------------------
place.addEventListener("click", function () {
  // -----------установка авто чи ручний--------------------
  arr_count = new Array(10).fill(0); //створюю масив з 0
  arr_count_comp = new Array(10).fill(0); //створюю масив з 0
  wrapper_melting.style.display = "flex";
  $comp.style.display = "none";
  res_comp.style.color = "#fff";
  let count_regim = 0;
  arr_ship_user = [];
  arr_ship_comp = [];
  arr_puch = [];
  arr_board_puch = [];
  shot_games = true;
  numReserve = createPut();
  info_user.textContent = "";
  info_comp.textContent = "";
  informat.textContent = "Розтавте кораблі";
  avto.addEventListener("click", () => {
    avtoCreate(cletka, "avto_user");
  });
  manual.addEventListener("click", createManual);
  avtoCreate(cletka_comp, "avto_comp");
  shot_games = true;
  start = true;
  place.textContent = "Поробувати ще раз";
});
// -----------------------------------------------
start_games.addEventListener("click", () => {
  wrapper_melting.style.display = "none";
  $comp.style.display = "grid";
  res_comp.style.color = "#000";
  shot();
});
