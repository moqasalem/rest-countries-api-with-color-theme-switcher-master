///////////////////////////////////////////////////////////////////////// All the variables we need ////////////////////////////////////////////////////////////////////////////////////

// defaulte show all the data
getData('https://restcountries.com/v2/all');

var md = 1; // 1 Dark mode, 0 light mode

const mode = document.getElementById('mode');
const search = document.getElementById('search');
const select = document.getElementById('select');

const imgs = document.querySelectorAll('country');
/*--Dark-Blue-Dark-Mode-Elements: hsl(209, 23%, 22%);
--Very-Dark-Blue-Dark-Mode-Background: hsl(207, 26%, 17%);
---Very-Dark-Blue-Light-Mode-Text: hsl(200, 15%, 8%);
--Dark-Gray-Light-Mode-Input: hsl(0, 0%, 52%);
--Very-Light-Gray-Light-Mode-Background: hsl(0, 0%, 98%);
--White-Dark-Mode-Text-and-Light-Mode-Elements: hsl(0, 0%, 100%);
*/
const darkModeBg = "hsl(207, 26%, 17%)";
const darkModeTextColor = "hsl(0, 0%, 100%)";
const darkModeElementBg = "hsl(209, 23%, 22%)";

const lightkModeBg = "hsl(0, 0%, 96%)";
const lightModeTextColor = "hsl(200, 15%, 8%)";
const lightModeElementBg = "hsl(0, 0%, 100%)";
const lightModeInput = "hsl(0, 0%, 52%)";

///////////////////////////////////////////////////////////////////////// Selectiong Mode ////////////////////////////////////////////////////////////////////////////////////

mode.addEventListener('click', function () {
  var items = document.querySelectorAll('.item');
  if (md == 0) {
    // dark mode
    document.body.style.backgroundColor = darkModeBg;
    document.body.style.color = darkModeTextColor;

    document.getElementById("header").style.backgroundColor = darkModeElementBg;
    document.getElementById("header").style.boxShadow = "-10px 1px 6px white";

    document.getElementById("select").style.color = darkModeTextColor;
    document.getElementById("select").style.backgroundColor = darkModeElementBg;
    document.getElementById("select").style.border = "1px solid black";

    document.getElementById("search").style.color = darkModeTextColor;
    document.getElementById("search").style.backgroundColor = darkModeElementBg;
    document.getElementById("search").style.border = "1px solid black";

    document.querySelector('button').style.backgroundColor = darkModeElementBg;
    document.querySelector('button').style.color = darkModeTextColor;

    document.querySelectorAll('.border').forEach((item) => {
      item.style.backgroundColor = darkModeElementBg;
    })
    items.forEach((item) => {
      item.style.backgroundColor = darkModeElementBg;
    })

    mode.innerHTML = `<i class="far fa-moon"></i> Light Mode`;
    md = 1;
  }
  else {
    // light mode
    document.body.style.color = lightModeTextColor;
    document.body.style.backgroundColor = lightkModeBg;

    document.getElementById("header").style.backgroundColor = lightModeElementBg;
    document.getElementById("header").style.boxShadow = "-10px 1px 6px black";

    document.getElementById("select").style.color = lightModeTextColor;
    document.getElementById("select").style.backgroundColor = lightModeElementBg;

    document.getElementById("search").style.color = lightModeTextColor;
    document.getElementById("search").style.backgroundColor = lightModeElementBg;

    document.querySelector('button').style.backgroundColor = lightModeElementBg;
    document.querySelector('button').style.color = lightModeTextColor;

    document.querySelectorAll('.border').forEach((item) => {
      item.style.backgroundColor = lightModeElementBg;
    })
    items.forEach((item) => {
      item.style.backgroundColor = lightModeElementBg;
    })
    mode.innerHTML = `<i class="far fa-moon"></i> Dark Mode`;
    md = 0;
  }

});

///////////////////////////////////////////////////////////////////////// Show Details Page ////////////////////////////////////////////////////////////////////////////////////

// links on imgs
function update_click_events() {
  document.querySelectorAll('img').forEach(item => {
    item.addEventListener('click', event => {
      document.getElementById('details').style.display = "flex";
      getData(`https://restcountries.com/v2/name/${item.dataset.name}`);
      document.querySelector('.container').style.display = "none";
      document.getElementById('tools').style.display = "none";
      //item.removeEventListener;

    })
  })
}

// Back button
function back() {
  document.getElementById('back').addEventListener('click', function () {
    document.getElementById('details').style.display = "none";
    document.querySelector('.container').style.display = "grid";
    document.getElementById('tools').style.display = "flex";
  })
}

//border clicks
function border_clicks() {
  document.querySelectorAll('.border').forEach(item => {
    item.addEventListener('click', function () {
      document.getElementById('details').style.display = "";
      getData(`https://restcountries.com/v2/name/${item.dataset.name}`);
      //item.removeEventListener;
    })
  })
}


///////////////////////////////////////////////////////////////////////// Search ////////////////////////////////////////////////////////////////////////////////////


search.addEventListener('keypress', function (event) {
  // 13 = Enter
  if (event.keyCode == 13) {
    document.querySelector('.container').innerHTML = "";
    getData(`https://restcountries.com/v2/name/${this.value}`);
  }
});


///////////////////////////////////////////////////////////////////////// Update Data by regoin ////////////////////////////////////////////////////////////////////////////////////

select.addEventListener("change", function () {

  document.querySelector('.container').innerHTML = "";

  if (this.value == "Africa") {
    getData(`https://restcountries.com/v2/region/Africa`);
  }
  else if (this.value == "America") {
    getData(`https://restcountries.com/v2/region/America`);
  }
  else if (this.value == "Asia") {
    getData(`https://restcountries.com/v2/region/Asia`);
  }
  else if (this.value == "Europe") {
    getData(`https://restcountries.com/v2/region/Europe`);
  }
  else if (this.value == "Oceania") {
    getData(`https://restcountries.com/v2/region/Oceania`);
  }
  else {
    getData('https://restcountries.com/v2/all');
  }
});


///////////////////////////////////////////////////////////////////////// fetch function ////////////////////////////////////////////////////////////////////////////////////

function getData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => countrie(data))

}


///////////////////////////////////////////////////////////////////////// update function ////////////////////////////////////////////////////////////////////////////////////

const countrie = data => {
  const countrieContainer = document.querySelector('.container');
  const detailsPage = document.getElementById('details');

  const len = data.length;
  for (let i = 0; i < data.length; i++) {

    const countrieInfo = document.createElement('div')
    const flag = data[i].flags.png
    const name = data[i].name
    const population = data[i].population.toLocaleString()
    const region = data[i].region
    const capital = data[i].capital

    if (len == 1 && document.getElementById('tools').style.display == "none") {
      // if user clicked on img 
      var detailInfo = "";
      const nativeName = data[i].nativeName;
      const subregion = data[i].subregion;
      const topLevelDomain = data[i].topLevelDomain;
      const currencies = data[i].currencies[0].name;
      const languages = data[i].languages;
      const borders = data[i].borders;

      var lang = "";
      for (let j = 0; j < languages.length; j++) {
        if (j + 1 == languages.length)
          lang += languages[j].name + " ";
        else
          lang += languages[j].name + ",";
      }

      var allBorders = "";
      if (borders != undefined) {
        for (let c = 0; c < borders.length; c++) {
          allBorders += '<li class="border" data-name=' + '"' + borders[c] + '">' + borders[c] + '</li>';
        }
      }

      detailInfo = `
      <button id="back"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
      <div class="main-row">
          <img src="${flag}" alt="">
          <div class="col1">
              <h2>${name}</h2>
              <div class="info">
                  <div class="info1">
                      <span><strong>Native Name:</strong> ${nativeName}</span>
                      <span><strong>Poplulation:</strong> ${population}</span>
                      <span><strong>Region:</strong>${region}</span>
                      <span><strong>Sub Region:</strong> ${subregion}</span>
                      <span><strong>Captial: </strong> ${capital}</span>
                  </div>
                  <div class="info2">
                      <span><strong>Top Level Domain:</strong> ${topLevelDomain}</span>
                      <span><strong>Currencies:</strong> ${currencies}</span>
                      <span><strong>Languages:</strong> ${lang}</span>
                  </div>
              </div>
              <ul>
                  <li><strong>Border Countries: </strong></li>
                  ${allBorders}
              </ul>
              
          </div>
      </div>`;
      detailsPage.innerHTML = detailInfo;
      back();
      border_clicks();
      break;
    }
    else {
      countrieInfo.innerHTML =
        `<div class="item">
                <img src="${flag}" alt="${name}" data-name="${name}">
                <h3>${name}</h3>
                <span><strong>Poplulation:</strong> ${population}</span>
                <span><strong>Region:</strong>${region}</span>
                <span><strong>Captial: </strong> ${capital}</span>
            </div>`
      countrieContainer.appendChild(countrieInfo)
      update_click_events();
    }

  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*function ob(name, nativeName, population, region, subregion, capital, topLevelDomain, flags, currencies, languages, borders) {
  this.name = name;
  this.nativeName = nativeName;
  this.population = population;
  this.region = region;
  this.subregion = subregion;
  this.capital = capital;
  this.topLevelDomain = topLevelDomain;
  this.flags = flags;
  this.currencies = currencies;
  this.languages = languages;
  this.borders = borders;
}*/