'use strict';

// Переключение между формой регистрации и авторизацией
function showRegistration() {
    const reg = document.getElementById('registration');
    const log = document.getElementById('authorization');
    if (reg.style.display === 'none') {
        reg.style.display = 'block';
        log.style.display = 'none';
    }
}

// Регистрация (форма регистрации)
function registrationForm() {
    const registration = document.getElementById('registration');
    const hello = document.getElementById('hello-user');
    const select = document.getElementById('tik-tak-tabs')
    const cityButton = document.getElementById('add-city-button');
    const cityList = document.getElementById('city-list');
    const weather = document.getElementById('weather')
    const data = document.getElementById('data')


    if (hello.style.display === 'block') {
        hello.style.display = 'none';
    } else {
        hello.style.display = 'block';
        registration.style.display = 'none';
    }

    if (select.style.display === 'block') {
        select.style.display = 'none';
    } else {
        select.style.display = 'block';
        registration.style.display = 'none';
    }

    if (cityButton.style.display === 'block') {
        cityButton.style.display = 'none';
    } else {
        cityButton.style.display = 'block';
        registration.style.display = 'none';
    }

    if (cityList.style.display === 'block') {
        cityList.style.display = 'none';
    } else {
        cityList.style.display = 'block';
        registration.style.display = 'none';
    }

    if (weather.style.display === 'block') {
        weather.style.display = 'none';
    } else {
        weather.style.display = 'block';
        registration.style.display = 'none';
    }

    if (data.style.display === 'block') {
        data.style.display = 'none';
    } else {
        data.style.display = 'block';
        registration.style.display = 'none';
    }
}

// Отправка формы регистрации и получение "ключа"
function registration() {
    const regForm = document.getElementById('registration-form');
    regForm.addEventListener('submit', async function (e) {
        registrationForm();
        e.preventDefault();
        const load = new FormData(regForm);

        const response = await fetch('http://localhost:9000/register', {
            method: 'POST',
            body: load,
            headers: {Accept: 'application/json'},
        })
        const json = await response.json();
        console.log(json);
        localStorage.setItem('key', json.key);
        if (localStorage.getItem('key') !== null) {
            await verificationUser(json.key);
        }
    });
}

// Авторизация (форма авторизации)
function authorizationForm() {
    const authorization = document.getElementById('authorization');
    const hello = document.getElementById("hello-user");
    const select = document.getElementById('tik-tak-tabs')
    const cityButton = document.getElementById('add-city-button');
    const cityList = document.getElementById('city-list');
    const weather = document.getElementById('weather')
    const data = document.getElementById('data')


    if (hello.style.display === 'block') {
        hello.style.display = 'none';
    } else {
        hello.style.display = 'block';
        authorization.style.display = 'none';
    }

    if (select.style.display === 'block') {
        select.style.display = 'none';
    } else {
        select.style.display = 'block';
        authorization.style.display = 'none';
    }

    if (cityButton.style.display === 'block') {
        cityButton.style.display = 'none';
    } else {
        cityButton.style.display = 'block';
        authorization.style.display = 'none';
    }

    if (cityList.style.display === 'block') {
        cityList.style.display = 'none';
    } else {
        cityList.style.display = 'block';
        authorization.style.display = 'none';
    }

    if (weather.style.display === 'block') {
        weather.style.display = 'none';
    } else {
        weather.style.display = 'block';
        authorization.style.display = 'none';
    }

    if (data.style.display === 'block') {
        data.style.display = 'none';
    } else {
        data.style.display = 'block';
        authorization.style.display = 'none';
    }
}

// Отправка форы авторизации и получение "ключа"
function authorization() {
    const authForm = document.getElementById('authorization-form');
    authForm.addEventListener('submit', async function (e) {
        authorizationForm();
        e.preventDefault();
        const load = new FormData(authForm);

        const response = await fetch('http://localhost:9000/logins', {
            method: 'POST',
            body: load,
            headers: {Accept: 'application/json'},
        })
        const json = await response.json();
        console.log(json);
        localStorage.setItem('key', json.key);
        if (localStorage.getItem('key') !== null) {
            await verificationUser(json.key);
            ;
        }
    });
}

// Ключ-сессии - принимает ключ, проверяет данные пользователя, после отправляет приветсвие пользователю
async function verificationUser(key) {
    let paramKey = new FormData();
    paramKey.set('key', key);

    const response = await fetch('http://localhost:9000/message/user', {
        method: 'POST',
        body: paramKey
    })
    const json = await response.json();
    console.log(json.message);
    document.getElementById('hello-user').innerHTML = json.message +
        document.getElementById('hello-user').innerHTML;
    outputButton();
}

// Отправляем название города, возвращаем время
document.addEventListener("DOMContentLoaded", function () {
    const obj = {timeZone: "Europe/Moscow"};
    let timer;

    function tic() {
        const date = new Date();
        const timeElement = document.getElementById("tik-tak-time");
        timeElement.textContent = date.toLocaleTimeString("ru", obj);
        timer = setTimeout(tic, 1000);
    }

    tic();

    const citySelect = document.getElementById("city-select");

    citySelect.addEventListener("change", function () {
        obj.timeZone = citySelect.value;
        document.getElementById("tik-tak-city").textContent = '';
        clearTimeout(timer);
        tic();
    });

    obj.timeZone = citySelect.value;
    tic();
});

// Отправляем название города, возвращаем погоду
const addCityButton = document.getElementById('add-city-button');
const cityList = document.getElementById('city-list');

addCityButton.addEventListener('click', () => {
    cityList.innerHTML = '';

    const cities = ['Adler', 'Arkhangelsk', 'Arsenyev', 'Astrakhan', 'Balakovo', 'Balashikha', 'Barnaul', 'Belgorod',
        'Berdsk', 'Blagoveshchensk', 'Bratsk', 'Bryansk', 'Cheboksary', 'Chelyabinsk', 'Cherepovets', 'Dolgoprudny',
        'Dubna', 'Irkutsk', 'Ivanovo', 'Izhevsk', 'Kaliningrad', 'Kaluga', 'Kamensk-Uralsky', 'Kazan', 'Kemerovo',
        'Khabarovsk', 'Khimki', 'Kirov', 'Kostroma', 'Krasnaya Polyana', 'Krasnodar', 'Krasnoyarsk', 'Kurgan', 'Kursk',
        'Laishevo', 'Lipetsk', 'Magnitogorsk', 'Moscow', 'Murmansk', 'Naberezhnye Chelny', 'Nizhnevartovsk', 'Nizhny Novgorod',
        'Nizhny Tagil', 'Novokuznetsk', 'Novorossysk', 'Novosibirsk', 'Omsk', 'Orel', 'Orenburg', 'Penza', 'Perm', 'Pskov',
        'Rostov-na-Donu', 'Ryazan', 'Saint Petersburg', 'Samara', 'Saratov', 'Smolensk', 'Sochi', 'Stavropol', 'Surgut',
        'Syktyvkar', 'Taganrog', 'Tambov', 'Tolyatti', 'Tomsk', 'Tula', 'Tver', 'Tyumenblast', 'Ufa', 'Ulyanovsk', 'Veliky Novgorod',
        'Vladimir', 'Vladivostok', 'Volgograd', 'Vologda', 'Volsk', 'Volzhsky', 'Voronezh', 'Yakutsk', 'Yaroslavl', 'Yekaterinburg',
        'Yoshkar-Ola', 'Zelenograd'];

    cities.forEach(city => {
        const cityLink = document.createElement('a');
        cityLink.textContent = city;
        cityLink.href = '#';
        cityList.appendChild(cityLink);
        cityLink.addEventListener('click', async () => {
            const formData = new FormData();
            formData.append('name', city);
            try {
                const response = await fetch('http://localhost:9000/city', {
                    method: 'POST',
                    body: formData,
                    headers: {'Accept': 'application/json'}
                });

                const weatherData = await response.json(); // Получаем данные о погоде

                const weatherContainer = document.getElementById('weather');
                const cityNameElement = document.createElement('div');
                const weatherResult = document.createElement('div');
                cityNameElement.textContent = 'Город: ' + city;
                weatherContainer.appendChild(cityNameElement);

                if (weatherData.error) {
                    weatherResult.textContent = 'Ошибка: ' + weatherData.error;
                } else {
                    weatherResult.textContent = 'Погода: ' + weatherData.message;
                }

                weatherContainer.appendChild(weatherResult);
                const emptyLine = document.createElement('br');
                weatherContainer.appendChild(emptyLine);
            } catch (error) {
                console.error('Error sending data:', error);
            }

        });
        cityList.appendChild(cityLink);
        cityList.appendChild(document.createElement('br'));
    });
});

// Кнопка отвечающая за переключение между формой регистрации и авторизацией
function authorizationButton() {
    document.getElementById('auth-button').addEventListener('click', showRegistration);
}

// Кнопка "Регистрация"
function registrationButton() {
    document.getElementById('reg-button').addEventListener('click', registration)
}

// Кнопка "Вход"
function loginButton() {
    document.getElementById('login-button').addEventListener('click', authorization);
}

// Кнопка "Выход" со страницы пользователя
function outputButton() {
    document.getElementById('output-button').addEventListener('click', () => {
        localStorage.removeItem('key');
        location.reload();
    })
}

function main() {
    authorizationButton();
    registrationButton();
    loginButton();
}

main();