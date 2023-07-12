import React from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from './MealItem'
const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Dal Makkhani",
    description: "Protien rich indian meal",
    price: 499,
  },

  {
    id: "m2",
    name: "Kadhai Paneer",
    description: "100 year old recipe",
    price: 449,
  },

  {
    id: "m3",
    name: "Chhole Bhature",
    description: "Delhi special lunch",
    price: 199,
  },

  {
    id: "m4",
    name: "Masala Dosa",
    description: "South Indian special",
    price: 249,
  },
  {
    id: "m5",
    name: "Butter Chicken",
    description: "Cannot miss this",
    price: 599,
  },
  {
    id: "m6",
    name: "Butter Naan",
    description: "Indian version of Delicious Bread",
    price: 29,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => {
    return <MealItem id = {meal.id} key={meal.id} name = {meal.name} description = {meal.description} price = {meal.price}/>;
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
