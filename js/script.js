/* raccourcis de fonctionnement généraux au site */

/* attendre le chargement de la page */
function loaded(callable){
    window.addEventListener('DOMContentLoaded', callable);
}

/* querySelector */
function qS(selector){
    return document.querySelector(selector);
}

/* querySelectorAll */
function qSAll(selector){
    return document.querySelectorAll(selector);
}

/* création de cookie */
/**
 * @param {string} name
 * @param {string} value
 * @param {number} days
 */
function setCookie(name, value = '', days = -1){
    let maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value}; max-age=${maxAge}; Samesite=Strict; Secure`;
}

/* récupérer un cookie s'il existe */
/**
 * @param {string} name 
 */
function getCookie(name){
    let tabCookie = document.cookie.split('; ');
    //console.log(tabCookie);
    for(cookie of tabCookie){
        let tabValue = cookie.split('=');
        //console.log(tabValue);
        if(tabValue[0] === name){
            return tabValue[1];
        }
    }
}

function cE(element, ...attributes){
    /*
    ...attributes => ['attributs', 'valeur de l'attribut'], ['attributs', 'valeur de l'attribut'] ...
    [['attributs', 'valeur de l'attribut'], ['attributs', 'valeur de l'attribut']]
    */

    let newElement = document.createElement(element);
    attributes.forEach(function(tabAttr){
        console.log(tabAttr);
        newElement.setAttribute(tabAttr[0], tabAttr[1]);
    });

    return newElement;
}

function cEO(element, attributes = {}){
    let newElement = document.createElement(element);
    for(let key in attributes){
        newElement.setAttribute(key, attributes[key]);
    }

    return newElement;
}

function jsonToTableObject(data){
    let firstRound = true;
    let thead = '<tr>';
    let tbody = '';
    data.forEach(element=>{
        tbody = tbody + '<tr>';
        for(key in element){
            if(firstRound){
                thead = thead + `<th>${key}</th>`;
            }
            if('object' !== typeof(element[key])){
                tbody = tbody + `<td>${element[key]}</td>`;
            }else{
                tbody = tbody + `<td>`;
                for(item in element[key]){
                    if('object' !== typeof(element[key][item])){
                        tbody = tbody + `<b>${item} : </b> <i>${element[key][item]}</i><br />`;
                    }
                }
                tbody = tbody + '</td>';
            }
        }

        firstRound = false;
        tbody = tbody + '</tr>';
    });

    return [thead, tbody];
}