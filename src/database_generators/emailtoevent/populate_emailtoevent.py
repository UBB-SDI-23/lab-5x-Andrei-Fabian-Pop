import random
import sys
from faker import Faker

if __name__ == '__main__':
    fake = Faker()
    step = 1000
    header = "INSERT INTO application_emailtoevent (name, details, email_id, event_id) VALUES "
    file_prefix = "emailtoevent_"
    file_suffix = ".sql"

    original_stdout = sys.stdout

    for i in range(step*10):
        with open(f"{file_prefix}{i}{file_suffix}", "w") as file:
            sys.stdout = file
            print(header)
            for j in range(step):
                title = fake.text()
                print(
                    f"('{title[:title.index('.')]}','{title.strip()}',{random.randint(11, 1_000_000)},{random.randint(1, 1_000_000)})",
                    end='')

                if j != step - 1:
                    print(',')

        sys.stdout = original_stdout
        print(f"{i + 1}/10000")
