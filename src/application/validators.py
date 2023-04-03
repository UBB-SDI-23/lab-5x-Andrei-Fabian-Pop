import re


def validate_age(age):
    if age is not int:
        return False
    return 18 <= age <= 100


def validate_email(email):
    if email is not str:
        return False
    return re.match(r"^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$", email)


def validate_price(price):
    if price is not int:
        return False
    return price > 0

