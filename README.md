# Full-Pokedex
Full Pokedex is a React/Django web application that allows users to track all Pokedexes for Pokemon Go in one place. This application allows users to sign up and register an account to store data about obtained Pokemon in the database.

# Project Status
This project is currently complete as a base project. I plan to come back to this project periodically and add more, but for the meantime, it is done.

# Installation and Setup Instructions
Clone the repository to your computer. You will need `node`, `npm`, and `python` downloaded on your machine.

### Installation:
#### Npm:
`npm install`

#### Django
`python -m pip install Django`

(See [Django Documentation](https://docs.djangoproject.com/en/4.0/topics/install/) for the owner's installation instructions.)

#### Django Rest Framework
There are 3 packages that are needed to be installed relating to the Django Rest Framework.

The actual Django Rest Framework:

`pip install djangorestframework` [Django Rest Framework Documentation](https://www.django-rest-framework.org/)

Simple JWT which is the JSon web token library:

`pip install djangorestframework-simplejwt` [Simple JWT Documentation](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)

And Django Cors Headers:

`python -m pip install django-cors-headers` [CORS Headers Documentation](https://pypi.org/project/django-cors-headers/)

### Running:
This project is ran completely through Django. To run the project, navigate to where the project was cloned and from there into the Full_Pokedex folder.
Once in this folder (where manage.py should be stored) run:
`python manage.py runserver`.

To visit project:

`127.0.0.1:8000` in your browser.

# Screenshots
![Logged in page](#)
![Base page](#)
![Mobile login page](#)

# Reflection
This project was a side project made with the intention of being used as a tool afterwards to help track my progress in Pokemon Go. While it wouldn't be hard to create a spreadsheet to track everything, this project allows a visual representation so it's easier to find and track the data compared to a spread sheet.

My goal for this project was to develop skills in combining multiple toolsets to create a finished product. I've used React and Django before, but never in unison before. This gave some interesting difficulties and struggles, especially handling the user authentification. This was because with making websites with just Django, it seemed fairly straight forward, but when Django was only acting as the backend, handling the authentification was completely new territory.

Another unexpected issue I wasn't expecting was some debugging issues. While I was eventually able to figure out what the issues were, some of the error messages weren't entirely helpful and required a bit of research to solve.

The total list of tools that I used in this were React, React-router-dom v. 6.3, jwt-decode, Django, djangorestframework, djangorestframework-simplejwt, django-cors-headers, JSX, and some vanilla JS and CSS.
