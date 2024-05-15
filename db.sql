CREATE TABLE budget_member(
  budget_member_id SERIAL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  employment_position VARCHAR(255),
  postal_code VARCHAR(255),
  PRIMARY KEY (budget_member_id)
);

CREATE TABLE member_location(
  postal_code VARCHAR(255),
  country VARCHAR(255),
  PRIMARY KEY (postal_code)
);

CREATE TABLE budget_assistant(
  budget_assistant_id SERIAL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  area_of_expertise VARCHAR(255),
  postal_code VARCHAR(255),
  years_of_experience INT,
  PRIMARY KEY (budget_assistant_id)
);

CREATE TABLE assistant_location(
  postal_code VARCHAR(255),
  country VARCHAR(255),
  PRIMARY KEY (postal_code)
);

CREATE TABLE saveinn_user(
  saveinn_user_id SERIAL,
  budget_member_id INT,
  budget_assistant_id INT,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  salt VARCHAR(255),
  hash VARCHAR(255),
  PRIMARY KEY (saveinn_user_id),
  FOREIGN KEY (budget_member_id) REFERENCES budget_member ON DELETE CASCADE,
  FOREIGN KEY (budget_assistant_id) REFERENCES budget_assistant ON DELETE CASCADE
);

CREATE TABLE earn_income(
  earn_income_id SERIAL,
  saveinn_user_id INT,
  amount FLOAT,
  title VARCHAR(255),
  description VARCHAR(255),
  category VARCHAR(255),
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (earn_income_id),
  FOREIGN KEY (saveinn_user_id) REFERENCES saveinn_user ON DELETE CASCADE
);

CREATE TABLE spend_expense(
  spend_expense_id SERIAL,
  saveinn_user_id INT,
  amount FLOAT,
  title VARCHAR(255),
  description VARCHAR(255),
  category VARCHAR(255),
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (spend_expense_id),
  FOREIGN KEY (saveinn_user_id) REFERENCES saveinn_user ON DELETE CASCADE
);

CREATE TABLE ask_question(
  ask_question_id SERIAL,
  saveinn_user_id INT,
  title VARCHAR(255),
  description VARCHAR(255),
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ask_question_id),
  FOREIGN KEY (saveinn_user_id) REFERENCES saveinn_user ON DELETE NO ACTION
);

CREATE TABLE answer(
  answer_id SERIAL,
  ask_question_id INT,
  saveinn_user_id INT,
  title VARCHAR(255),
  description VARCHAR(255),
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (answer_id, ask_question_id),
  FOREIGN KEY (ask_question_id) REFERENCES ask_question ON DELETE CASCADE,
  FOREIGN KEY (saveinn_user_id) REFERENCES saveinn_user ON DELETE NO ACTION
);

CREATE TABLE plan_budget_plan(
  plan_budget_plan_id SERIAL,
  saveinn_user_id INT,
  name VARCHAR(255),
  description VARCHAR(255),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  PRIMARY KEY (plan_budget_plan_id),
  FOREIGN KEY (saveinn_user_id) REFERENCES saveinn_user ON DELETE CASCADE
);

CREATE TABLE budget_plan_duration(
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  total_duration INT,
  PRIMARY KEY (start_date, end_date)
);

CREATE TABLE set_budget_goal(
  set_budget_goal_id SERIAL,
  saveinn_user_id INT,
  amount_saved FLOAT,
  name VARCHAR(255),
  description VARCHAR(255),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  PRIMARY KEY (set_budget_goal_id),
  FOREIGN KEY (saveinn_user_id) REFERENCES saveinn_user ON DELETE CASCADE
);

CREATE TABLE budget_goal_duration(
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  total_duration INT,
  PRIMARY KEY (start_date, end_date)
);

CREATE TABLE plan_has_goal(
  plan_budget_plan_id INT,
  set_budget_goal_id INT,
  PRIMARY KEY (plan_budget_plan_id, set_budget_goal_id),
  FOREIGN KEY (plan_budget_plan_id) REFERENCES plan_budget_plan ON DELETE CASCADE,
  FOREIGN KEY (set_budget_goal_id) REFERENCES set_budget_goal ON DELETE CASCADE
);

CREATE TABLE user_group(
  user_group_id SERIAL,
  name VARCHAR(255),
  description VARCHAR(255),
  is_public BOOLEAN,
  PRIMARY KEY (user_group_id)
);

CREATE TABLE user_belongs_to_group(
  user_group_id INT,
  saveinn_user_id INT,
  PRIMARY KEY (user_group_id, saveinn_user_id),
  FOREIGN KEY (user_group_id) REFERENCES user_group ON DELETE CASCADE,
  FOREIGN KEY (saveinn_user_id) REFERENCES saveinn_user ON DELETE CASCADE
);
