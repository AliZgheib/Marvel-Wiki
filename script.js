$(document).ready(() => {
  let allHeroes;
  let HeroesExist = false;
  const up = document.querySelector(".up");
  const doubleUp = document.querySelector(".up2");
  const down = document.querySelector(".down");
  let currentHero = 0;

  //scrolling up and down
  up.addEventListener("click", () => {
    if (HeroesExist && currentHero - 1 >= 0) {
      currentHero--;
      allHeroes[currentHero].scrollIntoView(true);
    }
  });

  doubleUp.addEventListener("click", () => {
    if (HeroesExist) {
      document.querySelector(".search").scrollIntoView(true);
      HeroesExist = false;
      document.querySelector("#input").focus();
      currentHero = 0;
    }
  });

  down.addEventListener("click", () => {
    if (HeroesExist && currentHero + 1 < allHeroes.length) {
      currentHero++;
      allHeroes[currentHero].scrollIntoView(true);
    }
  });

  // when the user click on search button
  $("body").on("click", "#submit", (e) => {
    e.preventDefault();

    var data = $("#input").val();

    $.ajax({
      url: `https://www.superheroapi.com/api.php/3620246178017898/search/${data}`,
      dataType: "json",
      success: function (data) {
        if (data["response"] == "error") {
          //error
          alert("An Error Occured");
        } else {
          //everything is fine but maybe 1 id OR more
          $(".heros").html("");

          //check if the hero have more than 1 id

          if (data["results"].length > 0) {
            HeroesExist = true;
            $(".heros").html("");
            $(".heros").height("100%");
            //alert(data['results'].length);

            $.each(data["results"], function (index, eachhero) {
              var img = eachhero["image"]["url"];

              //creating hero div
              var hero = document.createElement("div");
              hero.setAttribute("class", `hero${index} eachhero`);

              //getting id
              var id = eachhero["id"];

              //getting name
              var name = eachhero["name"];

              //getting power stats

              var intelligence = eachhero["powerstats"]["intelligence"];
              var strength = eachhero["powerstats"]["strength"];
              var speed = eachhero["powerstats"]["speed"];
              var durability = eachhero["powerstats"]["durability"];
              var power = eachhero["powerstats"]["power"];
              var combat = eachhero["powerstats"]["combat"];

              //getting biography

              var fullname = eachhero["biography"]["full-name"];
              var alteregos = eachhero["biography"]["alter-egos"];
              var aliases = eachhero["biography"]["aliases"];
              var pob = eachhero["biography"]["place-of-birth"];
              var firstapperance = eachhero["biography"]["first-appearance"];
              var publisher = eachhero["biography"]["publisher"];
              var alignment = eachhero["biography"]["alignment"];

              //getting apperance

              var gender = eachhero["appearance"]["gender"];
              var race = eachhero["appearance"]["race"];
              var height = eachhero["appearance"]["height"]; //array
              var weight = eachhero["appearance"]["weight"];
              var eyecolor = eachhero["appearance"]["eye-color"];
              var haircolor = eachhero["appearance"]["hair-color"];

              //getting work

              var occupation = eachhero["work"]["occupation"];
              var base = eachhero["work"]["base"]; //could be array

              //getting connection

              var groupaffiliation =
                eachhero["connections"]["group-affiliation"]; //array
              var relatives = eachhero["connections"]["relatives"]; //array

              //creating elements that should be appended to the hero
              var image = document.createElement("div");
              image.setAttribute("class", "img");
              var img2 = document.createElement("img");

              img2.setAttribute("src", img);

              image.append(img2);

              var title = document.createElement("h1");
              title.innerHTML = name + " - " + fullname;

              var powerstats = document.createElement("div");
              powerstats.setAttribute("class", "powerstats");
              //POWER STATS

              $.each(eachhero["powerstats"], function (index, skill) {
                //empty
                var emptybar = document.createElement("div");
                emptybar.setAttribute("class", "emptybar");

                //data
                var databar = document.createElement("div");
                databar.setAttribute("class", "databar");
                databar.style.width = `${skill}%`;

                //skillname
                var skillname = document.createElement("p");
                skillname.setAttribute("class", "skillname");

                const lower = index;
                const upper =
                  lower.charAt(0).toUpperCase() + lower.substring(1);

                skillname.innerText = upper;

                //appending all data to a specific powerstats in the loop
                powerstats.append(skillname);
                emptybar.append(databar);
                powerstats.append(emptybar);
              });

              /////////////////////

              var biography = document.createElement("div");
              biography.setAttribute("class", "biography");
              //BIOGRAPHY

              $.each(eachhero["biography"], function (key, data) {
                if (key != "alter-egos") {
                  var biographydata = document.createElement("div");
                  biographydata.setAttribute("class", "biographydata");

                  const lower = key;
                  const upper =
                    lower.charAt(0).toUpperCase() + lower.substring(1);

                  biographydata.innerHTML =
                    "<span>" + upper + "</span>" + ": " + data + "<br><br>";

                  //appending all data to a specific powerstats in the loop
                  biography.append(biographydata);
                }
              });

              ////////////

              /////////////////////

              var appearance = document.createElement("div");
              appearance.setAttribute("class", "appearance");
              //appearance

              $.each(eachhero["appearance"], function (key, data) {
                var appearancedata = document.createElement("div");
                appearancedata.setAttribute("class", "appearancedata");

                const lower = key;
                const upper =
                  lower.charAt(0).toUpperCase() + lower.substring(1);

                appearancedata.innerHTML =
                  "<span>" + upper + "</span>" + ": " + data + "<br><br>";

                //appending all data to a specific powerstats in the loop
                appearance.append(appearancedata);
              });

              //appending the elements to the hero
              hero.append(title);
              hero.append(image);
              hero.append(powerstats);
              hero.append(biography);
              hero.append(appearance);

              //appending this specific hero to the heroes div

              $(".heros").append(hero);
            });
            allHeroes = document.querySelectorAll(".eachhero");
            allHeroes[0].scrollIntoView(true);
          } else {
            alert("no data returned");
          }
        }
      },
    });
  });
});
