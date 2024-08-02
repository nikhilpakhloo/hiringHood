export const warmWeatherTasks = [
  " Explore a new trail or park.",
  " Relax on the beach or go swimming.",
  "Enjoy a meal outside with friends or family.",
  " Take a drive through picturesque landscapes.",
  " Play soccer, tennis, or other outdoor games.",
  " Enjoy time on the water.",
  " Explore vibrant flowers and plants.",
  " Host a cookout with friends.",
  " Practice yoga in a serene outdoor setting.",
  " Enjoy fresh produce and local goods.",
];

export const mildWeatherTasks = [
  " Take a leisurely walk through nature.",
  " Enjoy a ride through a scenic route.",
  " Visit a café with outdoor seating.",
  " Capture the beauty of the day with your camera.",
  " Explore local art exhibitions.",
  " Learn something new at a nearby museum.",
  " Enjoy a meal outdoors in a shaded spot.",
  " Tend to your garden or start a new planting project.",
  " Explore local historical landmarks.",
  " Check out festivals or community events.",
];

export const coolWeatherTasks = [
  " Watch a series of movies or TV shows.",
  " Relax with a spa day or massage.",
  " Try new recipes or bake some treats.",
  " Enjoy an evening of board games with friends or family.",
  " Start a new craft project or hobby.",
  "Spend time reading or studying at a local library.",
  " Explore exhibits indoors.",
  " Take a class or workshop in a subject you’re interested in.",
  " Participate in a workout class or home exercise routine.",
  " Learn how to prepare new dishes.",
];
export const getRandomTask = (tasks) => tasks[Math.floor(Math.random() * tasks.length)];
