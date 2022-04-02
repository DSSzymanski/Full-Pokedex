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

def set_gen():
    pokemon = pokedex_api.models.Pokemon.objects.all()
    for poke in pokemon:
        poke.generation = get_generation(poke.id)
        poke.save()

def get_no_img():
    pokemon = pokedex_api.models.Pokemon.objects.all()
    ps = []
    for poke in pokemon:
        if poke.img == "/pokemon_imgs/pokemon_home_transporter_pokeball.png":
            print(poke.id, poke.name)
            ps.append(poke.id)
    print(ps)


def generateUrlNames():
    pokemon = pokedex_api.models.Pokemon.objects.all()
    for poke in pokemon:
        poke.urlName=poke.name.lower()
        poke.save()

def format_num(num):
    num = str(num)
    if len(num) < 3:
        str_num = '0' * (3-len(num))
        num = str_num + num
    return num

def generateImg():
    pokemon = pokedex_api.models.Pokemon.objects.all()
    for poke in pokemon:
        file_name = 'pokemon_icon_' + format_num(poke.id) + '_00.png'
        backup_name = 'pm' + poke.id + '.icon.png'
        if os.path.exists("C://Users/dan19/Documents/Full_Pokedex/full_pokedex/full_pokedex/pokemon_imgs/" + file_name):
            poke.img = '/pokemon_imgs/' + file_name
            poke.save()
        elif os.path.exists("C://Users/dan19/Documents/Full_Pokedex/full_pokedex/full_pokedex/pokemon_imgs/" + backup_name):
            poke.img = '/pokemon_imgs/' + backup_name
            poke.save()
        else:
            poke.img = '/pokemon_imgs/pokemon_home_transporter_pokeball.png'
            poke.save()

def generate_released_pokemon():
    with open("C://Users/dan19/Desktop/catalog.html") as file:
        soup = BeautifulSoup(file, 'html.parser')
    cards = soup.find_all('div', class_='pokemonOption sighted')
    for card in cards:
        poke_num = card.span.get_text()[1:]
        poke_to_change = pokedex_api.models.Pokemon.objects.get(id=poke_num)
        poke_to_change.has_been_released = True
        poke_to_change.save()

def generate_shiny_pokemon():
    with open("C://Users/dan19/Desktop/catalog.html") as file:
        soup = BeautifulSoup(file, 'html.parser')
    cards = soup.find_all('div', attrs={'data-shiny-released':'1'})
    for card in cards:
        poke_num = card.span.get_text()[1:]
        poke_to_change = pokedex_api.models.Pokemon.objects.get(id=poke_num)
        poke_to_change.has_shiny = True
        poke_to_change.save()

def generate_shadow_pokemon():
    with open("C://Users/dan19/Desktop/catalog.html") as file:
        soup = BeautifulSoup(file, 'html.parser')
    cards = soup.find_all('div', attrs={'data-shadow-released':'1'})
    for card in cards:
        poke_num = card.span.get_text()[1:]
        poke_to_change = pokedex_api.models.Pokemon.objects.get(id=poke_num)
        poke_to_change.has_shadow = True
        poke_to_change.save()
