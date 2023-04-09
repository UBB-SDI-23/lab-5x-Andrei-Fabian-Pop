import random
import sys
from faker import Faker

if __name__ == '__main__':
    fake = Faker()
    step = 1000
    countries = ['RO', 'I', 'PT']
    langauge = ['RO', 'EN', 'PT']
    header = "INSERT INTO application_email(address, corporate_email, user_full_name, language, country) VALUES "
    file_prefix = "email_"
    file_suffix = ".sql"

    original_stdout = sys.stdout

    for i in range(step):
        with open(f"{file_prefix}{i}{file_suffix}", "w") as file:
            sys.stdout = file
            print(header)
            for j in range(step):
                if random.randint(0, 1) % 2 == 0:
                    print(
                        f"('{fake.company_email()}',True,'{fake.name()}','{random.choice(langauge)}','{random.choice(countries)}')",
                        end='')
                else:
                    print(
                        f"('{fake.email()}',False,'{fake.name()}','{random.choice(langauge)}','{random.choice(countries)}')",
                        end='')
                if j != step - 1:
                    print(',')

        sys.stdout = original_stdout
        print(f"{i+1}/1000")
