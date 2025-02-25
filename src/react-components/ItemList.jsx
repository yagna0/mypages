import React from "react";

const ItemList = () => {
  const [items, setItems] = React.useState([
    { id: 1, name: "parents", description: "gurdian of kids" },
    { id: 2, name: "food", description: "healthy food" },
    { id: 3, name: "snow", description: "means no sun" },
    { id: 4, name: "sun", description: "summer time" },
    { id: 5, name: "vacation", description: "coming" },
    { id: 6, name: "movie", description: "fun with popcorn" },
    { id: 7, name: "work", description: "hard" },
  ]);

  // Function to change item descriptions
  const handleChange = () => {
    setItems(
      items.map((item) => ({
        ...item,
        description: "Updated description!",
      }))
    );
  };

  return (
    <div>
      <button onClick={handleChange}>Update Descriptions</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ItemList;
