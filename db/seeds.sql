INSERT INTO department (id, department_name)
VALUES  ("Human Resources"),
        ("Case Management"),
        ("Hospitalist"),
        ("Nursing");

INSERT INTO role (id, title, title_salary, department_id)
VALUES  ("HR specialist", 80),
        ("Resource Specialist", 50),
        ("Doctor", 200),
        ("Nurse", 80);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  ("M", "S", 1),
        ("T", "G", 2),
        ("M", "M", 3),
        ("G", "T", 4);

        SELECT * FROM employee_tracker;