import random
import sys
from faker import Faker

if __name__ == '__main__':
    fake = Faker()
    step = 1000
    periods = ['WE', 'MO', 'YE']
    header = "INSERT INTO application_subscription (name, description, price, period, period_paid, mail_id) VALUES "
    file_prefix = "subscriptions_"
    file_suffix = ".sql"

    original_stdout = sys.stdout

    for i in range(step):
        with open(f"{file_prefix}{i}{file_suffix}", "w") as file:
            sys.stdout = file
            print(header)
            for j in range(step):
                print(
                    f"('{fake.company()}','{fake.text()}',{random.randint(1, 1000)},'{random.choice(periods)}',{random.randint(0, 12)},{random.randint(1, 1_000_000)})",
                    end='')
                if j != step - 1:
                    print(',')

        sys.stdout = original_stdout
        print(f"{i + 1}/1000")
