import sys
from faker import Faker

if __name__ == '__main__':
    fake = Faker()
    step = 1000
    header = "INSERT INTO application_event (name, description, start_date, end_date, recurring) VALUES "
    file_prefix = "event_"
    file_suffix = ".sql"

    original_stdout = sys.stdout

    for i in range(step):
        with open(f"{file_prefix}{i}{file_suffix}", "w") as file:
            sys.stdout = file
            print(header)
            for j in range(step):
                title = fake.text()
                print(f"('{title[:title.index('.')]}','{title.strip()}','{fake.date_time()}','{fake.date_time()}',{fake.boolean()})", end='')

                if j != step - 1:
                    print(',')

        sys.stdout = original_stdout
        print(f"{i + 1}/1000")
