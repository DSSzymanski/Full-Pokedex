import pokedex_api.models
import os
from bs4 import BeautifulSoup
from urllib import request
import urllib.error

def get_generation(number: str):
    number = int(number)
    if number < 152:
        return '1'
    elif number < 252:
        return '2'
    elif number < 387:
        return '3'
    elif number < 494:
        return '4'
    elif number < 650:
        return '5'
    elif number < 722:
        return '6'
    elif number < 810:
        return '7'
    else:
        return '8'

def generate_pokemon_models():
    pokedex_url = "https://pokemondb.net/pokedex/national"
    #header avoids forbidden error when requesting url
    header = {'User-Agent': 'Mozilla/5.0'}
    url_request = request.Request(pokedex_url, headers=header)

    try:
        html = request.urlopen(url_request).read()
        soup = BeautifulSoup(html, 'html.parser')
        infocards = soup.find_all('span', class_='infocard-lg-data')
        for infocard in infocards:
            pokemon_number = infocard.small.string[1:]
            pokemon_name = infocard.a.string
            pokemon = pokedex_api.models.Pokemon.create(number=pokemon_number, name=pokemon_name, generation=get_generation(pokemon_number))
            print(pokemon)

    except urllib.error.HTTPError as e:
        print("HTTPError encountered.")
        print(e)
    except urllib.error.URLError as e:
        print("URLError encountered.")
        print(e)