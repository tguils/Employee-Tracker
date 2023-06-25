INSERT INTO department (name)
VALUES  ("Human Resources"),
        ("Case Management"),
        ("Hospitalist"),
        ("Nursing");

INSERT INTO role (title, salary, department_id)
VALUES  ("HR specialist", 80, 1),
        ("Resource Specialist", 50, 2),
        ("Doctor", 200, 3),
        ("Nurse", 80, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("M", "S", 1, NULL),
        ("T", "G", 2, 1),
        ("M", "M", 3, NULL),
        ("G", "T", 4, 3);
